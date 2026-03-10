/**
 * Vehicles Controller — Slim Stimulus Orchestrator
 * ==================================================
 * Full-page transparent canvas with two autonomous roaming 3D vehicles
 * (excavator + dump truck) built from modular sub-modules.
 *
 * Controls
 * --------
 *   Click handle → take manual control
 *   Arrows       → drive the focused vehicle
 *   Tab          → switch focus
 *   Escape       → release control (vehicle resumes roaming)
 *   3 s idle     → auto-release
 */
import { Controller } from "@hotwired/stimulus";
import { createRenderer, createScene, createCamera, buildEnvMap } from "../vehicles/scene-setup.js";
import { DustSystem }        from "../vehicles/dust-system.js";
import { buildExcavator }    from "../vehicles/excavator-builder.js";
import { buildTruck }        from "../vehicles/truck-builder.js";
import { animateExcavator, animateTruck } from "../vehicles/vehicle-animation.js";

export default class extends Controller {

  /* ────────────────────────── lifecycle ────────────────────────── */
  connect() {
    if (window.innerWidth < 1024) return;
    try { this._boot(); } catch (err) { console.warn("[vehicles] init failed:", err); }
  }

  disconnect() {
    this._teardown();
  }

  _teardown() {
    this._alive = false;
    cancelAnimationFrame(this._raf);
    document.removeEventListener("keydown", this._kd);
    document.removeEventListener("keyup",   this._ku);
    window.removeEventListener("resize",    this._rs);
    document.removeEventListener("turbo:before-cache", this._cacheHandler);
    if (this._vehs) {
      for (const v of this._vehs) { v.el?.remove(); v.cleanup?.(); }
    }
    this._dust?.dispose();
    this._canvas?.remove();
    this._renderer?.dispose();
    this._renderer = null;
    this._canvas   = null;
  }

  /* ────────────────────────── boot ────────────────────────── */
  _boot() {
    this._alive = true;
    this._keys  = {};
    this._vehs  = [];
    this._focus = null;

    /* canvas */
    const c = this._canvas = document.createElement("canvas");
    c.style.cssText = "position:fixed;inset:0;z-index:9999;width:100%;height:100%;pointer-events:none;";
    document.body.appendChild(c);

    /* renderer */
    this._renderer = createRenderer(c);

    /* scene + lighting */
    const { scene, sun } = createScene();
    this._scene = scene;
    this._sun   = sun;

    /* camera */
    this._camera = createCamera();

    /* environment map */
    buildEnvMap(this._renderer, this._scene);

    /* dust */
    this._dust = new DustSystem(this._scene);

    /* spawn vehicles */
    const { hw, hh } = this._worldHalfExtents();
    this._addVehicle("excavator", buildExcavator(), -(hw * 0.72), -(hh * 0.8));
    this._addVehicle("truck",     buildTruck(),       hw * 0.72,   hh * 0.5);
    this._focus = null;

    /* handles */
    this._makeHandles();

    /* events */
    this._kd = (e) => this._onKeyDown(e);
    this._ku = (e) => { delete this._keys[e.key]; };
    this._rs = ()  => this._onResize();
    document.addEventListener("keydown", this._kd);
    document.addEventListener("keyup",   this._ku);
    window.addEventListener("resize",    this._rs);

    /* Turbo: tear down before Turbo takes a cache snapshot
       so the canvas/handles don't appear in the cached preview */
    this._cacheHandler = () => this._teardown();
    document.addEventListener("turbo:before-cache", this._cacheHandler);

    /* go */
    this._loop();
    console.log("[vehicles] ready — modular mode, canvas", innerWidth, "×", innerHeight);
  }

  /* ────────────────────────── resize ────────────────────────── */
  _onResize() {
    if (innerWidth < 1024) { this._canvas.style.display = "none"; return; }
    this._canvas.style.display = "";
    this._camera.aspect = innerWidth / innerHeight;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(innerWidth, innerHeight);
  }

