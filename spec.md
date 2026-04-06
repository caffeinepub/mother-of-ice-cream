# Mother of Ice-cream

## Current State
- Homepage has a hero section with animated ice cream image, featured flavors grid, USP band, and CTA band
- Checkout supports Google Pay, PhonePe (via UPI deep link + UTR), Razorpay (cards/UPI), and Cash on Delivery
- No video on the site yet
- Vite build has `minify: false` — performance is not optimized
- Video file uploaded: `/assets/vid-20260406-wa0003-019d63d6-ed29-7618-9dc2-afc4cbd21b78.mp4`

## Requested Changes (Diff)

### Add
- Video section on homepage (between hero and featured flavors, or within the hero) using the uploaded MP4 file
- Production build optimizations: enable minify, chunk splitting, asset compression hints

### Modify
- `vite.config.js`: enable `minify: 'esbuild'`, `rollupOptions.output.manualChunks` for vendor splitting
- `HomePage.tsx`: add a video section showcasing the uploaded video (autoplay, muted, loop, playsInline for mobile compatibility)
- `index.html`: add resource hints (preconnect, dns-prefetch) for faster third-party loads
- Payment system: already fully implemented (Google Pay, PhonePe, Razorpay, Cash on Delivery) — no changes needed

### Remove
- Nothing removed

## Implementation Plan
1. Update `vite.config.js` to enable minification and vendor code splitting for faster load times
2. Add a video showcase section to `HomePage.tsx` using the uploaded MP4 at `/assets/vid-20260406-wa0003-019d63d6-ed29-7618-9dc2-afc4cbd21b78.mp4`
   - Autoplay, muted, loop, playsInline
   - Fallback text for browsers that don't support video
   - Rounded card with a title like "Watch Our Story" or "See Us in Action"
3. Update `index.html` with preconnect hints for Razorpay and performance meta tags
4. Validate and deploy
