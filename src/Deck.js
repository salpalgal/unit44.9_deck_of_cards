import React , {useState, useEffect, useRef} from "react"
import {Card} from "./Card"
import axios from "axios"
import "./Deck.css"

const Deck = ()=>{
    const [Deck, setDeck] = useState(null);
    const [Cards, setCards] = useState([]);
    const timerId = useRef()
    const [Timer,setTimer] = useState(false)

   
    
    useEffect(()=>{
        async function getDeck(){
            let res = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/`)
            console.log(res.data)
            setDeck(res.data);
        
        }
        getDeck();
    },[setDeck]);
    // console.log(Deck)
   useEffect(()=>{
        async function draw(){
            // console.log(Deck)
            
            if(Deck){
                let deck_id = Deck.deck_id
                let cardRes = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${1}`)
                if(cardRes.data.remaining===0){
                    alert("no cards remaining!")
                }
                let card = cardRes.data.cards[0]
                console.log(card)
                
                setCards(c=>[
                    ...c,{
                        id: card.code,
                        name: card.suit + " " + card.value,
                        image : card.image
                    }
                ])
            }
        }
        if(Timer && !timerId.current){
            timerId.current =setInterval(async()=>{
                await draw()
            },1000)
            return () => {
                clearInterval(timerId.current);
                timerId.current = null;
        };}

    },[Timer,setTimer,Deck])  
            
     
    console.log(Cards)
    const toggleTimer = () => {
        setTimer(auto => !auto);
      };
    
    const cards = Cards.map(({id,name,image}) => 
        <Card key={id} name={name} image={image} />
      );
    console.log(cards)
    const stopTimer= ()=>{
        clearInterval(timerId.current)
    }
    return(
        <div>
        <button onClick={toggleTimer}>toggel</button>
        <div>{cards}</div>
        </div>
        
    )
}
 


export default Deck;