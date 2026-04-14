export function renderizarCanvas(datos, altoInicial, movV, movH, colores, infinito, ancho, alto, pixeles) {
    //ancho, alto, size canvas, checkear que sean pixeles
    /*
    Data -> size (canvas) change on resize, etc (can change)
    minmax coords -> min max x, y, de coordenadas gemotricas
    */
    //parses x and y from canvas coords
    var xMinimo = movH - datos.anchoInicial / 2;
    var yMinimo = movV - altoInicial / 2;
    let xMax = xMinimo + datos.anchoInicial;
    let yMax = yMinimo + altoInicial;
    /*
        !!Coords -> func update coords, ejm, move
        !!Draw on new coords

        Todo add state of coords ci, cr
        !!Draw on new ci cr

        Todo add incrY, incrX as state, update on change maxmin, size

        !!Estado fijo de pixeles?
        ?? Mutar y retornar?
    */

    //dif coords cartesianas -> divd ancho/alto real -> cuanto se puede incrementar
    var incrX = (xMax - xMinimo) / ancho;
    var incrY = (yMax - yMinimo) / alto;

    var y = yMinimo; //min y coord
    for (let j = 0; j < alto; j++) { //itera rows
        var x = xMinimo; //min x coord (x, y)
        //x,y obj -> incr on it???
        for (let i = 0; i < ancho; i++) {
            var a = x;
            var b = y;
            var n = 0;
            //calculo de fractal -> resultado n se usa para el color
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


            /*
            no es necesario que el array de colores sea el de la iteracion
            el array de colores puede ser cualquiera
            luego se interpola 0, n a 0, col -> se seleccion el col[n]
            */
            let pix = (i + j * ancho) * 4 //??
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