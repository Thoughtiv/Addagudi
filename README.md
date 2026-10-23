# AEPL website (Next.js)

Website and admin dashboard for Addagudi Exports Pvt. Ltd. Next.js (App Router) + TypeScript + MongoDB (Mongoose).

## Run it

```bash
npm install
cp .env.example .env.local      # then fill it in (see below)
npm run dev                     # http://localhost:3000   (admin: /admin)
npm run build && npm start
```

### Environment (`.env.local`)

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB connection string, ending with a database name (e.g. `.../aepl`). Without it the public site still works using built-in content; the admin, blog, uploads and saved enquiries need it. |
| `AUTH_SECRET` | Random text, 32+ characters, used to sign the admin session cookie. |

Admin accounts are stored in the database (`admins` collection, passwords hashed with scrypt), not in env variables.
Create the first admin, or add more, with:

```bash
npm run admin:create -- <username> "<password, 10+ characters>"
```

It writes to whichever database `MONGODB_URI` points at, so run it once for production. Running it again for an existing username resets that password. Admins can also change their own password under **Admin → Account**.

On a host such as Vercel, set `MONGODB_URI` and `AUTH_SECRET` in the project's environment variables.

## Admin (`/admin`)

- **Blog**: write posts in Markdown, upload a cover image, insert images into the text, keep drafts, publish. Published posts appear at `/blog`.
- **Machinery**: add, edit, reorder and delete machines with photo upload. Every machine becomes a card on `/machinery` and a row in the full list; the first five show on the home page. On first use, "Import the current machines" copies the built-in list into the database.
- **Contact & address**: address, phone, mobile and email shown in the footer, on the Contact page and in tap-to-call/email links, and used for the enquiry form's email fall-back.
- **Enquiries**: messages sent from the website form, with status (new / replied / closed).
- **Account**: change your password (this signs out all other sessions).

Uploaded photos are validated, resized (max 1800 px wide), converted to WebP and stored in MongoDB (`media` collection), then served from `/api/media/<id>`. No separate file storage is needed.

Changes in the admin go live immediately (the affected pages are revalidated).

## Layout

- `app/(site)/` public pages, `app/admin/` dashboard, `app/api/` enquiries + media endpoints
- `components/` section components, `components/admin/` admin forms
- `lib/content.ts` built-in content and defaults, `lib/data.ts` database reads with fallbacks
- `models/` Mongoose models: Enquiry, Machine, Post, Media, Setting
- Photos in `public/img` are temporary stock images (see `/credits`); replace them with AEPL's own, for example by uploading machine photos in the admin
