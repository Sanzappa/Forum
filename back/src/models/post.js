const toCreatePost = (model) => {
    return `INSERT INTO post VALUES (default, '${model.duvida}', '${model.user}', '${model.data}');`;
}

const toCreatePostTag = (model) => {
    return `INSERT INTO postTags VALUES (default, '${model.tag}', '${model.idPost}');`;
}

const toDeletePost = (model) => {
    return `DELETE FROM post WHERE id = ${model.id}`;
}

const toReadAllPost = () => {
    return 'SELECT * FROM post ORDER BY id desc'
}

const toReadPost = (model) => {
    return `SELECT * FROM vw_Post where idPost = ${model.idPost}`
}

const toReadTag = (model) => {
    return `SELECT * FROM postTags where idPost = ${model.idPost}`
}

module.exports = {
    toCreatePost,
    toReadPost,
    toReadAllPost,
    toCreatePostTag,
    toDeletePost,
    toReadTag
}