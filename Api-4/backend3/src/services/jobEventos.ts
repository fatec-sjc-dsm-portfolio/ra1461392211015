import { verificandoAlertas } from "./verificandoAlertas";

const schedule = require('node-schedule');

export const jobEventos = () =>{
    schedule.scheduleJob('*/1 * * * *', function () {
    verificandoAlertas();

})};


