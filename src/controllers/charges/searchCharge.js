const knex = require("../../database/connection");

const searchCharge = async (req, res) => {
    const { search } = req.body;

    try {
        let findCharges = [];

        if (isNaN(search)) {
            findCharges = await
            knex('cobrancas')
            .join('clientes', 'cobrancas.cliente_id', 'clientes.id')
            .select(knex.ref('clientes.nome').as('cliente_nome'), 'cobrancas.id', 'cobrancas.valor', 'cobrancas.vencimento', 'cobrancas.status', 'cobrancas.descricao')
            .whereILike('clientes.nome', `%${search}%`);
        } else {
            findCharges = await
            knex('cobrancas')
            .join('clientes', 'cobrancas.cliente_id', 'clientes.id')
            .select(knex.ref('clientes.nome').as('cliente_nome'), 'cobrancas.id', 'cobrancas.valor', 'cobrancas.vencimento', 'cobrancas.status', 'cobrancas.descricao')
            .where('cobrancas.id', Number(search)).first();
        };

        if (findCharges.length === 0) {
            return res.status(404).json('A cobrança não foi encontrada');
        };

        return res.status(200).json(findCharges);

    } catch (error) {
        return res.status(500).json(error.message);
    };
};

module.exports = searchCharge;