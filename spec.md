# Mother of Ice-cream

## Current State
The app has a complete checkout flow with Razorpay, direct UPI (Google Pay/PhonePe), and Cash on Delivery. The backend has `placeOrder`, `getUpiId`, `setUpiId`, `deleteOrder`, `deleteContactMessage` functions implemented in `main.mo`. However, these methods are missing from the generated `backend.did.d.ts` and `backend.did.js` declaration files — only `placeOrder` is present. The frontend works around this using `(actor as any)` casts, which means these calls may silently fail at runtime if the canister doesn't recognize the calls.

## Requested Changes (Diff)

### Add
- Re-generate Motoko backend to produce updated declarations that include all missing methods: `getUpiId`, `setUpiId`, `deleteOrder`, `deleteContactMessage`

### Modify
- Backend declarations (`backend.did.d.ts`, `backend.did.js`) must include all currently-missing methods so TypeScript calls are type-safe and the canister binding actually works
- CheckoutModal: ensure `placeOrder` call works reliably and the place order button is clearly visible and functional for customers

### Remove
- Nothing removed

## Implementation Plan
1. Regenerate Motoko backend with all current functionality to update the declarations
2. Verify all order placement flows (COD, UPI, Razorpay) are wired correctly in CheckoutModal
3. Validate and build frontend
