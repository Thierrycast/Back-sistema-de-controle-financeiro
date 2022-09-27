const knex = require("../../database/connection");
const bcrypt = require("bcrypt");

const { schemaRegisterUser } = require("../../validations/schemaUsers");

async function registerUser(req, res) {
  const { nome, email, senha } = req.body;

  try {
    await schemaRegisterUser.validate(req.body);

    const searchEmail = await knex("usuarios")
      .select("email")
      .where("email", email);

    if (searchEmail.length > 0) {
      return res.status(400).json("O email já existe");
    }

    const passwordEncrypted = await bcrypt.hash(senha, 10);

    const userDatas = { nome, email, senha: passwordEncrypted };
    const userRegistration = await knex("usuarios").insert(userDatas);

    if (userRegistration.length === 0) {
      return res.status(400).json("O usuário não foi cadastrado.");
    }

    return res.status(200).json("O usuario foi cadastrado com sucesso!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = registerUser;
