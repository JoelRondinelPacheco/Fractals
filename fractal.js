var canvas;
var ctx;
var fractal;
var fractalAnimation

window.onload = function () {

    //canvas.width = 100%;
    //canvas.height =100%;
    // TODO Comprobar que se reinicie la animacion con el cambio de ventana
    //fractal = new FractalGenerator(ctx, canvas.width, canvas.height);
    //  fractal.animate(0);
}
canvas = document.getElementById("canvas");
function iterarCanva(canvasParam, anchoNumReales, iteracionesMaximo, ca, cb) {
    //TODO VERFICACION QUE SEA UN CANVA
    var canvasWidth = canvasParam.width;
    var canvasHeight = canvasParam.height;
    var anchoNumReales = 5; //puede ser un parametro, casi el unico de entrada en lo que es tamaño
    var altoNumImag = anchoNumReales * canvasHeight / canvasWidth;

    var realMinimo = -1 * anchoNumReales * 0.5;
    var imaginarioMinimo = -1 * altoNumImag * 0.5;
    var realMaximo = realMinimo + anchoNumReales;
    var imaginarioMaximo = imaginarioMinimo + altoNumImag;

    var incrementoReal = (realMaximo - realMaximo) / canvasWidth;
    var incrementoImaginario = (imaginarioMaximo - imaginarioMinimo) / canvasHeight;

    var ctx = canvasParam.getContext('2d');
    const datosCanvas = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    const pixeles = datosCanvas.data;

    var y = imaginarioMinimo;
    for (var i = 0; i < canvasHeight; i++) {
        var x = realMinimo;
        for (var j = 0; i < canvasWidth; j++) {
            var realActual = x;
            var imaginarioActual = y;
            var controladorIteraciones = 0;

            while (controladorIteraciones < iteracionesMaximo) {
                var realAlCuadrado = realActual * realActual;
                var imaginarioAlCuadrado = imaginarioActual * imaginarioActual;

                if ((realAlCuadrado + imaginarioAlCuadrado) > 100) {
                    break;
                }

                let dosRealImag = 2 * realActual * imaginarioActual
                realActual = realAlCuadrado - imaginarioAlCuadrado + ca
                imaginarioActual = dosRealImag + cb
                controladorIteraciones++
            }
            var interpolado = Math.round(controladorIteraciones * 360 / iteracionesMaximo)
            var vect = rgb([interpolado, 100, 50]);
            let posicion = (i + j * canvas.width) * 4
            for (var k = 0; k < 4; k++) {
                pixeles[posicion + k] = vect[k];
            }
            pixeles[posicion + 3] = 255;
            x = x + incrementoReal;
        }

        y = y + incrementoImaginario;
    }
    ctx.putImageData(datosCanvas, 0, 0);
}

iterarCanva(canvas, 5, 20, 0.5, 0);



function rgb(hsl) {
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