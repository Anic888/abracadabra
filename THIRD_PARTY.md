# Third-party components embedded in index.html

The single-file app vendors the following components. They are embedded
(minified JS / base64 WASM / base64 subset fonts) and remain under their
original licenses.

## noble-post-quantum, noble-curves, noble-hashes
- Author: Paul Miller (https://paulmillr.com)
- Source: https://github.com/paulmillr/noble-post-quantum ·
  https://github.com/paulmillr/noble-curves ·
  https://github.com/paulmillr/noble-hashes
- License: MIT
- Used for: X-Wing (ML-KEM-768 + X25519) key encapsulation, Ed25519 signatures.

## argon2-browser
- Author: Antelle (https://github.com/antelle)
- Source: https://github.com/antelle/argon2-browser
- License: MIT
- Used for: Argon2id password hashing (WASM build, embedded as base64).

## JetBrains Mono
- Author: JetBrains (Philipp Nurullin, Konstantin Bulenkov)
- Source: https://github.com/JetBrains/JetBrainsMono
- License: SIL Open Font License 1.1
- Used as: UI typeface (Latin + Cyrillic subset, weights 400/700, embedded).

## Tektur
- Author: Adam Ladd
- Source: https://fonts.google.com/specimen/Tektur
- License: SIL Open Font License 1.1
- Used as: display typeface for the title (Latin + Cyrillic subset, weight 700).

## ChaCha20
- Implemented in this project from RFC 8439 (public domain algorithm by
  D. J. Bernstein), verified against OpenSSL's native implementation and the
  RFC test vector.

---

MIT license text (applies to noble-* and argon2-browser as published by their
authors; see each repository for the authoritative copy):

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND [...]

SIL OFL 1.1 full text: https://openfontlicense.org/open-font-license-official-text/
