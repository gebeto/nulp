


```cs
class Program {
    delegate void GetMessage(); // 1. Оголошуємо делегат
    static void Main(string[] args) {
        GetMessage del; // 2. Створюємо змінну делегата
        if (DateTime.Now.Hour < 12) {
            del = GoodMorning; // 3. Надаємо цієї змінної адресу методу }
        } else {
            del = GoodEvening;
        }
        del.Invoke(); // 4. Викликаємо метод
        Console.ReadLine();
    }
    private static void GoodMorning() {
        Console.WriteLine("Good Morning");
    }
    private static void GoodEvening() {
        Console.WriteLine("Good Evening");
    }
}
```
