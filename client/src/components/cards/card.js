import React from "react";
import "./card.css"
import FormDialog from "../dialogue/dialogue";

export default function Card(props) {

    const[open,setOpen] = React.useState(false);

    const handleClickCard = () => {
        setOpen(true);
    }
    return( 
        <>
            <FormDialog
                open = {open}
                setOpen = {setOpen}
                nome = {props.nome} 
                descricao = {props.descricao}
                listCard = {props.listCard}
                setListCard = {props.setListCard}
            />


            <div className = "card--container" onClick = {()=>
            handleClickCard()}> 
                <h1 className="card--title">{props.nome}</h1>
                <p className="card--descricao">{props.descricao}</p>
            </div>
        </>
    )
};

    