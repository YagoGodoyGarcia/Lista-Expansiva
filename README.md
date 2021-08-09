<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

Um projeto capaz de analisar uma lista de objetos em linhas expansíveis com caixas de seleção incorporadas.

## Descrição ##

Usando conceitos de programação reativa, este projeto renderizar uma lista de objetos, em linhas expansíveis com caixas de seleção. 

Utilizando um stream para realizar atualizações no componente, a lista foi convertida para um formato JSON aceitável, logo após, contruir os componentes recursivamente, juntamente com seus respectivos parametros de expansão e seleção.

Utilizado o Localstorege foi possivel armazenar os satus de cada componente, dessa forma caso a pagina seja recarregada será mantido todos os checkouts juntamente com as lista de filho se manteve expandida.
## Install ##

No diretório do projeto, você pode executar:

### `npm install`

## Start ## 

Também no diretório do projeto, você pode executar:

### `npm start`

Abra [http://localhost:3000]

### [Demo](https://hiplataform.herokuapp.com/)