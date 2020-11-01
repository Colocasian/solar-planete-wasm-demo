import drawPlanets from "./src/drawPlanets";

import("planete-wasm")
  .then(({ PlanetSystem }) => {
    const scale_down = 8e8;

    const canvas = document.getElementById("planet-canvas");
    const canvas_width = 1270;
    const canvas_height = 600;
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    const ctx = canvas.getContext("2d");

    const planet_system = PlanetSystem.new();

    planet_system.add_planet(5.972e24, 1.52e11, 0, 0, 2.929e4); // Earth
    planet_system.add_planet(1.989e30, 0, 0, 0, 0); // Sun
    planet_system.add_planet(4.867e24, 1.08939e11, 0, 0, 3.478e4); // Venus
    planet_system.add_planet(3.285e23, 6.98169e10, 0, 0, 3.886e4); // Mercury
    planet_system.add_planet(6.39e23, 2.492e11, 0, 0, 2.2e4); // Mars
    planet_system.add_planet(2.2e14, -8.766e10, 0, 0, 5.458e4); // Halley's comet

    const radii = [5, 15, 4.75, 1.915, 2.66, 1];
    const colors = [
      "#0077be",
      "#fdb813",
      "#bbb7ab",
      "#e2e2e2",
      "#a1251b",
      "#fff",
    ];

    const renderLoop = () => {
      drawPlanets(
        planet_system,
        { radii: radii, colors: colors, scale_down: scale_down },
        { ctx: ctx, width: canvas_width, height: canvas_height }
      );
      planet_system.refresh();
      requestAnimationFrame(renderLoop);
    };

    drawPlanets(
      planet_system,
      { radii: radii, colors: colors, scale_down: scale_down },
      { ctx: ctx, width: canvas_width, height: canvas_height }
    );
    planet_system.refresh();
    requestAnimationFrame(renderLoop);
  })
  .catch((e) => console.error("Error importing `planete-wasm`:", e));
