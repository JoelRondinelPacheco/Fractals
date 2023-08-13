 export function downloadCanva(event, width, height) {
    event.preventDefault();

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvasContainer.innerHTML = ''; // Limpia el contenedor antes de agregar el nuevo lienzo
    canvasContainer.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // Código para dibujar en el lienzo (opcional)

    const dataURL = canvas.toDataURL();
    const downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = `miImagen-${width}x${height}.png`;
    downloadLink.click();
  }
