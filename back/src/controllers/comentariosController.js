const Item = require('../models/comentarios');
const con = require('../models/forumDAO');

const cadastrarComentarios = (req, res) => {
    con.query(Item.toCreateComment(req.body), (err, result) => {
        if (err == null) {
            res.status(201).json(req.body).end();
        } else {
            res.status(500).json(err).end();
        }
    })
}

const cadastrarRespostaComentario = (req, res) => {
    con.query(Item.toCreateAnswerComment(req.body), (err, result) => {
        if (err == null) {
            res.status(201).json(req.body).end();
        } else {
            res.status(500).json(err).end();
        }
    })
}

const deletarComment = (req, res) => {
    con.query(Item.toDeleteComment(req.body), (err, result) => {
        if (err == null)
            if (result.affectedRows > 0)
                res.status(204).end();
            else
                res.status(404).end();
        else
            res.status(400).json(err).end();
    });
}

const deletarAnswerComment = (req, res) => {
    con.query(Item.toDeleteAnswerComment(req.body), (err, result) => {
        if (err == null)
            if (result.affectedRows > 0)
                res.status(204).end();
            else
                res.status(404).end();
        else
            res.status(400).json(err).end();
    });
}


module.exports = {
    cadastrarComentarios,
    cadastrarRespostaComentario,
    deletarComment,
    deletarAnswerComment
}