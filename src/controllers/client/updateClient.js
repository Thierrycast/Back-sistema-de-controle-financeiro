const knex = require("../../database/connection");
const schemaClient = require("../../validations/schemaClient");

const updateClient = async (req, res) => {
  const {
    nome,
    email,
    cpf,
    telefone,
    logradouro,
    complemento,
    cep,
    bairro,
    cidade,
    estado,
  } = req.body;

  const { id } = req.params;

  try {
    await schemaClient.validate(req.body);

    const searchEmail = await knex("clientes")
      .where("id", "!=", id)
      .andWhere("email", email);

    if (searchEmail.length > 0) {
      return res
        .status(400)
        .json("Já existe este e-mail cadastrado por outro usuário.");
    }

    const searchCpf = await knex("clientes")
      .where("id", "!=", id)
      .andWhere("cpf", cpf);

    if (searchCpf.length > 0) {
      return res
        .status(400)
        .json("Já existe este cpf cadastrado por outro usuário.");
    }

    const updateData = await knex("clientes")
      .update({ ...req.body })
      .where("id", id)
      .returning("*");

    if (updateData.length === 0) {
      return res.status(400).json("Falha na atualização dos dados do cliente.");
    }

    return res.status(200).json("Atualização realizada com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = updateClient;
