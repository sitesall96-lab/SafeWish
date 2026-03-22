# 🛡️ SafeWish — Wishlist Dox-Blocker

> **Your Amazon wishlist is leaking your home address to strangers. This extension stops it.**

---

## 🚨 The Problem

Amazon recently changed its wishlist fulfillment policy. Previously, wishlist orders were **exclusively fulfilled by Amazon**, keeping your shipping address confidential. Now, **third-party sellers can fulfill wishlist orders** — and when they do, they receive your **full name and shipping address**.

This means:
- 🏠 **Any third-party seller** who fulfills a wishlist gift gets your home address
- 👤 Random marketplace vendors now have access to your **private location data**
- 📦 You have **no control** over which seller fulfills an order from your wishlist
- 🎯 This is especially dangerous for **streamers, content creators, domestic abuse survivors**, and anyone who keeps their address private for safety reasons

**Amazon did not make this change obvious.** There is no per-item warning. There is no opt-out.

---

## ✅ The Solution

**SafeWish** is a lightweight Chrome extension that:

1. **Scans every Amazon product page** you visit
2. **Detects the seller** — is it Amazon, or a third-party marketplace seller?
3. **Visually flags the "Add to List" button** with a bright red warning border
4. **Shows a clear alert** explaining that adding this item could expose your address
5. **Shows a green "safe" badge** when the item is sold directly by Amazon

### What it does NOT do:
- ❌ No data collection
- ❌ No API calls
- ❌ No analytics or tracking
- ❌ No external dependencies
- ❌ No network requests of any kind

**Everything runs 100% in your browser. Your data never leaves your machine.**

---

## 📸 How It Works

When you visit a product sold by a **third-party seller**, SafeWish:

```
┌──────────────────────────────────────────────┐
│  🛡️ ⚠️ Privacy Risk — SafeWish              │
│                                              │
│  This item is sold by "SomeRandomSeller"     │
│  (a 3rd-party seller). Adding it to your     │
│  wishlist may expose your shipping address   │
│  to this seller if they fulfill the order.   │
└──────────────────────────────────────────────┘
```

The "Add to List" button gets a **red glow outline**, and a floating badge appears in the corner.

When the item is **sold by Amazon**, you'll see a green ✅ badge confirming you're safe.

---

## 🔧 Installation (Chrome / Edge / Brave)

Since this extension isn't on the Chrome Web Store (yet), you can install it manually in under 60 seconds:

### Step 1: Download the Extension

```bash
git clone https://github.com/sitesall96-lab/SafeWish.git
```

Or click the green **"Code"** button above → **"Download ZIP"** → Unzip the folder.

### Step 2: Open Chrome Extensions Page

1. Open Chrome (or Edge, or Brave)
2. Navigate to `chrome://extensions/`
3. Toggle **"Developer mode"** ON (top-right corner)

### Step 3: Load the Extension

1. Click **"Load unpacked"**
2. Select the folder containing `manifest.json` (the root of this repo)
3. Done! You should see the 🛡️ SafeWish icon in your toolbar

### Step 4: Visit Amazon

Go to any Amazon product page. SafeWish will automatically scan the seller info and warn you if needed.

---

## 📁 Project Structure

```
safewish/
├── manifest.json      # Extension configuration (Manifest V3)
├── content.js         # Core logic — DOM scanning & warning injection
├── popup.html         # Toolbar popup UI
├── popup.css          # Popup styling
├── icons/
│   ├── icon16.png     # 16×16 toolbar icon
│   ├── icon48.png     # 48×48 icon
│   └── icon128.png    # 128×128 icon
└── README.md          # You're reading it
```

---

## 🌍 Supported Amazon Domains

SafeWish works on **all major Amazon country domains**:

| Domain | Country |
|--------|---------|
| amazon.com | 🇺🇸 United States |
| amazon.co.uk | 🇬🇧 United Kingdom |
| amazon.ca | 🇨🇦 Canada |
| amazon.de | 🇩🇪 Germany |
| amazon.fr | 🇫🇷 France |
| amazon.it | 🇮🇹 Italy |
| amazon.es | 🇪🇸 Spain |
| amazon.co.jp | 🇯🇵 Japan |
| amazon.com.au | 🇦🇺 Australia |
| amazon.in | 🇮🇳 India |
| amazon.com.br | 🇧🇷 Brazil |
| amazon.com.mx | 🇲🇽 Mexico |
| amazon.nl | 🇳🇱 Netherlands |
| amazon.sg | 🇸🇬 Singapore |
| amazon.se | 🇸🇪 Sweden |
| amazon.pl | 🇵🇱 Poland |

---

## 🤝 Contributing

PRs are welcome! Some ideas:

- [ ] Add a toggle to enable/disable warnings
- [ ] Add support for Amazon Fresh / Whole Foods items
- [ ] Improve seller detection for more edge-case layouts
- [ ] Create Firefox-compatible version (Manifest V2)
- [ ] Add localized warning text for non-English Amazon sites

---

## 📄 License

MIT License. Free as in freedom. Use it, fork it, share it.

---

## 💬 FAQ

**Q: Does this block me from adding items?**
A: No! It only warns you. You can still add any item you want.

**Q: Does this extension collect any data?**
A: Absolutely not. Zero. Nada. Check the source code — it's tiny and fully auditable.

**Q: Why isn't this on the Chrome Web Store?**
A: It can be! This is ready for submission. For now, "Load unpacked" is the fastest way to protect yourself.

**Q: Does this work on Firefox?**
A: Not yet — Firefox requires Manifest V2. A port is planned.

---

<p align="center">
  <strong>Don't let your wishlist become a dox list.</strong><br/>
  <em>Install SafeWish today. 🛡️</em>
</p>
