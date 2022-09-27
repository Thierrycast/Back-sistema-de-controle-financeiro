const knex = require("../../database/connection");

const chargesDashboard = async (req, res) => {
  try {
    const paid = await knex("cobrancas")
      .join("clientes", "cobrancas.cliente_id", "clientes.id")
      .select(
        knex.ref("clientes.nome").as("cliente_nome"),
        "cobrancas.id",
        "cobrancas.valor",
        "cobrancas.vencimento",
        "cobrancas.status",
        "cobrancas.descricao"
      )
      .where("cobrancas.status", true);

    const sumPaid = await knex("cobrancas")
      .sum("valor")
      .where("cobrancas.status", true)
      .first();

    const chargesPaid = {
      amount: Number(sumPaid.sum),
      charges: paid,
      count: paid.length,
    };

    const overdue = await knex("cobrancas")
      .join("clientes", "cobrancas.cliente_id", "clientes.id")
      .select(
        knex.ref("clientes.nome").as("cliente_nome"),
        "cobrancas.id",
        "cobrancas.valor",
        "cobrancas.vencimento",
        "cobrancas.status",
        "cobrancas.descricao"
      )
      .where("cobrancas.status", false)
      .andWhere("cobrancas.vencimento", "<", new Date());

    const sumOverdue = await knex("cobrancas")
      .sum("valor")
      .where("cobrancas.status", false)
      .andWhere("cobrancas.vencimento", "<", new Date())
      .first();

    const chargesOverdue = {
      amount: Number(sumOverdue.sum),
      charges: overdue,
      count: overdue.length,
    };

    const outstanding = await knex("cobrancas")
      .join("clientes", "cobrancas.cliente_id", "clientes.id")
      .select(
        knex.ref("clientes.nome").as("cliente_nome"),
        "cobrancas.id",
        "cobrancas.valor",
        "cobrancas.vencimento",
        "cobrancas.status",
        "cobrancas.descricao"
      )
      .where("cobrancas.status", false)
      .andWhere("cobrancas.vencimento", ">=", new Date());

    const sumOutstanding = await knex("cobrancas")
      .sum("valor")
      .where("cobrancas.status", false)
      .andWhere("cobrancas.vencimento", ">=", new Date())
      .first();

    const chargesOutstanding = {
      amount: Number(sumOutstanding.sum),
      charges: outstanding,
      count: outstanding.length,
    };

    const getAllChargesByStatus = {
      chargesPaid,
      chargesOverdue,
      chargesOutstanding,
    };

    return res.status(200).json(getAllChargesByStatus);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = chargesDashboard;
