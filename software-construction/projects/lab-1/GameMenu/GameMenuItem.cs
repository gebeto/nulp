using System;


namespace lab_1 {
    public class GameMenuItemChangedArgs : EventArgs {
        public GameMenuItem Item { get; private set; }

        public GameMenuItemChangedArgs(GameMenuItem item) {
            this.Item = item;
        }
    }

    public delegate void GameMenuItemChangedHandler(object sender, GameMenuItemChangedArgs args);

    public class GameMenuItem
    {
        public string title;
        public int key;
        public event GameMenuItemChangedHandler onSelect;

        public GameMenuItem(string title, int itemKey, GameMenuItemChangedHandler onSelect = null)
        {
            this.title = title;
            this.key = itemKey;
            this.onSelect += onSelect;
        }

        public void select()
        {
            if (this.onSelect != null)
            {
                this.onSelect(this, new GameMenuItemChangedArgs(this));
            }
        }
    }
}