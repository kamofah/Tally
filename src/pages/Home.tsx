import { formatPuzzleDate, formatPuzzleNumber } from '../utils/formatPuzzleMetadata'
import './Home.css'
import { Link } from 'react-router'

const Home = () => {
  return (
    <div className="container">
        <div className="header">
            <h1 className="title">Tally</h1>
            <p className="description">Every letter has a price. Find the hidden word and stay within budget.</p>
        </div>
        <div className="buttons">
            <Link className="button" to="/login">Log in</Link>
            <Link className="button button-filled" to="/game">Play</Link>
        </div>
        <div className="footer">
            <p className="date">{formatPuzzleDate(new Date())}</p>
            <p className="number">Puzzle No. {formatPuzzleNumber()}</p>
            <p className="built">Built by Kwaku Amofah-Boafo</p>
            <p className="copyright">© Tally</p>
        </div>
    </div>
  )
}

export default Home