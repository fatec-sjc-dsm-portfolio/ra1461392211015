import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Boleto from '../../assets/adicionarBoleto.png';
import User from '../../assets/adicionarUser.png';
import Graficos from '../../assets/graficos.png';
import Perfil from '../../assets/perfil.png';
import Home from '../../assets/home.png';
import GerenciarFuncionario from '../../assets/gerenciarfunc.png';
import GerenciarCliente from '../../assets/gerenciarcli.png';
import Relatorio from '../../assets/relatorio.png';

import './style.css';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
    const { funcionario, logout } = useContext(AuthContext);

    if (funcionario.cargo === 'Administrador') {
        return (
            <div className='header'>
                <div className='nav container-navbar'>
                    <Link to='/perfil' className='navlogo'>
                        <img src={Perfil} alt='Perfil' />
                        <div className='logoText'>
                            <h3>Olá, {funcionario.nome}</h3>
                            <p>{funcionario.cargo}</p>
                        </div>
                        <button className='logout-button' onClick={logout}>Logout</button>
                    </Link>
                    <div className='navmenu'>
                        <ul className='navlist'>
                            <li className='navitem'>
                                <Link to='/home' className='navlink'>
                                    <img src={Home} alt='Home' />
                                    <span className='navname'>Home</span>
                                </Link>
                            </li>
                            <li className='navitem'>
                                <Link to='/graficos' className='navlink'>
                                    <img src={Graficos} alt='Graficos' />
                                    <span className='navname'>Gráficos</span>
                                </Link>
                            </li>
                            <li className='navitem'>
                                <Link to='/relatorio' className='navlink'>
                                    <img src={Relatorio} alt='Relatorio' />
                                    <span className='navname'>Relatório</span>
                                </Link>
                            </li>
                            <li className='navitem'>
                                <Link to='/cadastrousuario' className='navlink'>
                                    <img src={User} alt='User' />
                                    <span className='navname'>Cadastro de Clientes</span>
                                </Link>
                            </li>
                            <li className='navitem'>
                                <Link to='/criarboleto' className='navlink'>
                                    <img src={Boleto} alt='Boleto' />
                                    <span className='navname'>Emitir Título</span>
                                </Link>
                            </li>
                            <li className='navitem'>
                                <Link to='/gerenciarfunc' className='navlink'>
                                    <img src={GerenciarFuncionario} alt='Gerenciar Funcionário' className='gerenciarfunc-icon' />
                                    <span className='navname'>Gerenciar Funcionários</span>
                                </Link>
                            </li>
                            <li className='navitem'>
                                <Link to='/gerenciarcliente' className='navlink'>
                                    <img src={GerenciarCliente} alt='Gerenciar Cliente' />
                                    <span className='navname'>Gerenciar Cliente</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    } else if (funcionario.cargo === 'Comercial') {
        return (
            <div className='header'>
                <div className='nav container-navbar'>
                    <Link to='/perfil'>
                        <div className='navlogo'>
                            <img src={Perfil} alt='Perfil' />
                            <div className='logoText'>
                                <h3>Olá, {funcionario.nome}</h3>
                                <p>{funcionario.cargo}</p>
                            </div>
                        </div>
                    </Link>
                    <div className='navmenu'>
                        <ul className='navlist'>
                            <Link to='/home'>
                                <li className='navitem'>
                                    <img src={Graficos} alt='Home' />
                                    <span className='navname'>Home</span>
                                </li>
                            </Link>
                            <Link to='/graficos'>
                                <li className='navitem'>
                                    <img src={Graficos} alt='Graficos' />
                                    <span className='navname'>Gráficos</span>
                                </li>
                            </Link>
                            <Link to='/relatorio'>
                                <li className='navitem'>
                                    <img src={Relatorio} alt='Relatorio' />
                                    <span className='navname'>Relatório</span>
                                </li>
                            </Link>
                            <Link to='/cadastrousuario'>
                                <li className='navitem'>
                                    <img src={User} alt='User' />
                                    <span className='navname'>Cadastro de clientes</span>
                                </li>
                            </Link>
                            <Link to='/criarboleto'>
                                <li className='navitem'>
                                    <img src={Boleto} alt='Boleto' />
                                    <span className='navname'>Emitir título</span>
                                </li>
                            </Link>
                            <Link to='/gerenciarcliente'>
                                <li className='navitem'>
                                    <img src={Boleto} alt='Gerenciar Cliente' />
                                    <span className='navname'>Gerenciar cliente</span>
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
        );
    } else if (funcionario.cargo == 'Financeiro') {
        return (
            <div className='header'>
                <div className='nav container-navbar'>
                    <Link to="/perfil" className='navlogo'>
                        <img src={Perfil} alt='Perfil' />
                        <div className="logoText">
                            <h3>Olá, {funcionario.nome}</h3>
                            <p>{funcionario.cargo}</p>
                        </div>
                    </Link>
                    <div className='navmenu'>
                        <ul className='navlist'>
                            <li className='navitem' key="home">
                                <Link to="/home" className='navlink'>
                                    <img src={Graficos} alt='Home' />
                                    <span className='navname'>Home</span>
                                </Link>
                            </li>
                            <li className='navitem' key="graficos">
                                <Link to="/graficos" className='navlink'>
                                    <img src={Graficos} alt='Graficos' />
                                    <span className='navname'>Gráficos</span>
                                </Link>
                            </li>
                            <li className='navitem' key="relatorio">
                                <Link to="/relatorio" className='navlink'>
                                    <img src={Relatorio} alt='Relatorio' />
                                    <span className='navname'>Relatório</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );

    } else {
        return (
            <>
            </>
        )
    }
};

export default Navbar;
