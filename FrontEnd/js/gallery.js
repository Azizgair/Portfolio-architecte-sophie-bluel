import { loadGalleryImages } from "./dataFetch.js";
export function selectCategory(filterFunction) {
    const categories = document.querySelectorAll(".filter-category");
    categories.forEach(category => {
        category.addEventListener("click", () => {
            categories.forEach(c => c.classList.remove("active"));
            category.classList.add("active");
            filterFunction(category.dataset.id);
        });
    });
}

export function filterGallery(categoryId) {
    const allItems = document.querySelectorAll(".gallery-item");
    allItems.forEach(item => {
        item.style.display = "none";
    });
    if (categoryId === "0") {
        allItems.forEach(item => {
            item.style.display = "block";
        });
    } else {
        const filteredItems = document.querySelectorAll(`.gallery-item[data-id="${categoryId}"]`);
        filteredItems.forEach(item => {
            item.style.display = "block";
        });
    }
}
export { loadGalleryImages }