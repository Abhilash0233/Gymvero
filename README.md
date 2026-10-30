# Gymvero

React Native (CLI) gym-owner management app for iOS and Android.

## Demo login (store review)

- Email: `demo@gymvero.app`
- Password: `GymveroDemo1!`

See [store/LISTING.md](store/LISTING.md) for App Store / Play listing copy.

## Legal pages (GitHub Pages)

- Site: https://abhilash0233.github.io/Gymvero/
- Privacy: https://abhilash0233.github.io/Gymvero/privacy.html
- Terms: https://abhilash0233.github.io/Gymvero/terms.html
- Delete account: https://abhilash0233.github.io/Gymvero/delete-account.html

In the app: **More → Privacy policy** (opens the hosted page).

## Run

```bash
npm start
npm run ios
# or
npm run android
```

## Identifiers

- Android: `com.gymvero.owner`
- iOS: `app.gymvero.owner`

## Architecture notes

- v1 uses hardcoded demo auth and local mock data (AsyncStorage).
- Data access goes through repositories in `src/data/` so a real backend can replace the mock store later.
- Gymvero SaaS plans (monthly / quarterly / annual) are UI-only in this build — no IAP.
