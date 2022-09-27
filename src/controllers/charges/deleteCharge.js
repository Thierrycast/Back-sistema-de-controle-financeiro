const knex = require('../../database/connection');

const deleteCharge = async (req, res) => {
    const { id } = req.params;
    const date = new Date();

    try {
        const searchChargeID = await knex('cobrancas').where({ id }).first();
        if (!searchChargeID) {
            return res.status(404).json('A cobrança não foi encontrada através do ID');
        };

        if (searchChargeID.status === true) {
            return res.status(400).json('Não é possível excluir uma cobrança paga');
        };

        const dueDate = searchChargeID.vencimento;
        if (dueDate < date) {
            return res.status(400).json('Não é possível excluir uma cobrança vencida');
        };

        const deleted = await knex('cobrancas').del().where({ id });
        if (!deleted) {
            return res.status(400).json('Não foi possível excluir a cobrança');
        };

        return res.status(200).json('A cobrança foi apagada');

    } catch (error) {
        return res.status(400).json(error);
    };
};

module.exports = deleteCharge;