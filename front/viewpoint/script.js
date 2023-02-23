localStorage.setItem('pergunta', ["deslogado"])

function loginPage() {
    window.location.href = "../login screen/index.html"
}

function buscar() {

    var inp = document.querySelector("#busca")

    const user = localStorage.getItem('pergunta')

    if (user === "deslogado") {
        loginPage()
    } else {
        localStorage.setItem('pergunta', [inp.value])
        console.log("homePage")
    }

}