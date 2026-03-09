/**
 * Excavator Builder — Photo-Realistic Hydraulic Excavator
 * ========================================================
 * Builds a detailed 3D excavator (pelleteuse) using LAMACO brand colors.
 * Gold body with Blue accent details.
 *
 * Sections:
 *   A — Undercarriage (tracks, sprockets, H-frame)
 *   B — Turret (engine, counterweight, handrails)
 *   C — Cabin (ROPS cab, windshield, beacon)
 *   D — Boom (triangular, dual hydraulic cylinders)
 *   E — Stick (dipper arm)
 *   F — Bucket (teeth, linkage, dirt)
 */
import * as THREE from "three";
import { GOLD, GOLD_DARK, BLUE, BLUE_DARK, DARK, DIRT } from "./palette.js";
import { mat, paintMat, glassMat, chromeMat, dirtyMat } from "./materials.js";

/* ─── Helper: track wheel cluster (sprocket or idler) ─── */
function makeWheelCluster(radius, segments, toothed) {
  const grp      = new THREE.Group();
  const wheelMat = mat(0x333333, { metalness: 0.4, roughness: 0.7 });

  /* main wheel disc */
  const disc = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, 0.2, segments),
    wheelMat,
  );
  disc.rotation.z = Math.PI / 2;
  disc.castShadow = true;
  grp.add(disc);

  /* hub */
  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.35, radius * 0.35, 0.22, 8),
    chromeMat(),
  );
  hub.rotation.z = Math.PI / 2;
  grp.add(hub);

  /* hub bolts */
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const bolt  = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.012, 0.24, 4),
      chromeMat(),
    );
    bolt.rotation.z = Math.PI / 2;
    bolt.position.set(0, Math.sin(angle) * radius * 0.55, Math.cos(angle) * radius * 0.55);
    grp.add(bolt);
  }

  /* sprocket teeth */
  if (toothed) {
    for (let i = 0; i < segments; i++) {
      const angle    = (i / segments) * Math.PI * 2;
      const toothGeo = new THREE.BoxGeometry(0.16, 0.04, 0.04);
      const t        = new THREE.Mesh(toothGeo, wheelMat);
      t.position.set(0, Math.sin(angle) * (radius + 0.02), Math.cos(angle) * (radius + 0.02));
      t.rotation.x = angle;
      grp.add(t);
    }
  }

  return grp;
}

/* ═══════════════════════════════════════════════════════════════════════════
   PUBLIC — Build and return the complete excavator Group
   ═══════════════════════════════════════════════════════════════════════ */

