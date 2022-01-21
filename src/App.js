import GameBoard from "./components/GameBoard";
import GameContextProvider from "./components/GameContext";
import EndPage from "./components/EndPage";

function App() {

  return (
    <>

        <div className="main-page tw-flex">
          <div className="title"> Tic Tac Toe </div>
          <GameContextProvider>
            <GameBoard> </GameBoard>
            <EndPage> </EndPage>
          </GameContextProvider>
        </div>

    </>
  );
}

export default App;
