document.addEventListener("DOMContentLoaded", function () {

    const editModal = document.getElementById('editModal');
    const addImageModal = document.getElementById('addImageModal');
    document.getElementById('addButton').addEventListener('click', function () {
        window.location.replace("./pages/debug.html");
        // openAddImageModal();
    });
    function openAddImageModal() {
        editModal.style.display = "none";
        addImageModal.style.display = 'block';
    }
    function closeAddImageModal() {
        addImageModal.style.display = 'none';
    }

    document.getElementById('addImageForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const newImage = document.getElementById('newImage').files[0];
        const newTitle = document.getElementById('newTitle').value;
        const newCategory = document.getElementById('newCategory').value;

        const storedToken = sessionStorage.getItem("token");

        const apiUrl = 'http://localhost:5678/api/works';
        const formData = new FormData();
        formData.append('image', newImage);
        formData.append('title', newTitle);
        formData.append('category', newCategory);

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${storedToken}`,
            },
            body: formData,
        })
            //.then(response => response.json())
            .then(response => {
                console.log('Response status:', response.status);
                return response.json();
            })
            .then(data => {
                console.log('New image added successfully:', data);
                //closeAddImageModal();
            })
            .catch(error => {
                console.error('Error adding new image:', error);
            });
    });



});
