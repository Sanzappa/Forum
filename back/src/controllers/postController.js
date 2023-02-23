const Item = require('../models/post');
const con = require('../models/forumDAO');

class Posts {

    constructor(usuario, postDuvida, dataPost, tag) {
        this.usuario = usuario
        this.postDuvida = postDuvida
        this.dataPost = dataPost
        this.tag = tag
    }

    comments = []

    addComments(com) {
        this.comments.push(com)
    }

}

class Comments {

    constructor(idComment, usuarioComment, resposta, dataComment) {
        this.idComment = idComment
        this.usuarioComment = usuarioComment
        this.resposta = resposta
        this.dataComment = dataComment
    }

    answerComments = {}

    addAnswer(ans) {
        this.answerComments = ans
    }

}

const listarTodos = (req, res) => {
    con.query(Item.toReadAllPost(), (err, result) => {
        if (err == null) {
            res.status(201).json(result).end();
        } else {
            res.status(500).json(err).end();
        }
    })
}
 
const cadastrarPost = (req, res) => {
    con.query(Item.toCreatePost(req.body), (err, result) => {
        if (err == null)
            res.status(201).json(req.body).end();
        else
            if (err.sqlState == 23000)
                res.status(406).json(err).end();
            else
                res.status(500).json(err).end();
    });
}

const cadastrarPostTag = (req, res) => {
    con.query(Item.toCreatePostTag(req.body), (err, result) => {
        if (err == null)
            res.status(201).json(req.body).end();
        else
            if (err.sqlState == 23000)
                res.status(406).json(err).end();
            else
                res.status(500).json(err).end();
    });
}


const listarPost = (req, res) => {
    con.query(Item.toReadPost(req.params), (err, result) => {
        if (err == null) {
            console.log(result.length)
            if (result.length === 0) {
                let resposta = "Infelizmente não conseguimos encontrar a pergunta selecionada"
                res.json(resposta).end()
            } else {
                let post = new Posts(result[0].usuario, result[0].postDuvida, result[0].dataPost, result[0].tag)
                con.query(`SELECT * FROM vw_Post WHERE idPost = '${result[0].idPost}'`, (errP, resultP) => {
                    if (errP == null) {
                        resultP.forEach((re, indice) => {
                            let comment = new Comments(re.idComment, re.usuarioComment, re.resposta, re.dataComment)
                            con.query(`SELECT * FROM vw_Comment WHERE idComment = ${re.idComment}`, (errC, resultC) => {
                                if (errC == null) {
                                    comment.addAnswer(resultC[0])
                                    post.addComments(comment)
                                    if (indice == resultP.length - 1) {
                                        res.json(post).end()
                                    }
                                } else {
                                    res.json(errC).end()
                                }
                            })
                        })
                    } else {
                        res.json(errP).end()
                    }
                })
            }

        } else {
            return res.status(500).end();
        }
    })
}

const deletarPost = (req, res) => {
    con.query(Item.toDeletePost(req.body), (err, result) => {
        if (err == null)
            if (result.affectedRows > 0)
                res.status(204).end();
            else
                res.status(404).end();
        else
            res.status(400).json(err).end();
    });
}

const listarTag = (req, res) => {
    con.query(Item.toReadTag(req.body), (err, result) => {
        if (err == null)
            res.status(201).json(result).end();
        else
            if (err.sqlState == 23000)
                res.status(406).json(err).end();
            else
                res.status(500).json(err).end();
    });
}

module.exports = {
    cadastrarPost,
    cadastrarPostTag,
    listarPost,
    listarTodos,
    deletarPost,
    listarTag
}