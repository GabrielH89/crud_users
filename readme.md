# Crud_users

## Projeto usando conceitos de CRUD, com banco de dados
![GitHub repo size](https://img.shields.io/github/repo-size/GabrielH89/crud_users)
![GitHub language count](https://img.shields.io/github/languages/count/GabrielH89/crud_users)

![project_image](https://github.com/GabrielH89/crud_users/assets/67241633/15bbbf55-f6fe-4698-9df8-576d4ed37c43)

## Tecnologias usadas no projeto: 
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

## Descrição
O projeto permite visualizar, cadastrar, atualizar e excluir usuários, usando banco de dados mysql.

## Requisitos
Tenha o npm e o node Js instalados na sua máquina

## Instalação
1. Execute o comando: git clone git@github.com:GabrielH89/crud_users.git

#### No diretório backend
1. Estando no diretório backend, execute o comando $ npm install.

2. Crie um arquivo .env e insira as variáveis presentes no arquivo .env.example na raíz do diretório backend. Obs: você deve ter o mysql instalado na máquina local

3. Para cria o banco de dado execute o seguinte comando: $mysql -u seu_usuario_mysql -p -e "CREATE DATABASE IF NOT EXISTS nomedobanco". Após isso, é só inserir o comando: $mysql -u seu_usuario_mysql -p nome_do_banco -e "source ./src/database/connectionDB/create_table.sql", para criar a tabela de usuarios no banco de dados.

3. Execute o comando $ npm run dev 

#### No diretório frontend
1. Dentro do diretório frontend, execute o comando $ npm install.   

2.Lembre-se de manter a porta do frontend igual à do backend para garantir a conexão.

3. Após as dependências serem instaladas, através do comando anterior, o projeto está pronto para funcionar em sua própria máquina, com o comando $ npm run dev, que mostrará em qual porta está rodando a aplicação, geralmente a localhost:5173.