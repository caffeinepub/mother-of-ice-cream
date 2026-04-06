# Mother of Ice-cream

## Current State
The backend seeds 21 hardcoded ice cream flavors on first deploy. These are stored in stable storage and persist across upgrades. The admin panel lets the user add/edit/delete individual flavors but has no way to bulk-clear all existing ones.

## Requested Changes (Diff)

### Add
- `clearAllFlavors` public function to backend that removes all flavors from the map
- A "Clear All Flavors" button in the Admin panel → Flavors tab that calls this function (with confirmation dialog)
- Remove the 21-flavor seed block from the backend so future clean deploys start empty

### Modify
- Backend: Remove the `if (flavors.size() == 0)` seed block entirely
- AdminPage: Add a danger "Clear All Flavors" button in the Flavors tab header area

### Remove
- The 21-flavor hardcoded seed data from main.mo

## Implementation Plan
1. Edit `src/backend/main.mo`: remove the seed block and add `clearAllFlavors()` function
2. Update `src/frontend/src/declarations/backend.did.d.ts` and `backend.did.js` to include `clearAllFlavors`
3. Edit `src/frontend/src/pages/AdminPage.tsx`: add a hook call for `clearAllFlavors`, add a "Clear All Flavors" button with confirmation dialog in the Flavors tab
