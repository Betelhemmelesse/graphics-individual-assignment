// Main application
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the scene
  initScene();

  // Add lighting
  addLighting();

  // Create solar system
  createSolarSystem();

  // Initialize interaction
  initInteraction();

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Update camera animation
    updateCameraAnimation();

    // Update controls
    if (controls) controls.update();

    // Render the scene
    renderer.render(scene, camera);
  }

  animate();
});
