const doc = document;
const $colorStart = doc.getElementById('color1');
const $colorEnd = doc.getElementById('color2');
const $real = doc.getElementById('real');
const $imag = doc.getElementById('imag');
const $sliderReal = doc.getElementById('sliderReal')
const $sliderImag = doc.getElementById('sliderImag')
const $iterations = doc.getElementById('iteracionesInput');
const $confirm = doc.getElementById('confBtn');
const $moveUpBtn = doc.getElementById('up');
const $moveLeftBtn = doc.getElementById('controls__left');
const $moveDownBtn = doc.getElementById('controls__down');
const $moveRightBtn = doc.getElementById('controls__right');
const $zoomInBtn = doc.getElementById('space');
const $zoomOutBtn = doc.getElementById('del');
const $hideNavBtn = doc.getElementById('ocultarNav');
const $hideConfigBtn = doc.getElementById('ocultarConfig');
const $options = doc.getElementById('options');
const $iterationsContainer = doc.getElementById('iteraciones');
const $controls = doc.getElementById('controles')
const $instruccions = doc.getElementById('instructions');
const $hideControl = doc.getElementById('ojo');
const $hideNavCtrl = doc.getElementById('ojoNav');

const $canvas = doc.getElementById('canvasF');
const canvasCtx = $canvas.getContext('2d');

let resizeTimer = null;
const initialData = {
    ...getRandomConfig(),
    maxIt: 75,
}
let fractal = window.Fractal;

window.addEventListener('load', () => {
    $canvas.width = window.innerWidth;
    $canvas.height = window.innerHeight;
    $real.value = initialData.real;
    $imag.value = initialData.imag;
    $sliderReal.value = initialData.real;
    $sliderImag.value = initialData.imag;
    $iterations.value = initialData.maxIt;
    $colorStart.value = initialData.colorStart;
    $colorEnd.value = initialData.colorEnd;
});
window.addEventListener('fractal_loaded', init);
window.addEventListener('resize', resize);
$hideConfigBtn.addEventListener('click', hideControl);
$hideNavBtn.addEventListener('click', hideNav);
$colorStart.addEventListener('change', updateStartColor);
$colorEnd.addEventListener('change', updateEndColor);
$sliderReal.addEventListener('change', updateRealSlider);
$sliderImag.addEventListener('change', updateImagSlider);
$confirm.addEventListener('click', updateIterations);
$zoomInBtn.addEventListener('click', zoomIn);
$zoomOutBtn.addEventListener('click', zoomOut);
$moveUpBtn.addEventListener('click', moveUp);
$moveDownBtn.addEventListener('click', moveDown);
$moveLeftBtn.addEventListener('click', moveLeft);
$moveRightBtn.addEventListener('click', moveRight);
["keypress", "blur"].forEach(e => {
    $real.addEventListener(e, updateReal);
    $imag.addEventListener(e, updateImag);
    $iterations.addEventListener(e, (event) => {
        if (event.key === 'Enter' || event.type == "blur") {
            updateIterations();
        }
    });
});
doc.addEventListener("keydown", (event) => {
    if (!(event.target instanceof Element)) return;

    const isFormControl = event.target.closest(
        "input, textarea, select, button, [contenteditable='true']"
    );

    if (isFormControl) return;
    switch (event.code) {
        case "Space":
            event.preventDefault();
            zoomIn();
            break;
        case "Delete":
            event.preventDefault();
            zoomOut();
            break;
        case "ArrowLeft":
            event.preventDefault();
            moveLeft();
            break;
        case "ArrowRight":
            event.preventDefault();
            moveRight();
            break;
        case "ArrowUp":
            event.preventDefault();
            moveUp();
            break;
        case "ArrowDown":
            event.preventDefault();
            moveDown();
            break;
    }
});

function hideControl() {
    $options.classList.toggle('hidden');
    $iterationsContainer.classList.toggle('hidden');
    $hideControl.classList.toggle('fa-eye-slash');
    $hideControl.classList.toggle('fa-eye');
}

function hideNav() {
    $controls.classList.toggle('hidden');
    $instruccions.classList.toggle('hidden');
    $hideNavCtrl.classList.toggle('fa-eye-slash');
    $hideNavCtrl.classList.toggle('fa-eye');
}

function updateStartColor(e) {
    const c = hexToRgb(e.target.value);
    if (!c) return;
    fractal.set_color1(c.r, c.g, c.b);
    $colorStart.blur();
    render();
}

function updateEndColor(e) {
    const c = hexToRgb(e.target.value);
    if (!c) return;
    fractal.set_color2(c.r, c.g, c.b);
    $colorEnd.blur();
    render();
}

function updateReal(event) {
    if (event.key === 'Enter' || event.type == "blur") {
        $sliderReal.value = $real.value;
        updateJuliaSet();
    }
}

function updateImag(event) {
    if (event.key === 'Enter' || event.type == "blur") {
        $sliderImag.value = $imag.value;
        updateJuliaSet();
    }
}

function updateRealSlider(event) {
    const r = Number(event.target.value);
    $real.value = r;
    updateJuliaSet();
}

function updateImagSlider(event) {
    const i = Number(event.target.value);
    $imag.value = i;
    updateJuliaSet();
}

function updateIterations() {
    const maxIt = Number($iterations.value);
    fractal.set_max_it(maxIt);
    render();
}

function init() {
    fractal = window.Fractal;
    const width = $canvas.width;
    const height = $canvas.height;
    if (!fractal) return;

    const color1 = hexToRgb($colorStart.value);
    const color2 = hexToRgb($colorEnd.value);
    fractal?.set_max_it(initialData.maxIt);
    fractal?.set_color1(color1.r, color1.g, color1.b);
    fractal?.set_color2(color2.r, color2.g, color2.b);
    fractal.set_real(initialData.real);
    fractal.set_imag(initialData.imag);
    fractal.init_display(width, height);
    render();
}

function resize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (!fractal) return;
        const width = window.innerWidth;
        const height = window.innerHeight;
        $canvas.width = width;
        $canvas.height = height;
        fractal?.resize_display(width, height);
        render();
    }, 200);
}

function zoomIn() {
    fractal.zoom(0.8);
    render();
}

function zoomOut() {
    fractal.zoom(1.2);
    render();
}

function moveLeft() {
    fractal.move("l".charCodeAt(0), 0.1);
    render();
}

function moveRight() {
    fractal.move("r".charCodeAt(0), 0.1);
    render();
}

function moveUp() {
    fractal.move("u".charCodeAt(0), 0.1);
    render();
}

function moveDown() {
    fractal.move("d".charCodeAt(0), 0.1);
    render();
}

function updateJuliaSet() {
    const r = Number($real.value);
    const i = Number($imag.value);
    fractal.set_real(r);
    fractal.set_imag(i);
    render();
}

function render() {
    fractal.render();
    const wasmWidth = fractal.get_width();
    const wasmHeight = fractal.get_height();
    const pixels = fractal.get_pixel_array();
    const img = new ImageData(pixels, wasmWidth, wasmHeight);
    canvasCtx.putImageData(img, 0, 0);
}