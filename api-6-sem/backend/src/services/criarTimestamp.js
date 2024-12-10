const { utcToZonedTime } = require('date-fns-tz');
const { getTime, addHours, addDays } = require('date-fns');

function criarTimestampDeHoras(horas) {
  const datetime = new Date();
  const timezone = 'America/Sao_Paulo';
  var dataEHoraComHoras = utcToZonedTime(datetime, timezone);
  dataEHoraComHoras = addHours(dataEHoraComHoras, horas);
  // pegando o timestamp de dataEHoraComHoras
  return Math.floor(getTime(dataEHoraComHoras) / 1000);
}

function criarTimestampDeDias(dias) {
  const datetime = new Date();
  const timezone = 'America/Sao_Paulo';
  var dataEHoraComDias = utcToZonedTime(datetime, timezone);
  dataEHoraComDias = addDays(dataEHoraComDias, dias);
  // pegando o timestamp de dataEHoraComDias
  return Math.floor(getTime(dataEHoraComDias) / 1000);
}

module.exports = { criarTimestampDeHoras, criarTimestampDeDias };
