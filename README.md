# API de Produtos

API REST simples em Node.js + Express para gerenciar produtos, com persistência em MongoDB. A aplicação expõe operações CRUD na coleção **Produtos** do banco **Loja**. O Express usa `express.json()` para interpretar corpos de requisição em JSON, e o driver oficial do MongoDB usa uma URI de conexão para acessar o banco.

## 🚀 Tecnologias

- Node.js
- Express
- MongoDB Node.js Driver
- Variáveis de ambiente para a URI do MongoDB (dotenv)

## ⚙️ Funcionalidades

- Criar produto
- Listar todos os produtos
- Buscar produto por ID
- Atualizar produto por ID
- Remover produto por ID

## 🛣️ Estrutura da API

| Método | Rota            | Descrição                     |
| :---   | :---            | :---                          |
| POST   | `/produtos`     | Cadastra um novo produto      |
| GET    | `/produtos`     | Lista todos os produtos       |
| GET    | `/produtos/:id` | Busca um produto pelo ID      |
| PUT    | `/produtos/:id` | Atualiza campos de um produto |
| DELETE | `/produtos/:id` | Remove um produto pelo ID     |

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [MongoDB](https://www.mongodb.com/) local ou MongoDB Atlas
- Gerenciador de pacotes `npm`

## 🔧 Configuração e Instalação

1. Instale as dependências principais (o driver oficial do MongoDB e o Express):
```bash
npm install express mongodb
```

2. Instale o pacote `dotenv` para carregar variáveis de ambiente:
```bash
npm install dotenv
```

3. Crie um arquivo `.env` na raiz do projeto e configure a sua URI do MongoDB (se estiver usando MongoDB Atlas, utilize a connection string fornecida pelo painel). A URI pode incluir host, porta, credenciais e opções de conexão:
```env
MONGO_URI=mongodb://localhost:27017
```
> **Importante:** Não envie o arquivo `.env` para o Git. Adicione-o ao seu arquivo `.gitignore`.

4. Adicione a importação do `dotenv` no início do seu arquivo principal:
```javascript
require('dotenv').config();
```

## ▶️ Executando o projeto

Inicie o servidor (verifique se o seu arquivo principal é `server.js` ou `index.js`):
```bash
node server.js
# ou
node index.js
```

Ao iniciar com sucesso, as seguintes mensagens devem ser exibidas no console:
```text
Conexão realizada com sucesso
API RODANDO NA PORTA 3000
```

## 💡 Exemplos de uso

### Criar produto
**POST** `http://localhost:3000/produtos`
```http
Content-Type: application/json

{
  "nome": "Teclado Mecânico",
  "preco": 250.90,
  "estoque": 10
}
```

### Listar produtos
**GET** `http://localhost:3000/produtos`

### Buscar produto por ID
**GET** `http://localhost:3000/produtos/65f1a2b3c4d5e6f7a8b9c0d1`

### Atualizar produto
**PUT** `http://localhost:3000/produtos/65f1a2b3c4d5e6f7a8b9c0d1`
```http
Content-Type: application/json

{
  "preco": 199.90,
  "estoque": 25
}
```

### Remover produto
**DELETE** `http://localhost:3000/produtos/65f1a2b3c4d5e6f7a8b9c0d1`

---

## ⚠️ Correções e Boas Práticas (Notas de Desenvolvimento)

### 1. Correção de erros de digitação na busca por ID
O código original continha erros de digitação (`proudutos` e `ObejectId`) que impediam a rota de funcionar corretamente.

**❌ Errado:**
```javascript
const resultado = await proudutos.findOne({_id:new ObejectId(req.params.id)});
```

**✅ Correto:**
```javascript
const resultado = await produtos.findOne({_id: new ObjectId(req.params.id)});
```

### 2. Tratamento de IDs inválidos e erros
É altamente recomendável tratar erros caso um ID com formato inválido seja passado para o MongoDB, além de verificar se o produto realmente existe:

```javascript
app.get('/produtos/:id', async (req, res) => {
  try {
    const resultado = await produtos.findOne({
      _id: new ObjectId(req.params.id)
    });
    
    if (!resultado) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    
    res.json(resultado);
  } catch (erro) {
    res.status(400).json({ erro: 'ID inválido' });
  }
});
```