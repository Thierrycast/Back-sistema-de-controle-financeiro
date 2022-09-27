const yup = require("yup");

const { pt } = require("yup-locales");
const { setLocale } = require("yup");
setLocale(pt);

const schemaRegisterCharge = yup.object().shape({
    descricao: yup.string().required(),
    vencimento: yup.date().required(),
    valor: yup.number().required(),
    status: yup.string().required()
});

module.exports = schemaRegisterCharge;