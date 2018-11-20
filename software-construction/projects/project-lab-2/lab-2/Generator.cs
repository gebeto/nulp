using System;

namespace lab_2 {

    class AnimalsGenerator {
        public static void GenerateAnimals() {
            string[] types = {
                "Horse",
                "Chicken",
                "Cow",
                "Duck",
            };

            string[] names = {
                "Terry",
                "Andrew",
                "Antony",
                "Cherry",
                "Anna",
                "Emma",
            };

            Random r = new Random();
            for (int i = 0; i < 100; i++) {
                Console.WriteLine(
                    "new Animal(\"{0}\", \"{1}\", {2}),",
                    types[r.Next(0, types.Length)],
                    names[r.Next(0, names.Length)],
                    r.Next(0, 100)
                );
            }
        }
    }
}