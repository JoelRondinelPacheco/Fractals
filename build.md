clang --target=wasm32-unknown-unknown -O3 -nostdlib \
  -Wl,--no-entry \
  -Wl,--export-all \
  -o fractal.wasm fractal.c