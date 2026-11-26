// Two sites from one repository, chosen by the SITE variable on Railway:
//   (default) the Ownet AI walk-through, shown inside the draft Ownet pages
//   SITE=demo  the draft Ownet AI pages for Jeremy, with videos
// Both are hidden from search engines.
const http = require("http");
const fs = require("fs");
const path = require("path");

const SITE = process.env.SITE || "walk-through";
const ROOT = path.join(__dirname, SITE === "demo" ? "demo" : "public");
const HOME = SITE === "demo" ? "ai-transformation.html" : "index.html";
const TYPES = { ".html": "text/html; charset=utf-8", ".mp4": "video/mp4", ".jpg": "image/jpeg", ".png": "image/png", ".css": "text/css", ".js": "text/javascript" };
const base = { "X-Robots-Tag": "noindex, nofollow" };

http.createServer((req, res) => {
  let url;
  try { url = decodeURIComponent((req.url || "/").split("?")[0]); } catch { url = "/"; }
  if (url === "/robots.txt") { res.writeHead(200, { ...base, "Content-Type": "text/plain" }); return res.end("User-agent: *\nDisallow: /\n"); }
  if (url === "/health") { res.writeHead(200, { "Content-Type": "text/plain" }); return res.end("ok"); }
  const rel = url === "/" ? HOME : url.replace(/^\/+/, "");
  const file = path.join(ROOT, rel);
  if (!file.startsWith(ROOT + path.sep)) { res.writeHead(400); return res.end(); }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404, { ...base, "Content-Type": "text/plain" }); return res.end("Not found"); }
    const type = TYPES[path.extname(file)] || "application/octet-stream";
    const headers = { ...base, "Content-Type": type, "Accept-Ranges": "bytes", "Cache-Control": type.startsWith("text/html") ? "no-cache" : "public, max-age=3600" };
    const range = req.headers.range && /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
    if (range) {
      let start = range[1] === "" ? st.size - Number(range[2]) : Number(range[1]);
      let end = range[1] === "" || range[2] === "" ? st.size - 1 : Math.min(Number(range[2]), st.size - 1);
      if (start < 0) start = 0;
      if (start > end || start >= st.size) { res.writeHead(416, { ...base, "Content-Range": `bytes */${st.size}` }); return res.end(); }
      res.writeHead(206, { ...headers, "Content-Range": `bytes ${start}-${end}/${st.size}`, "Content-Length": end - start + 1 });
      return fs.createReadStream(file, { start, end }).pipe(res);
    }
    res.writeHead(200, { ...headers, "Content-Length": st.size });
    if (req.method === "HEAD") return res.end();
    fs.createReadStream(file).pipe(res);
  });
}).listen(process.env.PORT || 3000);
