"use client"

import React, { useState } from 'react';
import styled from 'styled-components';
import "./freeze.css"
import Link from 'next/link';



const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px); 
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const Tile = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${props => {
    if (props.player1Selected) return '#00f'; // Player 1 color
    if (props.player2Selected) return '#f00'; // Player 2 color
    return '#374151'; // Default background color
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  cursor: pointer;
  border-radius: 5px;
`;





const Game = () => {
  const [tiles, setTiles] = useState(Array(9).fill(null)); // null for unselected, 1 for player 1, 2 for player 2
  const [selectedCountPlayer1, setSelectedCountPlayer1] = useState(0);
  const [selectedCountPlayer2, setSelectedCountPlayer2] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [player1Wins, setPlayer1Wins] = useState(false);
  const maxSelections = 4;

  const checkWinCondition = (player) => {
    const winPatterns = [
      [0, 1, 2], // horizontal top
      [3, 4, 5], // horizontal middle
      [6, 7, 8], // horizontal bottom
      [0, 3, 6], // vertical left
      [1, 4, 7], // vertical center
      [2, 5, 8], // vertical right
    ];

    return winPatterns.some(pattern =>
      pattern.every(index => tiles[index] === player)
    );
  };


  const toggleTile = index => {
    if (tiles[index] === null && ((currentPlayer === 1 && selectedCountPlayer1 < maxSelections) || (currentPlayer === 2 && selectedCountPlayer2 < maxSelections))) {
      const newTiles = [...tiles];
      newTiles[index] = currentPlayer;

      if (currentPlayer === 1) {
        setSelectedCountPlayer1(selectedCountPlayer1 + 1);
        if (checkWinCondition(1)) {
          setPlayer1Wins(true);
        }
      } else {
        setSelectedCountPlayer2(selectedCountPlayer2 + 1);
      }

      setTiles(newTiles);
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1); // Switch to the other player
    }
  };

  return (
    <div className='text-conainer' style={{
      backgroundImage: 'url("/village.jpg")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      padding: "20px"
    }}>
      <div className='jigsaw-container' >
        <div className='row'>
          <GameContainer className='image' >
            <div className='des'>Level One</div>
            <h2 className='info-player'>Player {currentPlayer}'s Turn</h2>
            <div>
              <Board>
                {tiles.map((player, index) => (
                  <Tile
                    key={index}
                    player1Selected={player === 1}
                    player2Selected={player === 2}
                    onClick={() => toggleTile(index)}
                  >
                    {player === 1 ? '❄️' : player === 2 ? '🔥' : ''}
                  </Tile>
                ))}
              </Board>
            </div>
            <h4 className='info'>Player 1 Selected: {selectedCountPlayer1} / {maxSelections}</h4>
            <h4 className='info'>Player 2 Selected: {selectedCountPlayer2} / {maxSelections}</h4>

            {player1Wins && (
              <div className='level'>
                <button className='button1'>
                  <Link href="/game1">Next Level</Link>
                </button>
              </div>
            )}
          </GameContainer>
        </div>
      </div>
      <div className="welcome-container">
        <h2 className="welcome-title">🧩 Welcome to the Ultimate Puzzle Challenge! 🧩</h2>
        <p className="welcome-text">
          Hey there, puzzle solver! 🌟 Every puzzle is a new adventure, and every piece is a chance to unlock your potential.
          This is more than just a game—it's your journey to sharpen your mind, test your skills, and celebrate every small victory.
        </p>
        <ul className="welcome-list">
          <li>🔍 Every piece counts: Take your time, explore the possibilities, and watch how everything falls into place.</li>
          <li>🧠 Sharpen your mind: Solve puzzles to grow stronger, one piece at a time.</li>
          <li>🎯 Embrace the challenge: Don’t give up! The best moments are when everything clicks, and you can say, "I did it!"</li>
        </ul>
        <p className="welcome-text">
          Keep pushing forward, trust your instincts, and most of all—enjoy the journey. You’ve got the mind of a champion, and every puzzle you conquer is a victory worth celebrating! Get ready to piece it all together! 🎉
        </p>
      </div>
      <div className="game-instructions-container">
        <div className="game-instructions-content">
          <div className="game-instructions">
            <h2 className="instructions-title">How to Play Free Jigsaw Planet Game</h2>
            <p className="instructions-description">Free Jigsaw planet games are a delightful way to challenge your mind, improve cognitive skills, improve your picking power, and enjoy some leisure time. Jigsawplanet come in various forms, with unique content from traditional paper jigsawplanet to sophisticated digital games. The jigsawplanet guide will walk you through the basic principles of playing different types of jigsawplanet games, offering tips and strategies to enhance your experience.</p>
            <h3 className="instruction-step">1. Different Types of Jigsaw Planet Free:</h3>
            <p className="instructions-description">Jigsawplanet games come in many varieties, each with unique mechanics and objectives.</p>
            <h3 className="instruction-step">2. Understand the Rules:</h3>
            <p className="instructions-description">Each jigsaw planet puzzles has specific rules and objectives. Read the instructions carefully before starting.</p>
            <ul className="instructions-list">
              <li>In this game players have 3 chances.</li>
              <li>If 3 jigsaw planet puzzle game cards are matched to each other.</li>
              <li>Player wins this game.</li>
              <li>Otherwise, Restart the jigsaw planet game again and try to match again 3 cards.</li>
            </ul>
            <h3 className="instruction-step">3. Set up Your Space:</h3>
            <p className="instructions-description">For physical jigsaw puzzle, ensure you have a comfortable and well-lit workspace. For digital jigsawplanet, adjust your device's brightness and volume settings to suit your environment and mind.</p>
            <h2 className="tips-title">Tips for Success</h2>
            <ul className="instructions-list">
              <li>Stay Calm: Jigsawplanet puzzle games should be enjoyable; take breaks if you feel frustrated.</li>
              <li>Practice Regularly: The more you play, the better you get.</li>
              <li>Learn from Mistakes: Analyze what went wrong and try different approaches.</li>
              <li>Challenge Yourself: Gradually increase the difficulty level to keep improving your skills and thinking process.</li>
            </ul>
            <h3 className="instruction-step">Conclusion:</h3>
            <p className="instructions-description">Jigsaw planet games offer endless opportunities to test your mental acuity, relax, and have fun. By understanding the rules, using effective strategies, and practicing regularly, you can enhance your jigsawplanet-solving skills and enjoy the satisfying feeling of cracking even the toughest jigsawplanet. So, choose your game, set up your space, and dive into the fascinating world of jigsawplanet!</p>
          </div>
          <div className='game-image-container'>
            <Link href="/freezenova">
              <img className='game-image' src='./images/Freezenova1.jpeg' alt='Freezenova game on jigsaw planet' />
            </Link>
            <Link href="/freezenova">
              <img className='game-image' src='./images/Freezenova2.jpeg' alt='Jigsaw planet puzzle - Freezenova' />
            </Link>
            <Link href="/freezenova">
              <img className='game-image' src='./images/Freezenova3.jpeg' alt='Free jigsaw planet game' />
            </Link>
            <Link href="/freezenova">
              <img className='game-image' src='./images/Freezenova4.jpeg' alt='Jigsaw puzzle on jigsaw planet' />
            </Link>
            <Link href="/freezenova">
              <img className='game-image' src='./images/Freezenova5.jpeg' alt='Free puzzle game on jigsaw planet' />
            </Link>
            <Link href="/freezenova">
              <img className='game-image' src='./images/Freezenova6.jpeg' alt='Freezenova puzzle on jigsaw planet' />
            </Link>
            <Link href="/freezenova">
              <img className='game-image' src='./images/Freezenova7.jpeg' alt='Play free puzzles on jigsaw planet' />
            </Link>
            <Link href="/freezenova">
              <img className='game-image' src='./images/Freezenova8.jpeg' alt='Jigsaw planet puzzle - Freezenova' />
            </Link>
            <Link href="/jigsaw-planet">
              <img className='game-image' src='./images/Puzzle1.jpeg' alt='Jigsaw planet adventure' />
            </Link>
            <Link href="/jigsaw-planet1">
              <img className='game-image' src='./images/Puzzle2.jpeg' alt='Play puzzles on jigsaw planet' />
            </Link>
            <Link href="/puzzle3">
              <img className='game-image' src='./images/Puzzle3.jpeg' alt='Explore jigsaw planet puzzles' />
            </Link>
            <Link href="/jigsaw-planet">
              <img className='game-image' src='./images/Puzzle5.jpeg' alt='Online jigsaw planet game' />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Game;


