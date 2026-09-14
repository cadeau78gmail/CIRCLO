# ReLoop Rwanda — frontend

React + Vite frontend for ReLoop Rwanda, a circular-economy platform ("Give it another life.").
Runs entirely on mock data (`src/data/mockData.js`) — no backend needed yet.

## Run it

```
npm install
npm run dev
```

Open the printed URL (usually http://localhost:5174).

## Structure

```
src/
  components/   Sidebar, MobileNav, ItemCard, Badges, EmptyState, AuthShell
  layouts/      AppLayout (user app shell), AdminLayout (admin shell)
  pages/        Landing, Login, Signup, PreferenceSetup, Home, Explore,
                Categories, ItemDetails, PostItem, MyReloop, Saved,
                Exchange, Messages, Notifications, Profile, Impact,
                Recycling, Settings, Help
  pages/admin/  AdminDashboard
  data/         mockData.js — placeholder items/users/stats until the
                Java Spring Boot backend exists
```

## Routes

- `/` landing, `/login`, `/signup`, `/preferences`
- `/app/*` the main logged-in app (sidebar + mobile nav)
- `/admin/*` the admin dashboard (separate layout)

## Next step

Once the Spring Boot backend exists, replace the imports from `mockData.js`
with real `fetch()` calls, one page at a time — start with `Home` and `Explore`.
