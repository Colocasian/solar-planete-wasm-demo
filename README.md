<div align="center">
  <h1><code>solar-planete-wasm-demo</code></h1>

  <strong>
    A demonstration of the
    <a href="https://github.com/Colocasian/planete-wasm/" target="_blank"><code>planete-wasm</code></a>
    🦀 Rust + 🕸️ Wasm library, bundled using webpack
  </strong>

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

* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (to build the website)

#### If you want to build planete-wasm Rust project

* [Rust 1.30.0 or later](https://www.rust-lang.org/tools/install)
* [wasm-pack](https://rustwasm.github.io/wasm-pack/installer)

### Build Instructions

1. Clone git repo and update submodules
```sh
git clone --recurse-submodules https://github.com/Colocasian/solar-planete-wasm-demo.git
cd ./solar-planete-wasm-demo
```
2.
  * If you don't want to build the planete-wasm library, you can download prebuilt npm project by running `.bin/download-planete-wasm.js`. **NOTE:** *axios* is required as a dependency for the script. An archive will be downloaded in the `.bin/` directory. Extract the archive, and move `planete-wasm` npm package to `lib/planete-wasm/pkg`
```sh
# install axios
npm install --no-save axios
# run download script
cd ./.bin
./download-planete-wasm.js
# if on *nix, extract the tar.gz; if on windows, extract the zip
# move the extracted `planete-wasm/` to `lib/`
mv ./planete-wasm ../lib/planete-wasm/pkg
```
  * If you want to build `planete-wasm` library, use `wasm-pack`
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
