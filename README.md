# Hearthland - Phase 0 connection spike

Throwaway proof for [Hearthland](https://github.com/): can two phones exchange a single
tap with no internet? This page opens a WebRTC data channel between two devices with **no
signalling server**, carrying the offer and answer by QR, the OS share sheet, or paste. On
a shared personal hotspot it connects over the local network, so it needs no internet.

## Use it

Open this page (served over HTTPS) on two phones:

1. Phone A: **Create a game (Host)**, show or share the code.
2. Phone B: **Join**, scan or paste the code, then send its reply back to A.
3. Tap. Taps cross both ways.

To prove it runs with no internet: once connected, turn mobile data off (or put both
phones on one phone's hotspot). Taps keep flowing over local Wi-Fi.

`qrcode.js` is the MIT [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator)
library, used for QR display. Scanning uses the browser's built-in `BarcodeDetector`.

This folder is throwaway spike code. It contains no game logic.
