# craft-app

Team Blue Client App — a personal craft tracker for saving inspiration, logging works in progress, and recording completed projects.

**Live site:** [craft-app-bbf84.web.app](https://craft-app-bbf84.web.app/)

## About

craft-app lets you organize your crafting life across three folders:

- **Inspiration** — save ideas from Instagram, Etsy, Pinterest, or anywhere else
- **Work in Progress** — track active projects with photos, materials, and notes
- **Completed** — a finished gallery of things you've made

## Tech stack

- React 19 + TypeScript
- Vite + Tailwind CSS v4
- Firebase Auth (Google sign-in)
- Firebase Firestore — craft data
- Firebase Storage — photo uploads
- Firebase Hosting
- Vitest + Testing Library for unit testing

## Local development

Requires Node 22+ and the Firebase CLI.

```bash
npm install
npm run dev
```

Create a `.env` file in the project root with your Firebase config:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## Firebase setup

### First-time setup

1. **Install the Firebase CLI and log in**

   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **Enable Firestore and Storage** in the [Firebase Console](https://console.firebase.google.com) for your project.

3. **Set Storage security rules** — in the Firebase Console under Storage → Rules:

   ```
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /users/{userId}/{allPaths=**} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

### Deploy to production

```bash
npm run build
firebase deploy --project <your-project-id>
```

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build |
| `npm test` | Run tests with UI |
| `npm run coverage` | Run tests with coverage |
| `firebase deploy` | Deploy hosting to production |
