// Add lighting to the scene
let ambientLight, sunLight;

function addLighting() {
  // Ambient light for general illumination
  ambientLight = new THREE.AmbientLight(0x333333, 0.5);
  scene.add(ambientLight);

  // Sun light (point light at the center)
  sunLight = new THREE.PointLight(0xffffff, 1.5, 100);
  sunLight.position.set(0, 0, 0);
  sunLight.castShadow = true;
  scene.add(sunLight);

  // Additional directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(5, 10, 7);
  scene.add(directionalLight);
}
