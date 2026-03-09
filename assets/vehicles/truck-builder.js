/**
 * Truck Builder — Shacman F3000 Inspired Dump Truck
 * ==================================================
 * Builds a detailed 3D dump truck (benne) using LAMACO brand colors.
 * Gold body with Blue accent stripes.
 *
 * Sections:
 *   - 10-wheel drivetrain (3 axles, dual rear)
 *   - Chassis frame
 *   - Cab-over-engine cabin (Shacman F3000 style)
 *   - Front face (grille, bumper, headlights)
 *   - Rear (tail lights, chevron bumper guard)
 *   - Dump bed with gravel load
 *   - Exhaust stack, fuel tank, license plate
 */
import * as THREE from "three";
import { BLUE, BLUE_DARK, GOLD, GOLD_DARK, DARK } from "./palette.js";
import { mat, paintMat, glassMat, chromeMat, rubberMat } from "./materials.js";

export function buildTruck() {
  const g  = new THREE.Group();
  const B  = BLUE;
  const BD = BLUE_DARK;
  const G  = GOLD;
  const GD = GOLD_DARK;
  const D  = DARK;

  /* ─── WHEELS (10 wheels: 2 front + 4+4 rear — 3 axles) ─── */
  const wheels = [];
  const axles  = [
    { z: -1.45, dual: false, r: 0.3 },   // front steering
    { z:  0.55, dual: true,  r: 0.3 },   // rear drive 1
    { z:  1.2,  dual: true,  r: 0.3 },   // rear drive 2
  ];

  for (const ax of axles) {
    for (const sx of [-1, 1]) {
      const offsets = ax.dual ? [-0.05, 0.05] : [0];
      for (const ox of offsets) {
        const xPos = sx * 0.76 + ox * sx;
        const tire = new THREE.Mesh(
          new THREE.CylinderGeometry(ax.r, ax.r, ax.dual ? 0.14 : 0.24, 20),
          rubberMat(),
        );
        tire.rotation.z = Math.PI / 2;
        tire.position.set(xPos, ax.r, ax.z);
        tire.castShadow = true;
        g.add(tire);
        wheels.push(tire);

        const tread = new THREE.Mesh(
          new THREE.TorusGeometry(ax.r, 0.035, 4, 20),
          mat(0x101010, { roughness: 0.95 }),
        );
        tread.rotation.y = Math.PI / 2;
        tread.position.copy(tire.position);
        g.add(tread);

        const rim = new THREE.Mesh(
          new THREE.CylinderGeometry(0.15, 0.15, ax.dual ? 0.15 : 0.25, 12),
          chromeMat(),
        );
        rim.rotation.z = Math.PI / 2;
        rim.position.copy(tire.position);
        g.add(rim);

        const hubCap = new THREE.Mesh(
          new THREE.CylinderGeometry(0.06, 0.06, ax.dual ? 0.16 : 0.26, 8),
          mat(0x888888, { metalness: 0.7 }),
        );
        hubCap.rotation.z = Math.PI / 2;
        hubCap.position.copy(tire.position);
        g.add(hubCap);

        for (let a = 0; a < 6; a++) {
          const ang = (a / 6) * Math.PI * 2;
          const lug = new THREE.Mesh(
            new THREE.CylinderGeometry(0.014, 0.014, ax.dual ? 0.16 : 0.26, 5),
            chromeMat(),
          );
          lug.rotation.z = Math.PI / 2;
          lug.position.set(xPos, tire.position.y + Math.sin(ang) * 0.1, ax.z + Math.cos(ang) * 0.1);
          g.add(lug);
        }
      }
    }
  }

  /* ─── CHASSIS FRAME ─── */
  for (const sx of [-1, 1]) {
    const rail = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.2, 3.9),
      mat(D, { roughness: 0.7, metalness: 0.4 }),
    );
    rail.position.set(sx * 0.38, 0.55, -0.1);
    rail.castShadow = true;
    g.add(rail);
  }
  for (const cz of [-1.1, -0.3, 0.4, 1.0]) {
    const cross = new THREE.Mesh(
      new THREE.BoxGeometry(0.86, 0.1, 0.1),
      mat(D, { roughness: 0.7, metalness: 0.3 }),
    );
    cross.position.set(0, 0.52, cz);
    g.add(cross);
  }

  /* ─── CAB-OVER-ENGINE CABIN ─── */
  const cabGroup = new THREE.Group();
  cabGroup.position.set(0, 0.64, -1.25);

  const cabBody = new THREE.Mesh(
    new THREE.BoxGeometry(1.48, 0.95, 1.15),
    paintMat(G),
  );
  cabBody.position.set(0, 0.55, 0);
  cabBody.castShadow = true;
  cabGroup.add(cabBody);

  const cabRoof = new THREE.Mesh(
    new THREE.BoxGeometry(1.52, 0.06, 1.2),
    paintMat(GD),
  );
  cabRoof.position.set(0, 1.06, 0);
  cabRoof.castShadow = true;
  cabGroup.add(cabRoof);

  const visor = new THREE.Mesh(
    new THREE.BoxGeometry(1.44, 0.04, 0.3),
    paintMat(GD),
  );
  visor.position.set(0, 1.08, -0.65);
  visor.rotation.x = -0.2;
  cabGroup.add(visor);

  /* LAMACO Blue accent stripe */
  const cabStripe = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.06, 0.03),
    paintMat(B),
  );
  cabStripe.position.set(0, 0.3, -0.585);
  cabGroup.add(cabStripe);

  /* windshield */
  const glassM = glassMat();

  const windshield = new THREE.Mesh(
    new THREE.BoxGeometry(1.28, 0.58, 0.04),
    glassM,
  );
  windshield.position.set(0, 0.68, -0.58);
  cabGroup.add(windshield);

  const wsDivider = new THREE.Mesh(
    new THREE.BoxGeometry(0.03, 0.6, 0.03),
    mat(0x1a1a1a),
  );
  wsDivider.position.set(0, 0.68, -0.59);
  cabGroup.add(wsDivider);

  for (const sx of [-1, 1]) {
    const wsFrame = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.62, 0.03),
      mat(0x1a1a1a),
    );
    wsFrame.position.set(sx * 0.66, 0.68, -0.59);
    cabGroup.add(wsFrame);
  }

  /* rear window */
  const rearWin = new THREE.Mesh(
    new THREE.BoxGeometry(1.0, 0.38, 0.04),
    glassM,
  );
  rearWin.position.set(0, 0.75, 0.58);
  cabGroup.add(rearWin);

  /* side windows + doors + mirrors + steps */
  for (const sx of [-1, 1]) {
    const sideWin = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.5, 0.78),
      glassM,
    );
    sideWin.position.set(sx * 0.745, 0.68, -0.1);
    cabGroup.add(sideWin);

    const doorLine = new THREE.Mesh(
      new THREE.BoxGeometry(0.01, 0.9, 0.04),
      mat(0x111111),
    );
    doorLine.position.set(sx * 0.75, 0.55, 0.15);
    cabGroup.add(doorLine);

    const doorHandle = new THREE.Mesh(
      new THREE.BoxGeometry(0.01, 0.03, 0.1),
      chromeMat(),
    );
    doorHandle.position.set(sx * 0.76, 0.48, 0.05);
    cabGroup.add(doorHandle);

    /* Shacman mirrors */
    const mirrorArm = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.025, 0.025),
      chromeMat(),
    );
    mirrorArm.position.set(sx * 0.92, 0.8, -0.45);
    cabGroup.add(mirrorArm);

    const mirrorHead = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.16, 0.08),
      mat(0x1a1a1a),
    );
    mirrorHead.position.set(sx * 1.12, 0.78, -0.45);
    cabGroup.add(mirrorHead);

    const mirrorGlass = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.14, 0.01),
      glassM,
    );
    mirrorGlass.position.set(sx * 1.12, 0.78, -0.5);
    cabGroup.add(mirrorGlass);

    /* dual cab steps */
    const stepMat = mat(0x444444, { roughness: 0.8, metalness: 0.5 });
    const step1 = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.035, 0.18), stepMat);
    step1.position.set(sx * 0.76, 0.08, -0.1);
    cabGroup.add(step1);

    const step2 = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.035, 0.18), stepMat);
    step2.position.set(sx * 0.76, -0.12, -0.1);
    cabGroup.add(step2);

    /* grab handle */
    const grab = new THREE.Mesh(
      new THREE.CylinderGeometry(0.014, 0.014, 0.55, 6),
      chromeMat(),
    );
    grab.position.set(sx * 0.75, 0.62, -0.55);
    cabGroup.add(grab);
  }

  g.add(cabGroup);

  /* ─── FRONT FACE ─── */
  const bumper = new THREE.Mesh(
    new THREE.BoxGeometry(1.52, 0.22, 0.14),
    chromeMat(),
  );
  bumper.position.set(0, 0.58, -1.94);
  bumper.castShadow = true;
  g.add(bumper);

  const frontPanel = new THREE.Mesh(
    new THREE.BoxGeometry(1.48, 0.35, 0.06),
    paintMat(G),
  );
  frontPanel.position.set(0, 1.05, -1.87);
  g.add(frontPanel);

  /* grille */
  const grilleBody = new THREE.Mesh(
    new THREE.BoxGeometry(1.0, 0.32, 0.06),
    mat(0x1a1a1a, { metalness: 0.4 }),
  );
  grilleBody.position.set(0, 0.88, -1.89);
  g.add(grilleBody);

  const grilleFrame = new THREE.Mesh(
    new THREE.BoxGeometry(1.08, 0.36, 0.03),
    paintMat(B),
  );
  grilleFrame.position.set(0, 0.88, -1.905);
  g.add(grilleFrame);

  for (let i = -4; i <= 4; i++) {
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(0.025, 0.28, 0.025),
      chromeMat(),
    );
    bar.position.set(i * 0.1, 0.88, -1.895);
    g.add(bar);
  }
  for (let i = -1; i <= 1; i++) {
    const hbar = new THREE.Mesh(
      new THREE.BoxGeometry(0.95, 0.025, 0.025),
      chromeMat(),
    );
    hbar.position.set(0, 0.88 + i * 0.1, -1.895);
    g.add(hbar);
  }

  /* headlights */
  for (const sx of [-1, 1]) {
    const hlHousing = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.16, 0.08),
      mat(0x222222),
    );
    hlHousing.position.set(sx * 0.62, 0.94, -1.89);
    g.add(hlHousing);

    const hlLens = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, 0.12, 0.02),
      new THREE.MeshStandardMaterial({
        color: 0xffffee, emissive: 0xffffaa, emissiveIntensity: 0.6,
        transparent: true, opacity: 0.9,
      }),
    );
    hlLens.position.set(sx * 0.62, 0.94, -1.94);
    g.add(hlLens);

    const turnSig = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.06, 0.025),
      new THREE.MeshStandardMaterial({
        color: 0xffaa00, emissive: 0xff8800, emissiveIntensity: 0.3,
      }),
    );
    turnSig.position.set(sx * 0.62, 0.78, -1.92);
    g.add(turnSig);

    const fog = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.03, 8),
      new THREE.MeshStandardMaterial({
        color: 0xffffcc, emissive: 0xffff88, emissiveIntensity: 0.25,
        transparent: true, opacity: 0.8,
      }),
    );
    fog.rotation.x = Math.PI / 2;
    fog.position.set(sx * 0.55, 0.62, -1.96);
    g.add(fog);
  }

  /* ─── REAR ─── */
  for (const sx of [-1, 1]) {
    const tailLight = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.12, 0.03),
      new THREE.MeshStandardMaterial({
        color: 0xff2200, emissive: 0xcc0000, emissiveIntensity: 0.4,
      }),
    );
    tailLight.position.set(sx * 0.6, 0.88, 2.05);
    g.add(tailLight);

    const mudFlap = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.28, 0.02),
      rubberMat(),
    );
    mudFlap.position.set(sx * 0.76, 0.2, 1.4);
    g.add(mudFlap);
  }

  /* chevron bumper guard */
  const rearGuard = new THREE.Mesh(
    new THREE.BoxGeometry(1.45, 0.2, 0.06),
    mat(0xdddddd),
  );
  rearGuard.position.set(0, 0.5, 2.08);
  g.add(rearGuard);

  for (let ci = 0; ci < 8; ci++) {
    const chevron = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, 0.16, 0.02),
      mat(ci % 2 === 0 ? 0xcc2222 : 0xeeeeee),
    );
    chevron.position.set(-0.56 + ci * 0.16, 0.5, 2.1);
    g.add(chevron);
  }

  /* ─── DUMP BED ─── */
  const bed = new THREE.Group();
  bed.position.set(0, 0.64, 0.15);

  const bedFloor = new THREE.Mesh(
    new THREE.BoxGeometry(1.35, 0.1, 2.55),
    paintMat(G),
  );
  bedFloor.position.set(0, 0.35, 0.6);
  bedFloor.castShadow = true;
  bed.add(bedFloor);

  const bedBack = new THREE.Mesh(
    new THREE.BoxGeometry(1.35, 0.68, 0.08),
    paintMat(G),
  );
  bedBack.position.set(0, 0.74, 1.88);
  bedBack.castShadow = true;
  bed.add(bedBack);

  /* side walls + ribs + blue stripe */
  for (const sx of [-1, 1]) {
    const sideWall = new THREE.Mesh(
      new THREE.BoxGeometry(0.07, 0.68, 2.55),
      paintMat(G),
    );
    sideWall.position.set(sx * 0.65, 0.74, 0.6);
    sideWall.castShadow = true;
    bed.add(sideWall);

    const blueStripe = new THREE.Mesh(
      new THREE.BoxGeometry(0.02, 0.08, 2.53),
      paintMat(B),
    );
    blueStripe.position.set(sx * 0.685, 0.98, 0.6);
    bed.add(blueStripe);

    for (let ri = 0; ri < 5; ri++) {
      const ribZ = -0.5 + ri * 0.55;
      const rib  = new THREE.Mesh(
        new THREE.BoxGeometry(0.035, 0.62, 0.06),
        paintMat(GD, { clearcoat: 0.2 }),
      );
      rib.position.set(sx * 0.69, 0.74, ribZ);
      rib.castShadow = true;
      bed.add(rib);
    }

    const topRail = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.045, 2.58),
      paintMat(GD),
    );
    topRail.position.set(sx * 0.65, 1.09, 0.6);
    bed.add(topRail);
  }

  /* headboard */
  const bedFront = new THREE.Mesh(
    new THREE.BoxGeometry(1.35, 0.78, 0.08),
    paintMat(G),
  );
  bedFront.position.set(0, 0.78, -0.68);
  bedFront.castShadow = true;
  bed.add(bedFront);

  const headStripe = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 0.06, 0.02),
    paintMat(B),
  );
  headStripe.position.set(0, 1.08, -0.72);
  bed.add(headStripe);

  /* hinges */
  for (const sx of [-0.45, 0, 0.45]) {
    const hinge = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.12, 8),
      chromeMat(),
    );
    hinge.rotation.z = Math.PI / 2;
    hinge.position.set(sx, 0.35, -0.68);
    bed.add(hinge);
  }

  /* gravel load */
  const gravelColors = [0x888888, 0x777766, 0x999988, 0x6a6a5a, 0x8b8b7a];
  for (let i = 0; i < 30; i++) {
    const r   = 0.04 + Math.random() * 0.11;
    const peb = new THREE.Mesh(
      new THREE.SphereGeometry(r, 6, 5),
      mat(gravelColors[i % gravelColors.length], { roughness: 0.95 }),
    );
    peb.position.set(
      (Math.random() - 0.5) * 1.05,
      0.42 + Math.random() * 0.2,
      -0.48 + Math.random() * 2.15,
    );
    peb.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    peb.castShadow = true;
    bed.add(peb);
  }

  g.add(bed);

  /* ─── EXHAUST STACK ─── */
  const exhaustPipe = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.055, 0.75, 8),
    mat(0x444444, { metalness: 0.7, roughness: 0.4 }),
  );
  exhaustPipe.position.set(-0.7, 1.55, -0.8);
  g.add(exhaustPipe);

  const exhaustTip = new THREE.Mesh(
    new THREE.CylinderGeometry(0.065, 0.055, 0.08, 8),
    chromeMat(),
  );
  exhaustTip.position.set(-0.7, 1.96, -0.8);
  g.add(exhaustTip);

  /* exhaust smoke puffs */
  const smokeParticles = [];
  const smokeM = new THREE.MeshBasicMaterial({ color: 0xcccccc, transparent: true, opacity: 0.08 });
  for (let i = 0; i < 4; i++) {
    const smoke = new THREE.Mesh(
      new THREE.SphereGeometry(0.06 + i * 0.025, 6, 5),
      smokeM.clone(),
    );
    smoke.position.set(-0.7, 2.02 + i * 0.13, -0.8);
    smoke.userData.baseY  = smoke.position.y;
    smoke.userData.phase  = i * 1.5;
    g.add(smoke);
    smokeParticles.push(smoke);
  }

  /* ─── FUEL TANK ─── */
  const fuelTank = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 0.6, 12),
    mat(0x666666, { metalness: 0.5, roughness: 0.5 }),
  );
  fuelTank.rotation.z = Math.PI / 2;
  fuelTank.position.set(0.74, 0.65, -0.4);
  fuelTank.castShadow = true;
  g.add(fuelTank);

  const fuelCap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 0.02, 8),
    chromeMat(),
  );
  fuelCap.position.set(0.74, 0.84, -0.4);
  g.add(fuelCap);

  /* ─── LICENSE PLATE ─── */
  const plate = new THREE.Mesh(
    new THREE.BoxGeometry(0.32, 0.1, 0.015),
    mat(0xeeeeee),
  );
  plate.position.set(0, 0.62, 2.1);
  g.add(plate);

  /* ── finalize ── */
  g.userData.parts = { bed, wheels, exhaustSmoke: smokeParticles };
  g.traverse(c => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; } });
  return g;
}
