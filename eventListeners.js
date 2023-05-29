const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const boton = document.getElementById('setcolores');
const slider = document.getElementById('slider')
const slidery = document.getElementById('slidery')

boton.addEventListener('click', function () {
    var colorA2 = hexToRgb(color1.value);
    var colorB2 = hexToRgb(color2.value);
    console.log("A: " + colorA2.r, colorA2.g, colorA2.b + ", B: " + colorB2)
    var colores = [colorA2, colorB2];
    // Actualizar valores, fijarse si se puede hacer sin renderizar todo
})

// Ctte
slider.addEventListener('change', function (event) {
    let value = Number(event.target.value)
    console.log(value)
    // Actualizar los valores
});
slidery.addEventListener('change', function (event) {
    let value = Number(event.target.value)
    console.log(value)
    //Actualizar valores
});