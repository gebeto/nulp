using System;


namespace lab_1
{
    class Program
    {
        Game game;

        static GameMenu initMenuForGame(Game game)
        {
            GameMenu menu = new GameMenu();

            menu.items.Add(
                new GameMenuItem(
                    "Start game",
                    (object sender, EventArgs e) =>
                    {
                        Console.Clear();
                        Console.WriteLine("START GAME");
                    }
                )
            );

            menu.items.Add(
                new GameMenuItem(
                    "Settings",
                    (object sender, EventArgs e) =>
                    {
                        Console.Clear();
                        Console.WriteLine("SETTINGS");
                    }
                )
            );

            menu.items.Add(
                new GameMenuItem(
                    "Exit",
                    (object sender, EventArgs e) =>
                    {
                        Console.Clear();
                        Console.WriteLine("EXIT");
                    }
                )
            );
            return menu;
        }

        static void Main(string[] args)
        {
            Game game = new Game();
            game.onStart += (object sender, GameStateEventArgs e) => Console.WriteLine("Game Started.");
            game.onStop += (object sender, GameStateEventArgs e) => Console.WriteLine("Game Stopped.");
            game.onStateChanged += (object sender, GameStateEventArgs e) => 
                Console.WriteLine("Game state changed to: {0}", (sender as Game).gameState);

            GameMenu menu = initMenuForGame(game);
            menu.render();

            // Console.Clear();

            // while (true)
            // {
            //     Console.Write("Command: ");
            //     switch (Console.ReadLine())
            //     {
            //         case "start":
            //             game.start();
            //             break;
            //         case "stop":
            //             game.stop();
            //             break;
            //     }

            //     if (game.stopped) {
            //         break;
            //     }
            // }
        }
    }
}
