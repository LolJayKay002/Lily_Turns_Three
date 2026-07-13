# Lily-Rae's 3rd Birthday — invitation site

A single self-contained page (`index.html`) with:
- Mobile-first responsive layout
- Ambient sparkle animation and a live countdown to 29 August
- Tap-the-unicorn interaction
- An RSVP form (name, attending yes/no, guest count, dietary needs/message) that submits straight into a Google Sheet

Two things need to be connected before it's fully live: the Google Sheet, and hosting. Both are one-time setups.

## 1. Connect the RSVP form to a Google Sheet

1. Create a new Google Sheet (sheets.new) — name it something like "Lily-Rae 3rd Birthday RSVPs".
2. In the sheet, go to **Extensions > Apps Script**.
3. Delete the placeholder code and paste in the contents of [`apps-script.gs`](apps-script.gs) from this folder.
4. Click **Deploy > New deployment**.
5. Click the gear icon next to "Select type" and choose **Web app**.
6. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
7. Click **Deploy**, then authorize it (it's your own script, so you'll see a Google warning screen — click Advanced > Go to (your project name)).
8. Copy the **Web app URL** it gives you (ends in `/exec`).
9. Open `index.html` and replace this line near the top of the `<script>` block:
   ```js
   const SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```
   with your actual URL, e.g.
   ```js
   const SCRIPT_URL = "https://script.google.com/macros/s/AKfycb.../exec";
   ```

Each RSVP submitted on the page will now append a row to the sheet: timestamp, name, attending, guest count, dietary needs/message.

**Note:** because Google Apps Script doesn't return CORS headers, the page submits with `fetch(..., {mode: 'no-cors'})`. This means the browser can't read the response back, so the page always shows the "thank you" confirmation optimistically after sending. Check the Sheet directly to confirm rows are arriving — if you want delivery confirmation in the UI itself, that requires a small backend proxy instead of Apps Script directly.

## 2. Host it so you can share one link

Recommended: GitHub Pages.

1. Create a new **public** GitHub repository (e.g. `lily-rae-invite`).
2. Push this folder's contents to the repo's `main` branch (at minimum `index.html`).
3. In the repo, go to **Settings > Pages**, set source to the `main` branch, root folder.
4. GitHub gives you a URL like `https://<your-username>.github.io/lily-rae-invite/` — that's the link to share with invitees.

If you'd like, tell me the GitHub username/repo you want to use (and whether you'd like me to push the files directly — I'll need a personal access token with repo access, or you can run the push yourself with the commands I can give you).

## Notes

- The countdown assumes the event date is **29 August 2026** — update `EVENT_DATE` near the top of the script in `index.html` if that's wrong.
- Update the venue/date details directly in the `.details` section of `index.html` if anything changes.