export function buildExcavator() {
  const g  = new THREE.Group();
  const G  = GOLD;
  const GD = GOLD_DARK;
  const B  = BLUE;
  const BD = BLUE_DARK;
  const D  = DARK;
  const TRACK_COLOR = 0x1c1c1c;

  /* ═══════════════════════════════════════════
     A — UNDERCARRIAGE (chenilles)
     ═══════════════════════════════════════════ */
  const undercarriage = new THREE.Group();

  for (const side of [-1, 1]) {
    const trackAssy = new THREE.Group();

    /* track shoe belt */
    const trackBelt = new THREE.Mesh(
      new THREE.BoxGeometry(0.52, 0.36, 2.6),
      mat(TRACK_COLOR, { roughness: 0.93 }),
    );
    trackBelt.position.set(0, 0.18, 0);
    trackBelt.castShadow = true;
    trackAssy.add(trackBelt);

    /* individual track pads (grousers) */
    const padM = mat(0x242424, { roughness: 0.95, metalness: 0.15 });
    for (let tz = -1.2; tz <= 1.2; tz += 0.12) {
      const pad = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.05, 0.06), padM);
      pad.position.set(0, 0.005, tz);
      pad.castShadow = true;
      trackAssy.add(pad);

      const grouser = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, 0.03, 0.03),
        mat(0x1a1a1a, { roughness: 0.98 }),
      );
      grouser.position.set(0, -0.01, tz);
      trackAssy.add(grouser);
    }

    /* drive sprocket (rear — toothed) */
    const sprocketR = makeWheelCluster(0.24, 12, true);
    sprocketR.position.set(0, 0.24, -1.15);
    trackAssy.add(sprocketR);

    /* idler wheel (front — smooth) */
    const idler = makeWheelCluster(0.22, 14, false);
    idler.position.set(0, 0.22, 1.15);
    trackAssy.add(idler);

    /* bottom rollers */
    for (const rz of [-0.65, -0.2, 0.25, 0.7]) {
      const roller = new THREE.Mesh(
        new THREE.CylinderGeometry(0.09, 0.09, 0.16, 10),
        mat(0x3a3a3a, { metalness: 0.4 }),
      );
      roller.rotation.z = Math.PI / 2;
      roller.position.set(0, 0.1, rz);
      roller.castShadow = true;
      trackAssy.add(roller);
    }

    /* top carrier rollers */
    for (const rz of [-0.4, 0.35]) {
      const cRoller = new THREE.Mesh(
        new THREE.CylinderGeometry(0.065, 0.065, 0.14, 8),
        mat(0x444444, { metalness: 0.3 }),
      );
      cRoller.rotation.z = Math.PI / 2;
      cRoller.position.set(0, 0.38, rz);
      trackAssy.add(cRoller);
    }

    /* track frame (side structural beam) */
    const sideFrame = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.2, 2.5),
      paintMat(G, { clearcoat: 0.2 }),
    );
    sideFrame.position.set(0, 0.26, 0);
    sideFrame.castShadow = true;
    trackAssy.add(sideFrame);

    /* track guard / fender */
    const fender = new THREE.Mesh(
      new THREE.BoxGeometry(0.56, 0.05, 2.7),
      paintMat(G),
    );
    fender.position.set(0, 0.38, 0);
    fender.castShadow = true;
    trackAssy.add(fender);

    const fenderLip = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.08, 2.7),
      paintMat(GD),
    );
    fenderLip.position.set(side * 0.28, 0.36, 0);
    trackAssy.add(fenderLip);

    /* track tension adjuster */
    const tensioner = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.22, 6),
      chromeMat(),
    );
    tensioner.rotation.x = Math.PI / 2;
    tensioner.position.set(0, 0.22, 1.35);
    trackAssy.add(tensioner);

    trackAssy.position.set(side * 0.92, 0, 0);
    undercarriage.add(trackAssy);
  }

  /* H-frame — LAMACO Blue */
  const hFrame = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.14, 0.8),
    paintMat(B),
  );
  hFrame.position.set(0, 0.42, 0);
  hFrame.castShadow = true;
  undercarriage.add(hFrame);

  /* blade mount plates */
  for (const sx of [-1, 1]) {
    const mountPlate = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.22, 0.4),
      mat(D, { metalness: 0.4 }),
    );
    mountPlate.position.set(sx * 0.78, 0.42, 0.7);
    undercarriage.add(mountPlate);
  }

  g.add(undercarriage);

  /* ═══════════════════════════════════════════
     B — TURRET (superstructure rotative)
     ═══════════════════════════════════════════ */
  const turret = new THREE.Group();
  turret.position.set(0, 0.48, 0);

  /* slew ring */
  const slewRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.55, 0.06, 10, 32),
    chromeMat(),
  );
  slewRing.rotation.x = Math.PI / 2;
  turret.add(slewRing);

  /* main turret platform */
  const platform = new THREE.Mesh(
    new THREE.BoxGeometry(1.55, 0.12, 2.0),
    paintMat(G),
  );
  platform.position.set(0, 0.08, -0.1);
  platform.castShadow = true;
  turret.add(platform);

  /* engine compartment */
  const engineBlock = new THREE.Mesh(
    new THREE.BoxGeometry(1.45, 0.55, 0.9),
    paintMat(G),
  );
  engineBlock.position.set(0, 0.4, -0.7);
  engineBlock.castShadow = true;
  turret.add(engineBlock);

  /* engine cover — LAMACO Blue accent */
  const engineTop = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 0.06, 0.85),
    paintMat(BD, { clearcoat: 0.4 }),
  );
  engineTop.position.set(0, 0.7, -0.7);
  turret.add(engineTop);

  /* engine side panels with vents */
  for (const sx of [-1, 1]) {
    const sidePanel = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.48, 0.8),
      paintMat(G, { clearcoat: 0.3 }),
    );
    sidePanel.position.set(sx * 0.74, 0.4, -0.7);
    sidePanel.castShadow = true;
    turret.add(sidePanel);

    for (let vi = 0; vi < 5; vi++) {
      const ventSlot = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 0.06, 0.45),
        mat(0x1a1a1a),
      );
      ventSlot.position.set(sx * 0.76, 0.28 + vi * 0.09, -0.7);
      turret.add(ventSlot);
    }
  }

  /* radiator grille */
  const grille = new THREE.Mesh(
    new THREE.BoxGeometry(0.03, 0.35, 0.5),
    mat(0x222222, { metalness: 0.5 }),
  );
  grille.position.set(-0.76, 0.35, -0.45);
  turret.add(grille);
  for (let gi = 0; gi < 7; gi++) {
    const gBar = new THREE.Mesh(
      new THREE.BoxGeometry(0.01, 0.03, 0.45),
      chromeMat(),
    );
    gBar.position.set(-0.77, 0.2 + gi * 0.05, -0.45);
    turret.add(gBar);
  }

  /* counterweight */
  const cwMain = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.52, 0.4),
    mat(D, { roughness: 0.78, metalness: 0.45 }),
  );
  cwMain.position.set(0, 0.38, -1.2);
  cwMain.castShadow = true;
  turret.add(cwMain);

  for (const sx of [-1, 1]) {
    const cwEnd = new THREE.Mesh(
      new THREE.CylinderGeometry(0.26, 0.26, 0.4, 8, 1, false, 0, Math.PI),
      mat(D, { roughness: 0.78, metalness: 0.45 }),
    );
    cwEnd.rotation.x = Math.PI / 2;
    cwEnd.rotation.y = sx > 0 ? 0 : Math.PI;
    cwEnd.position.set(sx * 0.75, 0.38, -1.2);
    cwEnd.castShadow = true;
    turret.add(cwEnd);
  }

  /* counterweight ribs — LAMACO Blue */
  for (const rx of [-0.4, 0, 0.4]) {
    const cwRib = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.42, 0.06),
      paintMat(B),
    );
    cwRib.position.set(rx, 0.38, -1.41);
    turret.add(cwRib);
  }

  /* exhaust muffler */
  const muffler = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 0.35, 10),
    mat(0x555555, { metalness: 0.6, roughness: 0.45 }),
  );
  muffler.position.set(-0.35, 0.9, -0.85);
  muffler.castShadow = true;
  turret.add(muffler);

  const mufflerCap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.06, 0.04, 10),
    mat(0x444444, { metalness: 0.7 }),
  );
  mufflerCap.position.set(-0.35, 1.08, -0.85);
  turret.add(mufflerCap);

  /* handrails / grab bars */
  const railM = chromeMat();
  const lRail = new THREE.Mesh(
    new THREE.CylinderGeometry(0.012, 0.012, 0.6, 6),
    railM,
  );
  lRail.position.set(-0.74, 0.8, -0.3);
  lRail.rotation.x = Math.PI / 2;
  turret.add(lRail);

  for (const rz of [-0.05, -0.55]) {
    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.01, 0.01, 0.15, 4),
      railM,
    );
    post.position.set(-0.74, 0.72, rz);
    turret.add(post);
  }

  /* ═══════════════════════════════════════════
     C — CABIN (ROPS cab)
     ═══════════════════════════════════════════ */
  const cabinGroup = new THREE.Group();
  cabinGroup.position.set(0.22, 0.14, 0.15);

  /* ROPS pillars */
  const pillarM   = paintMat(GD);
  const pillarGeo = new THREE.BoxGeometry(0.06, 0.82, 0.06);

  for (const sx of [-1, 1]) {
    const aP = new THREE.Mesh(pillarGeo, pillarM);
    aP.position.set(sx * 0.44, 0.41, 0.44);
    aP.castShadow = true;
    cabinGroup.add(aP);
  }
  for (const sx of [-1, 1]) {
    const bP = new THREE.Mesh(pillarGeo, pillarM);
    bP.position.set(sx * 0.44, 0.41, -0.38);
    bP.castShadow = true;
    cabinGroup.add(bP);
  }

  /* cabin floor */
  const cabFloor = new THREE.Mesh(
    new THREE.BoxGeometry(0.94, 0.06, 0.9),
    paintMat(G),
  );
  cabFloor.position.set(0, 0.03, 0.03);
  cabinGroup.add(cabFloor);

  /* cabin roof */
  const cabRoof = new THREE.Mesh(
    new THREE.BoxGeometry(1.0, 0.07, 0.95),
    paintMat(G),
  );
  cabRoof.position.set(0, 0.84, 0.03);
  cabRoof.castShadow = true;
  cabinGroup.add(cabRoof);

  const roofTrim = new THREE.Mesh(
    new THREE.BoxGeometry(1.02, 0.03, 0.97),
    paintMat(GD),
  );
  roofTrim.position.set(0, 0.88, 0.03);
  cabinGroup.add(roofTrim);

  /* windshield */
  const glassM = glassMat();

  const windUpper = new THREE.Mesh(
    new THREE.BoxGeometry(0.82, 0.35, 0.03),
    glassM,
  );
  windUpper.position.set(0, 0.58, 0.47);
  cabinGroup.add(windUpper);

  const windLower = new THREE.Mesh(
    new THREE.BoxGeometry(0.82, 0.3, 0.03),
    glassM,
  );
  windLower.position.set(0, 0.22, 0.47);
  cabinGroup.add(windLower);

  const windDivider = new THREE.Mesh(
    new THREE.BoxGeometry(0.86, 0.025, 0.02),
    mat(0x1a1a1a),
  );
  windDivider.position.set(0, 0.41, 0.48);
  cabinGroup.add(windDivider);

  /* side windows */
  for (const sx of [-1, 1]) {
    const sideGlass = new THREE.Mesh(
      new THREE.BoxGeometry(0.03, 0.6, 0.75),
      glassM,
    );
    sideGlass.position.set(sx * 0.47, 0.42, 0.03);
    cabinGroup.add(sideGlass);
  }

  /* rear window */
  const rearGlass = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.5, 0.03),
    glassM,
  );
  rearGlass.position.set(0, 0.45, -0.4);
  cabinGroup.add(rearGlass);

  /* door */
  const doorFrame = new THREE.Mesh(
    new THREE.BoxGeometry(0.02, 0.75, 0.04),
    mat(0x1a1a1a),
  );
  doorFrame.position.set(0.47, 0.41, 0.2);
  cabinGroup.add(doorFrame);

  const doorHandle = new THREE.Mesh(
    new THREE.BoxGeometry(0.02, 0.03, 0.1),
    chromeMat(),
  );
  doorHandle.position.set(0.48, 0.35, 0.25);
  cabinGroup.add(doorHandle);

  /* sun visor */
  const visor = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.03, 0.12),
    paintMat(G),
  );
  visor.position.set(0, 0.82, 0.5);
  visor.rotation.x = -0.2;
  cabinGroup.add(visor);

  /* interior — seat */
  const seat = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.25, 0.3),
    mat(0x222222, { roughness: 0.9 }),
  );
  seat.position.set(0.05, 0.2, 0.0);
  cabinGroup.add(seat);

  const seatBack = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.35, 0.08),
    mat(0x222222, { roughness: 0.9 }),
  );
  seatBack.position.set(0.05, 0.38, -0.13);
  cabinGroup.add(seatBack);

  turret.add(cabinGroup);

  /* beacon */
  const beaconBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.06, 0.04, 8),
    mat(0x333333),
  );
  beaconBase.position.set(0.22, 1.02, 0.15);
  turret.add(beaconBase);

  const beacon = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, 0.08, 8),
    new THREE.MeshStandardMaterial({
      color: 0xff8800,
      emissive: 0xff6600,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.88,
    }),
  );
  beacon.position.set(0.22, 1.08, 0.15);
  turret.add(beacon);

  /* ═══════════════════════════════════════════
     D — BOOM (flèche) — Triangular cross-section
     ═══════════════════════════════════════════ */
  const arm = new THREE.Group();
  arm.position.set(-0.08, 0.55, 0.65);

  const boomLen     = 2.4;
  const boomM       = paintMat(G);
  const boomDarkM   = paintMat(GD, { clearcoat: 0.3 });

  /* four plates forming triangular section */
  const boomBottom = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.04, boomLen), boomM);
  boomBottom.position.set(0, 0.08, 1.0);
  boomBottom.rotation.x = -0.28;
  boomBottom.castShadow = true;
  arm.add(boomBottom);

  const boomLeft = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.28, boomLen), boomM);
  boomLeft.position.set(-0.14, 0.22, 1.0);
  boomLeft.rotation.x = -0.28;
  boomLeft.castShadow = true;
  arm.add(boomLeft);

  const boomRight = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.28, boomLen), boomM);
  boomRight.position.set(0.14, 0.22, 1.0);
  boomRight.rotation.x = -0.28;
  boomRight.castShadow = true;
  arm.add(boomRight);

  const boomTop = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.04, boomLen), boomDarkM);
  boomTop.position.set(0, 0.36, 1.0);
  boomTop.rotation.x = -0.28;
  boomTop.castShadow = true;
  arm.add(boomTop);

  /* weld seams */
  const weldM = mat(0x8a7a2a, { roughness: 0.8 });
  for (const sx of [-1, 1]) {
    const weld = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.015, boomLen - 0.2), weldM);
    weld.position.set(sx * 0.14, 0.08, 1.0);
    weld.rotation.x = -0.28;
    arm.add(weld);
  }

  /* boom foot brackets */
  for (const sx of [-1, 1]) {
    const boomFoot = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.35, 0.15), boomDarkM);
    boomFoot.position.set(sx * 0.17, 0.15, -0.05);
    boomFoot.castShadow = true;
    arm.add(boomFoot);
  }

  /* boom pivot pin */
  const boomPivot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 0.45, 12),
    chromeMat(),
  );
  boomPivot.rotation.z = Math.PI / 2;
  boomPivot.position.set(0, 0.15, -0.05);
  arm.add(boomPivot);

  /* dual boom hydraulic cylinders */
  for (const sx of [-1, 1]) {
    const cylBarrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.045, 1.2, 10),
      chromeMat(),
    );
    cylBarrel.position.set(sx * 0.22, 0.55, 0.45);
    cylBarrel.rotation.x = -0.55;
    cylBarrel.castShadow = true;
    arm.add(cylBarrel);

    const cylRod = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.7, 8),
      new THREE.MeshStandardMaterial({
        color: 0xe0ddd0, roughness: 0.08, metalness: 0.95, envMapIntensity: 1.4,
      }),
    );
    cylRod.position.set(sx * 0.22, 0.82, 0.2);
    cylRod.rotation.x = -0.55;
    arm.add(cylRod);

    for (const mz of [-0.06, 0.95]) {
      const eyeMount = new THREE.Mesh(
        new THREE.TorusGeometry(0.04, 0.015, 6, 8),
        chromeMat(),
      );
      eyeMount.rotation.y = Math.PI / 2;
      eyeMount.position.set(sx * 0.22, 0.25 + mz * 0.45, -0.05 + mz * 0.55);
      arm.add(eyeMount);
    }
  }

  /* ═══════════════════════════════════════════
     E — STICK (balancier)
     ═══════════════════════════════════════════ */
  const stick = new THREE.Group();
  stick.position.set(0, 0.6, 2.15);
  stick.rotation.x = 0.55;

  const stickLen = 1.6;

  const stickBottom = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.035, stickLen), boomM);
  stickBottom.position.set(0, -0.02, 0.6);
  stickBottom.castShadow = true;
  stick.add(stickBottom);

  for (const sx of [-1, 1]) {
    const stickSide = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.22, stickLen), boomM);
    stickSide.position.set(sx * 0.1, 0.09, 0.6);
    stickSide.castShadow = true;
    stick.add(stickSide);
  }

  const stickTop = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.035, stickLen), boomDarkM);
  stickTop.position.set(0, 0.2, 0.6);
  stickTop.castShadow = true;
  stick.add(stickTop);

  const stickPivot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.32, 10),
    chromeMat(),
  );
  stickPivot.rotation.z = Math.PI / 2;
  stickPivot.position.set(0, 0.1, 0);
  stick.add(stickPivot);

  /* stick hydraulic cylinder */
  const stickCylBarrel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, 0.95, 10),
    chromeMat(),
  );
  stickCylBarrel.position.set(0.13, 0.3, 0.25);
  stickCylBarrel.rotation.x = 0.15;
  stick.add(stickCylBarrel);

  const stickCylRod = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 0.55, 8),
    new THREE.MeshStandardMaterial({ color: 0xe0ddd0, roughness: 0.08, metalness: 0.95 }),
  );
  stickCylRod.position.set(0.13, 0.38, 0.65);
  stickCylRod.rotation.x = 0.15;
  stick.add(stickCylRod);

  arm.add(stick);

  /* ═══════════════════════════════════════════
     F — BUCKET (godet)
     ═══════════════════════════════════════════ */
  const bkt       = new THREE.Group();
  bkt.position.set(0, -0.12, 1.35);

  const dirtyM = dirtyMat(D);
  const wornM  = mat(0x555555, { roughness: 0.82, metalness: 0.5 });

  const bktBack = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.06), dirtyM);
  bktBack.castShadow = true;
  bkt.add(bktBack);

  const bktBottom = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.06, 0.45), dirtyM);
  bktBottom.position.set(0, -0.25, 0.2);
  bktBottom.castShadow = true;
  bkt.add(bktBottom);

  const cuttingEdge = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.04, 0.06), wornM);
  cuttingEdge.position.set(0, -0.27, 0.43);
  cuttingEdge.castShadow = true;
  bkt.add(cuttingEdge);

  /* side plates */
  for (const sx of [-1, 1]) {
    const cheek = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.5, 0.45), dirtyM);
    cheek.position.set(sx * 0.35, 0, 0.2);
    cheek.castShadow = true;
    bkt.add(cheek);

    const sideCutter = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.12), wornM);
    sideCutter.position.set(sx * 0.38, -0.24, 0.4);
    sideCutter.castShadow = true;
    bkt.add(sideCutter);
  }

  /* 7 teeth */
  const toothM = mat(0xaaaaaa, { metalness: 0.88, roughness: 0.25 });
  for (let i = -3; i <= 3; i++) {
    const adapter = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.06, 0.06),
      mat(D, { metalness: 0.5 }),
    );
    adapter.position.set(i * 0.09, -0.27, 0.46);
    bkt.add(adapter);

    const tooth = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.16, 5), toothM);
    tooth.position.set(i * 0.09, -0.27, 0.56);
    tooth.rotation.x = Math.PI / 2;
    tooth.castShadow = true;
    bkt.add(tooth);
  }

  /* reinforcement ribs */
  for (const rx of [-0.2, 0, 0.2]) {
    const rib = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.3, 0.02), dirtyM);
    rib.position.set(rx, -0.08, 0.03);
    bkt.add(rib);
  }

  /* dirt/soil */
  const dirtM = mat(DIRT, { roughness: 1.0 });
  for (let di = 0; di < 5; di++) {
    const dirtClump = new THREE.Mesh(
      new THREE.SphereGeometry(0.06 + Math.random() * 0.06, 5, 4),
      dirtM,
    );
    dirtClump.position.set(
      (Math.random() - 0.5) * 0.4,
      -0.12 + Math.random() * 0.08,
      0.1  + Math.random() * 0.15,
    );
    bkt.add(dirtClump);
  }

  /* bucket pivot pin */
  const bktPivot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, 0.75, 10),
    chromeMat(),
  );
  bktPivot.rotation.z = Math.PI / 2;
  bktPivot.position.set(0, 0.18, 0);
  bkt.add(bktPivot);

  /* bucket linkage bars */
  for (const sx of [-1, 1]) {
    const link = new THREE.Mesh(
      new THREE.CylinderGeometry(0.018, 0.018, 0.35, 6),
      chromeMat(),
    );
    link.position.set(sx * 0.12, 0.28, -0.08);
    link.rotation.x = 0.35;
    bkt.add(link);
  }

  /* bucket cylinder */
  const bktCyl = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 0.45, 8),
    chromeMat(),
  );
  bktCyl.position.set(0, 0.35, -0.15);
  bktCyl.rotation.x = 0.5;
  bkt.add(bktCyl);

  stick.add(bkt);
  turret.add(arm);
  g.add(turret);

  /* ── finalize ── */
  g.userData.parts = { arm, stick, bucket: bkt, beacon, turret };
  g.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } });
  return g;
}
