const express = require('express')
const router = express.Router()

const user = require("../controllers/userController")
const post = require("../controllers/postController")
const comment = require("../controllers/comentariosController")
const tag = require("../controllers/tagController")
const middle = require("../middleware/validaAutorizacao")

router.post("/forum/validaUser", user.validarUsuarios)
router.post("/forum/cadastrarUser", user.cadastrarUsuario)

router.post("/forum/cadastrarPost", post.cadastrarPost)
router.get("/forum/posts", post.listarTodos)
router.post("/forum/postsTag", post.cadastrarPostTag)
router.post("/forum/readTag", post.listarTag)
router.get("/forum/post/:idPost", post.listarPost)
router.delete("/forum/posts", middle.validaAcesso, post.deletarPost)

router.post("/forum/comment", comment.cadastrarComentarios)
router.delete("/forum/comment/delete", comment.deletarComment)
router.post("/forum/answerComment", comment.cadastrarRespostaComentario)
router.delete("/forum/answerComment/delete", comment.deletarAnswerComment)

router.post("/forum/tag", tag.cadastrarTag)
router.get("/forum/tag", tag.listarTags)

module.exports = router