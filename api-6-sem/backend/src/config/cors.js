const cors = require('cors');
const { zonedTimeToUtc } = require('date-fns-tz');
const whitelist = [
  'https://vmarketcompras.com.br',
  'https://hml.vmarketcompras.com.br',
  'https://app.vmarket.com.br',
  'https://compras-v2.vercel.app',
  'https://compras.vmarket.com.br',
  'https://v4jcng111g.execute-api.us-east-1.amazonaws.com',
  'https://lbshcne9lb.execute-api.us-east-1.amazonaws.com',
  'https://hml-financeiro.vmarket.com.br',
  'https://financeiro.vmarket.com.br',
  'https://vm-financeiro-hml.vercel.app',
  'https://vm-financeiro.vercel.app',
];

const gerarAuthToken = () => {
  // o token sera a soma de ano+mes+dia + '102030@@' + 'financeiro'
  const dataAtual = new Date();
  // deixando data em gmt do brasil estado de sp usando datefnstz
  const dataAtualSp = zonedTimeToUtc(dataAtual, 'America/Sao_Paulo');
  const dia = dataAtualSp.getDate();
  const ano = dataAtualSp.getFullYear() + 1;
  const mes = dataAtualSp.getMonth();
  const data = parseInt(ano) + parseInt(mes) + parseInt(dia);
  const token = `${data}102030@@financeiro`;
  return token;
};

const corsOptionsDelegate = (req, callback) => {
  const origin = req.header('Origin');
  var isDomainAllowed = whitelist.includes(origin);
  var isTokenValid = req.header('X-Custom-Auth') === gerarAuthToken();

  if (process.env.APP_BASE === 'dev') {
    isTokenValid = true;
    isDomainAllowed = true;
  }

  if (isDomainAllowed || isTokenValid) {
    callback(null, { origin: true }); // Permite a origem se estiver na whitelist ou se o token for válido
  } else {
    callback(new Error('Not allowed by CORS'), { origin: false }); // Rejeita se não estiver na whitelist e o token estiver errado
  }
};

module.exports = cors(corsOptionsDelegate);
