import './App.css'
import RenjuBoard from './components/RenjuGame';

function App() {

  // const testBoard: Board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));

  //  Vertical Win (Black)
  // testBoard[10][2] = 1;
  // testBoard[10][3] = 1;
  // testBoard[10][4] = 1;
  // testBoard[10][5] = 1;
  // testBoard[10][6] = 1;
  // testBoard[5][8] = 2;
  
  //  Vertical Win (White)
  // testBoard[5][12] = 2;
  // testBoard[6][12] = 2;
  // testBoard[7][12] = 2;
  // testBoard[8][12] = 2;
  // testBoard[9][12] = 2;
  // testBoard[5][8] = 1;

  //  Diagonal Win (Black)
  // testBoard[0][0] = 1;
  // testBoard[1][1] = 1;
  // testBoard[2][2] = 1;
  // testBoard[3][3] = 1;
  // testBoard[4][4] = 1;
  // testBoard[5][8] = 2;

  // Diagonal Win (White)
  // testBoard[10][2] = 2;
  // testBoard[9][3] = 2;
  // testBoard[8][4] = 2;
  // testBoard[7][5] = 2;
  // testBoard[6][6] = 2;
  // testBoard[5][8] = 1;

  // Overline Black not win
  // testBoard[4][4] = 1;
  // testBoard[4][5] = 1;
  // testBoard[4][6] = 1;
  // testBoard[4][7] = 1;
  // testBoard[4][8] = 1;
  // testBoard[4][9] = 1;  // Extra 6th stone

  // Interrupted Sequence
  // testBoard[8][8] = 1;
  // testBoard[8][9] = 1;
  // testBoard[8][10] = 2; // Opponent stone
  // testBoard[8][11] = 1;
  // testBoard[8][12] = 1;

  // Winning at board edge (Black)
  // testBoard[18][14] = 1;
  // testBoard[18][15] = 1;
  // testBoard[18][16] = 1;
  // testBoard[18][17] = 1;
  // testBoard[18][18] = 1;

  return (
    <>
    <div className="min-h-screen p-4 bg-green-50">
      <RenjuBoard />
    </div>
    </>
  )
}

export default App
