# 📝 Private Notes

### A little space for all your big ideas.

Create an account, sign in, and keep your notes together. Search by title or content, open a note to read it, and create, edit, or delete notes whenever you need.

---

## 🌍 Live links

- **Live app:** https://privatenotesapp.vercel.app/
- **API server:** https://notes-server-yxtr.onrender.com/
- **Server repo:** https://github.com/JustChiwo/Notes-Server

> 💤 The API runs on a free plan, so it sleeps when nobody is using it. If the first sign-in is slow, give it up to a minute to wake up. After that it's quick.

---

## ✨ What you can do

- Register and sign in with your email and password
- Keep your notes private: you only ever see your own
- Create a note, with a prompt that checks you really want to discard unsaved changes
- Open any note in full screen to read all of it
- Edit and delete your notes
- Long notes are cut off neatly on the dashboard, and shown in full when you open them

Pages like the dashboard are protected. If you aren't signed in, you're sent to the login page.

---

## 🧱 Built with

- React (Vite)
- Tailwind CSS
- React Router
- A separate Express and Supabase backend for sign-in and storage

Sign-in works through a secure cookie that the server sets, so the app never handles your token directly.

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

   Swap in the URL for your API server, with no slash at the end. That’s where the app goes to sign you in and save your notes. If it's missing, the app tries `http://localhost:5000`.

   Restart the app after changing this file, because it's only read when the app starts.

5. Start the app:

   ```sh
   npm run dev
   ```

   Open the local link shown in your terminal (use `localhost`, not `127.0.0.1`). Your notes are ready!

### Running it with your own server

The server only accepts requests from one front-end address, set by its `CLIENT_URL` variable. To run this app locally, the server's `CLIENT_URL` has to be `http://localhost:5173`. The setup for the server is in its own repo.

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
2. Add an environment variable named `VITE_API_URL` with your API server’s URL (no slash at the end).
3. Deploy. That’s it!

The included `vercel.json` makes sure pages like `/login` and `/dashboard` still work when you refresh or open them directly.

After deploying, set the server's `CLIENT_URL` to your Vercel link (also with no slash at the end), or sign-in won't work. If you change `VITE_API_URL` later, redeploy so the new value is used.