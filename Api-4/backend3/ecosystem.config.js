module.exports = {
    apps: [{
      name: 'app', // Nome da aplicação
      script: 'ts-node-dev', // Script para iniciar a aplicação
      // Argumentos para passar para o script
      args: [
        '--transpile-only', // Ignora a verificação de tipos para velocidade
        '--ignore-watch', // Evita reiniciar ao detectar mudanças em certos arquivos/diretórios
        'node_modules', // Diretório a ser ignorado pelo watch
        'src/server.ts', // Caminho do arquivo de entrada do seu projeto TypeScript
      ].join(' '),
      watch: true, // Ativa o modo watch para reiniciar automaticamente a aplicação ao detectar mudanças
      ignore_watch: ['node_modules', 'logs', '*.log'], // Diretórios e arquivos a serem ignorados pelo modo watch
      instances: 1, // Número de instâncias a serem executadas
      exec_mode: 'fork', // Modo de execução - 'fork' é recomendado para desenvolvimento
      error_file: './logs/err.log', // Caminho do arquivo de log de erros
      out_file: './logs/out.log', // Caminho do arquivo de log de saída
      log_date_format: 'YYYY-MM-DD HH:mm:ss', // Formato da data nos logs
      merge_logs: true, // Combina logs de todas as instâncias
      env: {
        NODE_ENV: 'dev', // Configura a variável de ambiente
      },
    }],
  };
  