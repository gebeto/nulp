using System;

namespace Game
{
    public class TickArgs : EventArgs
    {
        int Time { get; set; }

        public TickArgs(int time) {
            this.Time = time;
        }
    }

    public delegate void TickHandler(object sender, TickArgs args);
}
