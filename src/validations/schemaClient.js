const yup = require("yup");

const { pt } = require("yup-locales");
const { setLocale } = require("yup");
setLocale(pt);

const schemaClient = yup.object().shape({
  nome: yup.string().required(),
  email: yup.string().required().email(),
  cpf: yup.string().required(),
  telefone: yup.string().required(),
});

module.exports = schemaClient;
