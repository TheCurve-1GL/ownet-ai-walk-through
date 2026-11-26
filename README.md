# Ownet AI walk-through

The interactive walk-through ("From current cost to proven return") shown inside the draft Ownet AI pages for ownet.co.uk. Every number in it is illustrative.

- `public/index.html` is the page. Replace it to update the walk-through; Railway redeploys when `main` changes.
- `server.js` serves it with no dependencies, and tells search engines not to list it (`X-Robots-Tag`, `robots.txt` and a meta tag).
- Draft for Jeremy. Not linked from anywhere public until the Ownet pages are approved.

## Demo site for Jeremy

The same repository also runs a second Railway service with `SITE=demo`. It serves the draft Ownet AI pages from `demo/` (hub plus five services, with the two videos in `demo/media/`), starting at the AI Transformation page. Every page carries a "Draft for Jeremy, not published" banner and is hidden from search engines.
