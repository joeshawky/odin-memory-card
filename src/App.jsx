import { useEffect } from "react";
import "./App.css";
import { defaultCards, flipAllCards, IMAGES, resetCardSelection, updateCardSelection } from "./utils/utils";
import { useState } from "react";
import Scoreboard from "./components/Scoreboard";
import Card from "./components/Card";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function App() {

    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const [cards, setCards] = useState(defaultCards);

    const [isShuffling, setIsShuffling] = useState(false);

    // useEffect(() => {
    //     const cardsElements = document.querySelectorAll(".card");

    //     cardsElements.forEach((card, idx) => {
    //         card.style.background = cards[idx].image;
    //     });
    // }, [cards]);

    useEffect(() => {
        // console.log(cards.map(c => c.selected));
        console.log(`use effect`);
        console.log(cards);
    }, [cards])
    
    const handleClick = async (value) => {
        if (isShuffling) return;
    
        // Get fresh update info
        const { updatedCards, newScore, wasCorrect } = updateCardSelection(cards, value, score);
    
        // Update score and cards
        setScore(newScore);
        setHighScore(prev => wasCorrect ? Math.max(newScore, prev) : prev);
        setCards(updatedCards);
    
        setIsShuffling(true);
    
        // Flip all cards after delay
        // await wait(200);
        setCards(prevCards => flipAllCards(prevCards, true));
    
        // Shuffle cards after delay
        await wait(500);
        setCards(prevCards => shuffleCards(prevCards));
    
        // Unflip and end shuffle
        await wait(300);
        setCards(prevCards => flipAllCards(prevCards, false));
        setIsShuffling(false);
    };

    const shuffleCards = (cards) => {
        const shuffled = [...cards];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
    };

    return (
        <div
            className="bg"
            style={{ backgroundImage: `url(${IMAGES.background})` }}
        >
            <Scoreboard score={score} highScore={highScore} />

            <div className="cards">
                {cards.map((card, idx) => (
                    <Card
                        key={idx}
                        idx={idx}
                        onClick={(element) => handleClick(element)}
                        // image={card.flipped ? "cardBack.png" : card.image}
                        image={card.image}
                        gem={card.gem}
                        value={card.value}
                        isShuffling={isShuffling}/>
                ))}
            </div>
        </div>
    );
}

export default App;
