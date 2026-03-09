/**
 * Vehicle Animation
 * =================
 * Per-frame animation helpers for excavator and truck parts.
 */

/**
 * Animate excavator articulated parts (boom, stick, bucket, beacon, turret).
 * @param {object} parts — `{ arm, stick, bucket, beacon, turret }`
 * @param {number} t     — elapsed time in seconds (`performance.now() * 0.001`)
 * @param {number} speed — vehicle current speed (signed)
 */
export function animateExcavator(parts, t, speed) {
  if (parts.arm) {
    parts.arm.rotation.x = Math.sin(t * 0.6) * 0.12;
  }
  if (parts.stick) {
    parts.stick.rotation.x = 0.6 + Math.sin(t * 0.8 + 1) * 0.08;
  }
  if (parts.bucket) {
    parts.bucket.rotation.x = Math.sin(t * 1.0 + 2) * 0.15;
  }
  if (parts.beacon) {
    parts.beacon.material.emissiveIntensity = 0.3 + Math.sin(t * 6) * 0.3;
  }
  if (parts.turret) {
    if (Math.abs(speed) < 0.01) {
      parts.turret.rotation.y = Math.sin(t * 0.15) * 0.25;
    } else {
      parts.turret.rotation.y *= 0.95;
    }
  }
}

/**
 * Animate truck parts (bed tilt, wheel rotation, exhaust smoke).
 * @param {object} parts — `{ bed, wheels, exhaustSmoke }`
 * @param {number} t     — elapsed time in seconds
 * @param {number} speed — vehicle current speed (signed)
 */
export function animateTruck(parts, t, speed) {
  if (parts.bed) {
    const tgt = Math.abs(speed) > 0.01 ? 0 : Math.sin(t * 0.4) * 0.08;
    parts.bed.rotation.x += (tgt - parts.bed.rotation.x) * 0.04;
  }
  if (parts.wheels) {
    for (const w of parts.wheels) {
      w.rotation.x += speed * 3;
    }
  }
  if (parts.exhaustSmoke) {
    for (const s of parts.exhaustSmoke) {
      s.material.opacity = 0.08 + Math.sin(t * 3 + s.userData.phase) * 0.06;
      s.position.y = s.userData.baseY + Math.sin(t * 2 + s.userData.phase) * 0.05;
    }
  }
}
