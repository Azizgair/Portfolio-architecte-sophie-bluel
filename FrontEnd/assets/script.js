document.addEventListener("DOMContentLoaded", function () {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
        console.log("Token found:", storedToken);
        authentifcate();
    }
    if (!storedToken) {
        console.log("Token NOT found ");
    }
});

async function authentifcate() {
    document.getElementById('read-mode').style.display = 'none';
    document.getElementById('edit-mode').style.display = 'flex';
    document.getElementById('edit-header').style.display = 'flex';
    document.getElementById('logout').style.display = 'block';
    document.getElementById('login').style.display = 'none';
}