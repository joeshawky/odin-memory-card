import './Scoreboard.css'

export default function Scoreboard({ score, highScore }) {
    return (
        <div className='scoreWrapper'>
            <div className='scoreText'>
                <p>Score: {score}/4</p>
                <p>Highschore: {highScore}</p>
            </div>
        </div>
    );
}