const knex = require('../../database/connection');

const detailCharge = async (req, res) => {
    const { id } = req.params;

    try {
        const searchChargeID = await knex('cobrancas').where({ id }).first();
        if (!searchChargeID) {
            return res.status(404).json('A cobrança não foi encontrada através do ID');
        };

        return res.status(200).json(searchChargeID);
    } catch (error) {
        return res.status(400).json(error);
    };
};

module.exports = detailCharge;