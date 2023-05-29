
// Devuelve el array de colores en rgb
export function setColores(maxIteraciones, color) {
    var colores = [];
    for (let n = 0; n < maxIteraciones; n++) {
        var inter = n / maxIteraciones;
        var R = Math.trunc((1 - inter) * color[0].r + inter * color[1].r);
        var G = Math.trunc((1 - inter) * color[0].g + inter * color[1].g);
        var B = Math.trunc((1 - inter) * color[0].b + inter * color[1].b);
        colores[n] = { r: R, g: G, b: B };
    }
    return colores;
}

//Devuelve un color, se puede implementar para que devuelva el array de dos colores
export function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

/* Interpolacion doble
var R = (1 - t) * color1.r + t * color2.r;
var G = (1 - t) * color1.g + t * color2.g;
var B = (1 - t) * color1.b + t * color2.b;
Despues de generado el color intermedio
var R2 = (1 - t) * R + t * color3.r;
var G2 = (1 - t) * G + t * color3.g;
var B2 = (1 - t) * B + t * color3.b;
*/