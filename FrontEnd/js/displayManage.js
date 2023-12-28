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
        document.getElementById('add-icon').style.display = 'none';
        var newImage = document.getElementById('newImage');
        var imagePreview = document.getElementById('imagePreview')
        var file = newImage.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.innerHTML = '<img src="' + e.target.result + '" alt="Uploaded Image">';
            };
            reader.readAsDataURL(file);
        }
    });
}

export function updateValiderButtonState() {
    const newImageInput = document.getElementById('newImage');
    const newCategorySelect = document.getElementById('newCategory');
    const validerButton = document.querySelector('#addImageForm input[type="submit"]');
    const newTitleInput = document.getElementById('newTitle');
    const isImageSelected = newImageInput.files.length > 0;
    const isCategorySelected = newCategorySelect.value !== "";
    const isTitleEntered = newTitleInput.value.trim() !== "";
    if (isImageSelected && isCategorySelected && isTitleEntered) {
        validerButton.classList.add('valid-button');
    } else {
        validerButton.classList.remove('valid-button');
    }
}
export function updateButtonColor() {
    document.getElementById('newImage').addEventListener('change', updateValiderButtonState);
    document.getElementById('newCategory').addEventListener('change', updateValiderButtonState);
    document.getElementById('newTitle').addEventListener('input', updateValiderButtonState);
    document.getElementById('newImage').addEventListener('input', updateValiderButtonState);
}

