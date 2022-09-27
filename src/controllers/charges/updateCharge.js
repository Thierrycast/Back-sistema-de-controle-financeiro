const knex = require("../../database/connection");
const schemaUpdateCharge = require("../../validations/schemaUpdateCharge");

const updateCharge = async (req, res) => {
    const { descricao, status, valor, vencimento } = req.body;
    const { id } = req.params;

    try {
        await schemaUpdateCharge.validate(req.body);

        const searchClient = await knex('clientes').where('id', id);
        
        if (searchClient.rows === 0) {
            return res.status(404).json('Cliente não está cadastrado');
        };

        const update = await knex('cobrancas').where(id).update({
            cliente_id: id,
            descricao,
            status,
            valor,
            vencimento
        });

        if (update.rowCount === 0) {
            return res.status(400).json('Cobrança não atualizada');
        };

        return res.status(201).json('Cobrança atualizada com sucesso');
        
    } catch (error) {
        return res.status(400).json(error.message);
    };
};

module.exports = updateCharge;