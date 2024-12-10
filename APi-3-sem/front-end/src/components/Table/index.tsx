import React, { useContext, useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

interface TableProps {
  data: any[];
  client: any[];
}

const Table = ({ data, client }: TableProps) => {
  const { isLogged, funcionario } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  if (isLogged) {
    if (funcionario.cargo === 'Administrador' || funcionario.cargo === 'Financeiro') {
      const filteredData = data.filter((item) =>
        item.cliente.nome.toLowerCase().includes(searchValue.toLowerCase())
      );

      return (
        <div className='table-box'>
          <div className='table-title'>
            <h1>Lista de títulos</h1>
            <input
              type='text'
              placeholder='Digite aqui'
              className='input-table'
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
          <table>
            <thead>
              <tr>
                <td>Nome cliente</td>
                <td>CPF</td>
                <td>Título</td>
                <td align='right'>Valor total</td>
                <td>Nº parcelas</td>
                <td>Info.</td>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => {
                const clientInfo = client.find((c) => c.cpf === item.cliente.cpf);
                const nomeCliente = clientInfo?.nome;
                const cpf = clientInfo?.cpf;
                const valorFormadado = item.valor.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                });

                return (
                  <tr key={item.id}>
                    <td>{nomeCliente}</td>
                    <td>{cpf}</td>
                    <td>{item.id}</td>
                    <td align='right'>{valorFormadado}</td>
                    <td>12</td>
                    <td>
                      <Link to={`/gerenciarparcelas/${item.id}`}>Ver mais</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else if (funcionario.cargo === 'Comercial') {
      return (
        <div className='table-box'>
          <div className='table-title'>
            <h1>Lista de títulos</h1>
          </div>
          <table>
            <thead>
              <tr>
                <td>Nome cliente</td>
                <td>CPF</td>
                <td>Título</td>
                <td align='right'>Valor total</td>
                <td>Nº parcelas</td>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                const clientInfo = client.find((c) => c.cpf === item.cpf);
                const nomeCliente = clientInfo?.nome;
                const cpf = clientInfo?.cpf;

                return (
                  <tr key={item.id}>
                    <td>{nomeCliente}</td>
                    <td>{cpf}</td>
                    <td>{item.id}</td>
                    <td align='right'>R${item.valor}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <></>;
    }
  } else {
    return <></>;
  }
};

export default Table;
