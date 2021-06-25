# To Do

## Instalação

- Clone o repositorio
  - `git clone https://github.com/oliveirarthur/to-do.git`
- Compile os containeres
  - `docker-compose build`
- Execute as migrations
  - `docker-compose run backend node ace migration:run`
- Configure as variaveis de ambiente
  - `cp backend/.env.example backend/.env`
  - `vim backend/.env`

## Executando

`docker-compose up`

A aplicação estará disponível no endereço <http://localhost:4200/>
