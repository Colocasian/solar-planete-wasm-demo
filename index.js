import drawPlanets from "./src/drawPlanets";

import("planete-wasm")
  .then(({ PlanetSystem }) => {
    const scale_down = 6e11;

    const canvas = document.getElementById("planet-canvas");

    let canvas_width = window.innerWidth;
    let canvas_height = window.innerHeight;
    const resizeCanvas = () => {
      canvas_width = window.innerWidth;
      canvas_height = window.innerHeight;
      canvas.width = Math.max(40, canvas_width - 10);
      canvas.height = Math.max(30, canvas_height - 20);
    };
    resizeCanvas();
    window.onresize = resizeCanvas;

    const ctx = canvas.getContext("2d");

    const planet_system = PlanetSystem.new();

    planet_system.add_planet(1.989e30, 0, 0, 0, 0); // Sun
    // Earth
    planet_system.add_planet(
      5.972e24,
      148056363673.96326,
      34399319406.68505,
      -6628.658325143456,
      28530.07165796305
    );
    // Venus
    planet_system.add_planet(
      4.867e24,
      81628272145.29555,
      72142434860.3065,
      -23032.28306154325,
      26060.743216050996
    );
    // Mercury
    planet_system.add_planet(
      3.285e23,
      68108797701.21348,
      -15348980464.68162,
      8543.223501151266,
      37909.272377735986
    );
    // Mars
    planet_system.add_planet(
      6.39e23,
      -101199813225.89308,
      -227726234332.025,
      20104.242196246185,
      -8934.172917213675
    );
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
