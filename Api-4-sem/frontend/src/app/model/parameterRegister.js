const parameterRegister = [
    {
        title: "Nome do sensor",
        name: "name",
        isSelect: false,
        options: [{ id: '', title: '' }]
    },
    {
        title: "Tipo do sensor",
        name: "tipo",
        isSelect: true,
        options: [
            { id: '', title: '' },
            { id: 'Anenômetro', title: 'Anenômetro' },
            { id: 'EBS', title: 'EBS' },
            { id: 'Anemógrafo', title: 'Anemógrafo' },
            { id: 'Higrômetro', title: 'Higrômetro' },
            { id: 'Barômetro', title: 'Barômetro' },
            { id: 'Pluviômetro', title: 'Pluviômetro' },
            { id: 'Termômetro', title: 'Termômetro' }
        ]
    },
    {
        title: "Fator",
        name: "factor",
        isSelect: false,
        options: [{ id: '', title: '' }]
    },
    {
        title: "Off-set",
        name: "offset",
        isSelect: false,
        options: [{ id: '', title: '' }]
    },
]

export default parameterRegister;