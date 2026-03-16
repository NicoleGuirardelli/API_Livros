# API_Livros

Uma API REST simples desenvolvida em Node.js e Express para gerenciamento e consulta de um catálogo de livros. O projeto demonstra conceitos fundamentais de back-end, incluindo roteamento, manipulação de parâmetros de busca (query params), filtragem, ordenação e paginação de dados.


* **Node.js**: Ambiente de execução JavaScript.
* **Express**: Framework web para construção da API.
* **Postman**: Para teste e documentação das rotas.

## Executando o Projeto

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/NicoleGuirardelli/API_Livros](https://github.com/NicoleGuirardelli/API_Livros)
   ```
2. **Acesse a pasta do projeto.**
3. **Instale as dependências:**  
      * npm install express
4. **Inicie o servidor:**
    _aparece mensagem:_
    O servidor estará rodando em http://localhost:3000

## Funcionalidades e Endpoints

1. Listar todos os livros (com paginação padrão)
GET /api/livros

Retorna a primeira página de livros, limite padrão de 5 itens.

2. Filtrar livros por gênero
GET /api/livros?genero=Literatura

Retorna todos os livros que correspondem ao gênero.

3. Ordenar livros
GET /api/livros?ordem=nota&direcao=desc

Permite ordenar a lista por titulo ou nota. A direção pode ser asc (crescente) ou desc (decrescente).

4. Paginação customizada
GET /api/livros?pagina=1&limite=3

Controla a quantidade de itens por página e qual página visualizar.

5. Buscar livro por ID
GET /api/livros/:id

Retorna os detalhes de um livro específico com base no seu id.

## Testando no Postman

No projeto encontrará o arquivo: Api Livros.postman_collection.json .

1. Abra o Postman.

2. Clique em Import no canto superior esquerdo.

3. Selecione o arquivo .json deste repositório.

4. Uma coleção chamada "Api Livros" aparecerá na sua barra lateral com todas as requisições prontas para uso!
