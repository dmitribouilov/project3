import styled from 'styled-components';

export const Layout = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Header = styled.header `
    width: 100%;
    text-align: center;
    background-color: green;
    font-size: 24px;
    font- weight: bold;
    color: whitesmoke;
    padding: 16px 0;
`;




// { <div>
//     <div>
//         <div>
//             <button onClick={deal}>Draw</button>
//             <button onClick={newGame}>New Game</button>
//         </div>
//     </div>

//     <div>
//     <div type="dealer">
//       <h2>Dealer</h2>
//       {dealer_card && dealer_card.map((card, index) => {
//         return (
//           <img
//             key={`dealer${index}`}
//             src={`${card.imageUrl}`}
//             alt={`${card.value} of ${card.suit}`}
//           />
//         );
//       })}
//     </div>
//     </div>

//     <div type="player">
//       <h2>Player 1</h2>
//       {user1_card && user1_card.map((card, index) => {
//         return (
//           <img
//             key={`player${index}`}
//             src={`${card.imageUrl}`}
//             alt={`${card.value} of ${card.suit}`}
//           />
//         )
//       })}
//     </div>

//     <div>
//       <h2>Player 2</h2>
//       {user2_card && user2_card.map((card, index) => {
//         return (
//           <img
//             key={`player${index}`}
//             src={`${card.imageUrl}`}
//             alt={`${card.value} of ${card.suit}`}
//         />
//         )
//       })}
//     </div>
//     </div>
// }