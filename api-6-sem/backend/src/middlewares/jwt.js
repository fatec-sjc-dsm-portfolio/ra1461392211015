const { verify } = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

const JwtMiddleware = async (req, res, next) => {
  try {
    const secret = String(process.env.JWT_SECRET);

    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
      return res.status(401).send({
        status: 401,
        message: 'Token inválido ou não fornecido.',
      });
    }

    const token = req.headers.authorization.split(' ')[1];
    const decoded = verify(token, secret);

    const user = await userRepository.find({ id_usuario: decoded.id_usuario });

    if (!user) {
      return res.status(404).send({
        status: 404,
        message: 'Usuário não encontrado.',
      });
    }

    // if (user.nome_nivel !== 'admin') {
    //   return res.status(403).send({
    //     status: 403,
    //     message: 'Acesso negado. Apenas administradores podem acessar essa rota.',
    //   });
    // }

    req.user = { id_usuario: decoded.id_usuario, nome_nivel: user.nome_nivel };
    next();
  } catch (error) {
    console.log(error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({
        status: 401,
        message: 'Token expirado.',
      });
    }
    return res.status(401).send({
      status: 401,
      message: 'Token inválido.',
    });
  }
};

module.exports = JwtMiddleware;
