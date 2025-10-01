import { useState, useEffect, useCallback } from 'react';

const COLS = 10;
const ROWS = 20;
const SHAPES = [
  [[1,1,1,1]], // I
  [[1,1],[1,1]], // O
  [[0,1,0],[1,1,1]], // T
  [[1,0,0],[1,1,1]], // L
  [[0,0,1],[1,1,1]], // J
  [[0,1,1],[1,1,0]], // S
  [[1,1,0],[0,1,1]], // Z
];
const COLORS = ['#00f0f0','#f0f000','#a000f0','#f0a000','#0000f0','#00f000','#f00000'];

export default function App() {
  const newPiece = useCallback(() => {
    const idx = Math.floor(Math.random() * SHAPES.length);
    return { shape: SHAPES[idx], color: idx + 1 };
  }, []);

  const [board, setBoard] = useState(() => Array(ROWS).fill(null).map(() => Array(COLS).fill(0)));
  const [piece, setPiece] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [nextPiece, setNextPiece] = useState(() => newPiece());

  const collide = useCallback((b, p, px, py) => {
    for (let y = 0; y < p.shape.length; y++) {
      for (let x = 0; x < p.shape[0].length; x++) {
        if (p.shape[y][x]) {
          const newY = py + y;
          const newX = px + x;
          if (newY >= ROWS || newX < 0 || newX >= COLS || (newY >= 0 && b[newY][newX])) {
            return true;
          }
        }
      }
    }
    return false;
  }, []);

  const merge = useCallback((b, p, px, py) => {
    const newBoard = b.map(row => [...row]);
    for (let y = 0; y < p.shape.length; y++) {
      for (let x = 0; x < p.shape[0].length; x++) {
        if (p.shape[y][x]) {
          const newY = py + y;
          const newX = px + x;
          if (newY >= 0) newBoard[newY][newX] = p.color;
        }
      }
    }
    return newBoard;
  }, []);

  const clearLines = useCallback((b) => {
    let cleared = 0;
    const newBoard = b.filter(row => {
      if (row.every(cell => cell !== 0)) {
        cleared++;
        return false;
      }
      return true;
    });
    while (newBoard.length < ROWS) {
      newBoard.unshift(Array(COLS).fill(0));
    }
    return { board: newBoard, cleared };
  }, []);

  const rotate = useCallback((p) => {
    const newShape = p.shape[0].map((_, i) => p.shape.map(row => row[i]).reverse());
    return { ...p, shape: newShape };
  }, []);

  const drop = useCallback(() => {
    if (!piece || gameOver || isPaused) return;
    
    if (!collide(board, piece, pos.x, pos.y + 1)) {
      setPos(p => ({ ...p, y: p.y + 1 }));
    } else {
      const merged = merge(board, piece, pos.x, pos.y);
      const { board: clearedBoard, cleared } = clearLines(merged);
      setBoard(clearedBoard);
      setScore(s => s + cleared * 100);
      
      const startX = Math.floor(COLS / 2) - 1;
      if (collide(clearedBoard, nextPiece, startX, 0)) {
        setGameOver(true);
      } else {
        setPiece(nextPiece);
        setPos({ x: startX, y: 0 });
        setNextPiece(newPiece());
      }
    }
  }, [piece, pos, board, gameOver, isPaused, collide, merge, clearLines, newPiece]);

  useEffect(() => {
    if (!piece) {
      const next = newPiece();
      setPiece(next);
      setPos({ x: Math.floor(COLS / 2) - 1, y: 0 });
    }
  }, [piece, newPiece]);

  useEffect(() => {
    const timer = setInterval(drop, 500);
    return () => clearInterval(timer);
  }, [drop]);

  useEffect(() => {
    const handleKey = (e) => {
      if (gameOver || !piece) return;
      
      if (e.key === ' ') {
        e.preventDefault();
        setIsPaused(p => !p);
        return;
      }
      
      if (isPaused) return;
      
      if (e.key === 'ArrowLeft' && !collide(board, piece, pos.x - 1, pos.y)) {
        setPos(p => ({ ...p, x: p.x - 1 }));
      } else if (e.key === 'ArrowRight' && !collide(board, piece, pos.x + 1, pos.y)) {
        setPos(p => ({ ...p, x: p.x + 1 }));
      } else if (e.key === 'ArrowDown') {
        drop();
      } else if (e.key === 'ArrowUp') {
        const rotated = rotate(piece);
        if (!collide(board, rotated, pos.x, pos.y)) {
          setPiece(rotated);
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [piece, pos, board, gameOver, isPaused, collide, rotate, drop]);

  const displayBoard = board.map(row => [...row]);
  if (piece && !gameOver && !isPaused) {
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[0].length; x++) {
        if (piece.shape[y][x] && pos.y + y >= 0) {
          displayBoard[pos.y + y][pos.x + x] = piece.color;
        }
      }
    }
  }

  const reset = () => {
    setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(0)));
    setPiece(null);
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setNextPiece(newPiece());
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center p-2">
      {/* Aspect Ratio Container */}
      <div className="w-full max-w-[800px] max-h-[95vh] aspect-[800/480]">
        {/* Switch本体 */}
        <div className="relative w-full h-full bg-black rounded-3xl p-[1.25%]">
          
          {/* 左Joy-Con */}
          <div className="absolute -left-[12.5%] top-0 bottom-0 w-[10%] bg-gradient-to-b from-blue-500 to-blue-600 rounded-l-3xl" style={{ boxShadow: '-5px 0 20px rgba(0,0,0,0.5)' }}>
            <div className="absolute top-[41.6%] left-1/2 -translate-x-1/2 w-[62.5%] h-[10.4%] bg-gray-800 rounded-full"></div>
            <div className="absolute bottom-[33.3%] left-1/2 -translate-x-1/2 w-full space-y-[10%]">
              <div className="w-[50%] h-[8.3%] bg-gray-800 rounded-full mx-auto"></div>
              <div className="w-[50%] h-[8.3%] bg-gray-800 rounded-full mx-auto"></div>
            </div>
          </div>

          {/* 右Joy-Con */}
          <div className="absolute -right-[12.5%] top-0 bottom-0 w-[10%] bg-gradient-to-b from-red-500 to-red-600 rounded-r-3xl" style={{ boxShadow: '5px 0 20px rgba(0,0,0,0.5)' }}>
            <div className="absolute top-[33.3%] left-1/2 -translate-x-1/2 w-[75%] space-y-[5%]">
              <div className="w-[37.5%] h-[6.25%] bg-gray-800 rounded-full mx-auto"></div>
              <div className="flex justify-center gap-[5%]">
                <div className="w-[37.5%] h-[6.25%] bg-gray-800 rounded-full"></div>
                <div className="w-[37.5%] h-[6.25%] bg-gray-800 rounded-full"></div>
              </div>
              <div className="w-[37.5%] h-[6.25%] bg-gray-800 rounded-full mx-auto"></div>
            </div>
            <div className="absolute bottom-[20.8%] left-1/2 -translate-x-1/2 w-[62.5%] h-[10.4%] bg-gray-800 rounded-full"></div>
          </div>

          {/* 画面 */}
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border-[1%] border-gray-900">
            <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-[2.5%]">
              
              {/* 全体のレイアウト */}
              <div className="flex items-start w-full h-full gap-[2.5%]">
                
                {/* 左サイド - 操作方法 */}
                <div className="bg-gray-900 bg-opacity-80 rounded-xl p-[2.5%] w-[25%] h-full flex flex-col">
                  <h3 className="text-white text-[clamp(0.5rem,2.2vh,1rem)] font-bold mb-2 text-center">操作方法</h3>
                  <div className="space-y-2 text-[clamp(0.5rem,2vh,0.9rem)] text-gray-300 flex-grow">
                    <div className="bg-gray-800 rounded p-2 h-[23%] flex flex-col justify-center">
                      <div className="text-center mb-1">移動</div>
                      <div className="text-yellow-400 text-center">← →</div>
                    </div>
                    <div className="bg-gray-800 rounded p-2 h-[23%] flex flex-col justify-center">
                      <div className="text-center mb-1">回転</div>
                      <div className="text-yellow-400 text-center">↑</div>
                    </div>
                    <div className="bg-gray-800 rounded p-2 h-[23%] flex flex-col justify-center">
                      <div className="text-center mb-1">高速落下</div>
                      <div className="text-yellow-400 text-center">↓</div>
                    </div>
                    <div className="bg-gray-800 rounded p-2 h-[23%] flex flex-col justify-center">
                      <div className="text-center mb-1">一時停止</div>
                      <div className="text-yellow-400 text-center">Space</div>
                    </div>
                  </div>
                </div>

                {/* 中央 - ゲーム画面 */}
                <div className="bg-gray-900 rounded-2xl p-[2.5%] shadow-2xl h-full grid" style={{ gridTemplateRows: 'auto 1fr auto' }}>
                  <div className="flex items-center justify-center mb-2">
                    <div className="text-white text-[clamp(1rem,4vh,1.5rem)] font-bold">TETRIS</div>
                  </div>
                  
                  <div className="flex items-center justify-center min-h-0">
                    <div className="bg-black p-1 rounded-lg aspect-[10/20] h-full max-w-full">
                      <div className="grid gap-[1px] h-full" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
                        {displayBoard.map((row, y) => 
                          row.map((cell, x) => (
                            <div
                              key={`${y}-${x}`}
                              style={{
                                backgroundColor: cell ? COLORS[cell - 1] : '#1a1a1a',
                                boxShadow: cell ? 'inset -2px -2px 3px rgba(0,0,0,0.3)' : 'none'
                              }}
                            />
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-center" style={{ minHeight: '3.5rem' }}>
                    {gameOver && (
                      <div className="text-center">
                        <div className="text-red-400 text-[clamp(0.8rem,3vh,1.2rem)] font-bold mb-1">GAME OVER</div>
                        <button
                          onClick={reset}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-bold text-[clamp(0.6rem,2.5vh,1rem)]"
                        >
                          RESTART
                        </button>
                      </div>
                    )}
                    {isPaused && !gameOver && (
                      <div className="text-center">
                        <div className="text-yellow-400 text-[clamp(0.8rem,3vh,1.2rem)] font-bold">PAUSED</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 右サイド - スコアと次のブロック */}
                <div className="bg-gray-900 bg-opacity-80 rounded-xl p-[2.5%] w-[25%] h-full flex flex-col justify-around">
                  <div>
                    <h3 className="text-white text-[clamp(0.5rem,2.2vh,1rem)] font-bold mb-2 text-center">スコア</h3>
                    <div className="bg-gray-800 rounded-lg p-2">
                      <div className="text-yellow-400 text-[clamp(1rem,4vh,1.75rem)] font-bold text-center">{score}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-white text-[clamp(0.5rem,2.2vh,1rem)] font-bold mb-2 text-center">次のブロック</h3>
                    <div className="bg-gray-800 rounded-lg p-2 flex items-center justify-center aspect-square">
                      <div className="inline-grid" style={{ 
                        gap: '2px',
                        gridTemplateColumns: `repeat(${nextPiece.shape[0].length}, auto)`,
                      }}>
                        {nextPiece.shape.map((row, y) => 
                          row.map((cell, x) => (
                            <div
                              key={`${y}-${x}`}
                              className="w-3 h-3"
                              style={{
                                backgroundColor: cell ? COLORS[nextPiece.color - 1] : 'transparent',
                                boxShadow: cell ? 'inset -1px -1px 2px rgba(0,0,0,0.3)' : 'none'
                              }}
                            />
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* 電源ボタン */}
          <div className="absolute top-[2.5%] left-1/2 -translate-x-1/2 w-[5%] h-[1%] bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}