import { deleteImage } from "./deleteWorks.js";

export async function loadGalleryImages(actionType, selection, elem) {
    try {
        const fetchedWorks = await fetch("http://localhost:5678/api/works", {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });
        const works = await fetchedWorks.json();
        const galleryContainer = document.querySelector(selection);
        galleryContainer.innerHTML = "";
        works.forEach(work => {
            const figure = document.createElement("figure");
            figure.classList.add("gallery-item");
            figure.dataset.id = work.id;
            const img = document.createElement("img");
            img.src = work.imageUrl;
            img.alt = work.title;
            const figcaption = document.createElement(elem);
            if (actionType === 'addDeleteIcon') {
                deleteIcon(figcaption, work.id);
            } else if (actionType === 'figcaption') {
                figcaption.textContent = work.title;
            };
            figure.appendChild(img);
            figure.appendChild(figcaption);
            galleryContainer.appendChild(figure);
        });
    } catch (error) {
        console.error("Error while fetching works:", error);
    }
}

function deleteIcon(created, imgId) {
    created.className = 'delete-icon';
    created.innerHTML = '<i class="fas fa-trash-can"></i>';
    created.onclick = () => deleteImage(imgId);
}