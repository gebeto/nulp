using System;

namespace lab_1
{
    public class MainMenuItem {
        public string title;

        public MainMenuItem(string title) {
            this.title = title;
        }
    }

    public class MainMenu {
        private int activeItem;
        private MainMenuItem[] items = {
            new MainMenuItem("Start game"),
            new MainMenuItem("Settings"),
            new MainMenuItem("Exit")
        };

        public MainMenu() {
            this.activeItem = 0;
        }

        public void render() {
            Console.Clear();
            for (int i = 0; i < this.items.Length; i++)
            {
                Console.SetCursorPosition(0, i);
                Console.Write(string.Format("{0}. {1}", i, this.items[i].title));
            }
        }
    }
}