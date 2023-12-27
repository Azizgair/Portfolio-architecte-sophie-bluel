export function addWorks() {
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
}