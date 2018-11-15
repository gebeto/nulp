using System;

namespace MyGame {

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
            this.changeState(GameState.Started, this.onStart);
        }

        public void pause()
        {
            this.changeState(GameState.Pause, this.onPause);
        }

        public void stop()
        {
            this.changeState(GameState.Stop, this.onStop);
        }

        protected void changeState(GameState state, GameStateEventHandler handler)
        {
            this.gameState = state;
            GameStateEventArgs gameStateEventArgs = new GameStateEventArgs(this.gameState);

            if (handler != null)
            {
                handler(this, gameStateEventArgs);
            }

            if (onStateChanged != null)
            {
                onStateChanged(this, gameStateEventArgs);
            }
        }
    }
    
}