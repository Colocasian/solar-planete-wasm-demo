import { parse } from "papaparse";

export default function drawPlanets(planet_system, visuals, canvas) {
  canvas.ctx.fillStyle = "#000";
  canvas.ctx.fillRect(0, 0, canvas.width, canvas.height);
  const local_scale_down =
    visuals.scale_down / Math.min(canvas.width, canvas.height);

  parse(planet_system.output(), {
    header: false,
    fastMode: true,
    skipEmptyLines: true,
  }).data.forEach((planet, idx) => {
    canvas.ctx.fillStyle = visuals.colors[idx];
    canvas.ctx.beginPath();
    canvas.ctx.arc(
      parseFloat(planet[0]) / local_scale_down + canvas.width / 2,
      parseFloat(planet[1]) / local_scale_down + canvas.height / 2,
      visuals.radii[idx],
      0,
      2 * Math.PI
    );
    canvas.ctx.fill();
  });
}
