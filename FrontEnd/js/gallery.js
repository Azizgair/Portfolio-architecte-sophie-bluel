import { loadGalleryImages } from "./dataFetch.js";
export function selectCategory(filterFunction) {
    const categories = document.querySelectorAll(".filter-category");
    categories.forEach(category => {
        category.addEventListener("click", () => {
            categories.forEach(c => c.classList.remove("active"));
            category.classList.add("active");
            filterFunction(category.dataset.category);
        });
    });
}

export function filterGallery(category) {
    const allItems = document.querySelectorAll(".gallery-item");
    allItems.forEach(item => {
        item.style.display = "none";
    });
    if (category === "Tous") {
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
export { loadGalleryImages }