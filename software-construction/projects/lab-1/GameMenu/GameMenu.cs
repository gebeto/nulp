using System;
using System.Collections.Generic;


namespace lab_1
{
    public class GameMenu {
        public event EventHandler onChange;

        private int highlighted;
        
        public int activeItem {get; private set;}

        public List<GameMenuItem> items;

        public GameMenu() {
            this.items = new List<GameMenuItem>();
            this.activeItem = 0;
            this.highlighted = this.activeItem;
        }

        public void render() {
            int selected = -1;
            while (selected == -1) {
                Console.Clear();
                for (int i = 0; i < this.items.Count; i++)
                {
                    Console.SetCursorPosition(0, i);
                    if (this.highlighted == i) {
                        Console.BackgroundColor = System.ConsoleColor.White;
                        Console.ForegroundColor = System.ConsoleColor.Black;
                    }
                    Console.Write(string.Format("{0}. {1}", i + 1, this.items[i].title));
                    Console.ResetColor();
                }

                if (this.handleMenuSelectItem()) {
                    break;
                }
            }
        }

        private bool handleMenuSelectItem() {
            ConsoleKeyInfo key = Console.ReadKey();
            int keyCode = key.Key.GetHashCode();
            if (keyCode == 13)
            {
                this.activeItem = this.highlighted;
                this.items[this.activeItem].select();
                return true;
            }
            else if (keyCode == 40 || keyCode == 83)
            {
                this.highlighted++;
            }
            else if (keyCode == 38 || keyCode == 87)
            {
                this.highlighted--;
            }

            if (this.highlighted >= this.items.Count)
            {
                this.highlighted = 0;
            }
            else if (this.highlighted < 0)
            {
                this.highlighted = this.items.Count - 1;
            }

            // Console.WriteLine("\n\nKeyCode: {0}", key.Key.GetHashCode());
            // Console.ReadKey();
            return false;
        }
    }
}