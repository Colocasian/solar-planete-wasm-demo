<div align="center">
  <h1><code>solar-planete-wasm-demo</code></h1>

  <strong
    >A demonstration of the
    <a href="https://github.com/Colocasian/planete-wasm/" target="_blank"><code>planete-wasm</code></a> 🦀
    Rust + 🕸️ Wasm library, bundled using webpack</strong
  >

  <h3>
    <a href="https://github.com/Colocasian/planete-wasm/"><code>planete-wasm</code></a>
    <span> | </span>
    <a href="https://Colocasian.github.io/planets">Demo</a>
  </h3>
</div>

## About

A demonstration, created with [`create-wasm-app`](https://github.com/rustwasm/create-wasm-app/) which
utilises the [`planete-wasm`](https://github.com/Colocasian/planete-wasm) library to simulate the rocky
planets of the solar system (plus a bonus Halley's comet).
**Note:** The planets' radii are not in scale with their relative distances, but the distances between their
centre are relatively in scale.

## Building and Development

### Build Prerequisites

* [Rust 1.30.0 or later](https://www.rust-lang.org/tools/install) (to build `planete-wasm`).
* [wasm-pack](https://rustwasm.github.io/wasm-pack/installer) (to build `planete-wasm`)
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (to build the website)

### Building Website

1. Clone git repo and update submodules
```sh
git clone https://github.com/Colocasian/solar-planete-wasm-demo.git
cd ./solar-planete-wasm-demo
git submodule init
git submodule update
```
2. Build `planete-wasm` WebAssembly library
```sh
cd ./lib/planete-wasm
wasm-pack build
```
3. Build the website
  * To build a production-ready bundle, build with `npm run build`. A bundle will be generated in the `dist` directory.
  * To run a local development server, do `npm run start`. This will run a dev instance of the page on [http://localhost:8080/](http://localhost:8080/).

## License

Licensed under the ISC license.

### Contributions

> This product contains software developed by
> Rishvic Pushpakaran <rishvic@gmail.com>
