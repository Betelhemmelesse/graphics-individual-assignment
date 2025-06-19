// Handle camera animation
function updateCameraAnimation() {
  // Animate planets
  planets.forEach((planetGroup) => {
    planetGroup.rotation.y += planetGroup.userData.speed;
  });
}
