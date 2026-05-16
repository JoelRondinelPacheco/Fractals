#!/usr/bin/env bash

set -euo pipefail

SRC="./lib/fractal.c"
OUT="fractal.js"

EXPORTED_FUNCTIONS='["_init_display","_resize_display","_set_max_it","_set_size","_set_imag","_set_real","_set_color1","_set_color2","_render","_get_pixel_buffer","_get_width","_get_height","_zoom","_move"]'
EXPORTED_RUNTIME_METHODS='["ccall","cwrap","HEAPU8"]'

emcc "$SRC" \
  -O3 \
  -s EXPORTED_FUNCTIONS="$EXPORTED_FUNCTIONS" \
  -s EXPORTED_RUNTIME_METHODS="$EXPORTED_RUNTIME_METHODS" \
  -s INITIAL_MEMORY=16777216 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -o "$OUT"