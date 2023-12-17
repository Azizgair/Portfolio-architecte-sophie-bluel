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
export async function login() {
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


/* function login() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('main').style.display = 'none';
    document.getElementById("login").style.color = "#1D6154";
}
document.querySelector('.login').addEventListener("click", () => {
    login();
}); */

