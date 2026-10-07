# ARVIGA website and draft review

Reviewed 16 September 2026 against the live Cloudflare preview, website source and `ARVIGA_Website_Content_Draft (1).docx`.

## Content recommendation

Combine the draft's warmer furniture brand story with the site's broader catalogue and engineering structure. Neither version is complete on its own. The draft should inform a rewrite, not replace the current site word for word. Its proposed carousels, blogs and reviews are suggestions in the document, not instructions to publish empty sections.

| Area | Assessment | Recommendation |
| --- | --- | --- |
| Brand story | Draft is stronger: own-brand identity, design philosophy, materials and construction detail. Current copy feels generic in places. | Adapt the draft's opening and “Designed by us. Made with care. Created for you.” message into a shorter About page. |
| Business coverage | Current site includes nine engineering services, institutional furniture and six furniture categories. Draft covers furniture only and omits institutional as a category. | Keep the current information architecture. |
| Product breadth | Draft lists a small starter range with useful modular, foldable and flat-pack qualifiers. Current catalogue has 74 entries. | Keep full catalogue; add these attributes to the relevant items only after confirming actual construction. |
| Product detail | Current site has four concept views and illustrative prices per item. Neither source gives confirmed dimensions, materials, load limits, lead times or selling prices. | Supply real product-specific specifications and commercial terms. |
| Manufacturing story | Draft explains design through finishing and inspection more clearly. | Use a concise process section, supported by real photographs and an accurate account of in-house versus partner processes. |
| Social proof | Draft proposes reviews and reels but supplies none. | Add genuine customer stories and workshop footage when available. Avoid empty carousels or invented testimonials. |
| Contacts | Draft emails, phone, address and social links are placeholders. Hours are unconfirmed. | Confirm contact channels before connecting live enquiries. |
| SEO usefulness | Current site has dedicated product/service pages. Draft is mainly broad brand copy. | Add specific, helpful application, material and process information; repeating slogans adds little value. |

Claims to confirm before publication: all products designed/manufactured in-house, ownership of production equipment, checks on every finished product, performance/durability statements and quoted opening hours. These statements may be true, but the draft alone does not verify them.

Suggested combined introduction for review:

> ARVIGA designs and manufactures furniture for homes, workplaces, institutions and commercial spaces. Alongside our furniture collections, we provide mechanical design, fabrication, machining, finishing and assembly services. Tell us about your space or technical requirement, and we will help define the product, materials and manufacturing approach.

## Design priorities

The original service pages were entirely text-based, with the same large heading/capability-panel composition repeated nine times. The homepage gives furniture much stronger visual representation than engineering. Product imagery creates a useful starting point but cannot demonstrate completed work or workshop capability.

This update replaces the chair mark with the previous Signature Cut ARVIGA-only wordmark, gives every service its own labelled process concept image, adds a photographic service directory and related-service images, and separates each service's introduction from its capability list.

Recommended next improvements, in order:

1. Give furniture and engineering equally visible image-led routes near the top of the homepage. Keep one clear primary action for each audience.
2. Replace general claims with evidence: actual workshop images, completed furniture, a short project story and named materials/processes that ARVIGA really offers.
3. Refine product details around dimensions, material options, construction, installation and delivery. These details help customers decide far more than extra decorative sections.
4. Add a small number of useful guides when ready: choosing flat-pack furniture, preparing drawings for fabrication, or comparing finishes. Each should answer a real buyer question.
5. Connect genuine contact channels and publish delivery, warranty, returns and privacy terms appropriate to the business.

## Motion

Keep gentle image zoom on hover, short section reveals, link-arrow movement and a subtle image entrance. The service update uses these lightweight CSS effects and respects reduced-motion preferences. A later manufacturing process section could progressively reveal design, fabrication, finishing and inspection as the visitor scrolls. Real workshop video should be click-to-play with a poster image, rather than a heavy autoplay background. Avoid scroll hijacking, cursor effects and continuous rotating banners that distract from reading or product selection.

## SEO status

The site has generated HTML for 96 pages: 74 products, nine service details, six furniture categories, home, catalogue, services overview, About, Contact, Privacy and a 404 page. It has unique titles and descriptions, a primary heading per page, canonical URLs, descriptive routes, internal links, image descriptions, a 95-URL sitemap and structured data for products, services and breadcrumbs where applicable.

The preview is **not ready for Google indexing**. Business configuration has `publicLaunch: false`, pages contain `noindex,nofollow`, and robots.txt disallows crawling. This is deliberate preview configuration while prices, imagery and business contacts are provisional; it is not privacy protection. The URL remains publicly accessible.

Before a search launch, confirm real business information and product content, choose the final domain, update canonical URLs, enable crawling/indexing, and verify the property and sitemap in Google Search Console. Do not add selling-price Offer data or review ratings until they are genuine. Validate structured data and measure performance/Core Web Vitals after the launch content is in place; no Lighthouse or ranking score has been claimed here.

Google's guidance prioritises useful, reliable content and clear site organisation. Neither this draft nor technical SEO can guarantee a first-page ranking: https://developers.google.com/search/docs/fundamentals/seo-starter-guide

Hosting remains the existing Cloudflare static site, without adding an application server or paid animation dependencies.
