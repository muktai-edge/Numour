FIGMA MAKE PROMPT (APPLY TO EXISTING FILE — NOT A NEW FILE)
GOAL: Fix navigation (wrong categories + unclear tabs) and update PDP pages with the correct product-page details from the PDFs. Do not redesign everything from scratch — update the existing file’s IA + components and replace placeholder content with the correct structure + copy.

========================================================
1) FIX GLOBAL NAVIGATION (MATCH NUMOUR.COM)
========================================================
UPDATE HEADER + MOBILE DRAWER to use these exact top-level items (in this order):
1) Home
2) Smart Jar Series
3) Smart Devices
4) Smart Skincare
5) Warranty Registration
6) Numour Nook
Right side: Search + Cart icons
Sticky header on scroll.

MEGA MENU / DROPDOWNS (DESKTOP) — update labels + link targets:
A) Smart Jar Series
- Damn Dewy
- Collagen Bombshell (Smart Jar)
B) Smart Devices
- G.O.A.T Smart GuaSha
- i-CONIC LED Eye Mask
- B.O.S.S Sonic Scrubber
- ARIA
- SPARK
C) Smart Skincare
- Brightening Dual Serum
- Anti Aging Dual Serum
- Anti Acne Dual Serum
- Collagen Bombshell (non-jar)
- Damn Dewy (non-jar)

MOBILE NAV DRAWER:
- Same sections as desktop.
- Each section expands/collapses to show the above items.
- Ensure tap targets >= 44px and selected state is obvious.

GLOBAL FOOTER:
Ensure policy/support links exist and are consistent across all pages:
About Us, Contact Us, Terms & Conditions, Privacy Policy, Shipping & Delivery, Cancellation Policy, Refund Policy + support email.

========================================================
2) MAKE TABS CLEAR (SITE-WIDE TAB SYSTEM UPGRADE)
========================================================
Create one shared component: “Tabs / Segmented Control”
Rules:
- Selected state must be unambiguous:
  - label weight increases
  - underline OR pill fill
  - active color uses primary blue
- Unselected states muted, but readable
- Tab content region must have a clear container boundary (padding + divider).
- Tab transition: crossfade + slight y-translate (120–180ms), no bounce.

APPLY THIS TAB COMPONENT TO:
- Homepage “All Products” tabs
- Collection filters (if tabbed)
- PDP in-page tabs (optional): Overview | Modes | How to use | Reviews | FAQ
- Device Modes (G.O.A.T, i-CONIC) MUST be segmented control, not random chips.

========================================================
3) UPDATE HOMEPAGE “ALL PRODUCTS” TABS (MATCH CATEGORIES)
========================================================
Replace the current 4 tabs with category-accurate ones:
- Bestsellers
- Smart Jar Series
- Smart Devices
- Smart Skincare

Each tab shows product cards accordingly (no pagination inside home).
Ensure product cards are fixed-height with pinned price + pinned CTA, so the grid stays aligned.

========================================================
4) UPDATE COLLECTION / PLP PAGES (IF PRESENT IN FILE)
========================================================
If your file includes PLPs, ensure they map to these collections:
- Smart Jar Series collection page
- Smart Devices collection page
- Smart Skincare collection page
Each PLP must have:
- H1 + short subhead
- Filter chips (Concern / Product type / Technology / Price)
- Sort dropdown
- Product grid (fixed-height cards)
No pagination (infinite scroll or load more).

========================================================
5) UPDATE 4 PDP PAGES WITH REAL PDF CONTENT (REPLACE PLACEHOLDERS)
========================================================
For each PDP below:
- Keep the Apple-style structure already in the file, but replace content blocks with the correct titles, pricing, offers, features, modes, reviews, stats, and FAQs from PDFs.
- Ensure sticky bottom bar on mobile (Add to cart + Buy now).
- Ensure “The What / The Why / The Wow”, “Fine Print”, “How to use”, “Reviews”, “Stats”, “FAQ” sections exist for each.

----------------------------------------
PDP A) DAMN DEWY (Smart Jar)
----------------------------------------
Update above-the-fold hero copy:
- Category line: “HYDRATION CREAM WITH BLUE LIGHT THERAPY”
- Name: “damn dewy”
- Key line: “INTENSE HYDRATION & BARRIER REPAIR”
- Description: pressed serum + Blue LED smart jar; locks moisture up to 72 hours (use the PDF phrasing).
Pricing + quantity:
- Show discounted INR 995 (strike INR 1,049) and Quantity: 30g (match PDF).
Offer / trust tiles (“The Fine Print You Will Love”):
- Extra ₹50 off (auto applied)
- Freebie worth ₹849 above ₹2,149
- Dermat Approved
- Sensitive Skin Approved
“How to use”:
- Must be visual (3-step storyboard) + optional timer (60–120s).
Reviews:
- Use the two review quotes shown (Aefa; Sachin Khanduja).
FAQ:
- Convert the PDF FAQ list into accordions.

