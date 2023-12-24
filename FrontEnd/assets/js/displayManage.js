document.addEventListener("DOMContentLoaded", function () {
    const editModal = document.getElementById("editModal");
    const openEditButton = document.querySelector(".edit-img");

    openEditButton.addEventListener("click", () => {
        openEditModal();
    });
    window.addEventListener("click", (event) => {
        if (event.target === editModal) {
            editModal.style.display = "none";
        }
    });

    const closeButton = document.querySelector(".close");
    if (closeButton) {
        closeButton.addEventListener("click", () => {
            editModal.style.display = "none";
        });
    }
});
function openEditModal() {
    editModal.style.display = "block";
    fetchGalleryData();
}

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
            deleteIcon.innerHTML = '<i class="fas fa-trash-can"></i>';
            deleteIcon.onclick = () => deleteImage(imageData.id);
            imageContainer.appendChild(deleteIcon);
            imageContainer.appendChild(image);
            galleryContainer.appendChild(imageContainer);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
function deleteImage(imageId) {
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