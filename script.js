// Quede en minuto 20 https://www.youtube.com/watch?v=uCH1ta5OUHw

var canvas;
var ctx;
var fractal;
var fractalAnimation
canvas = document.getElementById("canvas");
ctx = canvas.getContext('2d');
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

var dataP = imageData.data

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


function rgb1(hsl) {
    const h = hsl[0] / 360;
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    let t2;
    let t3;
    let val;

    if (s === 0) {
        val = l * 255;
        return [val, val, val];
    }

    if (l < 0.5) {
        t2 = l * (1 + s);
    } else {
        t2 = l + s - l * s;
    }

    const t1 = 2 * l - t2;

    const rgb = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
        t3 = h + 1 / 3 * -(i - 1);
        if (t3 < 0) {
            t3++;
        }

        if (t3 > 1) {
            t3--;
        }

        if (6 * t3 < 1) {
            val = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
            val = t2;
        } else if (3 * t3 < 2) {
            val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
            val = t1;
        }

        rgb[i] = val * 255;
    }

    return rgb;
};

const maxIt = 100;

for (let n = 0; n < maxIt; n++) {
    var inter = n / maxIt;
    var R = Math.trunc((1 - inter) * 26 + inter * 66)
    var G = Math.trunc((1 - inter) * 37 + inter * 255)
    var B = Math.trunc((1 - inter) * 65 + inter * 0)
    rojo[n] = R;
    verde[n] = G;
    azul[n] = B;
    console.log("R: " + R + ", G: " + G + ", B: " + B)
}

//Ancho y alto
var w = 5;
var h = 3//(w) * canvas.height / canvas.width

//Inicio
var xMin = - w / 2
var yMin = - h / 2

let xMax = xMin + w
let yMax = yMin + h

//Incrementos
var incrX = (xMax - xMin) / canvas.width
var incrY = (yMax - yMin) / canvas.height



//Variables iniciales
var ca = 0.35;
var cb = 0.45;

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
            if ((aa + bb) > 4) {
                break;
            }
            let dosab = 2 * a * b
            a = aa - bb + ca
            b = dosab + cb
            nm++
        }

        let pix = (i + j * canvas.width) * 4

        /*    if (nm == maxIt) {
                dataP[pix + 0] = 0
                dataP[pix + 1] = 0
                dataP[pix + 2] = 0
                dataP[pix + 3] = 255
            } else {*/
        dataP[pix + 0] = rojo[nm]
        dataP[pix + 1] = verde[nm]
        dataP[pix + 2] = azul[nm]
        dataP[pix + 3] = 255
        //   }
        //  console.log(dataP[pix] + " " + dataP[pix + 1] + " " + dataP[pix + 2] + " " + dataP[pix + 3])
        x = x + incrX
    }
    y = y + incrY
}

//console.log(dataP)
ctx.putImageData(imageData, 0, 0)
