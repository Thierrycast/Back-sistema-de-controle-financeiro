const knex = require("../../database/connection");

const chargesClient = async (req, res) => {
  const { id } = req.params;

  try {
    const searchClient = await knex("clientes").where({ id });
    if (searchClient.rows === 0) {
      return res.status(400).json("Cliente não cadastrado");
    }

    const allChargesClient = await knex("cobrancas").where({ cliente_id: id });

    allChargesClient.forEach((charge, index) => {
      if (charge.status) {
        allChargesClient[index] = {
          ...charge,
          status: "Paga",
        };
      } else {
        allChargesClient[index] = {
          ...charge,
          status: charge.vencimento < new Date() ? "Vencida" : "Pendente",
        };
      }
    });

    return res.status(200).json(allChargesClient);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
module.exports = chargesClient;
