const knex = require("../../database/connection");

const defaulters = async (req, res) => {
  try {
    const clients = await knex("clientes");
    const defaulterClients = [];

    for (let i = 0; i < clients.length; i++) {
      const charges = await knex("cobrancas").where(
        "cliente_id",
        clients[i].id
      );

      for (let index = 0; index < charges.length; index++) {
        if (
          charges[index].status === false &&
          charges[index].vencimento < new Date()
        ) {
          clients[i] = { ...clients[i], status: "Inadimplente" };
          defaulterClients.push(clients[i]);

          break;
        }
      }
    }

    return res.status(200).json(defaulterClients);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = defaulters;
