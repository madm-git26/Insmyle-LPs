/**
 * 3D appliance scene — deliberately a stub.
 *
 * Return `null` and the viewer keeps its static image, which is the correct
 * behaviour until a real, optimised GLB exists. When one does:
 *
 *   1. Add the GLB to /public/models/ (Draco-compressed, target < 800 KB).
 *   2. Import three + GLTFLoader *here only* so the bundle stays lazy.
 *   3. Map `progress` (0 → 1) to the assembly sequence from spec 18:
 *        0.00  complete
 *        0.25  upper / lower separation
 *        0.50  connection mechanism highlighted
 *        0.75  components align
 *        1.00  complete
 *   4. Cap rotation at 360° and never spin continuously while someone reads.
 *   5. Return { setProgress, dispose } so the component can drive and clean up.
 */
export async function mountApplianceScene(/* container */) {
  return null;
}
