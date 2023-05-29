const canvas = document.getElementById('canvasF');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas.height)
console.log(innerWidth)
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
var dataP = imageData.data


//canvas.focus();

//var movax
//var movY;
//Ancho y alto

//Inicio

//Incrementos

//Variables iniciales

setColores(maxIt, [{ r: 255, g: 0, b: 0 }, { r: 0, g: 0, b: 255 }]);


renderizar(yMin, xMin, ca1, cb1);
