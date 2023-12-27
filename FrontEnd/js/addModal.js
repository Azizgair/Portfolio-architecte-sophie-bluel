export function returnToEdit(editModal, addImageModal) {
    document.getElementById('return-edit').addEventListener('click', function () {
        editModal.style.display = "block";
        addImageModal.style.display = 'none';
    });
}
export function openAddImageModal(editModal, addImageModal) {
    document.getElementById('addButton').addEventListener('click', function () {
        editModal.style.display = "none";
        addImageModal.style.display = 'block';
    });
}
export function closeAddImageModal(addImageModal) {
    document.getElementById('close-addImageModal').addEventListener('click', function () {
        addImageModal.style.display = 'none';
    });
}