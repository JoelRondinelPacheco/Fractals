
export default function renderizarCanvas(datos, altoInicial, movV, movH, colores, infinito, ancho, alto, pixeles) {
    var xMinimo = movH - datos.anchoInicial / 2;
    var yMinimo = movV - altoInicial / 2;
    let xMax = xMinimo + datos.anchoInicial;
    let yMax = yMinimo + altoInicial;
    var incrX = (xMax - xMinimo) / ancho;
    var incrY = (yMax - yMinimo) / alto;

    var y = yMinimo;
    for (let j = 0; j < alto; j++) {
        var x = xMinimo;
        for (let i = 0; i < ancho; i++) {
            var a = x;
            var b = y;
            var n = 0;
            while (n < datos.maxIt) {
                var aa = a * a;
                var bb = b * b;
                if ((aa + bb) > 5) {
                    break;
                }
                let dosab = 2 * a * b;
                a = aa - bb + datos.cR;
                b = dosab + datos.cI;
                n++
            }

            let pix = (i + j * ancho) * 4
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
    return pixeles;
}
