const knex = require("../../database/connection");

const listClients = async (req, res) => {
  try {
    const clients = await knex("clientes");

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

          break;
        } else {
          clients[i] = { ...clients[i], status: "Em dia" };
        }
      }
    }

    if (clients.length === 0) {
      return res.status(404).json("Nenhum cliente encontrado");
    }

    return res.status(200).json(clients);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = listClients;
