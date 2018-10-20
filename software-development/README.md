<h1 align="center"> Лекція 2: Делегати і події </h1>

<h2 align="center"> Зміст </h2>

#### Делегати. Оголошення делегатів та їх використання.
Крім властивостей і методів класи і інтерфейси можуть містити делегати і події. Делегати представляють такі об'єкти, які вказують на інші методи. Тобто делегати - це вказівники на методи. За допомогою делегатів ми можемо викликати певні методи у відповідь на деякі дії.
Методи, на які посилаються делегати, повинні мати ті ж параметри і той же тип значення.

Створимо два делегати:
```cs
delegate int Operation (int x, int y);
delegate void GetMessage ();
```


Для оголошення делегата використовується ключове слово `delegate`, після якого йде тип повернення, назва і параметри. Перший делегат посилається на функцію, яка в якості параметрів приймає два значення типу `int` і повертає деяке число. Другий делегат посилається на метод без параметрів, який нічого не повертає.
Щоб використовувати делегат, нам треба створити його об'єкт за допомогою конструктора, в який ми передаємо адресу методу, що викликається делегатом. Щоб викликати метод, на який вказує делегат, треба використовувати його метод `Invoke`. Крім того, делегати можуть виконуватися в асинхронному режимі, при цьому нам не треба створювати другий потік, нам треба лише замість методу `Invoke` використовувати пару методів `BeginInvoke` / `EndInvoke`:
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


За допомогою властивості `DateTime.Now.Hour` отримуємо поточну годину. І в залежності від часу в делегат передається адреса певного методу. Зверніть увагу, що методи мають те саме значення повернення і той же набір параметрів (в даному випадку відсутність параметрів), що і делегат.

Подивимося на прикладі іншого делегата:
```cs
class Program {
    delegate int Operation (int x, int y);
    static void Main (string [] args) {
        // присвоювання адреси методу через контруктор
        Operation del = new Operation (Add); // делегат вказує на метод Add int result = del.Invoke (4,5);
        Console.WriteLine (result);
        del = Multiply; // тепер делегат вказує на метод Multiply result = del.Invoke (4, 5);
        Console.WriteLine (result);
        Console.Read ();
    }

    private static int Add (int x, int y) {
        return x + y;
    }

    private static int Multiply (int x, int y) {
        return x * y;
    }
}
```


Тут описаний спосіб присвоєння делегату адреси методу через конструктор. І оскільки пов'язаний метод, як і делегат, має два параметри, то при виклику делегата в метод Invoke ми передаємо два параметра. Крім того, так як метод повертає значення типу int, то ми можемо присвоїти результат роботи методу Invoke який небудь змінні. Метод Invoke() при виклику делегата можна опустити і використовувати скорочену форму:
```cs
del = Multiply; // тепер делегат вказує на метод Multiply result = del (4, 5);
```


Тобто делегат можна викликати як звичайний метод, передаючи йому аргументи. Також делегати можуть бути параметрами методів:
```cs
class Program {
    delegate void GetMessage ();

    static void Main(string [] args) {
        if (DateTime.Now.Hour <12) {
            Show_Message(GoodMorning);
        } else {
            Show_Message(GoodEvening);
        }
        Console.ReadLine();
    }

    private static void Show_Message(GetMessage _del) {
        _del.Invoke();
    }

    private static void GoodMorning() {
        Console.WriteLine ( "Good Morning");
    }

    private static void GoodEvening() {
        Console.WriteLine ( "Good Evening");
    }
}
```


Дані приклади, можливо, не показують справжньої сили делегатів, так як потрібні нам методи в даному випадку ми можемо викликати і безпосередньо без всяких делегатів. Однак найбільш сильна сторона делегатів полягає в тому, що вони повідомляють інші об'єкти про події, що відбулися.
Розглянемо ще один приклад. Нехай у нас є клас, що описує рахунок в банку:
```cs
class Account {
    int _sum; // Змінна для зберігання суми
    int _percentage; // Змінна для зберігання відсотка

    public Account (int sum, int percentage) {
        _sum = sum;
        _percentage = percentage;
    }

    public int CurrentSum {
        get { return _sum; }
    }

    public void Put (int sum) {
        _sum + = sum;
    }

    public void Withdraw (int sum) {
        if (Sum <= _sum) {
            _sum - = sum;
        }
    }

    public int Percentage {
        get {return _percentage; }
    }
}
```


Припустимо,вразі виведення грошей за допомогою методу `Withdraw` нам треба якось повідомляти про це самого клієнта і, може бути, інші об'єкти. Для цього створимо делегат `AccountStateHandler`. Щоб використовувати делегат, нам треба створити змінну цього делегата, а потім привласнити йому метод, який буде викликатися делегатом.
Отже, додамо в клас Account наступні рядки:
```cs
class Account {
    // Оголошуємо делегат
    public delegate void AccountStateHandler (string message); // Створюємо змінну делегата
    AccountStateHandler del;
    // Реєструємо делегат
    public void RegisterHandler (AccountStateHandler _del)
    {
    del = _del;
    }
    // Далі інші рядки класу Account
}
```


Тут фактично проробляються ті ж кроки, що були вище, і є практично все крім виклику делегата. В даному випадку у нас делегат бере параметр типу `string`.
Тепер змінимо метод Withdraw наступнимчином:
```cs
public void Withdraw (int sum) {
    if (Sum <= _sum) {
        _sum - = sum;
        if (Del! = Null) {
            del ( "Сума" + Sum.ToString () + "знята з рахунку");
        }
    } else {
        if (Del! = Null) {
            del ( "Недостатньо грошей на рахунку");
        }
    }
}
```


Тепер при знятті грошей через метод `Withdraw` ми спочатку перевіряємо, чи має делегат посилання на який-небудь метод (інакше він має значення `null`). І якщо метод встановлений, то викликаємо його, передаючи відповідне повідомлення в якості параметра.
Тепер протестуємо клас в основній програмі:
```cs
class Program {
    static void Main(string [] args) {
        // створюємо банківський рахунок
        Account account = new Account(200, 6);
        // Додаємо в делегат посилання на метод Show_Message
        // а сам делегат передається як параметр методу RegisterHandler 
        //account.RegisterHandler (new Account.AccountStateHandler(Show_Message)); // Два рази поспіль намагаємося зняти гроші
        account.Withdraw(100);
        account.Withdraw(150);
        Console.ReadLine();
    }

    private static void Show_Message(String message) {
        Console.WriteLine (message);
    }
}
```
Запустивши програму, ми отримаємо два різних повідомлення:
> Сума 100 знята з рахунку

> Недостатньо грошей на рахунку