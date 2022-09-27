const { date } = require("yup");
const knex = require("../../database/connection");

const listCharges = async (req, res) => {
  try {
    let charges = await knex("cobrancas")
      .join('clientes', 'cobrancas.cliente_id', 'clientes.id')
      .select(knex.ref('clientes.nome').as('cliente_nome'), 'cobrancas.id', 'cobrancas.valor', 'cobrancas.vencimento', 'cobrancas.status', 'cobrancas.descricao')
      .orderBy('cobrancas.id');

    charges.forEach((charge, index) => {
      if (charge.status) {
        charges[index] = {
          ...charge,
          status: "Paga",
        };
      } else {
        charges[index] = {
          ...charge,
          status: charge.vencimento < new Date() ? "Vencida" : "Pendente",
        };
      }
    });

    return res.status(200).json(charges);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = listCharges;
