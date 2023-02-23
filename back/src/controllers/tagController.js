const Item = require('../models/tags');
const con = require('../models/forumDAO');

const cadastrarTag = (req, res) => {
    con.query(Item.toCreateTag(req.body), (err, result) => {
        if (err == null)
            res.status(201).end();
        else
            if (err.sqlState == 23000)
                res.status(406).json(err).end();
            else
                res.status(500).json(err).end();
    });
}

const listarTags = (req, res) => {
    con.query(Item.toReadTag(), (err, result) => {
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
    cadastrarTag,
    listarTags
}