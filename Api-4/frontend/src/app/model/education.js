const education = [
    {
        title: 'Termômetro',
        explanation: "Um sensor termômetro é um dispositivo usado para medir a temperatura do ar ou de uma superfície. O sensor termômetro geralmente é composto por um material termossensível que se expande ou contrai de acordo com a variação de temperatura. A fórmula utilizada para converter a variação de comprimento do material termossensível em uma medida de temperatura é baseada no coeficiente de dilatação do material e na variação de sua resistência elétrica. Essa fórmula é chamada de equação de calibração do sensor termômetro.",
        formula: "T = a + bR",
        formula_explanation: ["T = Temperatura em C","A = Fator de Conversão", "B = OffSet","R = Resistência elétrica do sensor termômetro", ]
    },
    {
        title: 'Pluviômetro',
        explanation: "O pluviômetro por pulso é um sensor utilizado para medir a quantidade de chuva. Ele gera um pulso elétrico sempre que uma gota de chuva atinge o sensor. A quantidade de pulsos está diretamente relacionada à quantidade de chuva, e cada pulso representa uma unidade de medida pré-determinada, como milímetros. Nesse caso, o pulso está calibrado em 0,25 mm. Então, em um exemplo, se ocorrerem 5 pulsos, a quantidade de chuva será igual a 0,25mm * 5 = 1,25mm. Agora para obter uma medida mais realista, precisamos converter a medida de mm para L, 1mm = 1L/m^2.",
    },
    {
        title: 'Higrômetro',
        explanation: "O sensor higrômetro é um dispositivo que mede a umidade do ar em uma estação meteorológica. Existem diferentes tipos de sensores higrômetros, mas um dos mais comuns é o sensor capacitivo. O sensor capacitivo é composto por duas placas paralelas, sendo uma delas recoberta por um material higroscópico, que absorve ou libera água conforme a umidade relativa do ar. A variação da umidade relativa do ar altera a capacitância do sensor, que é medida eletronicamente. A fórmula utilizada para obter a umidade relativa do ar é baseada na equação de capacidade elétrica de um capacitor:",
        formula: "C = εA/d",
        formula_explanation: ["C = Capacitância","ε = Constante dielétrica", "A = área das placas do sensor","d = distância entre as placas."]
    },
     {
        title: 'Anemômetro (sensor de vento de copos e direção)',
        explanation: "O anemômetro de direção é um tipo de sensor usado para medir a direção do vento. Ele geralmente consiste em uma haste vertical com um conjunto de aletas ou uma hélice montada na parte superior. As aletas ou a hélice são projetadas para apontar na direção do vento, permitindo que o sensor determine a orientação do vento. A direção do vento é determinada por meio de sensores óticos ou magnéticos que detectam a posição das aletas ou da hélice em relação a um ponto de referência, como o norte. Com base nessas leituras, o sensor fornece a direção do vento em graus, onde 0° ou 360° geralmente representa o norte, 90° representa o leste, 180° representa o sul e 270° representa o oeste. Para calcular a velocidade do vento, um anemômetro de velocidade do vento é utilizado em conjunto com o anemômetro de direção. O anemômetro de velocidade mede a velocidade do vento em unidades como metros por segundo (m/s) ou quilômetros por hora (km/h). A fórmula básica para calcular a velocidade do vento é:",
        formula: "V = (N * C) / T",
        formula_explanation: ["V = velocidade do vento","N = número de rotações completas dos copos", "C = fator de conversão (relação entre rotações e velocidade do vento)","T = tempo","O fator de conversão C é determinado com base no design do anemômetro e pode variar de um modelo para outro. É importante consultar as especificações técnicas do anemômetro para obter o valor correto do fator de conversão. Para obter a velocidade média do vento em um determinado período de tempo, é necessário calcular a média das leituras de velocidade em intervalos regulares."]
    }
    
]

export default education;