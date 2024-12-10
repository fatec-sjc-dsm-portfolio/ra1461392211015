import React, { useContext, useEffect, useState, FormEvent } from 'react'
import Navbar from '../../components/Navbar'
import { dadosFuncionarioc, dadosUsuario, updateFuncionario } from '../../utils/axios.routes';
import './style.css'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { updateFuncionarioId } from '../../utils/axios.routes';
import ReactInputMask from 'react-input-mask';

const Profile = () => {
    const navigate = useNavigate();
    const { isLogged, funcionario } = useContext(AuthContext)
    const [data, setData] = useState<any>();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cpf, setCpf] = useState("");
    useEffect(() => {
        if (!isLogged) {
            navigate('/')
        }
        const fetchData = async () => {
            try {
                const response = await dadosFuncionarioc(funcionario.cpf);
                const data = await response?.data
                setData(data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    async function submitdata(nome: String, email: String, senha: String, cpf: String) {
        await updateFuncionarioId(funcionario.id, nome, email, senha, cpf);
        navigate('/home');
    }

    function onsubmit(e: FormEvent) {
        e.preventDefault()
        submitdata(nome, email, senha, cpf)
    }


    if (isLogged) {

        return (
            <>
                <Navbar />
                <form onSubmit={onsubmit}>
                    <main>
                        <div className='profile-container'>
                            <div className='title'>
                                <h1>Perfil</h1>
                                <p>{data?.cargo}</p>
                            </div>

                            <div className='profile-content'>
                                <div className='profile-box'>
                                    <h1>Nome</h1>
                                    <input
                                        required
                                        type="text"
                                        placeholder={data?.nome}
                                        value={nome}
                                        onChange={e => setNome(e.target.value)}
                                    />
                                </div>
                                <div className='profile-box'>
                                    <h1>Email</h1>
                                    <input
                                        required
                                        type="text"
                                        placeholder={data?.email}
                                        value={email}
                                        onChange={e => setEmail(e.target.value)} />
                                    {/* <p>{data?.email}</p> */}
                                </div>
                            </div>
                            <div className='profile-content'>
                                <div className='profile-box'>
                                    <h1>Senha</h1>
                                    <input
                                        required
                                        type="text"
                                        placeholder='*************'
                                        value={senha}
                                        onChange={e => setSenha(e.target.value)}
                                    />

                                </div>
                                <div className='profile-box'>
                                    <h1>CPF</h1>
                                    <ReactInputMask
                                        required
                                        mask="999.999.999-99"
                                        type="text"
                                        placeholder={data?.cpf}
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='btn'>
                                <button className='green'>Confirmar Alteração</button>
                            </div>
                        </div>

                    </main>
                </form>
            </>
        )
    } else {
        return (
            <></>
        )
    }
}

export default Profile;
