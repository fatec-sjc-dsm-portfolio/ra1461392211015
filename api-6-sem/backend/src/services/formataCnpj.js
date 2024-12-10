function formatCNPJ(cnpj) {
  // Remove qualquer caracter que não seja número
  cnpj = cnpj.replace(/\D/g, '');

  // Verifica se o CNPJ tem 14 dígitos
  if (cnpj.length !== 14) {
    return false;
  }

  // Formata o CNPJ
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

module.exports = formatCNPJ;
