# Mother of Ice-cream

## Current State
The app has stable backend storage for flavors. The old 21 flavors were stored in stable maps. There's a `clearAllFlavors` function and individual `addFlavor` calls. All products use AI-generated images. The admin panel has full CRUD for flavors.

## Requested Changes (Diff)

### Add
- 13 new products with AI-generated images replacing all old ones:
  1. Banana Split (Vanilla, Chocolate, Strawberry) - Classic - ₹100
  2. Cola Float With Ice-Cream - Classic - ₹110
  3. Cold Coffee With Ice-Cream - Classic - ₹110
  4. Chocolate (Rich chocolate ice cream) - Classic - ₹80
  5. Fresh Lime Soda With Mint - Classic - ₹40
  6. Fruit Salad With Ice Cream - Classic - ₹120
  7. Hot Chocolate Fudge - Classic - ₹140
  8. Orange Blossom Mocktail - Premium - ₹90
  9. Pineapple Blossom Mocktail - Premium - ₹70
  10. Special of the Day - Seasonal - ₹130
  11. Tutti Frutti (Vanilla, Strawberry & Fresh Fruits) - Classic - ₹100
  12. Vanilla With Hot Chocolate Sauce - Classic - ₹70
  13. Vanilla (Classic vanilla ice cream) - Classic - ₹80
- `seedDefaultFlavors` backend function that clears all flavors and seeds the 13 new ones

### Modify
- Backend: Add `seedDefaultFlavors` public shared function
- Frontend AdminPage: On mount, if flavors is empty, auto-call seed function
- Frontend: All product images point to new AI-generated images

### Remove
- All old 21 flavor product entries

## Implementation Plan
1. Update backend main.mo to add `seedDefaultFlavors` that clears and repopulates with the 13 new products with correct image paths
2. Update frontend to call `seedDefaultFlavors` on admin load if flavor list is empty, OR add a seed button
3. Also add a `replaceAllWithDefaults` call that can be triggered from admin to replace all existing flavors with the new 13
