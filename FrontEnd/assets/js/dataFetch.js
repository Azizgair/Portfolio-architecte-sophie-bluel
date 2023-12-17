async function fetchGalleryData() {
    const galleryContainer = document.getElementById('imageGallery');

    try {
        const response = await fetch('http://localhost:5678/api/works');
        const data = await response.json();
        galleryContainer.innerHTML = '';
        data.forEach(imageData => {
            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container';
            imageContainer.dataset.id = imageData.id;

            const image = document.createElement('img');
            image.src = imageData.imageUrl;
            image.alt = imageData.title;

            const deleteIcon = document.createElement('span');
            deleteIcon.className = 'delete-icon';
            deleteIcon.innerHTML = '&times;';
            deleteIcon.onclick = () => deleteImage(imageData.id);
            imageContainer.appendChild(deleteIcon);
            imageContainer.appendChild(image);
            galleryContainer.appendChild(imageContainer);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export { fetchGalleryData };