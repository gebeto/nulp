using System;

namespace lab_1
{
    public class Game {
        public event EventHandler onStart;
        public event EventHandler onStop;

        public bool stopped;

        public Game() {
            stopped = false;
        }

        public void start()
        {
            if (onStart != null)
            {
                onStart(this, new EventArgs());
            }
        }

        public void stop()
        {
            stopped = true;
            if (onStop != null)
            {
                onStop(this, new EventArgs());
            }
        }

        ~Game() {
            this.stop();
        }
    }
}