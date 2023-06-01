const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const real = document.getElementById('real');
const imag = document.getElementById('imag');
const setCtte = document.getElementById('setConstante');
const sliderReal = document.getElementById('sliderReal')
const sliderImag = document.getElementById('sliderImag')
const canvas = document.getElementById('canvasF');
const iteraciones = document.getElementById('iteraciones');
const confirmarBtn = document.getElementById('confBtn');
const contexto = canvas.getContext('2d');

/*
TODO:
    Agregar funcionalidad de zoom - out
    Agregarle un fractal random (o random, pero predeterminados)
    Agregar funcionalidad de descargar
    Pulir UI
    ORDEN DE CARGA DE LA PAGINA, buscar window events para asegurarse que carga bien
*/

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas.width)
console.log(canvas.height)

const datosImag = contexto.getImageData(0, 0, canvas.width, canvas.height);
var data = datosImag.data;

var color1V = hexToRgb(color1.value);
var color2V = hexToRgb(color2.value);
var coloresRender;

var movV = 0;
var movH = 0;


var anchoInicial = 6;
var altoInicial = anchoInicial * canvas.height / canvas.width;

var cReal = 0.35;
var cImaginaria = 0.1;
var maxIt = 50;
var colores = [color1V, color2V];

window.addEventListener('load', function () {
    console.log('Entro')
    coloresRender = setColores(maxIt, colores)
    renderizarCanvas(anchoInicial, altoInicial, movV, movH, cReal, cImaginaria, coloresRender, maxIt, 100, canvas.width, canvas.height, data);
    contexto.putImageData(datosImag, 0, 0)
})

// Cambio iteraciones/valores
real.value = cReal;
imag.value = cImaginaria;
sliderReal.value = cReal;
sliderImag.value = cImaginaria;

setCtte.addEventListener('click', function () {
    cReal = Number(real.value);
    cImaginaria = Number(imag.value)
    renderizarCanvas(anchoInicial, altoInicial, movV, movH, cReal, cImaginaria, coloresRender, maxIt, 100, canvas.width, canvas.height, data);
    contexto.putImageData(datosImag, 0, 0)
})

iteraciones.value = maxIt;
iteraciones.addEventListener('change', function (e) {
    maxIt = Number(e.target.value);
})
confirmarBtn.addEventListener('click', function () {
    coloresRender = setColores(maxIt, colores);
    renderizarCanvas(anchoInicial, altoInicial, movV, movH, cReal, cImaginaria, coloresRender, maxIt, 100, canvas.width, canvas.height, data);
    contexto.putImageData(datosImag, 0, 0)
})

// Cambio de colores
color1.addEventListener('change', function () {
    color1V = hexToRgb(color1.value);
    colores = [color1V, color2V];
    coloresRender = setColores(maxIt, colores);
    renderizarCanvas(anchoInicial, altoInicial, movV, movH, cReal, cImaginaria, coloresRender, maxIt, 100, canvas.width, canvas.height, data);
    contexto.putImageData(datosImag, 0, 0)
})
color2.addEventListener('change', function () {
    color2V = hexToRgb(color2.value);
    var colores = [color1V, color2V];
    coloresRender = setColores(maxIt, colores);
    renderizarCanvas(anchoInicial, altoInicial, movV, movH, cReal, cImaginaria, coloresRender, maxIt, 100, canvas.width, canvas.height, data);
    contexto.putImageData(datosImag, 0, 0)
})

// Cambio de forma
sliderReal.addEventListener('change', function (event) {
    cReal = Number(event.target.value);
    real.value = cReal;
    renderizarCanvas(anchoInicial, altoInicial, movV, movH, cReal, cImaginaria, coloresRender, maxIt, 100, canvas.width, canvas.height, data);
    contexto.putImageData(datosImag, 0, 0);
});
sliderImag.addEventListener('change', function (event) {
    cImaginaria = Number(event.target.value);
    imag.value = cImaginaria;
    renderizarCanvas(anchoInicial, altoInicial, movV, movH, cReal, cImaginaria, coloresRender, maxIt, 100, canvas.width, canvas.height, data);
    contexto.putImageData(datosImag, 0, 0);
});

// Moviento
canvas.addEventListener("keydown", (e) => {
    if (e.key == ' ') {
        anchoInicial = anchoInicial * 0.8;
        altoInicial = anchoInicial * canvas.height / canvas.width;
        renderizarCanvas(anchoInicial, altoInicial, movV, movH, cReal, cImaginaria, coloresRender, maxIt, 100, canvas.width, canvas.height, data);
        contexto.putImageData(datosImag, 0, 0)
    } else if (e.key == 'ArrowLeft') {
        movH = movH - 0.1 * anchoInicial;
        renderizarCanvas(anchoInicial, altoInicial, movV, movH, cReal, cImaginaria, coloresRender, maxIt, 100, canvas.width, canvas.height, data);
        contexto.putImageData(datosImag, 0, 0)
    } else if (e.key == 'ArrowRight') {
        movH = movH + 0.1 * anchoInicial;
        renderizarCanvas(anchoInicial, altoInicial, movV, movH, cReal, cImaginaria, coloresRender, maxIt, 100, canvas.width, canvas.height, data);
        contexto.putImageData(datosImag, 0, 0)
    } else if (e.key == 'ArrowUp') {
        movV = movV - 0.1 * altoInicial;
        renderizarCanvas(anchoInicial, altoInicial, movV, movH, cReal, cImaginaria, coloresRender, maxIt, 100, canvas.width, canvas.height, data);
        contexto.putImageData(datosImag, 0, 0)
    } else if (e.key == 'ArrowDown') {
        movV = movV + 0.1 * anchoInicial;
        renderizarCanvas(anchoInicial, altoInicial, movV, movH, cReal, cImaginaria, coloresRender, maxIt, 100, canvas.width, canvas.height, data);
        contexto.putImageData(datosImag, 0, 0)
    }
});

// FUNCION
function renderizarCanvas(anchoInicial, altoInicial, movV, movH, cReal, cImaginaria, colores, maxIt, infinito, ancho, alto, pixeles) {
    var xMinimo = movH - anchoInicial / 2;
    var yMinimo = movV - altoInicial / 2;
    let xMax = xMinimo + anchoInicial;
    let yMax = yMinimo + altoInicial;
    var incrX = (xMax - xMinimo) / ancho;
    var incrY = (yMax - yMinimo) / alto;

    var y = yMinimo;
    for (let j = 0; j < canvas.height; j++) {
        var x = xMinimo;
        for (let i = 0; i < canvas.width; i++) {
            var a = x;
            var b = y;
            var n = 0;
            while (n < maxIt) {
                var aa = a * a;
                var bb = b * b;
                if ((aa + bb) > 5) {
                    break;
                }
                let dosab = 2 * a * b;
                a = aa - bb + cReal;
                b = dosab + cImaginaria;
                n++
            }

            let pix = (i + j * canvas.width) * 4
            if (n == infinito) {
                pixeles[pix + 0] = 0;
                pixeles[pix + 1] = 0;
                pixeles[pix + 2] = 0;
                pixeles[pix + 3] = 255;
            } else {
                pixeles[pix + 0] = colores[n].r;
                pixeles[pix + 1] = colores[n].g;
                pixeles[pix + 2] = colores[n].b;
                pixeles[pix + 3] = 255;
            }

            x = x + incrX;
        }
        y = y + incrY;
    }
}

//UTILIDADES
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