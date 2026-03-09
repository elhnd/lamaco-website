/**
 * Dust Particle System
 * ====================
 * Pooled particle system for ground dust effects behind vehicles.
 */
import * as THREE from "three";

export class DustSystem {
  /** @param {THREE.Scene} scene */
  constructor(scene) {
    this._pool   = [];
    this._active = [];

    const geo = new THREE.SphereGeometry(0.04, 4, 4);
    const mat = new THREE.MeshBasicMaterial({ color: 0xc8b89a, transparent: true, opacity: 0.6 });

    for (let i = 0; i < 40; i++) {
      const m = new THREE.Mesh(geo, mat.clone());
      m.visible = false;
      scene.add(m);
      this._pool.push(m);
    }
  }

  /**
   * Emit dust particles at a world position.
   * @param {THREE.Vector3} pos  — vehicle world position
   * @param {number}        speed — current vehicle speed
   */
  emit(pos, speed) {
    if (Math.abs(speed) < 0.03) return;
    const count = Math.min(3, Math.floor(Math.abs(speed) * 20));
    for (let i = 0; i < count; i++) {
      const p = this._pool.find(d => !d.visible);
      if (!p) return;
      p.visible = true;
      p.position.set(
        pos.x + (Math.random() - 0.5) * 1.2,
        0.1  + Math.random() * 0.3,
        pos.z + (Math.random() - 0.5) * 1.2,
      );
      p.scale.setScalar(0.5 + Math.random() * 1.0);
      p.material.opacity = 0.4 + Math.random() * 0.3;
      p.userData.life    = 0;
      p.userData.maxLife  = 30 + Math.random() * 30;
      p.userData.vy      = 0.01 + Math.random() * 0.02;
      this._active.push(p);
    }
  }

  /** Advance all active particles one frame. */
  update() {
    for (let i = this._active.length - 1; i >= 0; i--) {
      const p = this._active[i];
      p.userData.life++;
      p.position.y      += p.userData.vy;
      p.material.opacity *= 0.96;
      p.scale.setScalar(p.scale.x * 1.015);
      if (p.userData.life > p.userData.maxLife) {
        p.visible = false;
        this._active.splice(i, 1);
      }
    }
  }

  /** Dispose all particle geometries. */
  dispose() {
    this._pool.forEach(p => p.geometry.dispose());
  }
}
