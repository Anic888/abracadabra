<div align="center">

# ✳ ABRACADABRA

**Offline, single-file text cipher. Paste text → get gibberish → send it anywhere.**
*Quantum-resistant. No accounts, no servers, no network requests — ever.*

[English](#english) · [Русский](#русский)

![offline](https://img.shields.io/badge/OFFLINE-100%25-3dff8c?style=for-the-badge&labelColor=050607)
![single file](https://img.shields.io/badge/SINGLE_FILE-~400_KB-3dff8c?style=for-the-badge&labelColor=050607)
![cipher](https://img.shields.io/badge/AES--256--GCM_⊕_ChaCha20-cascade-3dff8c?style=for-the-badge&labelColor=050607)

![kdf](https://img.shields.io/badge/Argon2id-64_MiB-8fffc0?style=flat-square&labelColor=050607)
![pq](https://img.shields.io/badge/X--Wing-ML--KEM--768_+_X25519-8fffc0?style=flat-square&labelColor=050607)
![sig](https://img.shields.io/badge/Ed25519-sender_auth-8fffc0?style=flat-square&labelColor=050607)
![langs](https://img.shields.io/badge/UI-RU_·_EN_·_中文_·_ES-8fffc0?style=flat-square&labelColor=050607)
![license](https://img.shields.io/badge/license-MIT-8fffc0?style=flat-square&labelColor=050607)

<br>

### 🚀 [Открыть онлайн / Open the app](https://anic888.github.io/abracadabra/) &nbsp;·&nbsp; ⬇️ [Скачать файл / Download](https://github.com/Anic888/abracadabra/releases/latest/download/abracadabra.html)

*Онлайн и скачанный файл — одно и то же приложение: всё считается на вашем устройстве, в сеть ничего не уходит.*
*The online and downloaded versions are the same app: everything runs on your device, nothing touches the network.*

📱 *С телефона: откройте ссылку → «Добавить на экран „Домой“» — установится как приложение и дальше работает офлайн (PWA).*
📱 *On mobile: open the link → “Add to Home Screen” — it installs as an app and keeps working fully offline (PWA).*

<br>

<img src="screenshots/password-mode.png" alt="Abracadabra — password mode" width="820">

</div>

---

## English

### What is this?

You want to send a private note through a channel you don't fully trust — a paste service, a messenger, email. **Abracadabra** turns your text into an encrypted blob (`ABRA2.xK9f…`) right in your browser. The service in the middle sees only gibberish. The recipient opens the same file, enters the password (or their key), and reads the original.

The whole app is **one HTML file**. Download it, double-click it, done. It works with Wi-Fi off — there is literally no code in it that talks to the network. Send the file itself to your contact; it contains no secrets.

### Quick start

1. [**Open the app online**](https://anic888.github.io/abracadabra/) — or [**download `abracadabra.html`**](https://github.com/Anic888/abracadabra/releases/latest/download/abracadabra.html) and open it in any modern browser (works fully offline).
2. Paste your text, set a password — your own or the built-in generator (`[ RANDOM ]`, ~149 bits).
3. **Encrypt** → copy the `ABRA2.…` gibberish → send it through anything.
4. Your contact opens the same file, pastes the blob, enters the same password → **Decrypt**.
5. Share the password through a *different* channel (voice is best). Or skip shared passwords entirely — see **Keys mode**.
6. **Panic hygiene:** the source text auto-wipes after encryption (toggleable), a timer (5 s / 30 s / 1 m / 1 h) can wipe everything on countdown, and `[ × WIPE ALL ]` — or double-press <kbd>Esc</kbd> — instantly clears text, password, keys, result and the clipboard.

<div align="center">
<table>
<tr>
<td align="center" width="33%"><h3>🔌 Offline by design</h3>Zero network requests. Open the file in an editor and check — it's all there, readable.</td>
<td align="center" width="33%"><h3>🧅 Cascade cipher</h3>ChaCha20 inside, AES-256-GCM outside, independent keys via HKDF. Breaking it means breaking <i>both</i>.</td>
<td align="center" width="33%"><h3>⚛️ Quantum-aware</h3>No classical asymmetry to Shor. Grover vs AES-256 leaves 128 bits. Keys mode uses post-quantum ML-KEM-768.</td>
</tr>
<tr>
<td align="center"><h3>🔑 Two modes</h3><b>Password</b>: Argon2id (64 MiB) makes GPU cracking hit a memory wall. <b>Keys</b>: no shared secret at all.</td>
<td align="center"><h3>🕵️ Length hiding</h3>Ciphertext is padded to buckets — "yes" and a full paragraph look identical in size.</td>
<td align="center"><h3>🌍 4 languages</h3>Russian, English, 中文, Español — auto-detected. Ciphers are compatible across languages and versions.</td>
</tr>
</table>
</div>

### Keys mode — no shared password

Each side presses `[ GENERATE ]` **once**: you get a private key (`ABRAKPRV…`, keep it secret) and a public key (`ABRAKPUB…`, give it away freely). Exchange public keys once — from then on, nothing secret ever needs to travel.

- **Send:** your private + their public → only they can read it.
- **Receive:** your private → the app shows the **sender's fingerprint** (e.g. `SCRZ-WWB2-GKRE-DEDG`); paste the sender's public key and it says `✓ VERIFIED`. Compare fingerprints by voice once — a swapped key becomes obvious.
- Key exchange is **X-Wing** (ML-KEM-768 + X25519) — the same hybrid post-quantum approach as Signal's PQXDH: a quantum computer would have to defeat *both halves*. Sender authentication is an Ed25519 signature. Every message uses a fresh ephemeral encapsulation, so compromising the sender later doesn't unlock past intercepted messages.

<div align="center">
<img src="screenshots/keys-mode.png" alt="Keys mode" width="700">
&nbsp;
<img src="screenshots/mobile.png" alt="Mobile" width="180">
</div>

### Formats

| Format | Key derivation | Cipher | Extras |
|---|---|---|---|
| `ABRA2.` (current) | Argon2id · 64 MiB · t=3 (PBKDF2×1.2M fallback) | AES-256-GCM ⊕ ChaCha20 cascade | bucket padding, NFC-normalized passwords |
| `ABRAK.` (keys) | X-Wing = ML-KEM-768 + X25519 → HKDF | same cascade | Ed25519 sender signature, fingerprints |
| `ABRA1.` (legacy) | PBKDF2-SHA-256 · 600k | AES-256-GCM | still decrypts, no longer produced |

All formats stay readable in newer versions. UI language never affects compatibility.

### What it protects against — and what it doesn't

**Protects:** the transport channel (paste sites, messengers, email providers, network observers) reading your text; tampering (authenticated encryption — a modified blob is rejected, never silently corrupted); offline brute-force of decent passwords (Argon2id memory-hardness); "harvest now, decrypt later" quantum attacks in keys mode (hybrid PQ KEM).

**Does not protect:** a compromised device on either end (malware/keyloggers see everything before encryption); a weak guessable password; metadata (who sent what to whom, when, and roughly how much — padding only rounds the size); a tampered copy of the tool itself (get the file from a source you trust and compare checksums).

**Honest notes:** the Ed25519 signature is classical — sender *authenticity* is protected against today's attackers, while *confidentiality* is what carries the post-quantum guarantee. Password mode has no forward secrecy (one password unlocks all messages encrypted with it) — keys mode is the answer. This tool has **not** undergone an independent security audit.

### Verification

- ML-KEM-768/X-Wing implementation ([noble-post-quantum](https://github.com/paulmillr/noble-post-quantum)) is checked byte-for-byte against the official IETF/NIST test vectors (10/10).
- The embedded ChaCha20 was verified against OpenSSL's native implementation (33 randomized cases + RFC 8439 vector).
- 26 automated browser tests cover round-trips, tampering, wrong keys, impostor detection, legacy formats and cross-language compatibility.
- The file is self-auditable: open `index.html` in an editor. Application code is readable and commented; vendored crypto libraries are embedded minified with sources linked below.

---

## Русский

### Что это?

Нужно передать приватный текст через канал, которому вы не до конца доверяете — Privnote, мессенджер, почту. **Абракадабра** превращает текст в шифровку (`ABRA2.xK9f…`) прямо в браузере. Сервис посередине видит только мусор. Получатель открывает такой же файл, вводит пароль (или свой ключ) — и читает оригинал.

Всё приложение — **один HTML-файл**. Скачали, открыли двойным кликом — работает. Интернет не нужен вообще: в файле физически нет кода, который ходит в сеть. Сам файл можно свободно переслать собеседнику — секретов в нём нет.

### Быстрый старт

1. [**Откройте онлайн**](https://anic888.github.io/abracadabra/) — или [**скачайте `abracadabra.html`**](https://github.com/Anic888/abracadabra/releases/latest/download/abracadabra.html) и откройте в любом браузере (работает полностью офлайн).
2. Вставьте текст, задайте пароль — свой или из генератора (`[ СЛУЧАЙНЫЙ ]`, ~149 бит).
3. **Зашифровать** → скопируйте абракадабру `ABRA2.…` → отправляйте чем угодно.
4. Собеседник открывает такой же файл, вставляет шифровку, вводит тот же пароль → **Расшифровать**.
5. Пароль передавайте по *другому* каналу (лучше всего голосом). Либо вообще без общего пароля — режим **«Ключи»**.
6. **Экстренная гигиена:** исходник сам стирается после шифрования (отключаемо), таймер (5 с / 30 с / 1 м / 1 ч) стирает всё по отсчёту, а `[ × СТЕРЕТЬ ВСЁ ]` — или двойной <kbd>Esc</kbd> — мгновенно чистит текст, пароль, ключи, результат и буфер обмена.

### Режим «Ключи» — без общего пароля

Каждый **один раз** жмёт `[ СОЗДАТЬ ]`: приватный ключ (`ABRAKPRV…`) храните в секрете, публичный (`ABRAKPUB…`) отдаёте свободно. Обменялись публичными — и больше ничего секретного передавать не нужно.

- **Отправка:** ваш приватный + публичный собеседника → прочитает только он.
- **Приём:** ваш приватный → приложение показывает **отпечаток отправителя**; вставьте его публичный ключ — появится `✓ ПОДТВЕРЖДЁН`. Отпечатки один раз сверьте голосом — подмена ключа станет очевидной.
- Обмен ключами — **X-Wing** (ML-KEM-768 + X25519), тот же гибридный постквантовый подход, что в Signal PQXDH: квантовому компьютеру пришлось бы пробить *обе половины*. Подпись отправителя — Ed25519. Каждое сообщение шифруется свежей эфемерной инкапсуляцией: компрометация отправителя потом не раскрывает перехваченное раньше.

### От чего защищает — и от чего нет

**Защищает:** от чтения текста каналом передачи (сервисы заметок, мессенджеры, почта, наблюдатели сети); от подмены (аутентифицированное шифрование — изменённая шифровка отклоняется); от оффлайн-перебора нормальных паролей (Argon2id упирает перебор в память); от «перехватить сейчас — расшифровать потом» квантовых атак в режиме ключей.

**Не защищает:** от заражённого устройства с любой стороны; от слабого угадываемого пароля; от метаданных (кто, кому, когда и примерно сколько — паддинг лишь округляет размер); от подменённой копии самого инструмента (берите файл из доверенного источника, сверяйте хэш).

**Честно:** подпись Ed25519 — классическая: аутентичность защищена от сегодняшних атак, а постквантовая гарантия относится к конфиденциальности. В парольном режиме нет forward secrecy (один пароль открывает всё, что им зашифровано) — на это отвечает режим ключей. Независимого аудита безопасности **не было**.

### Проверки

ML-KEM/X-Wing сверен с официальными тест-векторами IETF/NIST (10/10). Встроенный ChaCha20 сверен с нативной реализацией OpenSSL (33 случайных кейса + вектор RFC 8439). 26 автотестов в реальном браузере. Файл самопроверяем — откройте `index.html` в редакторе.

---

## Third-party / Встроенные компоненты

Vendored (embedded into the single file) with gratitude:

| Component | Author | License |
|---|---|---|
| [noble-post-quantum](https://github.com/paulmillr/noble-post-quantum), [noble-curves](https://github.com/paulmillr/noble-curves), [noble-hashes](https://github.com/paulmillr/noble-hashes) | Paul Miller | MIT |
| [argon2-browser](https://github.com/antelle/argon2-browser) (WASM) | Antelle | MIT |
| [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono) (subset) | JetBrains | OFL-1.1 |
| [Tektur](https://fonts.google.com/specimen/Tektur) (subset) | Adam Ladd | OFL-1.1 |

See [THIRD_PARTY.md](THIRD_PARTY.md) for license texts. Application code: [MIT](LICENSE).

**Disclaimer:** provided as-is, without warranty of any kind. Cryptography follows well-known standards (RFC 8439, RFC 9106, FIPS 203, X-Wing draft), but no independent audit has been performed. Don't bet lives on it.

</div>
