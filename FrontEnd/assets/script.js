
document.addEventListener("DOMContentLoaded", function () {
    const storedToken = sessionStorage.getItem("token");
    const gallery = document.querySelector(".gallery");
    const categories = document.querySelectorAll(".filter-category");
    categories.forEach(category => {
        category.addEventListener("click", () => {
            categories.forEach(c => c.classList.remove("active"));
            category.classList.add("active");
            filterGallery(category.dataset.category);
        });
    });
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
                figure.dataset.category = work.category.name; // Assuming category is available in work data

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
            console.error("An error occurred while fetching works:", error);
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

    loadGalleryImages();

    if (storedToken) {
        console.log("Token found:", storedToken);
        //window.location.replace('./FrontEnd/pages/homePageEdit.html');
    }
    if (!storedToken) {
        //window.location.href = '../FrontEnd/index.html';
    }
    // window.location.href = '../pages/homePageEdit.html';

});

async function makeAuthenticatedRequest(payload) {
    const url = "http://localhost:5678/api/users/login";
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    };

    fetch(url, options)
        .then(res => {
            if (res.status == 200) return res.json();
            else throw new Error("Authentication failed");
        })
        .then((data) => {
            console.log(data)
            sessionStorage.setItem("token", data.token)
            window.location.replace('../pages/homePageEdit.html');
        })
        .catch(err => {
            console.error(err);
            document.getElementById('error-message').style.display = 'block';
        })
}

async function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    const payload = {
        "email": email,
        "password": password
    };
    try {
        await makeAuthenticatedRequest(payload);
    } catch (error) {
        console.error(error);
        document.getElementById('error-message').style.display = 'block';
    }
}