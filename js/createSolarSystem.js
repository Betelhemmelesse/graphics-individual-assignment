// Create the solar system
let solarSystem,
  planets = [];
let celestialBodies = [];

function createSolarSystem() {
  solarSystem = new THREE.Group();
  scene.add(solarSystem);

  // Create sun
  const sunGeometry = new THREE.SphereGeometry(4, 32, 32);
  const sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    emissive: 0xffff00,
    emissiveIntensity: 0.5,
  });
  const sun = new THREE.Mesh(sunGeometry, sunMaterial);
  sun.name = "Sun";
  solarSystem.add(sun);

  // Add sun to celestial bodies
  celestialBodies.push(sun);

  // Planet data
  const planetData = [
    { name: "Mercury", radius: 0.4, distance: 6, color: 0xaaaaaa, speed: 0.01 },
    { name: "Venus", radius: 0.9, distance: 9, color: 0xffaa33, speed: 0.007 },
    { name: "Earth", radius: 1.0, distance: 12, color: 0x3366ff, speed: 0.005 },
    { name: "Mars", radius: 0.5, distance: 15, color: 0xff6633, speed: 0.004 },
    {
      name: "Jupiter",
      radius: 2.2,
      distance: 20,
      color: 0xffcc99,
      speed: 0.003,
    },
    {
      name: "Saturn",
      radius: 1.8,
      distance: 26,
      color: 0xffff99,
      speed: 0.002,
      hasRings: true,
    },
    {
      name: "Uranus",
      radius: 1.4,
      distance: 32,
      color: 0x99ccff,
      speed: 0.0015,
    },
    {
      name: "Neptune",
      radius: 1.4,
      distance: 36,
      color: 0x3333ff,
      speed: 0.001,
    },
  ];

  // Create planets
  planetData.forEach((data) => {
    const planetGroup = new THREE.Group();
    solarSystem.add(planetGroup);

    // Create orbit path (circle)
    const orbitGeometry = new THREE.RingGeometry(
      data.distance - 0.05,
      data.distance + 0.05,
      64
    );
    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.2,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2;
    orbit.name = `${data.name} Orbit`;
    planetGroup.add(orbit);

    // Create planet
    const planetGeometry = new THREE.SphereGeometry(data.radius, 32, 32);
    const planetMaterial = new THREE.MeshStandardMaterial({
      color: data.color,
      metalness: 0.3,
      roughness: 0.7,
    });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planet.position.x = data.distance;
    planet.castShadow = true;
    planet.receiveShadow = true;
    planet.name = data.name;
    planet.userData = {
      type: "Planet",
      diameter: `${(data.radius * 2).toFixed(1)} units`,
      distance: `${data.distance} units`,
      description: getPlanetDescription(data.name),
    };
    planetGroup.add(planet);

    // Add planet to celestial bodies
    celestialBodies.push(planet);

    // Add rings for Saturn
    if (data.hasRings) {
      const ringGeometry = new THREE.RingGeometry(
        data.radius + 0.5,
        data.radius + 2,
        32
      );
      const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0xffff99,
        side: THREE.DoubleSide,
        metalness: 0.5,
        roughness: 0.5,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      ring.name = "Saturn's Ring";

      // Add ring data
      ring.userData = {
        type: "Planetary Ring",
        diameter: `${((data.radius + 2) * 2).toFixed(1)} units`,
        distance: `${data.distance} units`,
        description:
          "Iconic ring system composed of ice particles and rock debris",
      };

      planet.add(ring);

      // Add ring to celestial bodies
      celestialBodies.push(ring);
    }

    // Store for animation
    planetGroup.userData = { speed: data.speed };
    planets.push(planetGroup);
  });

  // Add info for sun
  sun.userData = {
    type: "Star",
    diameter: "8 units",
    distance: "0 units",
    description: "The central star of our solar system",
  };
}

function getPlanetDescription(name) {
  const descriptions = {
    Mercury: "The smallest and innermost planet in the Solar System",
    Venus:
      "The second planet from the Sun, named after the Roman goddess of love and beauty",
    Earth:
      "Our home planet, the third planet from the Sun and the only astronomical object known to harbor life",
    Mars: "The fourth planet from the Sun and the second-smallest planet in the Solar System",
    Jupiter:
      "The fifth planet from the Sun and the largest in the Solar System",
    Saturn:
      "The sixth planet from the Sun and the second-largest in the Solar System, known for its rings",
    Uranus: "The seventh planet from the Sun, an ice giant",
    Neptune: "The eighth and farthest-known planet from the Sun",
  };

  return descriptions[name] || "A planet in our solar system";
}
