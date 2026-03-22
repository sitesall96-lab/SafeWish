/**
 * SafeWish – Wishlist Dox-Blocker
 * Content Script — runs on Amazon product pages.
 *
 * Detects whether a product is sold/shipped by a third-party seller
 * and warns the user before they add it to a wishlist.
 *
 * Zero APIs. Zero tracking. Zero external dependencies.
 * Everything runs 100% client-side in your browser.
 */

(function SafeWish() {
  "use strict";

  // ── Configuration ──────────────────────────────────────────────────
  const SCAN_INTERVAL_MS = 1500; // re-scan interval for SPA navigations
  const BADGE_ID = "safewish-badge";
  const WARNING_ID = "safewish-warning";

  // ── Merchant Detection ─────────────────────────────────────────────

  /**
   * Returns { soldBy, shipsFrom, isThirdParty }
   * Checks multiple selectors because Amazon A/B tests layouts constantly.
   */
  function detectMerchant() {
    let soldBy = "";
    let shipsFrom = "";

    // --- Strategy 1: The tabular merchant info block (#merchant-info) ---
    const merchantInfo = document.getElementById("merchant-info");
    if (merchantInfo) {
      const text = merchantInfo.innerText || "";
      const soldMatch = text.match(/(?:Sold by|Vendu par|Verkauf durch|Vendido por)[:\s]*([^\n.]+)/i);
      const shipMatch = text.match(/(?:Ships from|Expédié par|Versand durch|Enviado desde)[:\s]*([^\n.]+)/i);
      if (soldMatch) soldBy = soldMatch[1].trim();
      if (shipMatch) shipsFrom = shipMatch[1].trim();
    }

    // --- Strategy 2: The "Ships from / Sold by" table rows in the buybox ---
    if (!soldBy) {
      const rows = document.querySelectorAll(
        "#tabular-buybox .tabular-buybox-text, " +
        "#tabular-buybox-container .tabular-buybox-text, " +
        ".tabular-buybox-container .tabular-buybox-text"
      );
      for (let i = 0; i < rows.length; i++) {
        const label = rows[i]?.innerText?.trim().toLowerCase() || "";
        const value = rows[i + 1]?.innerText?.trim() || "";
        if (label.includes("sold by") || label.includes("vendu par") || label.includes("verkauf")) {
          soldBy = value;
        }
        if (label.includes("ships from") || label.includes("expédié") || label.includes("versand")) {
          shipsFrom = value;
        }
      }
    }

    // --- Strategy 3: Spans with specific data attributes ---
    if (!soldBy) {
      const sellerSpan = document.querySelector(
        "#sellerProfileTriggerId, " +
        "#seller-name a, " +
        'a[id*="sellerProfile"], ' +
        '.offer-display-feature-text a'
      );
      if (sellerSpan) {
        soldBy = sellerSpan.innerText.trim();
      }
    }

    // --- Strategy 4: Broader text search as a fallback ---
    if (!soldBy) {
      const buybox = document.getElementById("buyBoxAccordion") ||
                     document.getElementById("newBuyBoxPrice")?.closest("[class*='buybox']") ||
                     document.getElementById("desktop_buybox");
      if (buybox) {
        const text = buybox.innerText || "";
        const m = text.match(/(?:Sold by|Ships from)[:\s]*([^\n]+)/i);
        if (m) soldBy = m[1].trim();
      }
    }

    // Normalize "Amazon.com" variants
    const amazonPattern = /^Amazon(\.com|\.co\.uk|\.ca|\.de|\.fr|\.it|\.es|\.co\.jp|\.com\.au|\.in|\.com\.br|\.com\.mx)?$/i;
    const isSoldByAmazon = amazonPattern.test(soldBy);
    const isShippedByAmazon = !shipsFrom || amazonPattern.test(shipsFrom);

    return {
      soldBy: soldBy || "Unknown",
      shipsFrom: shipsFrom || "Unknown",
      isThirdParty: !isSoldByAmazon,
    };
  }

  // ── UI Injection ───────────────────────────────────────────────────

  function removeExistingWarnings() {
    document.querySelectorAll(`#${WARNING_ID}, #${BADGE_ID}`).forEach((el) => el.remove());
    // Remove any injected inline styles on buttons
    document.querySelectorAll("[data-safewish-flagged]").forEach((btn) => {
      btn.style.removeProperty("outline");
      btn.style.removeProperty("outline-offset");
      btn.style.removeProperty("box-shadow");
      btn.style.removeProperty("position");
      btn.removeAttribute("data-safewish-flagged");
    });
  }

  /**
   * Find the "Add to List" / "Add to Wish List" button(s).
   */
  function findWishlistButtons() {
    const selectors = [
      "#add-to-wishlist-button-submit",
      "#wishListMainButton",
      'input[name="submit.add-to-registry.wishlist"]',
      'span[data-action="a]ddToList"] button',
      'a[id*="wishlist"]',
      '#add-to-wishlist-button',
      // Newer layouts
      '[data-csa-c-action="addToList"]',
      '[data-action="add-to-list-button"] button',
      '#addToWishlist button',
    ];
    const buttons = [];
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        if (!buttons.includes(el)) buttons.push(el);
      });
    });

    // Fallback: any element whose accessible text contains "Add to List"
    if (buttons.length === 0) {
      document.querySelectorAll('span, button, input[type="submit"], a').forEach((el) => {
        const text = (el.innerText || el.value || el.getAttribute("aria-label") || "").toLowerCase();
        if (text.includes("add to list") || text.includes("add to wish")) {
          if (!buttons.includes(el)) buttons.push(el);
        }
      });
    }

    return buttons;
  }

  function injectWarning(merchant) {
    // 1. Flag the wishlist button(s)
    const buttons = findWishlistButtons();
    buttons.forEach((btn) => {
      btn.setAttribute("data-safewish-flagged", "true");
      btn.style.outline = "3px solid #EF4444";
      btn.style.outlineOffset = "2px";
      btn.style.boxShadow = "0 0 12px 2px rgba(239, 68, 68, 0.45)";
      btn.style.position = "relative";
    });

    // 2. Create inline warning banner near the button
    const warningEl = document.createElement("div");
    warningEl.id = WARNING_ID;
    warningEl.setAttribute("role", "alert");
    warningEl.innerHTML = `
      <div style="
        display: flex;
        align-items: flex-start;
        gap: 8px;
        margin: 10px 0;
        padding: 12px 14px;
        border: 2px solid #EF4444;
        border-radius: 8px;
        background: #FEF2F2;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 13px;
        line-height: 1.45;
        color: #991B1B;
        max-width: 340px;
        box-shadow: 0 2px 8px rgba(239,68,68,0.15);
      ">
        <span style="font-size:20px;flex-shrink:0;margin-top:1px;">🛡️</span>
        <div>
          <strong style="display:block;font-size:13px;margin-bottom:3px;">⚠️ Privacy Risk — SafeWish</strong>
          <span>This item is <strong>sold by ${escapeHtml(merchant.soldBy)}</strong> (a 3rd-party seller).
          Adding it to your wishlist may <strong>expose your shipping address</strong> to this seller if they fulfill the order.</span>
        </div>
      </div>
    `;

    // Insert after the first wishlist button we find, or at the top of the buybox
    if (buttons.length > 0) {
      const target = buttons[0].closest("div, span, form") || buttons[0].parentElement;
      if (target) {
        target.insertAdjacentElement("afterend", warningEl);
      }
    } else {
      // Fallback: prepend to right-col buybox
      const buybox =
        document.getElementById("rightCol") ||
        document.getElementById("buyBoxAccordion") ||
        document.getElementById("desktop_buybox");
      if (buybox) {
        buybox.prepend(warningEl);
      }
    }

    // 3. Add a small sticky badge in the corner
    const badge = document.createElement("div");
    badge.id = BADGE_ID;
    badge.innerHTML = `
      <div style="
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999999;
        background: #EF4444;
        color: #fff;
        padding: 10px 16px;
        border-radius: 10px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 13px;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(0,0,0,0.25);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: opacity 0.3s;
      " title="Click to dismiss">
        🛡️ SafeWish: 3rd-Party Seller Detected
      </div>
    `;
    document.body.appendChild(badge);
    badge.querySelector("div").addEventListener("click", () => {
      badge.style.opacity = "0";
      setTimeout(() => badge.remove(), 300);
    });
  }

  function injectSafeBadge() {
    // Show a green "safe" badge
    if (document.getElementById(BADGE_ID)) return;
    const badge = document.createElement("div");
    badge.id = BADGE_ID;
    badge.innerHTML = `
      <div style="
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999999;
        background: #059669;
        color: #fff;
        padding: 10px 16px;
        border-radius: 10px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 13px;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: opacity 0.3s;
      " title="Click to dismiss">
        ✅ SafeWish: Sold by Amazon — You're safe
      </div>
    `;
    document.body.appendChild(badge);
    badge.querySelector("div").addEventListener("click", () => {
      badge.style.opacity = "0";
      setTimeout(() => badge.remove(), 300);
    });
  }

  // ── Utilities ──────────────────────────────────────────────────────

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function isProductPage() {
    return /\/dp\/|\/gp\/product\/|\/product\//i.test(window.location.pathname);
  }

  // ── Main Loop ──────────────────────────────────────────────────────

  let lastUrl = "";

  function scan() {
    if (!isProductPage()) return;

    // Prevent duplicate processing on the same URL
    const currentUrl = window.location.href;
    if (currentUrl === lastUrl && document.getElementById(WARNING_ID)) return;
    lastUrl = currentUrl;

    removeExistingWarnings();

    const merchant = detectMerchant();

    if (merchant.isThirdParty) {
      injectWarning(merchant);
      console.log("[SafeWish] ⚠️  Third-party seller detected:", merchant.soldBy);
    } else {
      injectSafeBadge();
      console.log("[SafeWish] ✅ Sold by Amazon. You're safe.");
    }
  }

  // Run on page load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scan);
  } else {
    scan();
  }

  // Re-scan periodically (Amazon is a heavy SPA)
  setInterval(scan, SCAN_INTERVAL_MS);

  // Also watch for URL changes via History API
  const origPushState = history.pushState;
  history.pushState = function () {
    origPushState.apply(this, arguments);
    setTimeout(scan, 500);
  };
  const origReplaceState = history.replaceState;
  history.replaceState = function () {
    origReplaceState.apply(this, arguments);
    setTimeout(scan, 500);
  };
  window.addEventListener("popstate", () => setTimeout(scan, 500));
})();
