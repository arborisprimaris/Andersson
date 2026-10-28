# Holographic Virtual Life

**Public development portfolio | v0.9.2 | Android 10 | Offline-first**

This directory hosts a standalone portfolio site and selected **real** JavaScript modules from the Holographic prototype, without changing the Four52 website at the repository root.

- [Open portfolio page](./index.html)
- [Offline GGUF bridge JavaScript](./source/offline-ai.js)
- [Character physical choreography JavaScript](./source/physical.js)

## What was built

- 93/93 file-backed prototype asset entries (character, animation, rooms, furniture, care HUD, visual effects, audio).
- Room navigation, pathfinding, interaction choreography, cooking and cleaning systems.
- Mood, personality, routine scheduling, progression, inventory and save-state integration.
- Java Android WebView application shell, encrypted local save interface and experimental native GGUF bridge in the **complete source package**.

## Verified versus pending

| Milestone | State |
|---|---|
| Asset file audit | Passed in local source package |
| Browser and automated gameplay tests | Passed in source package |
| Static public portfolio | Published via GitHub Pages workflow |
| Full Android project in a dedicated repository | Not yet uploaded |
| Compiled Android test APK | Pending |
| Android 10 real-device installation | Pending |
| Native local-language-model inference on device | Pending |

The standalone **full-source ZIP** has been assembled in the development conversation, but is not represented by this GitHub folder. These two published JavaScript files are selected excerpts from that source, not a runnable full application.

## Why a separate project repository?

This existing public `Andersson` repository is also a Four52 website. A separate `arborisprimaris/holographic-virtual-life` repository is still required to host the complete Android project and execute its dedicated APK workflow without changing the Four52 site.

## Privacy, copyrights, and scope

The public portfolio page uses an original abstract city design. Holographic is an unofficial fan-inspired prototype; third-party characters and franchise IP remain with their rights holders. A native APK, voice verification, and the experimental GGUF backend must not be described as tested or production-ready.

**No repository permissions can be obtained through a voice sample.** GitHub authorization is determined by the connected account and its scoped permissions.
