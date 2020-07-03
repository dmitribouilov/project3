import React, { useState, useEffect } from "react";
import axios from "axios";

//Dealer cards
let dealer_deck = [];
//Dealer current card drawn
let dealer_card = [];

//User 1 cards
let user1_deck = [];
//User 1 current card drawn
let user1_card = [];

//User 2 cards
let user2_deck = [];
//User 2 current card drawn
let user2_card =[];

function WarGame() {

  const [shuffled, setShuffled] = useState("");
  const [,updateRender] = useState();
  let currentDeck;
  void shuffled;

  //Calls new game when the page loads
  useEffect(() => {
    newGame();
  }, []);

  function newGame(){

    dealer_deck = [];
    dealer_card = [];
    user1_deck = [];
    user1_card = [];
    user2_deck = [];
    user2_card = [];
    //Make API call to retrieve cards for game
    axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
      .then(result => {
        result.data.success && console.log("Deck obtained");

        //Shuffle deck
        setShuffled(result.data.shuffled);
        //Retrieve deck
        currentDeck = result.data.deck_id;

        //Clear decks in both users hands
        dealer_deck = [];
        user1_deck = [];
        user2_deck = [];

        //Make API request to evenly split cards between both users
        axios.get(`https://deckofcardsapi.com/api/deck/${currentDeck}/draw/?count=52`)
          .then(result => {
            result.data.success && console.log("Deck is split!")

            let i;
            for (i = 0; i < 52; i += 2){
              let card1 = result.data.cards[i];
              
              //Card object to display user 1's hand
              let drawnCard1 = {
                value: `${card1.value}`,
                suit: `${card1.suit}`,
                imageURL: `${card1.image}`,
                cardCode: `${card1.code}`,
                imageURL: `${card1.image}`
              };

              let card2 = result.data.cards[i + 1];
              //Card object to display user 2's hand
              let drawnCard2 = {
                value: `${card2.value}`,
                suit: `${card2.suit}`,
                imageURL: `${card2.image}`,
                cardCode: `${card2.code}`,
                imageURL: `${card2.image}`
              };

              let card3 = result.data.cards[i + 2];
              //Card object to display user 2's hand
              let drawnCard3 = {
                value: `${card3.value}`,
                suit: `${card3.suit}`,
                imageURL: `${card3.image}`,
                cardCode: `${card3.code}`,
                imageURL: `${card3.image}`
              };

              dealer_deck.push(drawnCard1)
              user1_deck.push(drawnCard2);
              user2_deck.push(drawnCard3);
            }
            //Pushes new card to the browser
            updateRender(n => !n);
          })
          .catch(error => console.log(error));
      })
    .catch(error => console.log(error));
  }

  function deal() {
    try {
      //reset the pile for each player
      dealer_card = [];
      user1_card = [];
      user2_card = [];
      if (!gameWon()) {
        let dealer = dealer_deck.pop()
        let player1 = user1_deck.pop();
        let player2 = user2_deck.pop();
        if (!(dealer === "undefined" && player1 === "undefined" && player2 === "undefined")) {
          dealer_card.push(dealer);
          user1_card.push(player1);
          user2_card.push(player2);
          updateRender(n => !n);
          drawWinner();
        }
      } else {
        gameWon();
        updateRender(n => !n);
      }
    } catch (e) {}
  }

  //Scores for whoever wins round
  async function drawWinner() {

    //get dealer card value 
    let dealerScore = cardValue(dealer_card[dealer_card.length - 1]);
    //get player card value
    let user1Score = cardValue(user1_card[user1_card.length - 1]);
    //get player card value
    let user2Score = cardValue(user2_card[user2_card.length - 1]);

    if (dealerScore === user1Score) {
      //its a tie
      console.log('Tie!')
    }else if (dealerScore === user2Score){
      //it's a tie
      console.log('Tie!')
    }else if (dealerScore > user1Score && dealerScore > user2Score) {
      //player wins the flip
      console.log("Both Players Drink!");
    } else if (user1Score > dealerScore && dealerScore > user2Score) {
      //dealer wins
      console.log("Player 2 DRINK!");
    }else if (user2Score > dealerScore && dealerScore > user1Score) {
      //dealer wins
      console.log("Player 1 DRINK!");
    }else {
      console.log("Nobody Drinks!")
    }
  }

  //Create function to specify the value for A, K, Q, J
  function cardValue(card){
    try {
      switch (card.value) {
        case "ACE":
          return 14;
        case "KING":
          return 13;
        case "QUEEN":
          return 12;
        case "JACK":
          return 11;
        default:
          return card.value;
      }
    } catch (e) {}
  }

  //checks if either player has an empty deck
  function gameWon() {
    console.log("Player 1 Cards: " + user1_deck.length + " Player 2 Cards: " + user2_deck.length);
    if (user1_deck.length === 0) {
      return true;
    }
    if (user2_deck.length === 0) {
      return true;
    }
    return false;
  }

  return (
    <>
      <div>

          <button onClick={deal}>Hit</button>
          <button onClick={newGame}>
            New Game
          </button>

        <div type="player">
          <h2>Dealer</h2>
          {dealer_card &&
            dealer_card.map((card, index) => {
              return (
                <img
                  key={`dealer${index}`}
                  src={`${card.imageURL}`}
                  alt={`${card.value} of ${card.suit}`}
                />
              );
            })}
        </div>
      
        <div type="player">
          <h2>Player 1</h2>
          {user1_card &&
            user1_card.map((card, index) => {
              return (
                <img
                  key={`player${index}`}
                  src={`${card.imageURL}`}
                  alt={`${card.value} of ${card.suit}`}
                />
              );
            })}
        </div>

        <div>
          <h2>Player 2</h2>
          {user2_card &&
            user2_card.map((card, index) => {
              return (
                <img
                  key={`player${index}`}
                  src={`${card.imageURL}`}
                  alt={`${card.value} of ${card.suit}`}
                />
              );
            })}
        </div>
      </div>
    </>
  )

}

export default WarGame;