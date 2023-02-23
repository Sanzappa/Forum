const Item = require('../models/usuarios');
const con = require('../models/forumDAO');

const jwt = require('jsonwebtoken')
require('dotenv').config()

const cadastrarUsuario = (req, res) => {
    con.query(Item.toCreateUsers(req.body), (err, result) => {
        if (err == null)
            res.status(201).json(req.body).end();
        else
            if (err.sqlState == 23000)
                res.status(406).json("Usuario ja cadastrado").end();
            else
                res.status(500).json(err).end();
    });
}


const validarUsuarios = (req, res) => {

    jwt.sign(req.body, process.env.KEY, { expiresIn: '10m' }, function (err, token) {

        const ex = {
            "token": token,
            "autoriza": true
        }

        if (err === null) {
            con.query(Item.toValidateUsers(req.body), (err, result) => {
                if (err == null)
                    if (result.length == 0) {
                        return res.json(false).end()
                    } else {
                        return res.json(ex).end()
                    }
                else
                    return res.status(500).end()
            })
        } else {
            res.status(404).json(err).end()
        }
    })

}

module.exports = {
    cadastrarUsuario,
    validarUsuarios
}