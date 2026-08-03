# R.K. Automobile Admin Panel

Open `https://www.rkautomobile.in/admin` and sign in with the private administrator username and password configured in Vercel.

## Everyday Tasks

1. Select **Add car** to create a listing.
2. Enter the name, brand, model, year, price, specifications, and features.
3. Upload up to five photos or add hosted image URLs. The first photo is the public primary image; select another thumbnail to make it primary.
4. Keep **Visible on website** off while a listing is incomplete.
5. Select **Save car**. Published, available cars appear in the homepage inventory.
6. Use **Edit** to update a listing or mark it Reserved or Sold.
7. Use **Delete** only when the listing should be removed permanently.

## Backups

- Select **Backup** to download all inventory as a JSON file.
- Select **Restore** to replace the shared live inventory with a valid backup.
- Select **Sample data** to restore the original demonstration inventory.

## Shared Storage and Security

- Inventory is stored in Upstash Redis and is read by every visitor to the main website.
- Add, edit, restore, and delete operations require a valid HTTP-only administrator session.
- Sessions expire after eight hours and the sign-in endpoint limits repeated failed attempts.
- Uploaded images are compressed in the browser and stored in Vercel Blob.
- Browser `localStorage` is used only as a temporary display cache and migration fallback.
- Use **Backup** regularly before large inventory changes.

## Vercel Production Setup

1. In the Vercel project, open **Storage** or **Marketplace** and connect an Upstash Redis database. Confirm that `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are available to Production, Preview, and Development.
2. Connect a Vercel Blob store to the project. Vercel adds `BLOB_READ_WRITE_TOKEN` automatically.
3. In **Settings → Environment Variables**, add:
   - `ADMIN_USERNAME`: the single private administrator username.
   - `ADMIN_PASSWORD`: a long, unique password.
   - `ADMIN_SESSION_SECRET`: at least 32 random characters. Generate one with `openssl rand -hex 32`.
4. Redeploy the latest `main` commit after adding or changing environment variables.
5. Visit `/admin`, sign in, and save the existing inventory once to migrate any browser-cached listings into shared storage.

The designated single-owner username is `rk.inventory.owner`. Its generated password and session secret are stored only in the ignored local `.env.production.local` file and must be added to Vercel; they are intentionally never committed to Git.

## Vehicle Registration Lookup

The public registration-number form calls `/api/vehicle-lookup`. It does not scrape mParivahan and never exposes provider credentials in browser code. After R.K. Automobiles receives approved MoRTH/API Setu or licensed-provider access, set `VEHICLE_LOOKUP_API_URL` and `VEHICLE_LOOKUP_API_KEY` in Vercel and adapt the small response mapping in `api/vehicle-lookup.js` if the provider uses different field names.

No additional CNAME is needed for admin access. `/admin` is a protected route on the existing `rkautomobile.in` deployment.
