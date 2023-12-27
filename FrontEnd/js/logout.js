export function logout() {
    document.querySelector('.logout').addEventListener("click", () => {
        sessionStorage.removeItem("token");
    });
}