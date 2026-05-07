# Zen Space
Quiet, offline reminders to breathe, hydrate, rest your eyes, and wind down.

## Features
- 🌬️ Morning Breath: scheduled box breathing prompt with a guided animation.
- 💧 Hydration Nudges: interval-based reminders to drink water.
- ☕ Screen Breaks: customizable prompts to step away from your monitor.
- 🌙 Wind Down: a daily signal to disconnect from screens.

## Privacy
Zen Space stores all preferences locally on your device. There are no accounts, servers, or analytics.

## Getting started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the app:
   ```bash
   npm run start
   ```
3. Use Expo Go (mobile) or an emulator to open the project.

## Android APK (GitHub Actions)
1. Install EAS CLI and link the project (creates `extra.eas.projectId` in `app.json`):
   ```bash
   npx eas project:init
   ```
2. Ensure `android.package` in `app.json` is correct for your app ID.
3. Add a repository secret named `EXPO_TOKEN` (generate via `npx eas token:create`).
4. Run the "Build Android APK" workflow and keep the `apk` build profile (or adjust `eas.json`).

## Notes
- Notification scheduling requires permission on each device.
- Reminders run entirely offline once permissions are granted.
