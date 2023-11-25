
document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector(".gallery");
    const categories = document.querySelectorAll(".filter-category");

    categories.forEach(category => {
        category.addEventListener("click", () => {
            categories.forEach(c => c.classList.remove("active"));
            category.classList.add("active");
            filterGallery(category.dataset.category);
        });
    });

    function filterGallery(category) {
        const allItems = document.querySelectorAll(".gallery-item");
        allItems.forEach(item => {
            item.style.display = "none";
        });

        if (category === "tous") {
            allItems.forEach(item => {
                item.style.display = "block";
            });
        } else {
            const filteredItems = document.querySelectorAll(`.gallery-item[data-category="${category}"]`);
            filteredItems.forEach(item => {
                item.style.display = "block";
            });
        }
    }
});

//connexion
function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email === 'aziz' && password === 'pwd') {
        window.location.href = '../pages/homePageEdit.html';
    } else {
        document.getElementById('error-message').style.display = 'block';
    }
}