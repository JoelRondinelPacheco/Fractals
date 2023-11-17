import renderizarCanvas from "./renderizarCanvas";

export function downloadCanvas(event, datos, colores, width, height) {
    event.preventDefault();

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvasContainer.innerHTML = ''; // Limpia el contenedor antes de agregar el nuevo lienzo
    canvasContainer.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const datosCtx = ctx.getImageData(0, 0, width, height)
    const pixeles = datosCtx.data
    const alto = datos.anchoInicial * height / width;
    datosCtx.setData = renderizarCanvas(datos, alto, 0, 0, colores, width, height, pixeles)
    ctx.putImageData(datosCtx, 0, 0)

    const dataURL = canvas.toDataURL();
    const downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = `miImagen-${width}x${height}.png`;
    downloadLink.click();
}
