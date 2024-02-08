const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");


const bd = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "teste_davi",
});

app.use(cors());
app.use(express.json());

app.post("/register",(req,res) => {

    const nome  = req.body.nome;
    const descricao = req.body.descricao;

    let SQL = "insert into tabela_teste (nome, descricao) values (?,?)"

    bd.query(SQL,[nome,descricao],(err,result) =>{
        console.log(err);
    })
});

app.get("/getCards",(req,res)=>{
    
    let SQL = "Select * from tabela_teste";

    bd.query(SQL,(err,result)=>{
        if(err) console.log(err);
        else res.send(result);
    })
})

app.put("/edit",(req,res)=>{

    const {id} = req.body;
    const {nome} = req.body;
    const {descricao} = req.body;

    console.log(id)

    let SQL = "update tabela_teste set nome = ?, descricao = ? where id = ?";

    bd.query(SQL,[nome,descricao,id],(err,result)=>{
        if(err){console.log("asdsad");}
        else{res.send(result);}
    });
}); 

app.delete("/delete/:id",(req,res)=>{
    const {id} = req.params;

    let SQL = "Delete from tabela_teste where id - ?";

    bd.query(SQL,[id],(err,result)=>{
        if(err) console.log(err);
        else res.send(result);
    })
})
app.listen(3001,() => {
    console.log("roda");
})