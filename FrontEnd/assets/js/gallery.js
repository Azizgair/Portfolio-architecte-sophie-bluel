document.addEventListener("DOMContentLoaded", function () {
    const storedToken = sessionStorage.getItem("token");
    const gallery = document.querySelector(".gallery");
    const categories = document.querySelectorAll(".filter-category");
    //var loginButton = document.getElementById('loginButton');
    categories.forEach(category => {
        category.addEventListener("click", () => {
            categories.forEach(c => c.classList.remove("active"));
            category.classList.add("active");
            filterGallery(category.dataset.category);
        });
    });

    loadGalleryImages();

    async function loadGalleryImages() {
        try {
            const fetchedWorks = await fetch("http://localhost:5678/api/works", {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            });

            const works = await fetchedWorks.json();

            const galleryContainer = document.querySelector(".gallery");
            galleryContainer.innerHTML = "";

            works.forEach(work => {
                const figure = document.createElement("figure");
                figure.classList.add("gallery-item");
                figure.dataset.category = work.category.name;
                const img = document.createElement("img");
                img.src = work.imageUrl;
                img.alt = work.title;

                const figcaption = document.createElement("figcaption");
                figcaption.textContent = work.title;

                figure.appendChild(img);
                figure.appendChild(figcaption);
                galleryContainer.appendChild(figure);
            });
        } catch (error) {
            console.error("Error while fetching works:", error);
        }
    }

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