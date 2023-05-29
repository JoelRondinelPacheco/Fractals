import { renderizarCanvas } from "./modules/render";
import { setColores, hexToRgb } from "./modules/utilidades";
/*
const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const boton = document.getElementById('setcolores');
const slider = document.getElementById('slider')
const slidery = document.getElementById('slidery')
const canvas = document.getElementById('canvasF');
const contexto = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const datosImag = contexto.getImageData(0, 0, width, height);
var data = datosImag.data;

var anchoInicial = 5;
var altoInicial = anchoInicial * canvas.height / canvas.width;

var cReal = 0.35;
var cImaginaria = 0.2;
const maxIt = 40;*/
//Evento w
window.addEventListener('onload', function () {
    renderizarCanvas(anchoInicial, altoInicial, cReal, cImaginaria, colores, maxIt, 10, canvas.width, canvas.height, data);
    contexto.putImageData(datosImag, 0, 0)
})

window.addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    // Renderizar??
})

boton.addEventListener('click', function () {
    var colorA2 = hexToRgb(color1.value);
    var colorB2 = hexToRgb(color2.value);
    var colores = [colorA2, colorB2];
    var coloresRender = setColores(maxIt, colores);
})
// Ctte
slider.addEventListener('change', function (event) {
    const value = Number(event.target.value)
    //En este caso si hay que renderizar todo
});
slidery.addEventListener('change', function (event) {
    const valueb = Number(event.target.value)
    console.log(valueb)
    //tambien renderizar todo
});

/*
window.addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height / 80) * (canvas.width / 80));
    init();
})
*/