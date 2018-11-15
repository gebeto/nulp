using System;


namespace MyGame
{
    interface IScreen {
        void render();
    }


    class Program
    {
        static void Main(string[] args)
        {
            Game game = new Game();
            
            GameMenu menu = new GameMenu();
            menu.items.Add(new GameMenuItem("Start game", 1));
            menu.items.Add(new GameMenuItem("Settings", 2));
            menu.items.Add(new GameMenuItem("Exit", 3));
            menu.onChange += (object sender, GameMenuItemChangedArgs e) => {
                Console.Clear();
                Console.WriteLine("Menu item selected: {0}", e.Item.title);
            };

            game.onStop += (object sender, GameStateEventArgs e) => Console.WriteLine("Game Stopped.");
            // game.onStateChanged += (object sender, GameStateEventArgs e) => 
            //     Console.WriteLine("Game state changed to: {0}", (sender as Game).gameState);

            game.onStart += (
                (object sender, GameStateEventArgs e) =>
                {
                    menu.render();
                }
            );


            game.start();
            Console.ReadKey();
        }
    }
}
