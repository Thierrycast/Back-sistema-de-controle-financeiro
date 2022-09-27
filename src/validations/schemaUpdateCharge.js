const yup = require("yup");

const { pt } = require("yup-locales");
const { setLocale } = require("yup");
setLocale(pt);

const schemaUpdateCharges = yup.object().shape({
    descricao: yup.string(),
    vencimento: yup.date(),
    valor: yup.number(),
    status: yup.string()
});

module.exports = schemaUpdateCharges;