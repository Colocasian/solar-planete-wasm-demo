import drawPlanets from "./src/drawPlanets";

import("planete-wasm")
  .then(({ PlanetSystem }) => {
    const scale_down = 5e11;

    const canvas = document.getElementById("planet-canvas");

    let canvas_width = Math.max(50, window.innerWidth);
    let canvas_height = Math.max(50, window.innerHeight);
    const resizeCanvas = () => {
      canvas_width = Math.max(50, window.innerWidth);
      canvas_height = Math.max(50, window.innerHeight);
      canvas.width = canvas_width - 10;
      canvas.height = canvas_height - 20;
    };
    resizeCanvas();
    window.onresize = resizeCanvas;

    const ctx = canvas.getContext("2d");

    const planet_system = PlanetSystem.new();

    planet_system.add_planet(1.989e30, 0, 0, 0, 0); // Sun
    // Earth
    planet_system.add_planet(
      5.972e24,
      -34399319406.68505,
      148056363673.96326,
      -28530.07165796305,
      -6628.658325143456
    );
    // Venus
    planet_system.add_planet(
      4.867e24,
      -72142434860.3065,
      81628272145.29555,
      -26060.743216050996,
      -23032.28306154325
    );
    // Mercury
    planet_system.add_planet(
      3.285e23,
      15348980464.68162,
      68108797701.21348,
      -37909.272377735986,
      8543.223501151266
    );
    // Mars
    planet_system.add_planet(
      6.39e23,
      227726234332.025,
      -101199813225.89308,
      8934.172917213675,
      20104.242196246185
    );
    // Halley's comet
    planet_system.add_planet(
      2.2e14,
      4.383e10,
      -75915786895.7439,
      -47267.666538554666,
      -2.729e4
    );

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
