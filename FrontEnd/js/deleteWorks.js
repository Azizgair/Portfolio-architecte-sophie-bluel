export function deleteImage(imageId) {
    const imageContainer = document.querySelector(`.image-container[data-id="${imageId}"]`);
    if (imageContainer) {
        imageContainer.remove();
    }
    const storedToken = sessionStorage.getItem("token");
    const apiUrl = `http://localhost:5678/api/works/${imageId}`;
    fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedToken}`,
        },
    })
        .then(response => {
            if (response.ok) {
                console.log(`Image successfully deleted.`);
            } else {
                console.error(`Failed to delete image.`);
            }
        })
        .catch(error => {
            console.error('Error deleting image ', error);
        });
}