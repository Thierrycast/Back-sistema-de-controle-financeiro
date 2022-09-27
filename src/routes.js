const express = require("express");
const login = require("./controllers/Login/login");
const authorization = require("./middleware/authorization");
const route = express();

const getUser = require("./controllers/user/getDataUser");
const registerUser = require("./controllers/user/registerUser");
const updateUser = require("./controllers/user/updateUser");

const registerClient = require("./controllers/client/registerClient");
const listClients = require("./controllers/client/listClients");
const updateClient = require("./controllers/client/updateClient");
const detailClient = require("./controllers/client/detailClient");
const defaulters = require("./controllers/client/defaulter_clients");
const nonDefaulters = require("./controllers/client/non-defaulting_clients");

const listCharges = require("./controllers/charges/listCharges");
const registerCharge = require("./controllers/charges/registerCharges");
const chargesClient = require("./controllers/charges/chargesClient");
const updateCharge = require("./controllers/charges/updateCharge");
const deleteCharge = require("./controllers/charges/deleteCharge");

const chargesDashboard = require("./controllers/dashboard/chargesDashboard");

route.post("/usuario", registerUser);

route.post("/login", login);

route.use(authorization);

route.get("/usuario", getUser);
route.put("/usuario", updateUser);

route.post("/cliente", registerClient);
route.get("/cliente", listClients);
route.get("/cliente/:id", detailClient);
route.put("/cliente/:id", updateClient);

route.get("/clientes-inadimplentes", defaulters);
route.get("/clientes-adimplentes", nonDefaulters);

route.get("/cobranca", listCharges);
route.get("/cobranca/cliente/:id", chargesClient);
route.get("/cobranca/:id", detailClient);
route.post("/cobranca/:id", registerCharge);
route.put("/cobranca/:id", updateCharge);
route.delete("/cobranca/:id", deleteCharge);

route.get("/dashboard", chargesDashboard);

module.exports = route;
