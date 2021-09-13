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

The telephone company VxTel, specialized in national long distance calls, will
put a new product on the market called FaleMais.
Normally a VxTel client can make a call from one city to another by paying a fixed rate per minute, with the price
a fixed rate per minute, with the price being predefined in a list with the DDDs codes of origin and destination.
codes of origin and destination.

With VxTel's new FaleMais product, the client acquires a plan and can talk for free up to a certain
a certain time (in minutes) and only pays for the exceeding minutes. The excess
minutes have an increase of 10% on the normal rate of the minute. The plans are
FaleMais 30 (30 minutes), FaleMais 60 (60 minutes) and FaleMais 120 (120 minutes).
VxTel, concerned about transparency with its clients, wants to make available a
web page where the client can calculate the value of the call. There, the client can choose the
the codes of the cities of origin and destination, the time of the call in minutes and choose which
FaleMais plan. The system should show two values: (1) the value of the call with the plan and (2)
without the plan. The initial cost of purchasing the plan should be disregarded for this
problem. 

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
# install
$ npm install
or 
$ yarn

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