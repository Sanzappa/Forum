// var senha = "4321";
// var segredo = btoa(senha);
// var revelado = atob(segredo);

function viewPage() {
    window.location.href = "../viewpoint/index.html"
}

function login() {

    var user = document.querySelector("#userLogn").value
    var pass = document.querySelector("#passLogn").value

    if (pass.length < 1) {
        console.log("nonono")
    } else {

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "usuario": user,
                "senha": btoa(pass)
            })
        };

        fetch('http://localhost:5000/forum/validauser', options)
            .then(response => response.json())
            .then(response => {
                if (response.autoriza === true) {
                    console.log(response)
                    localStorage.setItem('user', user)
                    window.location.href = "../postPage/index.html"
                } else {
                    console.log("Se equivocou né")
                }
            })

    }

}

function cadastrar() {

    var user = document.querySelector("#userRe").value
    var name = document.querySelector("#nameRe").value
    var pass = document.querySelector("#passRe").value
    var confirmPass = document.querySelector("#conPassRe").value

    if (pass.length < 1) {
        console.log("nonono")
    } else {
        if (pass === confirmPass) {

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "usuario": user,
                    "nome": name,
                    "senha": btoa(pass),
                    "role": 1
                })
            };

            fetch('http://localhost:5000/forum/cadastrarUser', options)
                .then(response => response.json())
                .then(response => {
                    if (response === "Usuario ja cadastrado") {
                        console.log(response)
                    } else {
                        localStorage.setItem('user', user)
                        window.location.href = "../postPage/index.html"
                    }
                })


        } else {
            console.log("senhas não coincidem")
        }
    }

}