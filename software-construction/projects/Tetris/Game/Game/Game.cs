using System;

namespace Game
{
    public class Game : AbstractGame
    {
        public bool stopped;

        public Game() {
            stopped = false;
            this.onStop += (object sender, GameStateEventArgs args) => this.stopped = true;
            this.onStart += (object sender, GameStateEventArgs args) => this.stopped = false;
        }
    }
}