  /* ────────────────────────── vehicle state ────────────────────────── */
  _addVehicle(type, mesh, x, z) {
    mesh.position.set(x, 0, z);
    this._scene.add(mesh);

    this._vehs.push({
      type, mesh,
      angle: 0,
      speed: 0,
      bounce: 0,
      parts: mesh.userData.parts || {},
      el: null,
      dragging: false,
      dragPrev: null,
      cleanup: null,
      rotOffset: type === "truck" ? Math.PI : 0,
      autonomous: true,
      _autoFixedX: x,
      _autoTargetSpeed: 0.010 + Math.random() * 0.005,
      _idleFrames: 0,
    });
  }

  /* ────────────────────────── handles ────────────────────────── */
  _makeHandles() {
    for (const v of this._vehs) {
      const el = document.createElement("div");
      el.className = "vehicle-handle";
      el.style.cssText = `
        position:fixed; z-index:10000; width:30px; height:30px;
        border-radius:50%; pointer-events:auto; cursor:grab;
        transform:translate(-50%,-50%);
        border:3px solid rgba(31,78,121,0.35);
        background:radial-gradient(circle,rgba(245,166,35,0.1) 0%,transparent 60%);
        transition:border-color .2s,box-shadow .2s;
      `;
      el.title = v.type === "excavator"
        ? "Pelleteuse — Cliquez et glissez"
        : "Benne — Cliquez et glissez";
      document.body.appendChild(el);
      v.el = el;

      const down = (e) => {
        e.preventDefault();
        v.autonomous   = false;
        v._idleFrames  = 0;
        this._focus    = v;
        v.dragging     = true;
        v.dragPrev     = { x: e.clientX ?? e.touches?.[0]?.clientX, y: e.clientY ?? e.touches?.[0]?.clientY };
        el.style.cursor = "grabbing";
        this._paintFocus();
      };
      const move = (e) => {
        if (!v.dragging) return;
        const cx = e.clientX ?? e.touches?.[0]?.clientX;
        const cy = e.clientY ?? e.touches?.[0]?.clientY;
        if (cx == null) return;
        const dx = cx - v.dragPrev.x;
        const dy = cy - v.dragPrev.y;
        v.angle -= dx * 0.018;
        v.speed  = Math.min(0.07, Math.max(-0.07, v.speed - dy * 0.0008));
        v.dragPrev = { x: cx, y: cy };
      };
      const up = () => { v.dragging = false; el.style.cursor = "grab"; };

      el.addEventListener("mousedown", down);
      el.addEventListener("touchstart", down, { passive: false });
      document.addEventListener("mousemove", move);
      document.addEventListener("touchmove", move, { passive: false });
      document.addEventListener("mouseup", up);
      document.addEventListener("touchend", up);

      v.cleanup = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("touchmove", move);
        document.removeEventListener("mouseup", up);
        document.removeEventListener("touchend", up);
      };
    }
    this._paintFocus();
  }

  _paintFocus() {
    for (const v of this._vehs) {
      if (!v.el) continue;
      const on = v === this._focus;
      v.el.style.borderColor = on ? "rgba(245,166,35,0.9)" : "rgba(31,78,121,0.35)";
      v.el.style.boxShadow   = on
        ? "0 0 18px rgba(245,166,35,0.5), inset 0 0 8px rgba(245,166,35,0.15)"
        : "0 2px 6px rgba(0,0,0,0.1)";
    }
  }

  /* ────────────────────────── keys ────────────────────────── */
  _onKeyDown(e) {
    if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)) {
      this._keys[e.key] = true;
      e.preventDefault();
      if (this._focus) this._focus._idleFrames = 0;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      if (this._focus) {
        this._focus.autonomous  = true;
        this._focus._autoFixedX = this._focus.mesh.position.x;
        this._focus._idleFrames = 0;
      }
      const i    = this._vehs.indexOf(this._focus);
      const next = this._vehs[(i + 1) % this._vehs.length];
      next.autonomous  = false;
      next._idleFrames = 0;
      this._focus = next;
      this._paintFocus();
    }
    if (e.key === "Escape" && this._focus) {
      this._focus.autonomous  = true;
      this._focus._autoFixedX = this._focus.mesh.position.x;
      this._focus._idleFrames = 0;
      this._focus = null;
      this._keys  = {};
      this._paintFocus();
    }
  }

  _applyKeys() {
    const v = this._focus;
    if (!v || v.autonomous) return;
    if (this._keys["ArrowUp"])    v.speed = Math.min(v.speed + 0.006, 0.07);
    if (this._keys["ArrowDown"])  v.speed = Math.max(v.speed - 0.006, -0.07);
    if (this._keys["ArrowLeft"])  v.angle += 0.045;
    if (this._keys["ArrowRight"]) v.angle -= 0.045;
  }

  /* ────────────────────────── projection / bounds ──────────────────── */
  _project(pos) {
    const v = pos.clone().project(this._camera);
    return {
      x: ( v.x * 0.5 + 0.5) * innerWidth,
      y: (-v.y * 0.5 + 0.5) * innerHeight,
    };
  }

  _worldHalfExtents() {
    const fov   = this._camera.fov * Math.PI / 180;
    const camY  = this._camera.position.y;
    const halfH = Math.tan(fov / 2) * camY;
    const halfW = halfH * this._camera.aspect;
    return { hw: halfW + 2, hh: halfH + 2 };
  }

  /* ────────────────────────── animation loop ────────────────────────── */
  _loop() {
    if (!this._alive) return;
    this._raf = requestAnimationFrame(() => this._loop());

    this._applyKeys();

    const t = performance.now() * 0.001;
    const { hw, hh } = this._worldHalfExtents();

    for (const v of this._vehs) {
      /* autonomous straight-line driving */
      if (v.autonomous) {
        v.angle += (0 - v.angle) * 0.08;
        v.speed += (v._autoTargetSpeed - v.speed) * 0.02;
        v.mesh.position.x += (v._autoFixedX - v.mesh.position.x) * 0.04;
      }

      /* idle detection → auto-release */
      if (v === this._focus && !v.autonomous) {
        const anyInput = v.dragging || Object.keys(this._keys).length > 0;
        if (anyInput) v._idleFrames = 0; else v._idleFrames++;
        if (v._idleFrames > 180) {
          v.autonomous  = true;
          v._autoFixedX = v.mesh.position.x;
          this._focus   = null;
          this._paintFocus();
        }
      }

      /* friction */
      v.speed *= v.autonomous ? 0.988 : 0.962;

      /* move */
      v.mesh.position.x += Math.sin(v.angle) * v.speed;
      v.mesh.position.z += Math.cos(v.angle) * v.speed;
      v.mesh.rotation.y  = v.angle + (v.rotOffset || 0);

      /* suspension bounce */
      v.bounce += Math.abs(v.speed) * 2.5;
      v.mesh.position.y = Math.sin(v.bounce) * Math.min(Math.abs(v.speed) * 0.8, 0.06);

      /* body tilt */
      v.mesh.rotation.z *= 0.95;
      if (v === this._focus && !v.autonomous) {
        const turnRate   = (this._keys["ArrowLeft"] ? 1 : 0) - (this._keys["ArrowRight"] ? 1 : 0);
        const tiltTarget = turnRate * 0.04 * Math.min(Math.abs(v.speed) * 10, 1);
        v.mesh.rotation.z += (tiltTarget - v.mesh.rotation.z) * 0.1;
      }

      /* wrap */
      const p = v.mesh.position;
      if (p.x >  hw) p.x = -hw;
      if (p.x < -hw) p.x =  hw;
      if (p.z >  hh) p.z = -hh;
      if (p.z < -hh) p.z =  hh;

      /* dust */
      this._dust.emit(p, v.speed);

      /* part animations (delegated to modules) */
      if (v.type === "excavator") animateExcavator(v.parts, t, v.speed);
      if (v.type === "truck")     animateTruck(v.parts, t, v.speed);

      /* update handle 2D position */
      if (v.el) {
        const s = this._project(v.mesh.position);
        v.el.style.left = s.x + "px";
        v.el.style.top  = s.y + "px";
      }
    }

    /* sun follows vehicle midpoint */
    if (this._vehs.length >= 2) {
      const mx = (this._vehs[0].mesh.position.x + this._vehs[1].mesh.position.x) / 2;
      const mz = (this._vehs[0].mesh.position.z + this._vehs[1].mesh.position.z) / 2;
      this._sun.target.position.set(mx, 0, mz);
      this._sun.target.updateMatrixWorld();
      this._sun.position.set(mx + 8, 18, mz + 6);
    }

    this._dust.update();
    this._renderer.render(this._scene, this._camera);
  }
}
