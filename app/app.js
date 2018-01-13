const Koa = require('koa'),
    router = require('koa-router')(),
    koaBody = require('koa-body'),

    app = module.exports = new Koa(),

    Patient = require('./controller/PatientController');

// "database"

// middleware

app.use(koaBody());

router
.get('/dpe/patients', Patient.getPatients)
.get('/dpe/patient/:id', Patient.getPatient);

app.use(router.routes());

// listen
if (!module.parent) app.listen(4100);
