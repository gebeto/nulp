using System;


namespace lab_1
{
    class Program
    {
        static void Main(string[] args)
        {
            Game game = new Game();
            game.onStart += (object sender, GameStateEventArgs e) => Console.WriteLine("Game Started.");
            game.onStop += (object sender, GameStateEventArgs e) => Console.WriteLine("Game Stopped.");

            Console.Clear();

            while (true)
            {
                Console.Write("Command: ");
                switch (Console.ReadLine())
                {
                    case "start":
                        game.start();
                        break;
                    case "stop":
                        game.stop();
                        break;
                }

                if (game.stopped) {
                    break;
                }
            }
        }
    }
}