----------------------------------------
PDP B) COLLAGEN BOMBSHELL JELLY SMART JAR
----------------------------------------
Hero copy:
- “FIRMING COLLAGEN JELLY WITH RED LIGHT THERAPY”
- “INDIA’S 1ST COLLAGEN JELLY WITH RED LED”
- Include “Korean-origin 300 Dalton collagen peptides” line from PDF.
Pricing + quantity:
- Discounted INR 995 (strike INR 1,049) and Quantity: 30g.
Offers:
- Freebie ₹849 above ₹2,149
- Freebie ₹1700 above ₹3,999
Trust:
- Dermat Approved
- Sensitive Skin Approved
“How to use”:
- Visual 3-step + timer (2–3 min).
Reviews:
- Use the two review quotes shown (Heena Harinkhede; Yashi Gaur).
FAQ:
- Use the Collagen FAQ list from PDF as accordions.

----------------------------------------
PDP C) G.O.A.T ELECTRIC GUASHA (Device)
----------------------------------------
Hero copy:
- “G.O.A.T. electric guasha”
- “INDIA’S 1ST HOT & COLD SMART GUA SHA”
- Use the “only workout your face needs” line.
Benefit chips (3):
- Lifts & Firms
- Soothes & Depuffs
- Defines Jawline
Pricing:
- INR 4,750 (strike INR 6,999).
Capabilities block (must be visual + structured):
- LED Light Therapy: Red/Blue/Purple
- EMS Technology
- Cryo 12°C
- Thermal 42°C
- 3 min Auto Shut
Offers + trust:
- Extra ₹200 off (auto applied)
- Freebie ₹849 above ₹2,149
- Dermat Approved
- One Year Warranty
Modes section (MUST be segmented tabs + content panel):
- Anti Aging Mode: Red LED + Thermal Massage
- Clearing Mode: Blue LED + Cold Massage
Add a 3-minute session timer module in “Application Studio”.
Reviews:
- Tanya Sharma + Malvika quotes from PDF.
Founder Cut:
- Add founder editorial block (from PDF).
FAQ:
- Use the GOAT FAQ list as accordions.

----------------------------------------
PDP D) i-CONIC LED EYE MASK (Device)
----------------------------------------
Hero copy:
- “i-CONIC led eye mask”
- “INDIA’S 1ST FDA CLEARED EYE MASK”
- “72 Red LEDs + multi-frequency sonic massage”
- “Just 3 minutes a day”
Pricing:
- INR 4,700 (strike INR 6,499).
Trust:
- One Year Warranty
Offers:
- Extra ₹200 off (auto applied)
- Freebie ₹849 above ₹2,149
- Dermat Approved
Modes (segmented control + panels):
- LED Therapy Mode (Red light; targets crow’s feet/fine lines/sagging)
- Massage Mode (Sonic; circulation/puffiness/relaxation)
Add the expanded technology panels:
- “most validated wavelength” style explanation (keep credible, use PDF wording)
- multi-frequency massage explanation
- ergonomic/FDA-cleared design story panel
Reviews:
- Use the two review quotes from PDF.
Founder Cut:
- Add founder block from PDF.
Stats row:
- Keep the structure shown in PDF (label as reported outcomes).
FAQ:
- Use i-CONIC FAQ list as accordions.

========================================================
6) APPLY FIXES TO PRODUCT CARDS (SCALABILITY)
========================================================
Update the product card component used in homepage + PLP grids:
- Fixed height (same across all cards)
- Title clamped to 2 lines
- Only 2 tags visible + “+N”
- Price block pinned to bottom baseline
- CTA pinned to bottom fixed height
- Discount pill small and aligned in the price row (no floating discount bubble)

========================================================
7) PROTOTYPE CONNECTIONS (SO IT FEELS REAL)
========================================================
Wire these interactions:
- Header nav links → correct pages (Smart Jar Series, Smart Devices, Smart Skincare, Warranty Registration, Numour Nook)
- Home product tabs switching
- Device mode segmented tabs switching (GOAT, i-CONIC)
- Video thumbnails open modal
- Sticky PDP bottom bar visible and clickable
- Hotspots on visual catalog open mini product card then link to PDP

DELIVERABLE:
Apply these changes on the existing file: correct navigation categories + clear tab system + updated PDP copy/blocks using the PDFs + fixed scalable product cards.
END.