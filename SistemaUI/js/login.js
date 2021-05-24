window.onload = init;

function init() {
    if(!localStorage.getItem("token")) {    
        document.querySelector('.irRegistro').addEventListener('click', function() {
            window.location.href = "signin.html";
        });

        document.querySelector('.btn-success').addEventListener('click', login);
    } else {
        window.location.href = "sistemaUI.html";
    }
}

function login() {
    var username = document.getElementById("input-username").value;
    var pass = document.getElementById("input-password").value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data: {
            username: username,
            pass: pass
        }
    }).then(function(res) {
        if(res.data.code === 200) {
            localStorage.setItem("token", res.data.message);
            window.location.href = "sistemaUI.html";
        } else {
            alert("Usuario y/o contraseña incorrectos");
        }
    }).catch(function(err) {
        console.log(err);
    })
}