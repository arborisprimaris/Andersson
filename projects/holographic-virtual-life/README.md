# Holographic Virtual Life | Public Development Portfolio

**Version 0.9.3: Offline Tamagotchi Care** · Android 10 target

This folder is hosted within the public `arborisprimaris/Andersson` repository without replacing the existing Four52 website. The public portfolio is [index.html](./index.html).

### Source files available here
- [Tamagotchi engine](./source/tamagotchi.js): six needs, completed care goals, daily history, badges, save migration, offline decision hints.
- [Physical action controller](./source/physical.js): character action choreography.
- [Experimental offline-AI bridge](./source/offline-ai.js): on-device GGUF integration interface.

The complete Android + WebView project and the game's prototype asset library have been packaged separately. This folder contains **selected source files, not an installable APK**.

### Verified
- 27 Tamagotchi tests passed.
- Existing JavaScript and nine Python tests passed.
- 93 prototype assets were audited.
- Phone-sized browser preview and completed-feeding flow passed.

### Not verified
- Native APK compilation, Android 10 installation, phone battery and RAM measurements.
- Real GGUF model inference on a phone.
- Registered-speaker recognition.

The future full-source repository is intended to be public at `arborisprimaris/holographic-virtual-life`, but it must first be created in GitHub. The connected GitHub actions currently cannot create repositories.

**Disclaimer:** This is an unofficial fan-inspired project. Third-party characters remain the property of their respective rights holders. Review [NOTICE](https://github.com/arborisprimaris/Andersson) and asset rights before redistributing any artwork. Gameplay is offline and imposes no penalties for time away.
