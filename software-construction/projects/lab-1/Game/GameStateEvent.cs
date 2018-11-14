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

    public class GameStateEventArgs : EventArgs
    {
        public GameState State { get; set; }

        public GameStateEventArgs(GameState state) {
            this.State = state;
        }
    }

    public delegate void GameStateEventHandler(object sender, GameStateEventArgs args);
}
