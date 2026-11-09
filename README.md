# 📝 Private Notes

### A little space for all your big ideas.

Create an account, sign in, and keep your notes together. Search by title or content, open a note to read it, and create, edit, or delete notes whenever you need.

---

## 🚀 Get started

### You’ll need

- [Node.js](https://nodejs.org/) and npm
- Access to the app’s API server

### Set it up

1. Download or clone this project.
2. Open a terminal in the project folder.
3. Install the packages:

   ```sh
   npm install
   ```

4. Create a `.env` file in the project folder and add your API server address:

   ```env
   VITE_API_URL=https://your-api-server.example
   ```

   Swap in the URL for your API server. That’s where the app goes to sign you in and save your notes.

5. Start the app:

   ```sh
   npm run dev
   ```

   Open the local link shown in your terminal. Your notes are ready!

---

## 🧰 Handy commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the app on your computer |
| `npm run build` | Get the app ready to deploy |
| `npm run preview` | Preview the production build |
| `npm run lint` | Check the code for common problems |

---

## ☁️ Put it on Vercel

1. Import this project into Vercel.
2. Add an environment variable named `VITE_API_URL` with your API server’s URL.
3. Deploy. That’s it!

The included `vercel.json` makes sure pages like `/login` and `/dashboard` still work when you refresh or open them directly.
