using System;

namespace lab_1
{
    public enum GameState
    {
        Pause,
        Progress,
        Stop,
    }

    public interface IGame
    {
        void start();
        void pause();
        void stop();
    }

    public abstract class AbstractGame : IGame
    {
        public event GameStateEventHandler onStateChanged;
        public event GameStateEventHandler onStart;
        public event GameStateEventHandler onPause;
        public event GameStateEventHandler onStop;

        public void start()
        {
            if (onStart != null)
            {
                onStart(this, new GameStateEventArgs(GameState.Progress));
            }
            if (onStateChanged != null)
            {
                onStateChanged(this, new GameStateEventArgs(GameState.Progress));
            }
        }

        public void pause()
        {
            if (onPause != null)
            {
                onPause(this, new GameStateEventArgs(GameState.Pause));
            }
            if (onStateChanged != null)
            {
                onStateChanged(this, new GameStateEventArgs(GameState.Pause));
            }
        }

        public void stop()
        {
            if (onStop != null)
            {
                onStop(this, new GameStateEventArgs(GameState.Stop));
            }
            if (onStateChanged != null)
            {
                onStateChanged(this, new GameStateEventArgs(GameState.Stop));
            }
        }

        private void stateChange(GameState state)
        {
            if (onStateChanged != null) {
                onStateChanged(this, new GameStateEventArgs(state));
            }
        }
    }

    public class GameStateEventArgs : EventArgs
    {
        public GameState State { get; set; }

        public GameStateEventArgs(GameState state) {
            this.State = state;
        }
    }

    public delegate void GameStateEventHandler(object sender, GameStateEventArgs args);
}
