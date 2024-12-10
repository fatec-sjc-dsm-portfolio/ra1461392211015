const alertsRegister = [
    {
        title: "Apelido",
        name: "apelido",
        isSelect: false,
        options: [{id: '', title: '' }] 
    },
    {
        title: "Parâmetro",
        name: "parameter",
        isSelect: true,
        options: [{id: '', title: '' }] 
    },
    {
        title: "Váriavel",
        name: "variavel",
        isSelect: true,
        options: [
            {id: '', title: '' },
            {id: 'Vento', title: 'Vento' },
            {id: 'Umidade', title: 'Umidade' },
            {id: 'Pressão', title: 'Pressão' },
            {id: 'Precipitação', title: 'Precipitação' },
            {id: 'Temperatura', title: 'Temperatura' },
            {id: 'Bateria', title: 'Bateria' }
        ] 
    },
    {
        title: "Valor",
        name: "value",
        isSelect: false,
        options: [{id: '', title: '' }] 
    },
    {
        title: "Operador",
        name: "operator",
        isSelect: true,
        options: [
            {id: '', title: '' },
            {id: '>', title: '>' },
            {id: '<', title: '<' },
            {id: '=', title: '=' }
        ] 
    },
   ]
   
   export default alertsRegister;