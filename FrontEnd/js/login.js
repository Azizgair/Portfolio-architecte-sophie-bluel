document.addEventListener("DOMContentLoaded", function () {
    login(makeAuthenticatedRequest);

});

function makeAuthenticatedRequest(payload) {
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
            sessionStorage.setItem("token", data.token)
            window.location.replace('../index.html');

        })
        .catch(err => {
            console.error(err);
            document.getElementById('error-message').style.display = 'block';
        })
}

async function login(makeAuthenticatedRequest) {
    document.getElementById('loginButton').addEventListener('click', async function () {
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
    });
}