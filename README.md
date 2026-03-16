# API_Livros

Uma API REST simples desenvolvida em Node.js e Express para gerenciamento e consulta de um catálogo de livros. O projeto demonstra conceitos fundamentais de back-end, incluindo roteamento, manipulação de parâmetros de busca (query params), filtragem, ordenação e paginação de dados.


* **Node.js**: Ambiente de execução JavaScript.
* **Express**: Framework web para construção da API.
* **Postman**: Para teste e documentação das rotas.

## Executando o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/NicoleGuirardelli/API_Livros.git
   ```
2. **Acesse a pasta do projeto.**
```bash
   cd API_Livros
```
3. **Instale as dependências:**  
     ```bash
       npm install express
    ```
4. **Inicie o servidor:**
    _aparece mensagem:_
    O servidor estará rodando em http://localhost:3000

## Funcionalidades e Endpoints
## ⚙️ Endpoints da API

Abaixo estão todos os endpoints disponíveis, seus métodos, regras de negócio e exemplos.

| Método | Rota | Descrição |
|---|---|---|
| **GET** | `/api/livros` | Lista os livros (com paginação, filtros e ordenação). |
| **GET** | `/api/livros/:id` | Retorna um livro específico pelo ID. |
| **POST** | `/api/livros` | Cria um novo livro no catálogo. |

### GET `/api/livros`
Lista os livros. Aceita os seguintes query params: `genero`, `ordem` (titulo ou nota), `direcao` (asc ou desc), `pagina`, e `limite`.
* **Body da Requisição:** Nenhum.
* **Resposta de Sucesso (200):**
```json
{
  "dados": [ { "id": 1, "titulo": "Dom Casmurro", ... } ],
  "paginacao": { "pagina_atual": 1, "itens_por_pagina": 5, "total": 10 }
}
```
### GET `/api/livros/:id`
Busca os detalhes de um livro específico.

* **Resposta de Sucesso (200):** Objeto JSON do livro correspondente.

* **Resposta de Erro (404):** {"erro": "Livro não encontrado"}

 ### POST `/api/livros`
 Adiciona um novo livro ao sistema.

*Validações Implementadas:

  Todos os campos são de preenchimento obrigatório.

  Tipo de dado: ano e nota devem ser obrigatoriamente numéricos.

  Regra de negócio: A nota deve estar entre 0 e 5.

  * **Body da Requisição (JSON):**
  ```json
  {
  "titulo": "O Alquimista",
  "autor": "Paulo Coelho",
  "ano": 1988,
  "genero": "Ficção",
  "nota": 4.1
  }
  ```
* **Resposta de Sucesso (201 Created):** Retorna o objeto criado, incluindo o novo ID gerado automaticamente.

* **Resposta de Erro (400 Bad Request):** Detalha a falha de validação. Ex: {"erro": "A nota deve ser um valor entre 0 e 5."}




## Testando no Postman

No projeto encontrará o arquivo: Api Livros.postman_collection.json .

1. Abra o Postman.

2. Clique em Import no canto superior esquerdo.

3. Selecione o arquivo .json.

4. Uma coleção chamada "Api Livros" aparecerá na sua barra lateral com todas as requisições GET e POST prontas para uso.

# Teste Postman
* **Teste de criação POST**
![](Captura%20de%20tela%202026-03-15%20221103.png)

![](Captura%20de%20tela%202026-03-15%20220650.png)

* **Teste de validação**
![Erro 400:Após tentativa de inserir dados errados.](Captura%20de%20tela%202026-03-15%20221211.png)

* **Teste Filtro**
![](Captura%20de%20tela%202026-03-16%20112719.png)