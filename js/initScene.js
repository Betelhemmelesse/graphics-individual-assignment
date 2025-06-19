// Initialize the Three.js scene
let scene, camera, renderer, controls;

function initScene() {
  // Create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0f28);
  scene.fog = new THREE.Fog(0x0a0f28, 10, 50);

  // Create camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 10, 30);

  // Create renderer
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas"),
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;

  // Add OrbitControls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.rotateSpeed = 0.5;
  controls.autoRotate = false;
  controls.autoRotateSpeed = 0.5;
  controls.enablePan = true;
  controls.minDistance = 10;
  controls.maxDistance = 100;

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
