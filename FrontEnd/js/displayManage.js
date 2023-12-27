import { loadGalleryImages } from "./dataFetch.js";

export async function displayEditMode() {
    console.log("Your are in edit mode ");
    document.getElementById('read-mode').style.display = 'none';
    document.getElementById('edit-mode').style.display = 'flex';
    document.getElementById('edit-header').style.display = 'flex';
    document.getElementById('logout').style.display = 'block';
    document.getElementById('login').style.display = 'none';
}
export function openEditModal() {
    const openEditButton = document.querySelector(".edit-img");
    openEditButton.addEventListener("click", () => {
        editModal.style.display = "block";
        loadGalleryImages('addDeleteIcon', ".image-gallery", 'span');
    });
}

export function closeEditModal() {
    const editModal = document.getElementById("editModal");
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
}

export function previewImage() {
    document.getElementById('addImageForm').addEventListener('change', function () {
        console.log("previewImage() is called");
        document.getElementById('add-icon').style.display = 'none';
        var newImage = document.getElementById('newImage');
        var imagePreview = document.getElementById('imagePreview')
        var file = newImage.files[0];
        console.log(file);
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.innerHTML = '<img src="' + e.target.result + '" alt="Uploaded Image">';
            };
            reader.readAsDataURL(file);
        }
    });
}