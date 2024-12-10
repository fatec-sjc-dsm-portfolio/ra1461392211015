const jwt = require('jsonwebtoken');
const authRepository = require('../repositories/authRepository');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authRepository.login({ email });

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado ou não é admin.' });
    }
    console.log(await bcrypt.hash(password, 10));
    const validPassword = await bcrypt.compare(password, user.password_usuario);
    if (!validPassword) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ id_usuario: user.id_usuario, tipo_usuario: user.tipo_usuario }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    console.error('Erro ao tentar realizar login:', error);
    res.status(500).json({ message: 'Erro ao tentar realizar login.' });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await authRepository.find({ id_usuario: req.user.id_usuario });

    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ message: 'Erro ao buscar usuário.' });
  }
};
