# Resume Portfolio — Next.js conversion

This project preserves the original six HTML pages and their CSS/JS, served through Next.js routes:
- `/` Home
- `/about` About
- `/projects` Projects
- `/services` Services
- `/skills` Skills
- `/contact` Contact

## Local development
1. Install Node.js 20.9+ (recommended for Next.js 15).
2. Run `npm install`.
3. Run `npm run dev` and open http://localhost:3000.

Media files are outside `public/` in `private-assets/`. Browser requests use `/api/image/...`; the API validates allowed asset folders and blocks path traversal. CSS and JavaScript remain public because the browser needs them to render and animate the portfolio.

## Vercel deployment — required media storage setup
The original media library is about 220 MB uncompressed, so it is deliberately excluded from Vercel uploads. Vercel Functions should not be used as a large permanent media disk. Upload the contents of `private-assets/assets/` to a **private Cloudflare R2 bucket**, preserving the `assets/images`, `assets/frames`, `assets/files`, and `assets/3d` key paths. Then add these environment variables in Vercel Project Settings → Environment Variables:
- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET_NAME`

Use an R2 API token scoped to that bucket only. Keep the bucket private; do not enable public access or expose the credentials to client-side code. Redeploy after setting variables.

## Important privacy limitation
This conversion removes media from public static URLs and serves it through a server-side API with path validation. Because the portfolio itself is public and these assets are rendered in visitors' browsers, a visitor can still save displayed images or copy a valid API URL. A public website cannot make an image both visible to everyone and inaccessible to those viewers. For genuinely confidential images, add visitor authentication and require a valid session on the image route; the current portfolio display is intentionally public.

## Notes
- Original HTML files are preserved in `resume-original/` for reference.
- Original CSS and JavaScript are retained, with media paths rewritten to `/api/image/...`.
- Review external CDN assets and form behavior before production launch.
