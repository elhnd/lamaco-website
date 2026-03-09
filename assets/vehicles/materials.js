/**
 * Material Factory Functions
 * ==========================
 * PBR material helpers for vehicle construction.
 * All functions return ready-to-use Three.js materials.
 */
import * as THREE from "three";
import { RUBBER, CHROME } from "./palette.js";

/** Standard PBR material */
export function mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.55,
    metalness: 0.1,
    envMapIntensity: 0.8,
    ...opts,
  });
}

/** Painted metal — clearcoat for that wet-paint / industrial look */
export function paintMat(color, opts = {}) {
  return new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.35,
    metalness: 0.15,
    clearcoat: 0.6,
    clearcoatRoughness: 0.25,
    envMapIntensity: 1.0,
    ...opts,
  });
}

/** Rubber / tire material */
export function rubberMat() {
  return new THREE.MeshStandardMaterial({
    color: RUBBER,
    roughness: 0.92,
    metalness: 0.0,
  });
}

/** Glass material */
export function glassMat() {
  return new THREE.MeshPhysicalMaterial({
    color: 0x88ccee,
    transparent: true,
    opacity: 0.35,
    roughness: 0.05,
    metalness: 0.1,
    transmission: 0.6,
    thickness: 0.1,
    envMapIntensity: 1.5,
  });
}

/** Chrome / metal accent */
export function chromeMat() {
  return new THREE.MeshStandardMaterial({
    color: CHROME,
    roughness: 0.15,
    metalness: 0.9,
    envMapIntensity: 1.2,
  });
}

/** Dirty/worn metal */
export function dirtyMat(color) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.75,
    metalness: 0.3,
  });
}
