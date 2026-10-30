# Gymvero — Store listing (iOS + Android)

Use these values for App Store Connect and Google Play. Demo login is for review only.

## Identifiers

| Platform | Identifier |
|----------|------------|
| Android `applicationId` | `com.gymvero.owner` |
| iOS Bundle ID | `app.gymvero.owner` |
| Display name | Gymvero |
| Version | 1.0.0 (build 1) |
| SKU (iOS) | `gymvero-owner-ios` |

## App Review / Play App access

This build uses **predefined demo credentials** (no live backend yet).

| Field | Value |
|-------|--------|
| Email | `demo@gymvero.app` |
| Password | `GymveroDemo1!` |
| Alternate phone | `9876543210` (same password) |
| Sample gym | Fitness Hub |

**Review notes (paste into App Review Information):**

> Gymvero is a gym-owner management app. Sign in with email `demo@gymvero.app` and password `GymveroDemo1!`. All data is local sample data for review. SaaS plan selection (Monthly / Quarterly / Annual) updates demo state only — no real payments or IAP in this version. The app is free; billing will be enabled after backend launch.
>
> Account deletion: More → Delete account (or Gym profile → Delete account). Type DELETE and confirm. This permanently removes the owner account data in the app (not a temporary deactivation). External deletion page: https://abhilash0233.github.io/Gymvero/delete-account.html (also email privacy@gymvero.app).

## Listing copy

**Subtitle** (≤30 chars)

Gym owner management

**Description**

Gymvero helps gym owners manage members, memberships, attendance, and dues from one app.

Sign in with your owner account to see today’s check-ins, track outstanding payments, and keep membership plans up to date.

• Dashboard — members, check-ins, and dues at a glance  
• Members — add and edit member profiles  
• Attendance — manual check-in for the day  
• Payments — paid and outstanding dues  
• Gymvero plan — choose Monthly, Quarterly, or Annual (demo)

This first release uses demo credentials for store review. Production accounts and cloud sync will follow.

**Keywords**

gym,fitness,membership,attendance,owner,management,dues,studio

**Support URL**

https://abhilash0233.github.io/Gymvero/support.html

**Marketing URL**

https://abhilash0233.github.io/Gymvero/

**Privacy Policy URL**

https://abhilash0233.github.io/Gymvero/privacy.html

**Category**

Primary: Business  
Secondary: Health & Fitness

**Age rating**

4+

**Pricing**

Free. Monetization via Gymvero SaaS subscription after backend launch (not charged in this build).

## Account deletion (Apple 5.1.1(v) + Google Play)

| Requirement | Gymvero |
|-------------|---------|
| In-app deletion | **More → Delete account** / **Profile → Delete account** |
| Not deactivate-only | Permanent delete + wipe of associated app data |
| External web path (Play) | `https://abhilash0233.github.io/Gymvero/delete-account.html` |
| Play Console field | Data safety → Account deletion URL → paste the URL above |

Hosted from [`docs/`](../docs/) via GitHub Pages (`/docs` on branch `main`).

## App Privacy (nutrition labels)

Tracking: No

Data collected in this demo build: none sent off-device. Session and sample gym data stay on the device.

## App icon

Source: Figma `Gymvero / App Icon 1024` in the Bitu TxE file.  
Installed into:

- iOS `Images.xcassets/AppIcon.appiconset` (all required sizes + 1024 marketing, no alpha)
- Android `res/mipmap-*/ic_launcher.png` and `ic_launcher_round.png`
- Play Store upload asset: `src/assets/icons/gymvero-play-512.png`

## Screenshots to capture

1. Welcome  
2. Sign in (demo credentials visible)  
3. Dashboard  
4. Members list  
5. Attendance  
6. Gymvero plan (Monthly / Quarterly / Annual)

## Android release notes

- Set release signing in `android/app` before Play upload (debug signing is temporary).  
- `versionName` 1.0.0 / `versionCode` 1 in `android/app/build.gradle`.

## iOS release notes

- Create App ID `app.gymvero.owner` in Apple Developer → Identifiers.  
- Archive from Xcode with a Distribution certificate for team **VC5PMBL6V9** (or your Gymvero team).  
- Host privacy/support pages at the URLs above before submit (or temporary landing pages).
