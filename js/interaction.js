// Handle mouse interactions
let raycaster, mouse;
let currentIntersect = null;

function initInteraction() {
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // Event listeners
  document.getElementById("canvas").addEventListener("click", onCanvasClick);
  document.addEventListener("mousemove", onMouseMove);

  // UI controls
  document
    .getElementById("auto-rotate-btn")
    .addEventListener("click", toggleAutoRotate);
  document
    .getElementById("reset-view-btn")
    .addEventListener("click", resetView);
  document
    .getElementById("toggle-orbits-btn")
    .addEventListener("click", toggleOrbits);
}

function onMouseMove(event) {
  // Calculate mouse position in normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the raycaster
  raycaster.setFromCamera(mouse, camera);

  // Calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    const object = intersects[0].object;

    // Skip orbits
    if (object.name.includes("Orbit")) return;

    // Highlight effect
    if (currentIntersect !== object) {
      if (currentIntersect) {
        currentIntersect.material.emissive.setHex(
          currentIntersect.userData.originalEmissive || 0x000000
        );
      }

      currentIntersect = object;
      currentIntersect.userData.originalEmissive =
        currentIntersect.material.emissive.getHex();
      currentIntersect.material.emissive.setHex(0x333333);
    }
  } else {
    if (currentIntersect) {
      currentIntersect.material.emissive.setHex(
        currentIntersect.userData.originalEmissive || 0x000000
      );
      currentIntersect = null;
    }
  }
}

function onCanvasClick() {
  if (currentIntersect) {
    // Show info panel
    const infoPanel = document.getElementById("info-panel");
    const planetName = document.getElementById("planet-name");
    const planetInfo = document.getElementById("planet-info");
    const planetType = document.getElementById("planet-type");
    const planetDiameter = document.getElementById("planet-diameter");
    const planetDistance = document.getElementById("planet-distance");

    planetName.textContent = currentIntersect.name;
    planetInfo.textContent =
      currentIntersect.userData.description || "Celestial body information";
    planetType.textContent = currentIntersect.userData.type || "Unknown";
    planetDiameter.textContent =
      currentIntersect.userData.diameter || "Unknown";
    planetDistance.textContent =
      currentIntersect.userData.distance || "Unknown";

    infoPanel.classList.add("visible");

    // Click animation
    const originalScale = currentIntersect.scale.clone();
    currentIntersect.scale.multiplyScalar(1.2);

    setTimeout(() => {
      currentIntersect.scale.copy(originalScale);
    }, 300);
  }
}

function toggleAutoRotate() {
  controls.autoRotate = !controls.autoRotate;
  const btn = document.getElementById("auto-rotate-btn");
  btn.classList.toggle("active");
  btn.textContent = `Auto-Rotate: ${controls.autoRotate ? "ON" : "OFF"}`;
}

function resetView() {
  camera.position.set(0, 10, 30);
  camera.lookAt(0, 0, 0);
  controls.reset();
}

function toggleOrbits() {
  scene.traverse((object) => {
    if (object.name.includes("Orbit")) {
      object.visible = !object.visible;
    }
  });
}
