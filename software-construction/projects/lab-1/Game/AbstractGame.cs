using System;

namespace lab_1 {

    public abstract class AbstractGame : IGame
    {
        public GameState gameState
        {
            get;
            private set;
        }

        public event GameStateEventHandler onStateChanged;
        public event GameStateEventHandler onStart;
        public event GameStateEventHandler onPause;
        public event GameStateEventHandler onStop;

        public AbstractGame()
        {
            gameState = GameState.Stop;
        }

        public void start()
        {
            this.changeState(this.onStart, GameState.Progress);
        }

        public void pause()
        {
            this.changeState(this.onPause, GameState.Pause);
        }

        public void stop()
        {
            this.changeState(this.onStop, GameState.Stop);
        }

        private void changeState(GameStateEventHandler handler, GameState state)
        {
            this.gameState = state;
            if (handler != null)
            {
                handler(this, new GameStateEventArgs(state));
            }
            if (onStateChanged != null)
            {
                onStateChanged(this, new GameStateEventArgs(state));
            }
        }
    }
    
}