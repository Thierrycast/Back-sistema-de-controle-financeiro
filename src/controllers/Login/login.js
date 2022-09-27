const knex = require("../../database/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const schemaLogin = require("../../validations/schemaLogin");

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    await schemaLogin.validate(req.body);

    const usuario = await knex("usuarios").where({ email }).first();

    if (!usuario) {
      return res.status(400).json("E-mail não existe no cadastro");
    }

    const checkPassword = await bcrypt.compare(senha, usuario.senha);

    if (!checkPassword) {
      return res.status(400).json("A senha está incorreta");
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });

    return res.status(200).json({
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
      token,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = login;
