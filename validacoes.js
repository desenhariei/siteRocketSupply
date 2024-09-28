const imageUrls = [
    'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg',
    'img6.jpg', 'img7.jpg', 'img8.jpg', 'img9.jpg', 'img10.jpg', 
    'img11.jpg', 'img12.jpg'
];
const containers = document.querySelectorAll('.container'); // Seleciona os 4 containers

// Função para dividir o array em subarrays
function divideArray(arr, numParts) {
    let result = [];
    let partSize = Math.ceil(arr.length / numParts);

    for (let i = 0; i < arr.length; i += partSize) {
        result.push(arr.slice(i, i + partSize));
    }

    return result;
}

// Divide o array de URLs de imagens em 4 partes
const dividedImages = divideArray(imageUrls, 4);

// Adiciona as imagens aos containers
dividedImages.forEach((imagePart, index) => {
    const container = containers[index];  // Seleciona o container correspondente

    // Itera sobre as URLs de cada parte e cria as tags <img> no container
    imagePart.forEach(imgUrl => {
        const imgElement = document.createElement('img'); // Cria a tag <img>
        imgElement.src = imgUrl;  // Define a URL da imagem
        imgElement.alt = 'Image';  // Define o alt da imagem (opcional)
        container.appendChild(imgElement);  // Adiciona a imagem ao container
    });
});
