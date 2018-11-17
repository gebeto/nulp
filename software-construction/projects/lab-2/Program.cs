using System;
using System.Linq;
using System.Collections.Generic;

namespace lab_2
{
    class Program
    {
        static void Main(string[] args)
        {
            IEnumerable<Animal> lg50sm60 = Data.animals.Where(a => a.age >= 50 && a.age <= 60).Select(x => x);
            Console.WriteLine("Animals older then 50 years and smaller than 60:");
            foreach (Animal animal in lg50sm60)
            {
                Console.WriteLine("Animal: {0}, {1}, {2}", animal.name, animal.type, animal.age);
            }
            
        }
    }
}
