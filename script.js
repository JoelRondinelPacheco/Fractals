const canvas = document.getElementById("main-canvas");
var ctx = canvas.getContext('2d');

const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);


var dataP = imageData.data
console.log(dataP)
/*
for (let pixelIndex = 0; pixelIndex <= dataP.length; pixelIndex++) {



    dataP[pixelIndex * 4] = 255; // componente rojo
    dataP[pixelIndex * 4 + 1] = 0; // componente verde
    dataP[pixelIndex * 4 + 2] = 0; // componente azul
    dataP[pixelIndex * 4 + 3] = 1; // componente alfa (opcional)


}
// Actualizar los cambios en el canvas
ctx.putImageData(imageData, 0, 0);
*/

var rojo = []
var verde = []
var azul = []
/*
const HSLToRGB = (h, s, l, color) => {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    switch (color) {
        case 'rojo':
            return Math.floor(255 * f(0))
            break
        case 'verde':
            return Math.floor(255 * f(8))
            break
        case 'azul':
            return Math.floor(255 * f(4))
    }
}*/


function HSLToRGB(h, s, l) {
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}


const maxIt = 5000;

for (let n = 0; n < maxIt; n++) {
    let hu = Math.sqrt((n * 10 / maxIt))
    rojo[n] = HSLToRGB(hu, 0.9, 0.1)[0]
    verde[n] = HSLToRGB(hu, 0.5, 0.3)[1]
    azul[n] = HSLToRGB(hu, 0.5, 0.4)[2]
    //console.log('rojo: ' + rojo[n] + ' verde: ' + verde[n] + ' azul: ' + azul[n])
}

//Ancho y alto
var w = 5;
var h = (w) * canvas.height / canvas.width

//Inicio
var xMin = -w / 2
var yMin = -h / 2

let xMax = xMin + w
let yMax = yMin + h

//Incrementos
var incrX = (xMax - xMin) / canvas.width
var incrY = (yMax - yMin) / canvas.height


//Variables iniciales
var ca = 0.1;
var cb = -0.89;

var y = yMin
for (let j = 0; j < canvas.height; j++) {
    var x = xMin
    for (let i = 0; i < canvas.width; i++) {
        var a = x
        var b = y
        var nm = 0
        while (nm < maxIt) {
            var aa = a * a
            var bb = b * b
            if ((aa + bb) > 100) {
                break;
            }
            let dosab = 2 * a * b
            a = aa - bb + ca
            b = dosab + cb
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
        // console.log(dataP[pix] + " " + dataP[pix + 1] + " " + dataP[pix + 2] + " " + dataP[pix + 3])
        x = x + incrX
    }
    y = y + incrY
}
console.log(dataP)
ctx.putImageData(imageData, 0, 0);
