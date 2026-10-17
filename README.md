# AEPL website (Next.js)

Landing page for Addagudi Exports Pvt. Ltd. Next.js (App Router) + TypeScript, MongoDB via Mongoose.

```bash
npm install
cp .env.example .env.local   # set MONGODB_URI
npm run dev                  # http://localhost:3000
npm run build && npm start
```

- `app/` routes (`/`, `/credits`, `POST /api/enquiries`), global styles in `app/globals.css`
- `components/` one component per page section
- `lib/content.ts` site content as data (future admin dashboard can move these to MongoDB)
- `models/Enquiry.ts` enquiries collection (has a `status` field ready for the admin)
- Without `MONGODB_URI` the enquiry form says so and falls back to opening the visitor's email app
- Photos in `public/img` are temporary stock images (see `/credits`); replace with AEPL's own
