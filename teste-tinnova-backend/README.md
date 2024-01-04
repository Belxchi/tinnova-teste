## Iniciando o Backend
Este guia fornece instruções passo a passo para iniciar o backend. Antes de começar, certifique-se de ter o Node.js e o npm instalados em sua máquina. Além disso, o PostgreSQL deve estar instalado, e você precisa criar uma tabela chamada "teste-tinnova". As configurações do banco de dados estão localizadas no arquivo database.js.

## Instalação do PostgreSQL
Faça o download e instale o PostgreSQL usando o link: https://sbp.enterprisedb.com/getfile.jsp?fileid=1258792

## Testando os Endpoints
Os endpoints para testar estão disponíveis nos arquivos .http na raiz do projeto, especificamente nos arquivos dashboard.http e produtor.http. 

## Extensões Necessárias Instaladas no VSCode
1. Tailwind CSS IntelliSense: Para facilitar o desenvolvimento com o Tailwind CSS.
2. REST Client: Para executar solicitações HTTP diretamente do editor.

## Instalando as Dependências
Abra um terminal na pasta do projeto e execute o seguinte comando para instalar as dependências:

npm install

## Instalando as Dependências
Execute o seguinte comando para iniciar o servidor:

npm run dev

O servidor será iniciado e estará em http://localhost:3000/.

Agora o seu backend está configurado e em execução. Certifique-se de que a tabela "teste-tinnova" esteja criada no seu banco de dados PostgreSQL para evitar erros ao interagir com o banco de dados.
