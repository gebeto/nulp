using System;


namespace lab_1 {
    public class GameMenuItem
    {
        public string title;
        public event EventHandler onSelect;

        public GameMenuItem(string title, EventHandler onSelect = null)
        {
            this.title = title;
            this.onSelect += onSelect;
        }

        public void select()
        {
            if (this.onSelect != null)
            {
                this.onSelect(this, new EventArgs());
            }
        }
    }
}