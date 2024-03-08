import React , {useState, useEffect} from "react"
import {Card} from "./Card"
import axios from "axios"


const Deck = ()=>{
    const [Deck, setDeck] = useState(null);
    const [Cards, setCards] = useState([]);
   
    
    useEffect(()=>{
        async function getDeck(){
            let res = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/`)
            console.log(res.data)
            setDeck(res.data);
        
        }
        getDeck();
    },[setDeck]);
    // console.log(Deck)

   
        async function draw(){
            // console.log(Deck)

            if(Deck){
                let deck_id = Deck.deck_id
                let cardRes = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${1}`)
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
        // console.log(Card)
        
            
            
     
    console.log(Cards)
   
    
    const cards = Cards.map(({id,name,image}) => 
        <Card key={id} name={name} image={image} />
      );
    console.log(cards)
    return(
        <div>
        <button onClick={draw}>Draw Card</button>
        <div>{cards}</div>
        
        
        </div>
        
    )
}
 


export default Deck;