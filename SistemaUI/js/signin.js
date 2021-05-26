window.onload = init;

function init() {
    if(!localStorage.getItem("token")) {    
        document.querySelector('.irLogin').addEventListener('click', function() {
            window.location.href = "login.html";
        });

        document.querySelector('.btn-success').addEventListener('click', signin);
    } else {
        window.location.href = "sistemaUI.html";
    }
}

// Función de Signin 
function signin() {
    var username = document.getElementById("input-username").value;
    var first_name = document.getElementById("input-first_name").value;
    var last_name = document.getElementById("input-last_name").value;
    var pass = document.getElementById("input-password").value;
    var alertaMala = document.querySelector("#data-alert");

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/signin',
        data: {
            username : username,
            first_name: first_name,
            last_name: last_name,
            pass: pass
        }
    }).then(function(res) {
        console.log(res);   
        alert("Registro exitoso");
        window.location.href = "login.html";
    }).catch(function(err) {
        alertaMala.classList.remove("hideAlert");
        alertaMala.classList.add("show");
        setTimeout(function(){
            location.reload(); 
        }, 2000);
        console.log(err);
    })
}