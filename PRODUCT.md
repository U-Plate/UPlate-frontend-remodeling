# Product

## Register

brand

## Users

University students managing dining-hall meals on a plan they didn't choose the menu for — starting at Purdue, expanding to other campuses. They're mobile-first, checking the app on the way to a dining hall or mid-line, trying to hit a macro/fitness goal or work around a dietary restriction without manually logging every meal. The job: know what to eat *today*, at *this* dining hall, without friction.

## Product Purpose

UPlate is a free meal-planning app built specifically for university students. It pulls real-time menu data directly from campus dining halls, tracks macros, ranks dining halls, filters by dietary restriction, and connects students with friends through macro competitions and food ratings/photos. Success looks like a student opening the app before every dining hall visit because it removes the guesswork, not because they were told to.

**AI is a premium (Pro) feature, not the core pitch.** AI-powered meal recommendations exist as an upsell, but the free product must stand entirely on its own: ease of macro tracking, dining hall/food ranking, dietary-fit filtering, real menus, food photos, and social features (friends, macro competitions). Marketing copy should lead with those, and only mention AI when specifically describing the Pro tier — never as the headline hook or the thing that makes UPlate "different."

## Brand Personality

Warm, food-forward, campus-life. Three words: approachable, appetizing, personal. UPlate is a daily companion, not a clinical health tool and not enterprise software — it should feel like a smart friend who already knows the dining hall menu, not a dashboard. Confident but casual; the existing copy ("meal prep buddy") has the right voice, the visuals need to catch up to it.

## Anti-references

- The generic dark-mode + glassmorphism + violet/purple-gradient "AI startup" look — this is what the current landing page does today, and it's explicitly being replaced.
- Gradient text as decoration.
- Identical icon+heading+text card grids repeated section after section.
- Overly corporate, enterprise-SaaS seriousness — nothing that reads as a B2B tool rather than a student product.
- Cluttered, busy layouts with too many competing elements on screen at once.

## Design Principles

1. **Light over dark, warm over cold.** The new brand direction (confirmed via app UI mockups) is a soft, light-blue-and-white palette with dark navy text/accents — the opposite of the current black/glass/violet treatment. Carry that shift to the landing page.
2. **One confident accent, not a decorative gradient.** A single muted blue plus a dark navy anchor replaces the multi-stop violet-to-pink gradient used throughout the current site.
3. **Food and campus life should be visible, not abstracted into generic tech visuals.** Real app screens, real dining hall context — not stock Bootstrap icons standing in for a lifestyle product.
4. **Keep the typing intro.** The typewriter splash screen before the "enter" moment is a genuine strength and a signature beat of the experience — preserve and evolve it, don't cut it for the redesign.
5. **Every section should look different from its neighbor.** The current page repeats the same 2×2 icon-card grid twice in a row; the redesign should vary rhythm and layout between sections instead of reusing one template.

## Accessibility & Inclusion

WCAG AA baseline. The current design leans on scroll-jacked GSAP animations (550vh pinned scroll sequence) — the redesign must respect `prefers-reduced-motion` with a non-scroll-jacked fallback. Text contrast needs explicit checking against the new light-blue backgrounds (#DCEDFF is very pale; body text and secondary copy need a dark-enough neutral to clear 4.5:1).
