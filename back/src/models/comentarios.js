const toCreateComment = (model) => {
    return `INSERT INTO comment VALUES (default, ${model.idPost}, '${model.resposta}', '${model.usuario}', '${model.data}');`;
}

const toCreateAnswerComment = (model) => {
    return `INSERT INTO answerComment VALUES (default, ${model.idComment}, '${model.resposta}', '${model.usuario}', '${model.data}');`;
}

const toDeleteComment = (model) => {
    return `DELETE FROM comment WHERE idComment = ${model.id}`;
}

const toDeleteAnswerComment = (model) => {
    return `DELETE FROM answerComment WHERE idAnswer = ${model.id}`;
}

module.exports = {
    toCreateComment,
    toCreateAnswerComment,
    toDeleteComment,
    toDeleteAnswerComment
}