using System;

namespace MyGame
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
