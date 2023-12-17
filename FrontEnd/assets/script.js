document.addEventListener("DOMContentLoaded", function () {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
        console.log("Token found:", storedToken);
        //window.location.replace('./FrontEnd/pages/homePageEdit.html');
    }
    if (!storedToken) {
        console.log("Token NOT found ");
        //window.location.href = '../FrontEnd/index.html';
    }
    // window.location.href = '../pages/homePageEdit.html';
});