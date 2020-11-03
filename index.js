import drawPlanets from "./src/drawPlanets";

import("planete-wasm")
  .then(({ PlanetSystem }) => {
    const scale_down = 5e11;

    const canvas = document.getElementById("planet-canvas");

    let canvas_width = window.innerWidth;
    let canvas_height = window.innerHeight;
    const resizeCanvas = () => {
      canvas_width = window.innerWidth;
      canvas_height = window.innerHeight;
      canvas.width = Math.max(0, canvas_width - 10);
      canvas.height = Math.max(0, canvas_height - 20);
    };
    resizeCanvas();
    window.onresize = resizeCanvas;

    const ctx = canvas.getContext("2d");

    const planet_system = PlanetSystem.new();

    planet_system.add_planet(1.989e30, 0, 0, 0, 0); // Sun
    planet_system.add_planet(5.972e24, 1.52e11, 0, 0, 2.929e4); // Earth
    planet_system.add_planet(4.867e24, 1.08939e11, 0, 0, 3.478e4); // Venus
    planet_system.add_planet(3.285e23, 6.98169e10, 0, 0, 3.886e4); // Mercury
    planet_system.add_planet(6.39e23, 2.492e11, 0, 0, 2.2e4); // Mars
    planet_system.add_planet(2.2e14, -8.766e10, 0, 0, 5.458e4); // Halley's comet

    const radii = [15, 5, 4.75, 1.915, 2.66, 1];
    const colors = [
      "#fdb813",
      "#0077be",
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
