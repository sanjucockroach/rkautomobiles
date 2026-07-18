# R.K. Automobile Admin Panel

Open `/admin` in the same browser used to preview the public website.

## Everyday Tasks

1. Select **Add car** to create a listing.
2. Enter the name, brand, model, year, price, specifications, and features.
3. Upload a primary photo or paste a hosted image URL.
4. Keep **Visible on website** off while a listing is incomplete.
5. Select **Save car**. Published, available cars appear in the homepage inventory.
6. Use **Edit** to update a listing or mark it Reserved or Sold.
7. Use **Delete** only when the listing should be removed permanently.

## Backups

- Select **Backup** to download all inventory as a JSON file.
- Select **Restore** to replace the current browser inventory with a valid backup.
- Select **Sample data** to restore the original demonstration inventory.

## Frontend-Only Limitation

Inventory is stored in browser `localStorage`. It is not a shared database:

- Changes are available to the public website in the same browser.
- Open tabs receive inventory updates automatically.
- Clearing browser data removes the inventory.
- Other devices and browsers do not receive changes.
- Uploaded images use browser storage; hosted image URLs are better for large inventories.
- There is no secure administrator login in frontend-only mode.

Use **Backup** regularly. Shared inventory, secure login, staff accounts, and permanent image storage require a backend or managed content service in a future phase.
