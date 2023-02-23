const user = localStorage.getItem('user')

document.querySelector(".user").querySelector("span").innerHTML = user

var contAnswer = 0

var id
function showComment(e) {

    var v = document.querySelector(".aberto")

    if (v !== null) {
        saveComment(id)
        setTimeout(() => {
            showComment(e)
        }, 1000)
    } else {
        id = e

        var info = document.getElementById(e.id).querySelector(".infoComment").querySelectorAll(".dadosComment")

        var dados = document.getElementById(e.id).querySelector(".mascara")

        dados.style.height = info.length.toString() + info.length.toString() + "0%"

        var tri = document.getElementById(e.id).querySelector("#tri")
        tri.style.transform = "rotate(90deg)"
        document.getElementById(e.id).setAttribute("onclick", "saveComment(this)")

        var comment = document.getElementById(e.id).querySelector(".comment")
        comment.style.right = "-600px"
        comment.querySelector(".infoComment").style.opacity = "1"

        setTimeout(() => {
            carregaComment(e.id)
        }, 700)
    }



}

function saveComment(e) {

    var v = document.querySelector(".aberto")
    v.classList.remove("aberto")

    esconderComment(e.id)

    setTimeout(() => {
        var tri = document.getElementById(e.id).querySelector("#tri")
        tri.style.transform = "rotate(0deg)"
        document.getElementById(e.id).setAttribute("onclick", "showComment(this)")

        var comment = document.getElementById(e.id).querySelector(".comment")
        comment.style.right = "0px"
        comment.querySelector(".infoComment").style.opacity = "0"
    }, 900)

}

function carregarPost() {
    const options = { method: 'GET' }

    fetch('http://localhost:5000/forum/posts', options)
        .then(response => response.json())
        .then(data => {
            data.forEach(e => {

                var date = new Date(e.data)
                let dataFormatada = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' })

                var post = document.querySelector(".post").cloneNode(true)
                post.classList.remove("model")
                post.id = e.id
                post.querySelector(".comment").id = e.id
                post.querySelector("#pergunta").innerHTML = e.duvida
                post.querySelector("#nome").innerHTML = e.usuario
                post.querySelector("#data").innerHTML = dataFormatada


                var tag = {
                    "idPost": e.id
                }
                const options2 = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(tag)
                }

                fetch('http://localhost:5000/forum/readTag', options2)
                    .then(response => response.json())
                    .then(t => {
                        t.forEach(tag => {

                            var ta = post.querySelector(".postTag").cloneNode(true)
                            ta.classList.remove("model")
                            ta.querySelector("span").innerHTML = tag.tag

                            post.querySelector(".postTags").appendChild(ta)
                        })
                    })

                const options3 = { method: 'GET' };


                fetch('http://localhost:5000/forum/post/' + e.id, options3)
                    .then(response => response.json())
                    .then(com => {

                        if (com.comments === undefined) {
                            post.querySelector(".noComment").classList.remove("model")
                        } else {
                            com.comments.forEach((c) => {
                                var dados = document.querySelector(".dadosComment").cloneNode(true)
                                dados.classList.remove("model")

                                var d = new Date(c.dataComment)
                                let df = d.toLocaleDateString('pt-BR', { timeZone: 'UTC' })

                                dados.querySelector(".userComment").innerHTML = c.usuarioComment
                                dados.querySelector(".respostaComment").innerHTML = c.resposta
                                dados.querySelector(".dataComment").innerHTML = df

                                contAnswer = com.comments.length
                                console.log(c.idComment)
                                

                                if (c.answerComments !== undefined) {


                                    var da = new Date(c.answerComments.dataComment)
                                    let daf = da.toLocaleDateString('pt-BR', { timeZone: 'UTC' })

                                    let answer = dados.querySelector(".answerComment")
                                    answer.classList.remove("model")

                                    answer.querySelector(".userAnswer").innerHTML = c.answerComments.usuarioComment
                                    answer.querySelector(".respostaAnswer").innerHTML = c.answerComments.resposta
                                    answer.querySelector(".dataAnswer").innerHTML = daf

                                } else {
                                    let cadAnswer = dados.querySelector(".cadAnswer")
                                    cadAnswer.classList.remove("model")
                                    cadAnswer.querySelector("button").setAttribute("onclick", "showAnswer("+c.idComment+")")
                                }



                                post.querySelector(".infoComment").appendChild(dados)
                            })
                        }


                    })

                document.querySelector(".posts").appendChild(post)
                    
            })
        })

}

