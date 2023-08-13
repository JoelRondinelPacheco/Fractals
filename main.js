import renderizarCanvas from './js/renderizarCanva.js'

const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const titulo = document.getElementById('title');
const real = document.getElementById('real');
const imag = document.getElementById('imag');
const sliderReal = document.getElementById('sliderReal')
const sliderImag = document.getElementById('sliderImag')
const canvas = document.getElementById('canvasF');
const itInput = document.getElementById('iteracionesInput');
const confirmarBtn = document.getElementById('confBtn');
const contexto = canvas.getContext('2d');
//Botones
const botonDel = document.getElementById('del');
const botonUp = document.getElementById('up');
const botonLeft = document.getElementById('controls__left');
const botonDown = document.getElementById('controls__down');
const botonRight = document.getElementById('controls__right');
const botonSpace = document.getElementById('space');
const activador = document.getElementById('active');
const ocultarNav = document.getElementById('ocultarNav');
const ocultarConfig = document.getElementById('ocultarConfig');

//Containers Options
const options = document.getElementById('options');
const iteraciones = document.getElementById('iteraciones');
const download = document.getElementById('download');
//Containers Nav
const controles = document.getElementById('controles')
const instructions = document.getElementById('instructions');


//OJos
const ojo = document.getElementById('ojo');
const ojoNav = document.getElementById('ojoNav');

// Download

const download760 = document.getElementById("760")
const download1080 = document.getElementById("1080")
const download4k = document.getElementById("4k")
/*
TODO:
    Al hacer click en activar nav, que se ilume el texto de los controles
    Agregarle un fractal random (o random, pero predeterminados)
    Agregar funcionalidad de descargar
    Agregar funcionalidad de ocultar paneles
    ORDEN DE CARGA DE LA PAGINA, buscar window events para asegurarse que carga bien
*/
var width = window.innerWidth
var height = window.innerHeight
canvas.width = width;
canvas.height = height;

const datosImag = contexto.getImageData(0, 0, width, height);
console.log(datosImag)
var data = datosImag.data;

var color1V = hexToRgb(color1.value);
var color2V = hexToRgb(color2.value);
var coloresRender;

var datos = {
    cR: 0.35,
    cI: 0.45,
    maxIt: 50,
    colores: [color1V, color2V],
    anchoInicial: 6,
}
var movV = 0;
var movH = 0;

var altoInicial = datos.anchoInicial * canvas.height / canvas.width;

window.addEventListener('load', function () {
    titulo.style.color = String(color1.value);
    titulo.style.backgroundColor = String(color2.value);
    coloresRender = setColores(datos.maxIt, datos.colores)
    datosImag.setData = renderizarCanvas(datos, altoInicial, movV, movH, coloresRender, 100, width, height, data);
    contexto.putImageData(datosImag, 0, 0)
    canvas.focus();
})

real.value = datos.cR;
imag.value = datos.cI;
sliderReal.value = datos.cR;
sliderImag.value = datos.cI;
itInput.value = datos.maxIt;

//Ocultar
ocultarConfig.addEventListener('click', () => {
    options.classList.toggle('hidden');
    iteraciones.classList.toggle('hidden');
    download.classList.toggle('hidden');
    ojo.classList.toggle('fa-eye-slash');
    ojo.classList.toggle('fa-eye');
    canvas.focus();
})
ocultarNav.addEventListener('click', () => {
    controles.classList.toggle('hidden');
    instructions.classList.toggle('hidden');
    ojoNav.classList.toggle('fa-eye-slash');
    ojoNav.classList.toggle('fa-eye');
    canvas.focus();
})

confirmarBtn.addEventListener('click', () => {
    datos.cR = Number(real.value);
    datos.cI = Number(imag.value);
    sliderReal.value = datos.cR;
    sliderImag.value = datos.cI;
    datos.maxIt = Number(itInput.value);
    coloresRender = setColores(datos.maxIt, datos.colores);
    datosImag.setData = renderizarCanvas(datos, altoInicial, movV, movH, coloresRender, 100, width, height, data);
    contexto.putImageData(datosImag, 0, 0)
    canvas.focus();
})

// Cambio de colores
color1.addEventListener('change', function () {
    color1V = hexToRgb(color1.value);
    titulo.style.color = String(color1.value);
    titulo.style.backgroundColor = String(color2.value);
    datos.colores = [color1V, color2V];
    coloresRender = setColores(datos.maxIt, datos.colores);
    datosImag.setData = renderizarCanvas(datos, altoInicial, movV, movH, coloresRender, 100, width, height, data);
    contexto.putImageData(datosImag, 0, 0)
    canvas.focus();
})
real.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        datos.cR = Number(real.value)
        sliderReal.value = datos.cR
        datosImag.setData = renderizarCanvas(datos, altoInicial, movV, movH, coloresRender, 100, width, height, data);
        contexto.putImageData(datosImag, 0, 0)
        canvas.focus();
    }
})

imag.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        datos.cI = Number(imag.value)
        sliderImag.value = datos.cI
        datosImag.setData = renderizarCanvas(datos, altoInicial, movV, movH, coloresRender, 100, width, height, data);
        contexto.putImageData(datosImag, 0, 0)
        canvas.focus();
    }
})

itInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        datos.maxIt = Number(itInput.value);
        datosImag.setData = renderizarCanvas(datos, altoInicial, movV, movH, coloresRender, 100, width, height, data);
        contexto.putImageData(datosImag, 0, 0)
        canvas.focus();
    }
})

color2.addEventListener('change', function () {
    titulo.style.color = String(color1.value);
    titulo.style.backgroundColor = String(color2.value);
    color2V = hexToRgb(color2.value);
    datos.colores = [color1V, color2V];
    coloresRender = setColores(datos.maxIt, datos.colores);
    datosImag.setData = renderizarCanvas(datos, altoInicial, movV, movH, coloresRender, 100, width, height, data);
    contexto.putImageData(datosImag, 0, 0)
    canvas.focus();
})

// Cambio de forma
sliderReal.addEventListener('change', function (event) {
    datos.cR = Number(event.target.value);
    real.value = datos.cR;
    datosImag.setData = renderizarCanvas(datos, altoInicial, movV, movH, coloresRender, 100, width, height, data);
    contexto.putImageData(datosImag, 0, 0)
});
sliderImag.addEventListener('change', function (event) {
    datos.cI = Number(event.target.value);
    imag.value = datos.cI;
    datosImag.setData = renderizarCanvas(datos, altoInicial, movV, movH, coloresRender, 100, width, height, data);
    contexto.putImageData(datosImag, 0, 0)
});

// Moviento
canvas.addEventListener("keydown", (e) => {
    if (e.key == ' ') {
        zoomIn();
    } else if (e.key == 'ArrowLeft') {
        moveLeft();
    } else if (e.key == 'ArrowRight') {
        moveRight();
    } else if (e.key == 'ArrowUp') {
        moveUp();
    } else if (e.key == 'ArrowDown') {
        moveDown();
    } else if (e.key == 'Delete') {
        zoomOut();
    }
});
botonSpace.addEventListener('click', zoomIn);
botonDel.addEventListener('click', zoomOut);
botonUp.addEventListener('click', moveUp);
botonDown.addEventListener('click', moveDown);
botonLeft.addEventListener('click', moveLeft);
botonRight.addEventListener('click', moveRight);
activador.addEventListener('click', () => {
    canvas.focus();
})

// Download
download760.addEventListener("click", () => {
    const dataURL = canvas.toDataURL()
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'miImagen.png'; // Nombre del archivo para guardar
    link.click();
})


//UTILIDADES
function zoomIn() {
    datos.anchoInicial = datos.anchoInicial * 0.8;
    altoInicial = datos.anchoInicial * canvas.height / canvas.width;
    datosImag.setData = renderizarCanvas(datos, altoInicial, movV, movH, coloresRender, 100, width, height, data);
    contexto.putImageData(datosImag, 0, 0)
    canvas.focus();
}
function moveLeft() {
    movH = movH - 0.1 * datos.anchoInicial;
    datosImag.setData = renderizarCanvas(datos, altoInicial, movV, movH, coloresRender, 100, width, height, data);
    contexto.putImageData(datosImag, 0, 0)
    canvas.focus();
}
function moveRight() {
    movH = movH + 0.1 * datos.anchoInicial;
    datosImag.setData = renderizarCanvas(datos, altoInicial, movV, movH, coloresRender, 100, width, height, data);
    contexto.putImageData(datosImag, 0, 0)
    canvas.focus();
}
function moveUp() {
    movV = movV - 0.1 * altoInicial;
    datosImag.setData = renderizarCanvas(datos, altoInicial, movV, movH, coloresRender, 100, width, height, data);
    contexto.putImageData(datosImag, 0, 0)
    canvas.focus();
}
function moveDown() {
    movV = movV + 0.1 * datos.anchoInicial;
    datosImag.setData = renderizarCanvas(datos, altoInicial, movV, movH, coloresRender, 100, width, height, data);
    contexto.putImageData(datosImag, 0, 0)
    canvas.focus();
}
function zoomOut() {
    datos.anchoInicial = datos.anchoInicial * 1.2;
    altoInicial = datos.anchoInicial * canvas.height / canvas.width;
    datosImag.setData = renderizarCanvas(datos, altoInicial, movV, movH, coloresRender, 100, width, height, data);
    contexto.putImageData(datosImag, 0, 0)
    canvas.focus();
}
function setColores(maxIteraciones, color) {
    var colores = [];
    var R, G, B, t;
    for (let n = 0; n <= maxIteraciones; n++) {
        t = n / maxIteraciones;
        R = Math.trunc((1 - t) * color[0].r + t * color[1].r);
        G = Math.trunc((1 - t) * color[0].g + t * color[1].g);
        B = Math.trunc((1 - t) * color[0].b + t * color[1].b);

        colores[n] = { r: R, g: G, b: B };
    }

    return colores;

}

//Devuelve un color, se puede implementar para que devuelva el array de dos colores
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

/*
window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        canvas.width = window.innerWidth;
        //canvas.height = innerHeight;
        var coloresRender = setColores(maxIt, colores)
        console.log(coloresRender)
        renderizarCanvas(anchoInicial, altoInicial, cReal, cImaginaria, coloresRender, maxIt, 20, canvas.width, canvas.height, data);
        contexto.putImageData(datosImag, 0, 0);
    }, 2000);
})*/