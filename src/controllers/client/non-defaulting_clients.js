const knex = require("../../database/connection");

const nonDefaulters = async (req, res) => {
  try {
    const clients = await knex("clientes");
    nonDefaultersClients = [];

    for (let i = 0; i < clients.length; i++) {
      const charges = await knex("cobrancas").where(
        "cliente_id",
        clients[i].id
      );

      const verify = charges.find((charge) => {
        return charge.status === false;
      });

      if (!verify) {
        clients[i] = { ...clients[i], status: "Em dia" };
        nonDefaultersClients.push(clients[i]);
      }
    }

    return res.status(200).json(nonDefaultersClients);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = nonDefaulters;
