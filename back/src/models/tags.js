const toCreateTag = (model) => {
    return `INSERT INTO tags VALUES ('${model.tag}');`;
}

const toReadTag = () => {
    return `SELECT * FROM tags`
}

module.exports = {
    toCreateTag,
    toReadTag
}