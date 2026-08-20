/* ============================================================================
   Frame-rate independence.

   Everything in the 3D backdrop used to advance by a fixed amount PER FRAME:

       points.rotation.y += 0.0006;
       camera.position.z += (target - camera.position.z) * 0.2;

   which means the animation's speed is whatever the frame rate happens to be.
   Measured on the live site, in a single visit on a single machine: the same
   starfield drift ran at 2.064 deg/s during the intro (canvas at the display's
   refresh rate) and 0.686 deg/s behind the portfolio (canvas paced on demand).
   Three times apart, from one line of code, with nothing in the source to say
   so. On a 120 or 144 Hz display the intro is another 2x to 2.4x faster again.

   That is the whole of the reported bug: "the background animations go
   together and repeatedly fast". Together, because every one of them shares
   the defect; fast, because a fast display draws more frames; sometimes,
   because it depends on the machine, the display and how busy the page is.

   Both helpers take the delta three.js hands to useFrame and clamp it first.
   The clamp matters as much as the conversion: when a tab is restored, or the
   main thread stalls, delta arrives as one enormous number, and an unclamped
   time-based animation answers by teleporting the entire scene in a single
   frame — trading a slow bug for a violent one. 50 ms is three frames at 60 Hz;
   beyond that the honest thing is to lose the time rather than apply it.
   ============================================================================ */

/** Longest step we will act on. Anything above this is a stall, not motion. */
const MAX_STEP = 0.05;

/**
 * Convert a constant that was tuned per-frame-at-60fps into a per-second one.
 *
 *     rotation.y += 0.0006 * step60(delta);
 *
 * At exactly 60 fps this returns 1, so every constant already in the codebase
 * keeps the value it was tuned to and nothing needs re-tuning by eye.
 */
export const step60 = (delta) => Math.min(delta, MAX_STEP) * 60;

/**
 * Frame-rate-independent exponential approach — the fix for the `x += (target
 * - x) * k` idiom, which converges in a number of FRAMES rather than a length
 * of time.
 *
 *     camera.position.z += (target - camera.position.z) * approach(0.2, delta);
 *
 * Compounding is what makes this correct: two 60 fps steps of 0.1 leave
 * (1 - 0.1)^2 = 0.81 of the gap, so one 30 fps step must remove 1 - 0.81 =
 * 0.19, not 0.1. Same `k` as before, same feel at 60 fps, same DURATION at any
 * other rate.
 */
export const approach = (k, delta) => 1 - Math.pow(1 - k, step60(delta));
