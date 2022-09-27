const knex = require("../../database/connection");
const bcrypt = require("bcrypt");

const { schemaUpdateUser } = require("../../validations/schemaUsers");

const updateUser = async (req, res) => {
  const { nome, email, senha, cpf, telefone } = req.body;
  const { usuario } = req;

  try {
    await schemaUpdateUser.validate(req.body);

    const search = await knex("usuarios")
      .where("id", "!=", usuario.id)
      .andWhere("email", email);

    if (search.length > 0) {
      return res
        .status(400)
        .json("Já existe este e-mail cadastrado por outro usuário.");
    }

    const passwordEncrypted = await bcrypt.hash(senha, 10);

    const updateData = await knex("usuarios")
      .update({ nome, email, senha: passwordEncrypted, cpf, telefone })
      .where("id", usuario.id)
      .returning("*");

    if (updateData.length === 0) {
      return res.status(400).json("Falha na atualização dos dados do usuário.");
    }

    return res.status(200).json("Atualização realizada com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = updateUser;
