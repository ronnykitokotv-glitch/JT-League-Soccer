import * as THREE from 'three';

// ============================================================
// SCÈNE 3D
// ============================================================
let scene, camera, renderer, player, clock;
let animationState = 'idle';
let animationTime = 0;

function initThreeJS() {
  const container = document.getElementById('canvas-container');
  const width = container.clientWidth;
  const height = container.clientHeight;

  // Scène
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1a2e);
  scene.fog = new THREE.Fog(0x1a1a2e, 10, 30);

  // Caméra
  camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.set(3, 2.5, 5);
  camera.lookAt(0, 1.2, 0);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // Lumières
  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
  keyLight.position.set(5, 8, 5);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x4a90d9, 0.5);
  rimLight.position.set(-5, 3, -5);
  scene.add(rimLight);

  // Sol (pelouse)
  const groundGeo = new THREE.PlaneGeometry(20, 20);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x2d6a2d, roughness: 0.9 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Créer le joueur 3D
  player = createPlayer();
  scene.add(player);

  clock = new THREE.Clock();

  // Resize
  window.addEventListener('resize', onResize);

  // Boucle
  animate();
}

// ============================================================
// CRÉATION DU JOUEUR 3D (formes basiques)
// ============================================================
function createPlayer() {
  const group = new THREE.Group();

  // Couleurs (on prend celles du club par défaut : TP Mazembe)
  const primary = 0x0033A0;   // Bleu
  const secondary = 0xFFFFFF; // Blanc
  const skin = 0x5C3A21;      // Peau foncée

  const matPrimary = new THREE.MeshStandardMaterial({ color: primary, roughness: 0.6 });
  const matSecondary = new THREE.MeshStandardMaterial({ color: secondary, roughness: 0.6 });
  const matSkin = new THREE.MeshStandardMaterial({ color: skin, roughness: 0.8 });
  const matHair = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.9 });
  const matBoot = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.4 });

  // --- TORSE (maillot) ---
  const torsoGeo = new THREE.CylinderGeometry(0.28, 0.32, 0.7, 12);
  const torso = new THREE.Mesh(torsoGeo, matPrimary);
  torso.position.y = 1.15;
  torso.castShadow = true;
  group.add(torso);

  // Numéro / bande sur le torse
  const stripeGeo = new THREE.CylinderGeometry(0.285, 0.325, 0.15, 12);
  const stripe = new THREE.Mesh(stripeGeo, matSecondary);
  stripe.position.y = 1.15;
  stripe.castShadow = true;
  group.add(stripe);

  // --- TÊTE ---
  const headGeo = new THREE.SphereGeometry(0.18, 16, 16);
  const head = new THREE.Mesh(headGeo, matSkin);
  head.position.y = 1.68;
  head.castShadow = true;
  group.add(head);

  // Cheveux
  const hairGeo = new THREE.SphereGeometry(0.185, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const hair = new THREE.Mesh(hairGeo, matHair);
  hair.position.y = 1.70;
  hair.castShadow = true;
  group.add(hair);

  // --- BRAS ---
  const armGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.55, 8);
  const armL = new THREE.Mesh(armGeo, matSkin);
  armL.position.set(-0.36, 1.15, 0);
  armL.rotation.z = 0.15;
  armL.castShadow = true;
  group.add(armL);

  const armR = new THREE.Mesh(armGeo, matSkin);
  armR.position.set(0.36, 1.15, 0);
  armR.rotation.z = -0.15;
  armR.castShadow = true;
  group.add(armR);

  // Manches (maillot)
  const sleeveGeo = new THREE.CylinderGeometry(0.075, 0.07, 0.18, 8);
  const sleeveL = new THREE.Mesh(sleeveGeo, matPrimary);
  sleeveL.position.set(-0.33, 1.38, 0);
  sleeveL.castShadow = true;
  group.add(sleeveL);

  const sleeveR = new THREE.Mesh(sleeveGeo, matPrimary);
  sleeveR.position.set(0.33, 1.38, 0);
  sleeveR.castShadow = true;
  group.add(sleeveR);

  // --- JAMBES (short) ---
  const shortGeo = new THREE.CylinderGeometry(0.12, 0.13, 0.25, 10);
  const shortL = new THREE.Mesh(shortGeo, matPrimary);
  shortL.position.set(-0.13, 0.72, 0);
  shortL.castShadow = true;
  group.add(shortL);

  const shortR = new THREE.Mesh(shortGeo, matPrimary);
  shortR.position.set(0.13, 0.72, 0);
  shortR.castShadow = true;
  group.add(shortR);

  // --- JAMBES (peau) ---
  const legGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.45, 8);
  const legL = new THREE.Mesh(legGeo, matSkin);
  legL.position.set(-0.13, 0.4, 0);
  legL.castShadow = true;
  group.add(legL);

  const legR = new THREE.Mesh(legGeo, matSkin);
  legR.position.set(0.13, 0.4, 0);
  legR.castShadow = true;
  group.add(legR);

  // --- CHAUSSURES ---
  const bootGeo = new THREE.BoxGeometry(0.12, 0.08, 0.22);
  const bootL = new THREE.Mesh(bootGeo, matBoot);
  bootL.position.set(-0.13, 0.12, 0.04);
  bootL.castShadow = true;
  group.add(bootL);

  const bootR = new THREE.Mesh(bootGeo, matBoot);
  bootR.position.set(0.13, 0.12, 0.04);
  bootR.castShadow = true;
  group.add(bootR);

  // --- BALLON À SES PIEDS ---
  const ballGeo = new THREE.SphereGeometry(0.11, 16, 16);
  const ballMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.3 });
  const ball = new THREE.Mesh(ballGeo, ballMat);
  ball.position.set(0.2, 0.11, 0.35);
  ball.castShadow = true;
  group.add(ball);

  return group;
}

// ============================================================
// ANIMATION (idle : léger balancement)
// ============================================================
function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  animationTime += delta;

  if (player) {
    // Balancement doux du joueur (respiration)
    player.position.y = Math.sin(animationTime * 2) * 0.02;
    player.rotation.y = Math.sin(animationTime * 0.5) * 0.05;
  }

  // Caméra qui tourne légèrement autour du joueur
  if (camera) {
    const angle = Math.sin(animationTime * 0.2) * 0.15;
    camera.position.x = 3 + Math.sin(angle) * 0.5;
    camera.lookAt(0, 1.2, 0);
  }

  renderer.render(scene, camera);
}

function onResize() {
  const container = document.getElementById('canvas-container');
  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

// ============================================================
// NAVIGATION ENTRE ÉCRANS
// ============================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  if (id === 'match-screen') {
    // Initialiser Three.js seulement quand on entre dans l'écran de match
    if (!renderer) {
      // Petit délai pour que le DOM soit prêt
      setTimeout(() => initThreeJS(), 50);
    } else {
      onResize();
    }
  }
}

// Attendre que le DOM soit prêt
window.addEventListener('DOMContentLoaded', () => {
  // Boutons du menu
  document.querySelectorAll('[data-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      showScreen('match-screen');
    });
  });

  // Bouton retour
  document.getElementById('back-btn').addEventListener('click', () => {
    showScreen('menu-screen');
  });

  // Changement de ligue : on peut afficher un aperçu
  document.getElementById('league-select').addEventListener('change', (e) => {
    const league = LEAGUES[e.target.value];
    if (league) {
      document.querySelector('.stars').textContent =
        `${league.flag} ${league.name} — ${league.stars} ★`;
    }
  });
});
