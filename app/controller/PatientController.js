async function getPatients(ctx) {
    await ctx.body = 'Hello World';
}

async function getPatient(ctx) {
    await ctx.body = 'Hello World';
}

module.exports = {
    getPatients,
    getPatient
};