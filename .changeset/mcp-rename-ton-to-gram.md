---
"@ton/mcp": patch
---

Rebrand the native asset display from TON to GRAM in tool descriptions and output labels (e.g. "Send GRAM", "Get GRAM balance", amounts rendered as "1.5 GRAM"); raw-unit wording now reads "nano units" instead of "nanoTON".

The tool API is unchanged: the `"TON"` token selector (swaps and the native asset), returned token symbols, and the `nanoTon` output field stay the same for backward compatibility.
