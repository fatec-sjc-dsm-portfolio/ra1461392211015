import api from "../services/axios.config";

const statuss = ['202', '302', '200', '201']

export const login = async (data: any) => {
  try {
    const response = await api.post('/login', data, {
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString());
      }

    });


    return response.data
  } catch (error) {
    console.error(error);
  }
};

export const EnviarEmail = async (id: any, nome_produto: any) => {
  try {
    const response = await api.get(`/listar/parcela/${id}`, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString()); // Define que apenas status 200 é válido
      }
    });

    const cpf = response.data.cliente.cpf;
    const responseCliente = await api.get(`/listar/cliente/${cpf}`, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString()); // Define que apenas status 200 é válido
      }
    });

    const payload = {
      email: responseCliente.data.contato.email,
      valor: response.data.valor,
      data_vencimento: response.data.data_vencimento,
      nome_produto: nome_produto,
    }
    const responseEmail = await api.post(`/email`, payload, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString());
      }
    });
    return responseEmail;

  } catch (error) {
    console.error(error);
  }
}


export const AllUsers = async () => {
  try {
    const response = await api.get('/listar/cliente', {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString()); // Define que apenas status 200 é válido
      }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}


export const dadosUsuario = async (id: any) => {
  try {
    const response = await api.get(`listar/cliente/${id}`, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString()); // Define que apenas status 200 é válido
      }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const dadosFuncionario = async (id: any) => {
  try {
    const response = await api.get(`listar/funcionario/${id}`, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString()); // Define que apenas status 200 é válido
      }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const dadosFuncionarioc = async (cpf: string) => {
  try {
    const response = await api.get(`listar/funcionario/${cpf}`, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString()); // Define que apenas status 200 é válido
      }

    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const dadosTitulos = async () => {
  try {
    const response = await api.get(`/listar/titulo`, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString()); // Define que apenas status 200 é válido
      }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const dadosClientes = async () => {
  try {
    const response = await api.get(`/listar/cliente`, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString());// Define que apenas status 200 é válido
      }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const gerenciarTitulo = async (id: any) => {
  try {
    const response = await api.get(`/listar/titulo/${id}`, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString()); // Define que apenas status 200 é válido
      }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const gerenciarParcelaTitulo = async (id: any) => {
  try {
    const response = await api.get(`/listar/parcela/titulo/${id}`, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString()); // Define que apenas status 200 é válido
      }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const criarCliente = async (cliente: any) => {
  try {
    const response = await api.post(`/cadastrar/cliente`, cliente, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString()); // Define que apenas status 200 é válido
      }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const criarTitulo = async (titulo: any) => {
  try {
    const response = await api.post(`/cadastrar/titulo`, {
      cliente_cpf: titulo.cpf,
      funcionario_cpf: titulo.id_funcionario,
      codigo_barra: titulo.codigo_barra,
      data_geracao: titulo.data_geracao,
      nome_produto: titulo.nome_produto,
      qr_code: "https://example.com/qr_code",
      numero_boleto: "numeroboleto",
      valor: titulo.valor,


    }, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString());// Define que apenas status 200 é válido
      }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const criarFuncionario = async (nome: String, email: String, cpf: String, senha: String) => {
  try {
    const response = await api.post(`/funcionarios/cadastrar`, {
      nome: nome,
      cpf: cpf,
      email: email,
      credential: {
        password: senha,
        userName: email,
        roles: [
          "Sem_Cargo"
        ]
      }

    }, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString()); // Define que apenas status 200 é válido
      }
    });
    return response;
  } catch (error) {

    console.error(error);
  }
}

export const dadosFuncionarios = async () => {
  try {
    const response = await api.get(`/listar/funcionario`, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString()); // Define que apenas status 200 é válido
      }
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}

export const excludeFuncionario = async (cpf: any) => {
  try {
    const user = await api.get(`/listar/funcionario/${cpf}`, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString()); // Define que apenas status 200 é válido
      }
    }
    );
    const payload = {
      nome: user.data.nome,
      cpf: user.data.cpf,
      email: user.data.email,
      credential: {
        password: user.data.senha,
        userName: user.data.email,
        roles: [
          user.data.cargo
        ]
      }
    }


    const response = await api.delete(`/deletar/funcionario`, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      data: payload,
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString()); // Define que apenas status 200 é válido
      }
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}

export const excludeCliente = async (cpf: any) => {
  try {
    const response = await api.delete(`/deletar/cliente/${cpf}`, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString()); // Define que apenas status 200 é válido
      },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}

export const updateFuncionario = async (cpf: any, value: any) => {
  try {

    const response = await api.put(`/atualizar/funcionario`, {
      cpf: cpf,
      credential: {
        role: value
      }

    }, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString()); // Define que apenas status 200 é válido
      }
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}
export const updateFuncionarioId = async (
  id: any,
  nome: any,
  email: any,
  senha: any,
  cpf: any) => {
  try {

    const response = await api.put(`/atualizar/funcionario`, {
      nome: nome,
      email: email,
      cpf: cpf,
      senha: senha
    }, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString()); // Define que apenas status 200 é válido
      }
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}



export const updateCliente = async (data: any) => {
  try {
    const response = await api.put(`/atualizar/cliente`, data, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString()); // Define que apenas status 200 é válido
      }
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}

export const updateParcela = async (id: any, valorPago: any, dataPagamento: any, dataCredito: any) => {
  try {
    const valorPagoFloat = parseFloat(valorPago.replace(',', '.'));
    const response = await api.put(`/atualizar/parcela/${id}`, {
      valor_pago: valorPagoFloat,
      data_credito: dataCredito,
      data_pagamento: dataPagamento,
    }, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString());// Define que apenas status 200 é válido
      }
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}

export const baixaParcela = async (id: any) => {
  try {
    const response = await api.get(`/listar/parcela/${id}`, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString()); // Define que apenas status 200 é válido
      }
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}

export const ListarCliente = async () => {
  try {
    const response = await api.get(`/listar/cliente`, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString()); // Define que apenas status 200 é válido
      }
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}

export const ListarParcela = async () => {
  try {
    const response = await api.get(`/listar/parcela`, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString()); // Define que apenas status 200 é válido
      }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}


export const criarLog = async (params: any) => {
  try {
    let idFunc = params.idFuncionario ?? 0;
    let idCli = params.idCliente ?? 0;
    let descricao = params.descricao ?? 'Sem descricao';

    const response = await api.post(`/cadastrar/log`, {
      cliente_cpf: idCli,
      funcionario_cpf: idFunc,
      descricao: descricao

    }, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString()); // Define que apenas status 200 é válido
      }
    });
    return response;
  } catch (error) {

    console.error(error);
  }

}



export const Parcela = async () => {
  try {
    const response = await api.get(`/parcela`, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      },
      timeout: 5000,
      validateStatus: function (status) {
        return statuss.includes(status.toString());
      }
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}