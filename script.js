// 1) Seleccionar etiqueta padre del canva

// 2) Asignar el mismo alto y ancho al canva

// 3) crear nuevo punto central ( punto de click del mouse)

// 4) zoom

var canvas;
var ctx;
var fractal;
var fractalAnimation
canvas = document.getElementById("canvas");
ctx = canvas.getContext('2d');
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

var dataP = imageData.data
//canvas.focus();
var rojo = []
var verde = []
var azul = []
// SET COLORES
function setColores(maxIteraciones) {
    for (let n = 0; n < maxIt; n++) {
        var inter = n / maxIt;
        var R = Math.trunc((1 - inter) * 255 + inter * 0)
        var G = Math.trunc((1 - inter) * 0 + inter * 0)
        var B = Math.trunc((1 - inter) * 0 + inter * 0)
        rojo[n] = R;
        verde[n] = G;
        azul[n] = B;
    }
}
/*
    Al hacer click
        Obtener coordenada x e y;
        fijarse en el cuadrante en el que se encuentra if(xmouse < canva.width) ? mov = canva.width/2 - xmouse : mov = xmouse-canva.whidth/2   y   if(y > canva.height) ? menor : mayor
        SOLO HAY QUE SUMAR/RESTAR LAS COORDENADAS INICIALES, Y MULTIPLICAR W
*/
var movax
var movY;
//Ancho y alto

var w = 4
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
var ca = 0.35;
var cb = 0.45;
const maxIt = 40;
setColores(maxIt);

function renderizar(yMinimo, xMinimo) {
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
                if ((aa + bb) > 5) {
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
            //  console.log(dataP[pix] + " " + dataP[pix + 1] + " " + dataP[pix + 2] + " " + dataP[pix + 3])
            x = x + incrX
        }
        y = y + incrY
    }
    ctx.putImageData(imageData, 0, 0)
}
renderizar(yMin, xMin);

var mouse = {
    x: null,
    y: null,
}
window.addEventListener('mousemove',
    function (e) {
        mouse.x = e.x;
        mouse.y = e.y;
    })/*
canvas.addEventListener("click", function (event) {

    const clickX = event.offsetX;
    const clickY = event.offsetY;

    mouse.x < canvas.width ? movX = clickX - canvas.width / 2 : movX = clickX + canvas.width / 2
    mouse.y > canvas.height ? movY = clickY - canvas.height / 2 : movY = canvas.height / 2 + clickY
    console.log("x: " + movX)
    console.log("y: " + movY)
    movX = movX * w / canvas.width
    movY = movY * h / canvas.height
    console.log("x: " + movX)
    console.log("y: " + movY)
    xMin = movX - w / 2
    yMin = movY - h / 2
    /* w = w * 0.8
     h = (w) * canvas.height / canvas.width
     xMax = xMin + w
     yMax = yMin + h
 
     //Incrementos
     incrX = (xMax - xMin) / canvas.width
     incrY = (yMax - yMin) / canvas.height
     console.log("ymin: " + yMin + " xmin: " + xMin)
     console.log("w: " + w + " h: " + h)
    renderizar()
});*/

canvas.addEventListener('keydown', (e) => {
    const keyCode = e.key

    // Verificar qué tecla se presionó y actualizar las coordenadas del elemento canvas
    if (keyCode === ' ') { // Flecha izquierda
        w = w * 0.8
        h = (w) * canvas.height / canvas.width
        movax = 100 * w / canvas.width
        xMin = - w / 2
        yMin = - h / 2
        xMax = xMin + w
        yMax = yMin + h
        //Incrementos
        incrX = (xMax - xMin) / canvas.width
        incrY = (yMax - yMin) / canvas.height
        renderizar(yMin, xMin)
    } else if (keyCode === 'ArrowRight') { // Flecha arriba
        console.log("flecha")
        xMin = -movax - w / 2
        console.log(movax, xMin)
        renderizar(yMin, xMin)
    }
})
/*
function animar() {

    var movX;
    var movY;
    mouse.x < canvas.width ? movX = -mouse.x + canvas.width / 2 : movX = mouse.x - canvas.width / 2
    mouse.y > canvas.height ? movY = -mouse.y + canvas.height / 2 : movY = canvas.height / 2 - mouse.y
    xMin = movX - w / 2
    yMin = movY - h / 2
    w = w * 0.7
    renderizar();
    canvas.addEventListener('click', requestAnimationFrame(animar))
    ctx.clearRect(0, 0, canvas.width, canvas.height);

}

animar();*/