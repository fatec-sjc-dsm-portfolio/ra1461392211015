package com.fatec.pro4tech.services;

public class ValidarCPF {
        public boolean validarCpf(String cpf) {
        cpf = cpf.replaceAll("[^0-9]", ""); // Remove todos os caracteres que não são números
        if (cpf.length() != 11) {
            return false;
        }

        int soma = 0;
        for (int i = 0; i < 9; i++) {
            soma += (cpf.charAt(i) - '0') * (10 - i);
        }
        int digitoVerificador1 = 11 - (soma % 11);
        if (digitoVerificador1 > 9) { 
            digitoVerificador1 = 0;
        }

        soma = 0;
        for (int i = 0; i < 10; i++) {
            soma += (cpf.charAt(i) - '0') * (11 - i);
        }
        int digitoVerificador2 = 11 - (soma % 11);
        if (digitoVerificador2 > 9) {
            digitoVerificador2 = 0;
        }

        return (cpf.charAt(9) - '0' == digitoVerificador1) && (cpf.charAt(10) - '0' == digitoVerificador2);
    }
}
