const knex = require("../../database/connection");
const schemaClient = require("../../validations/schemaClient");

const registerClient = async (req, res) => {
  const { usuario } = req;
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

  try {
    await schemaClient.validate(req.body);

    const searchEmail = await knex("clientes")
      .select("email")
      .where("email", email);

    if (searchEmail.length > 0) {
      return res.status(400).json("O email já existe");
    }

    const clientDatas = { usuario_id: usuario.id, ...req.body };

    const clientRegistration = await knex("clientes").insert(clientDatas);

    if (clientRegistration.length === 0) {
      return res.status(400).json("O cliente não foi cadastrado.");
    }

    return res.status(200).json("O cliente foi cadastrado com sucesso!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = registerClient;
