const knex = require("../../database/connection");
const schemaRegisterCharge = require("../../validations/schemaRegisterCharge");

const registerCharge = async (req, res) => {
    const { descricao, status, valor, vencimento } = req.body;
    const { id } = req.params;

    try {
        await schemaRegisterCharge.validate(req.body);

        const searchClient = await knex('clientes').where('id', id);
        
        if (searchClient.rows === 0) {
            return res.status(404).json('Cliente não está cadastrado');
        };

        const registrationCharge = await knex('cobrancas').insert({
            cliente_id: id,
            descricao,
            status,
            valor,
            vencimento
        });

        if (registrationCharge.rowCount === 0) {
            return res.status(400).json('Cobrança não cadastrada');
        };

        return res.status(201).json('Cobrança cadastrada com sucesso');
        
    } catch (error) {
        return res.status(400).json(error.message);
    };
};

module.exports = registerCharge;