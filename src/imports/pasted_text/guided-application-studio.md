APPLY TO EXISTING FILE (bobbin-pug-24461543.figma.site)
GOAL: Upgrade “Application Studio” on PDP to feel premium, realistic, and truly usable.
Key change: use an actual female face PHOTO (realistic) with clear, safe tap zones + guided steps + timer.
This must feel like Apple/Dyson-level UX: simple, precise, and confidence-building.

========================================================
1) REPLACE CURRENT APPLICATION STUDIO WITH “GUIDED APPLICATION STUDIO v2”
========================================================
Create a reusable PDP component with variants:
A) Full Face (Smart Jars / general skincare)
B) Eye Zone (i-CONIC)
C) Jawline/Neck (G.O.A.T)

MOBILE-FIRST LAYOUT (390):
- Section header:
  - Overline: “APPLICATION STUDIO”
  - Title: “Guided session”
  - Subhead (1 line): “Tap a zone. Follow the protocol. Start timer.”
- Main module is a 2-step experience (simple):
  Step 1: Select area (face photo + zones)
  Step 2: Run session (steps + timer + technique)

========================================================
2) FACE PHOTO REQUIREMENTS (MUST LOOK REAL)
========================================================
- Use a high-quality, realistic female face photo (front-facing) with neutral expression.
- Lighting: clean studio, even tones, premium.
- Crop: from forehead to upper neck, centered.
- Add a subtle overlay layer (very light) so zones and arrows read clearly.
- Do NOT use an illustration; must be a real photo.

If exact assets are not available, insert a realistic photo placeholder and label it:
“FACE_PHOTO_PLACEHOLDER (replace with licensed studio face image)”.

========================================================
3) TAP ZONES (CLEAR + NOT CLUTTERED)
========================================================
Zones must be large and obvious, but not ugly:
- Use 5–7 zones max per product:
  Full Face variant:
    - Forehead
    - Cheeks (L/R as one combined zone)
    - Under-eye
    - Jawline
    - Neck
  Eye variant (i-CONIC):
    - Under-eye
    - Crow’s feet
    - Brow bone (optional)
  Jawline/Neck variant (G.O.A.T):
    - Jawline
    - Cheeks
    - Neck

ZONE UI:
- Invisible hit area >= 44px.
- Visible zone outline only appears on hover/tap:
  - hairline outline + soft tint fill (5–8% opacity)
- Selected zone shows:
  - subtle outline + a small numbered marker (01)
  - a directional arrow overlay (thin line) showing glide direction

INTERACTION:
- Tap a zone → a bottom sheet opens with:
  - Zone title
  - Time recommendation
  - Pressure indicator (Gentle / Medium using 1–3 dots)
  - Stroke direction diagram (mini)
  - “Start session” CTA

========================================================
4) SESSION PLAYER (TIMER + MODE + STEPS) — BETTER UX
========================================================
When user taps “Start session”:
- Show a compact session player card (glass/light panel) with:
  - Timer ring (thin, minimal) + Start/Pause
  - Remaining time in tabular numerals (e.g., 02:20)
  - Mode (if applicable):
    - GOAT: Lift (Warm) / Depuff (Cold) / Clear (Blue LED)
    - i-CONIC: LED Therapy / Massage / Combo
    - Jars: Daily / Deep Boost (if you have modes)
- Provide haptics cue label (visual only): “Gentle pressure”.

TIME PRESETS:
- i-CONIC: 3:00 (default)
- G.O.A.T: 3:00 (auto shut)
- Smart Jars: 60–120s (choose preset, e.g., 01:30)
Allow user to change time via small presets (1:00 / 1:30 / 3:00) if relevant.

========================================================
5) TECHNIQUE CARDS (VISUAL, NOT TEXT)
========================================================
Under the session player show “Technique” as 3 image-led cards:
Card 1: Apply (photo/texture)
Card 2: Glide (arrow diagram)
Card 3: Finish (SPF/next step)
Each card:
- icon + 1 line instruction
- time chip if relevant
- do/don’t mini icons (optional)

Keep copy short. No paragraphs.

========================================================
6) “SAFE ZONE” + “AVOID” MICROGUIDE (TRUST)
========================================================
Add a small “Safe usage” strip below:
- Safe: gentle pressure, upward strokes
- Avoid: broken skin, pressing hard (keep generic, non-medical)

Make it look like a premium instrument safety label (icons + 2–3 words).

========================================================
7) VISUAL POLISH REQUIREMENTS
========================================================
- This module must feel premium and calm:
  - large photo
  - minimal overlays
  - precise spacing
  - clear hierarchy
- Use consistent figure captions:
  - “Fig. A — Treatment zones”
  - “Fig. B — Session protocol”
- Add subtle animation:
  - zone highlight fades in (160ms)
  - bottom sheet slides up (220ms)
  - timer ring progress animates smoothly (60fps feel)
No bounce.

========================================================
8) APPLY TO PDPs
========================================================
- Replace current Application Studio on all 4 PDPs with this v2 module.
- Use the correct variant per product:
  - Damn Dewy / Collagen: Full Face
  - i-CONIC: Eye variant
  - G.O.A.T: Jawline/Neck variant

========================================================
9) PROTOTYPE WIRES (REQUIRED)
========================================================
Wire these flows:
- Tap zone → opens bottom sheet
- Tap Start session → timer starts
- Pause/resume
- Switch mode (device products)
- Close sheet

DELIVERABLE:
Update Application Studio to be photo-real, zone-based, and genuinely usable with a session player UX that feels engineered and premium.
END.