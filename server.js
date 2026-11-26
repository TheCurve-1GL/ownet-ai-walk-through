// Serves the Ownet AI walk-through. Hidden from search engines; can be shown inside other pages.
const http = require("http");
const fs = require("fs");
const path = require("path");
const page = fs.readFileSync(path.join(__dirname, "public", "index.html"));
const robots = "User-agent: *\nDisallow: /\n";
http.createServer((req, res) => {
  const url = (req.url || "/").split("?")[0];
  const common = { "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "public, max-age=300" };
  if (url === "/robots.txt") {
    res.writeHead(200, { ...common, "Content-Type": "text/plain; charset=utf-8" });
    return res.end(robots);
  }
  if (url === "/health") { res.writeHead(200, { "Content-Type": "text/plain" }); return res.end("ok"); }
  res.writeHead(200, { ...common, "Content-Type": "text/html; charset=utf-8" });
  res.end(page);
}).listen(process.env.PORT || 3000);
