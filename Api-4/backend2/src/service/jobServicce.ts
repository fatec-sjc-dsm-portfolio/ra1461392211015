import { manipular } from '../service/manipulacaoDadosService';

const schedule = require('node-schedule');

export const job = () =>{
    schedule.scheduleJob('*/2 * * * *', function () {
    manipular();
})};
