<h2 align="center">
  VxTel - FaleMais
</h2>

<p align="center">
  <a href="#project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#requirements">Requirements</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#prerequisites">Prerequisites</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#running">Running the application</a>
</p>

## Project

RESTful API using NodeJS technology.
Using SOLID development standards<br /><br />

## Requirements

A empresa de telefonia VxTel, especializada em chamadas de longa distância nacional, vai
colocar um novo produto no mercado chamado FaleMais.
Normalmente um cliente VxTel pode fazer uma chamada de uma cidade para outra pagando
uma tarifa fixa por minuto, com o preço sendo pré-definido em uma lista com os códigos DDDs
de origem e destino.

Com o novo produto FaleMais da VxTel o cliente adquire um plano e pode falar de graça até
um determinado tempo (em minutos) e só́ paga os minutos excedentes. Os minutos
excedentes tem um acrescimo de 10% sobre a tarifa normal do minuto. Os planos são
FaleMais 30 (30 minutos), FaleMais 60 (60 minutos) e FaleMais 120 (120 minutos).
A VxTel, preocupada com a transparência junto aos seus clientes, quer disponibilizar uma
página na web onde o cliente pode calcular o valor da ligação. Ali, o cliente pode escolher os
códigos das cidades de origem e destino, o tempo da ligação em minutos e escolher qual o
plano FaleMais. O sistema deve mostrar dois valores: (1) o valor da ligação com o plano e (2)
sem o plano. O custo inicial de aquisição do plano deve ser desconsiderado para este
problema. 

## Technologies

This project was developed with the following technologies:

- [Node.js](https://nodejs.org/en/)
- [Jest](https://jestjs.io/pt-BR/)
- [MongoDB](https://www.mongodb.com/pt-br)

## Prerequisites

Before you begin, you will need to have the following tools installed on your machine:

- [Node.js](https://nodejs.org/en/)
- And you will also need an editor, I indicate the <b>[VSCode](https://code.visualstudio.com/)</b>

To get the application running, **you will need to create a mongoDB database/cluster named VxTel and two collections named FaleMais and ListaValores.**
To import the data simply get the .json files from the Mock folder with the names of the respective collections and import them.

## Running

To execute the project just execute the following commands:

### Run
```bash
# development
$ npm run start
or 
$ yarn start

```
### Test
```bash
# run test
$ npm run test
or 
$ yarn test

# run coverage
$ npm run test:ci
or 
$ yarn test:ci

```