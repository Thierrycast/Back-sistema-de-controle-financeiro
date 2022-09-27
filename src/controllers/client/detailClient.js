const knex = require("../../database/connection");

const detailClient = async (req, res) => {
  const { id } = req.params;

  try {
    const clients = await knex("clientes").where("id", id);

    return res.status(200).json(clients[0]);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = detailClient;
