export function renderizarCanvas(anchoInicial, altoInicial, cReal, cImaginaria, colores, maxIt, infinito, ancho, alto, pixeles) {
    //Ver si recibir canvas o que
    var xMinimo = - anchoInicial / 2;
    var yMinimo = - altoInicial / 2;
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