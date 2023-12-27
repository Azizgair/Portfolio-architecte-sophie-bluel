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
                console.log(`Image with ID ${imageId} deleted successfully from the API.`);
            } else {
                console.error(`Failed to delete image with ID ${imageId} from the API.`);
            }
        })
        .catch(error => {
            console.error('Error deleting image from the API:', error);
        });
}