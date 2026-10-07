# ARVIGA quality improvements

## Delivered changes

- Refined heading scale, weights, spacing, mobile typography and repeated section treatments across all 96 pages.
- Hosted the open-license DM Sans and Manrope variable fonts locally in verified WOFF2 format. Total font payload: 61,768 bytes. Removed the external Google Fonts stylesheet request and updated the privacy text accordingly.
- Added 640px and 960px responsive versions for 85 images, preserving image content. The 74 catalogue sheets total 10,954,994 bytes at their original size versus 2,594,638 bytes at 640px, a 76.3% reduction for that rendition. Actual transfer savings depend on viewport, device pixel ratio and selected image size.
- Kept the first homepage image immediately available; the next five slideshow images load progressively. A slide is decoded before display and the next slide is prepared in advance.
- Added distinct application guidance, decisions to resolve, deliverables to agree and two FAQs to each of the nine engineering service pages. No unconfirmed certifications, equipment ownership or performance specifications were added.
- Replaced generic repeated product-section headings with the relevant product name.
- Added ItemList structured data to furniture index and category pages. Existing unique metadata, canonical URLs, Product/Service data and sitemap remain. The 404 page stays noindex even after a future public launch.
- Increased interactive target sizes and clarified focus styling while retaining reduced-motion support.

## Verification

- All 96 generated pages pass route, local asset, unique metadata, canonical and JSON-LD validation.
- All 74 product pages retain four gallery views and example-price labels.
- Carousel regression checks pass for a 3000ms interval, next/previous, wraparound, pause/play, hidden-tab suspension and manual navigation with reduced motion.
- Responsive variants exist and both downloaded font files have valid WOFF2 signatures.
- Browser checks found no horizontal overflow at 320px across home, catalogue, category, product, services, service detail, About, Contact and Privacy templates.
- The service FAQ expanded correctly in the browser; the progressively loaded slideshow displayed decoded images.
- Core solid-background text contrast ratios: body 15.78:1, secondary text 6.23:1, primary button 10.02:1, accent button 13.03:1. These checks are not a complete WCAG accessibility audit and do not measure every image-overlay state.

## Rating and launch limits

No 9/10 or 10/10 score is certified by these changes. Visual design remains subjective. Google PageSpeed API returned HTTP 429 with a quota-exceeded message; no Lighthouse score or Core Web Vitals result was available from that request. The external audit browser was unreliable and did not produce a completed report.

At the owner's request, business contact details, real prices, confirmed product specifications and final photographs remain for later. Enquiries still produce a downloadable brief until a real channel is configured. Indexing remains disabled for this preview. Search rankings and real-world conversion cannot be scored as launch-ready while those items are pending.

Run checks with `node check.mjs --complete`, `node check-carousel.mjs` and `node check-quality.mjs`. Image optimisation is reproducible with `optimize-images.py`; font provenance and licenses are retained with the font assets.
