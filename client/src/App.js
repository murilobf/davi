import React, {useEffect, useState} from "react"
import './App.css';
import Axios from "axios";
import Card from "./components/cards/card";

function App() {

  const [values, setValues] = useState();
  const [listCard, setListCard] = useState();

  const handleChangeValues = (value) =>{
    setValues(prevValue=>({
      ...prevValue,
      [value.target.name]: value.target.value
    }));
  } 

  const handleChangeButton = () =>{
    Axios.post("http://localhost:3001/register",{
      id: values.id,
      nome: values.nome,
      descricao: values.descricao,
      
    }).then((response)=>{
      console.log(response);
    });
    
  };

  useEffect(()=>{
    Axios.get("http://localhost:3001/getCards").then((response)=>{
      setListCard(response.data);
    });
  })

  return (
    <div className="app--container">
      <div className = "register--container">
        <h1>Banana shop</h1>
        <input 
          type = "text" 
          name = "nome"
          placeholder = "Nome"
          className="register--input"
          onChange={handleChangeValues}
        />
          <input 
          type = "text" 
          name = "descricao"
          placeholder = "Descrição"
          className="register--input"
          onChange={handleChangeValues}
        />
        <button
          className = "register--button"
          onClick ={() => handleChangeButton()}
        >
          Registrar
        </button>
      </div> 

      <div className="register--card">
      {typeof listCard !== "undefined" && listCard.map((value)=>{
        return <Card
          key = {value.id}
          listCard = {listCard}
          setListCard = {setListCard}
          id = {value.id}
          nome = {value.nome}
          descricao = {value.descricao}>
        </Card>
      })}   
      </div>
    </div>
  );
}

export default App;
