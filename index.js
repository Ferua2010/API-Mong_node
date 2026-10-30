//Importando as bibliotecas
const express = require('express');
const {MongoClient,ObjectId} = require('mongodb');

//Utilizando as bibliotecas
const app = express();
app.use(express.json());

//Coneão com o banco de dados
const client = new MongoClient(process.env.MONGO_URI)

//Conexão com a nossa coleção/colection
const produtos = client.db('Loja').collection('Produtos');

//Crir os métodos HTTP
app.post('/produtos',async (req,res)=>{
    const novo_produto = await produtos.insertOne(req.body);
    res.status(201).json(novo_produto);
});

app.get('/produtos',async (req,res)=>{
    const lista = await produtos.find().toArray();
    res.json(lista);
});

app.get('/produtos/:id',async (req,res)=>{
    const resultado = await proudutos.findOne({_id:new ObejectId(req.params.id)});
    res.json(resultado);
});

app.put('/produtos/:id', async (req,res)=>{
    const atualizacao = await produtos.updateOne({_id:new ObjectId(req.params.id)},
    {$set:req.body});
    res.json(atualizacao);
})

app.delete('/produtos/:id',async (req,res)=>{
    const produto_deletado = await produtos.deleteOne({_id:new ObjectId(req.params.id)});
    res.json(produto_deletado);
});

//Inicializando o servidor
client.connect()
    .then(()=>{
        console.log("Conexão realizada com sucesso");
        app.listen(3000,()=>console.log('API RODANDO NA PORTA 3000'));
    })
    .catch((erro)=>console.log("Erro ao conectar", erro.message));