function carregarTags() {
    const options = { method: 'GET' };

    fetch('http://localhost:5000/forum/tag', options)
        .then(response => response.json())
        .then(tag => {
            tag.forEach(t => {
                var tag = document.createElement("span")
                tag.setAttribute("onclick", "filtrarPost(this)")
                tag.innerHTML = t.tag
                tag.id = "semCor"

                document.querySelector(".tag").appendChild(tag)

                var tags = document.createElement("option")
                tags.value = t.tag
                tags.innerHTML = t.tag

                document.querySelector("#tagsPost").appendChild(tags)
            })
        })
}

function filtrarTags() {
    let input = document.getElementById('buscaTag').value
    input = input.toLowerCase();
    let x = document.querySelector(".tag").querySelectorAll("span");

    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }
        else {
            x[i].style.display = "flex";
        }
    }
}

function filtrarPost(e) {

    document.querySelector(".tag").querySelectorAll("span").forEach((g) => {
        if (g.id === "corSpan") {
            console.log(g);
            g.id = "semCor"
        }
    })

    console.log(e);
    e.id = "corSpan"
    var posts = document.querySelectorAll(".post")

    posts.forEach(p => {

        if (p.id !== "teste") {
            let tag = p.querySelectorAll(".postTag")

            tag.forEach(t => {
                if (t.querySelector("span").innerHTML === e.innerHTML || e.innerHTML === "Todos") {
                    p.classList.remove("model")
                } else {
                    t.querySelector("span").style.color = "#000"
                    p.classList.add("model")
                }
            })
        }

    })

}

function carregaComment(e) {

    var info = document.getElementById(e).querySelector(".infoComment")

    info.classList.add("aberto")

    var dados = info.querySelectorAll(".dadosComment")

    var ta = 0

    dados.forEach((c, index) => {
        if (index !== 0) {
            ta += c.clientHeight
        }
    })

    ta += ((dados.length - 1) * 30) + 200



    if (ta !== 0) {
        info.style.height = ta.toString() + 'px'
    }



}

function esconderComment(e) {

    var info = document.getElementById(e).querySelector(".infoComment")
    info.style.height = "100%"

    setTimeout(() => {
        var dados = document.getElementById(e).querySelector(".mascara")

        dados.style.height = "0px"
    }, 1500)

}

function cadPost() {
    document.querySelector(".modalP").classList.remove("model")
}


function enviarPost() {

    var text = document.querySelector(".cad").querySelector("textarea").value

    var at = new Date()

    var fat = at.getFullYear() + "/" + at.getMonth() + "/" + at.getDate()

    var tag = document.querySelector("#tagsPost")
    var opcaoValor = tag.options[tag.selectedIndex].value;

    var po = document.querySelectorAll(".post")

    po.forEach((p, index) => {
        if (index == 1) {
            po = parseInt(p.id) + 1
        }
    })

    if (text.length < 10) {
        window.alert("Não realiza gracejos em")
    } else {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "duvida": text,
                "user": user,
                "data": fat
            })
        };

        fetch('http://localhost:5000/forum/cadastrarPost', options)
            .then(response => response.json())
            .then(response => {
                if (response !== null) {
                    const options2 = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            "tag": opcaoValor,
                            "idPost": po
                        })
                    };

                    fetch('http://localhost:5000/forum/postsTag', options2)
                        .then(resp => resp.json())
                        .then(res => {
                            if (res !== null) {
                                window.location.reload()
                            }
                        })
                }
            })
    }

}

var postIdCom

function cadComment(e) {
    postIdCom = parseInt(e.id)
    document.querySelector(".modalC").classList.remove("model")
}

function enviarComment() {

    var textCom = document.querySelector("#textComment").value
    var at = new Date()

    var fat = at.getFullYear() + "/" + at.getMonth() + "/" + at.getDate()

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "idPost": postIdCom,
            "resposta": textCom,
            "usuario": user,
            "data": fat
        })
    };

    fetch('http://localhost:5000/forum/comment', options)
        .then(response => response.json())
        .then(response => {
            if (response !== null) {
                window.location.reload()
            }
        })
}

var idAnswer

function showAnswer(c) {
    document.querySelector(".modalA").classList.remove("model")
    idAnswer = c
}

function enviarAnswer() {

    var textCom = document.querySelector("#textanswer").value
    var at = new Date()

    var fat = at.getFullYear() + "/" + at.getMonth() + "/" + at.getDate()

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "idComment": idAnswer,
            "resposta": textCom,
            "usuario": user,
            "data": fat
        })
    };

    fetch('http://localhost:5000/forum/answerComment', options)
        .then(response => response.json())
        .then(response => {
            if (response !== null) {
                window.location.reload()
            }
        })
}