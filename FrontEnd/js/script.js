import { login, makeAuthenticatedRequest } from './login.js';
import { selectCategory, filterGallery, loadGalleryImages } from './gallery.js';
import { logout } from './logout.js';
import { closeEditModal, openEditModal, displayEditMode, previewImage } from './displayManage.js';
import { openAddImageModal, closeAddImageModal, returnToEdit } from './addModal.js';
import { addWorks } from "./addWorks.js";

document.addEventListener("DOMContentLoaded", function () {
    const storedToken = sessionStorage.getItem("token");
    const editModal = document.getElementById('editModal');
    const addImageModal = document.getElementById('addImageModal');

    if (storedToken) {
        console.log("Token found:", storedToken);
        displayEditMode();

    }
    else if (!storedToken) {
        console.log("Token NOT found ");
    }

    logout();
    selectCategory(filterGallery);
    loadGalleryImages("figcaption", ".gallery", 'figcaption');
    openEditModal();
    closeEditModal();
    openAddImageModal(editModal, addImageModal);
    returnToEdit(editModal, addImageModal);
    closeAddImageModal(addImageModal);
    addWorks();
    previewImage();
});
login(makeAuthenticatedRequest);