const toCreateUsers = (model) => {
    return `INSERT INTO users VALUES ('${model.usuario}','${model.nome}','${model.senha}', ${model.role})`;
}

const toValidateUsers = (model) => {
    return `SELECT * FROM users WHERE usuario = '${model.usuario}' and senha = '${model.senha}'`
}

module.exports = {
    toCreateUsers,
    toValidateUsers
}