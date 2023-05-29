const canvas = document.getElementById('canvasF');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas.height)
console.log(innerWidth)
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
var dataP = imageData.data

const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const boton = document.getElementById('setcolores');
const slider = document.getElementById('slider')
const slidery = document.getElementById('slidery')
//canvas.focus();

var rojo = []
var verde = []
var azul = []
function setColores(maxIteraciones, colores) {
    for (let n = 0; n < maxIteraciones; n++) {
        var inter = n / maxIteraciones;
        var R = Math.trunc((1 - inter) * colores[0].r + inter * colores[1].r)
        var G = Math.trunc((1 - inter) * colores[0].g + inter * colores[1].g)
        var B = Math.trunc((1 - inter) * colores[0].b + inter * colores[1].b)
        rojo[n] = R;
        verde[n] = G;
        azul[n] = B;
    }
}
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
//Pina el canva, renderizar
boton.addEventListener('click', function () {
    var colorA2 = hexToRgb(color1.value);
    var colorB2 = hexToRgb(color2.value);
    console.log("A: " + colorA2.r, colorA2.g, colorA2.b + ", B: " + colorB2)
    var colores = [colorA2, colorB2];
    setColores(maxIt, colores);
    renderizar(yMin, xMin)
})
slider.addEventListener('input', function (event) {
    const value = Number(event.target.value)
    //renderizar(yMin, xMin, value, cb);
    console.log(value)
    //ctx.clearRect(0, 0, innerWidth, innerHeight);
    renderizar(yMin, xMin, value, 0);
});
slidery.addEventListener('input', function (event) {
    const valueb = Number(event.target.value)
    //renderizar(yMin, xMin, value, cb);
    console.log(valueb)
    //ctx.clearRect(0, 0, innerWidth, innerHeight);
    renderizar(yMin, xMin, ca, valueb);
});
//var movax
//var movY;
//Ancho y alto
var w = 6
var h = (w) * canvas.height / canvas.width
movax = 100 * w / canvas.width

//Inicio
var xMin = - w / 2
var yMin = - h / 2
let xMax = xMin + w
let yMax = yMin + h
//Incrementos
var incrX = (xMax - xMin) / canvas.width
var incrY = (yMax - yMin) / canvas.height
//Variables iniciales
var ca1 = 0.3;
var cb1 = -0.8
const maxIt = 40;
setColores(maxIt, [{ r: 255, g: 0, b: 0 }, { r: 0, g: 0, b: 255 }]);

function renderizar(yMinimo, xMinimo, cReal, cImaginaria) {
    console.log('Seejectuo')
    var y = yMinimo
    for (let j = 0; j < canvas.height; j++) {
        var x = xMinimo
        for (let i = 0; i < canvas.width; i++) {
            var a = x
            var b = y
            var nm = 0
            while (nm < maxIt) {
                var aa = a * a
                var bb = b * b
                if ((aa + bb) > 5) {
                    break;
                }
                let dosab = 2 * a * b
                a = aa - bb + cReal
                b = dosab + cImaginaria
                nm++
            }
            let pix = (i + j * canvas.width) * 4

            if (nm == maxIt) {
                dataP[pix + 0] = 0
                dataP[pix + 1] = 0
                dataP[pix + 2] = 0
                dataP[pix + 3] = 255
            } else {
                dataP[pix + 0] = rojo[nm]
                dataP[pix + 1] = verde[nm]
                dataP[pix + 2] = azul[nm]
                dataP[pix + 3] = 255
            }
            //  console.log(dataP[pix] + " " + dataP[pix + 1] + " " + dataP[pix + 2] + " " + dataP[pix + 3])
            x = x + incrX
        }
        y = y + incrY
    }
    ctx.putImageData(imageData, 0, 0)
}
renderizar(yMin, xMin, ca1, cb1);
