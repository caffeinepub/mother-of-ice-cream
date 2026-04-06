# Mother of Ice-cream

## Current State
Checkout modal (`CheckoutModal.tsx`) offers three payment options:
1. Google Pay (UPI tile)
2. PhonePe (UPI tile)
3. Cash on Delivery (always shown as a separate tile below the grid)

When neither UPI nor Razorpay is configured, a simple "Cash on Delivery" info block is shown. The `handlePayment` function has a `cod` branch that places an order with no payment reference.

## Requested Changes (Diff)

### Add
- A prominent info banner at the top of the checkout dialog: "Advance payment required — party orders only."
- Messaging below checkout buttons making it clear the payment is an advance for a party order.

### Modify
- Remove the Cash on Delivery tile entirely (the `cod` option and its button/logic).
- Remove the fallback COD info block shown when no UPI/Razorpay is configured — instead show a message asking customer to contact the shop.
- Default selected payment: when UPI is configured, default to `gpay` instead of `online` or `cod`.
- When Razorpay key is not configured AND no UPI is set, block checkout with a "Contact us to place your order" message instead of COD fallback.
- The `handlePayment` function's `cod` branch should be removed. If Razorpay key is missing, it should NOT fall back silently to COD — it should show an error asking to use UPI or contact the shop.
- Update the `ConfirmedOrder.paymentMethod` type — `"cod"` can be removed or kept for legacy orders but no new COD orders should be created.

### Remove
- Cash on Delivery tile (the wide green button with Truck icon below the payment grid).
- The `!showUpiTiles && !showRazorpayTile` COD fallback block.
- The `cod` case in `handlePayment`.
- Razorpay "fall back to COD" silent path in `handlePayment`.

## Implementation Plan
1. In `CheckoutModal.tsx`:
   - Remove `"cod"` from `PaymentMethod` type (or keep as dead type, but remove all UI and logic).
   - Remove the COD tile button and the `isCod` variable usage from UI.
   - Remove the `!showUpiTiles && !showRazorpayTile` fallback block; replace with a "Contact shop" message.
   - Remove the `cod` branch from `handlePayment`.
   - Remove the silent Razorpay fallback-to-COD path — instead show toast error directing to UPI.
   - Add an info banner near the top of the dialog: party order + advance payment message.
   - Default payment method: if UPI is available, default to `gpay`; if only Razorpay, default to `online`.
   - Remove the `isCod` note below the action button.
