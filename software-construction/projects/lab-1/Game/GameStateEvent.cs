using System;

namespace lab_1
{
    public class GameStateEventArgs : EventArgs
    {
        public GameState State { get; private set; }

        public GameStateEventArgs(GameState state) {
            this.State = state;
        }
    }

    public delegate void GameStateEventHandler(object sender, GameStateEventArgs args);
}
