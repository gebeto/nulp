<h1 align="center"> Лекція 2: Делегати і події </h1>

<h2 align="center"> Зміст </h2>

### Делегати. Оголошення делегатів та їх використання.

Крім властивостей і методів класи і інтерфейси можуть містити делегати і події. Делегати представляють такі об'єкти, які вказують на інші методи. Тобто делегати - це вказівники на методи. За допомогою делегатів ми можемо викликати певні методи у відповідь на деякі дії.
Методи, на які посилаються делегати, повинні мати ті ж параметри і той же тип значення.

Створимо два делегати:
```cs
delegate int Operation(int x, int y);
delegate void GetMessage();
```

Для оголошення делегата використовується ключове слово `delegate`, після якого йде тип повернення, назва і параметри. Перший делегат посилається на функцію, яка в якості параметрів приймає два значення типу `int` і повертає деяке число. Другий делегат посилається на метод без параметрів, який нічого не повертає.
Щоб використовувати делегат, нам треба створити його об'єкт за допомогою конструктора, в який ми передаємо адресу методу, що викликається делегатом. Щоб викликати метод, на який вказує делегат, треба використовувати його метод `Invoke`. Крім того, делегати можуть виконуватися в асинхронному режимі, при цьому нам не треба створювати другий потік, нам треба лише замість методу `Invoke` використовувати пару методів `BeginInvoke`|`EndInvoke`:
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
    delegate int Operation(int x, int y);

    static void Main(string [] args) {
        // присвоювання адреси методу через контруктор
        Operation del = new Operation(Add); // делегат вказує на метод Add int result = del.Invoke(4,5);
        Console.WriteLine(result);
        del = Multiply; // тепер делегат вказує на метод Multiply result = del.Invoke(4, 5);
        Console.WriteLine(result);
        Console.Read();
    }

    private static int Add(int x, int y) {
        return x + y;
    }

    private static int Multiply(int x, int y) {
        return x * y;
    }
}
```

Тут описаний спосіб присвоєння делегату адреси методу через конструктор. І оскільки пов'язаний метод, як і делегат, має два параметри, то при виклику делегата в метод `Invoke` ми передаємо два параметра. Крім того, так як метод повертає значення типу `int`, то ми можемо присвоїти результат роботи методу `Invoke` який небудь змінні. Метод `Invoke()` при виклику делегата можна опустити і використовувати скорочену форму:
```cs
del = Multiply; // тепер делегат вказує на метод Multiply result = del(4, 5);
```

Тобто делегат можна викликати як звичайний метод, передаючи йому аргументи. Також делегати можуть бути параметрами методів:
```cs
class Program {
    delegate void GetMessage();

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
        Console.WriteLine( "Good Morning");
    }

    private static void GoodEvening() {
        Console.WriteLine( "Good Evening");
    }
}
```

Дані приклади, можливо, не показують справжньої сили делегатів, так як потрібні нам методи в даному випадку ми можемо викликати і безпосередньо без всяких делегатів. Однак найбільш сильна сторона делегатів полягає в тому, що вони повідомляють інші об'єкти про події, що відбулися.
Розглянемо ще один приклад. Нехай у нас є клас, що описує рахунок в банку:
```cs
class Account {
    int _sum; // Змінна для зберігання суми
    int _percentage; // Змінна для зберігання відсотка

    public Account(int sum, int percentage) {
        _sum = sum;
        _percentage = percentage;
    }

    public int CurrentSum {
        get { return _sum; }
    }

    public void Put(int sum) {
        _sum + = sum;
    }

    public void Withdraw(int sum) {
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
    public delegate void AccountStateHandler(string message); // Створюємо змінну делегата
    AccountStateHandler del;

    // Реєструємо делегат
    public void RegisterHandler(AccountStateHandler _del) {
        del = _del;
    }

    // Далі інші рядки класу Account...
}
```

Тут фактично проробляються ті ж кроки, що були вище, і є практично все крім виклику делегата. В даному випадку у нас делегат бере параметр типу `string`.
Тепер змінимо метод Withdraw наступнимчином:
```cs
public void Withdraw(int sum) {
    if (Sum <= _sum) {
        _sum - = sum;
        if (Del! = Null) {
            del( "Сума" + Sum.ToString() + "знята з рахунку");
        }
    } else {
        if (Del! = Null) {
            del( "Недостатньо грошей на рахунку");
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
        account.RegisterHandler(new Account.AccountStateHandler(Show_Message)); // Два рази поспіль намагаємося зняти гроші
        account.Withdraw(100);
        account.Withdraw(150);
        Console.ReadLine();
    }

    private static void Show_Message(String message) {
        Console.WriteLine(message);
    }
}
```
Запустивши програму, ми отримаємо два різних повідомлення:
```
  >  Сума 100 знята з рахунку
  >  Недостатньо грошей на рахунку
```

Таким чином, ми створили механізм зворотного виклику для класу `Account`, який спрацьовує в разі зняття грошей. Оскільки делегат оголошений всередині класу `Account`, то щоб до нього отримати доступ, використовується вираз `Account.AccountStateHandler`. Знову ж може виникнути питання: чому б в коді методу `Withdraw()` не виводити повідомлення про зняття грошей? Навіщо потрібно задіяювати делегат?

Справа в тому, що не завжди у нас є доступ до коду класів. Наприклад, частина класів може створюватися і компілюватиметься однією людиною, який не знатиме, як ці класи будуть використовуватися. А використовувати ці класи буде інший розробник. Так, тут ми виводимо повідомлення на консоль. Однак для класу `Account` не важливо, як це повідомлення виводиться. Класу `Account` навіть не відомо, що взагалі буде робитися в результаті списання грошей. Він просто посилає повідомлення про це через делегат.

В результаті, якщо ми створюємо консольний додаток, ми можемо через делегат виводити повідомлення на консоль. Якщо ми створюємо графічне додаток `Windows Forms` або `WPF`, то можна виводити повідомлення у вигляді графічного вікна. А можна не просто виводити повідомлення. А, наприклад, записати при записанні інформації про цю дію в файл або відправити повідомлення на електронну пошту. Загалом будь-якими способами обробити виклик делегата. І спосіб обробки не буде залежати від класу `Account`.

Хоча в прикладі наш делегат брав адресу на один метод, в дійсності він може вказувати відразу на кілька методів. Крім того, при необхідності ми можемо видалити посилання на адреси певних методів, щоб вони не викликалися при виклику делегата. Отже, змінимо в класі `Account` метод `RegisterHandler` і додамо новий метод `UnregisterHandler`, який буде видаляти методи зі списку методів делегата:
```cs
// Реєструємо делегат
public void RegisterHandler(AccountStateHandler _del) {
    Delegate mainDel = System.Delegate.Combine(_del, del);
    del = mainDel as AccountStateHandler;
}

// Скасування реєстрації делегата
public void UnregisterHandler(AccountStateHandler _del) {
    Delegate mainDel = System.Delegate.Remove(del, _del);
    del = mainDel as AccountStateHandler;
}
```

У першому методі метод `Combine` об'єднує делегати `_del` і `del` в один, який потім присвоюється змінної `del`. У другому методі метод `Remove` повертає делегат, зі списку викликів якого вилучено делегат `_del`. Тепер перейдемо до основної програми:
```cs
class Program {
    static void Main(string [] args) {
        Account account = new Account(200, 6);
        Account.AccountStateHandler colorDelegate = new Account.AccountStateHandler(Color_Message);

        // Додаємо в делегат посилання на методи
        account.RegisterHandler(new Account.AccountStateHandler(Show_Message)); account.RegisterHandler(colorDelegate);
        // Два рази поспіль намагаємося зняти гроші
        account.Withdraw(100);
        account.Withdraw(150);
        // Видаляємо делегат

        account.UnregisterHandler(colorDelegate);
        account.Withdraw(50);
        Console.ReadLine();
    }

    private static void Show_Message(String message) {
        Console.WriteLine(message);
    }
    
    private static void Color_Message(string message) {
        // Встановлюємо червоний колір символів
        Console.ForegroundColor = ConsoleColor.Red;
        Console.WriteLine(message);

        // Скидаємо настройки кольору
        Console.ResetColor();
    }
}
```

З метою тестування ми створили ще один метод - `Color_Message`, який виводить те ж саме повідомлення тільки червоним кольором. Для першого делегата створюється окрема змінна. Але великої різниці між передачею обох в методів `account.RegisterHandler` немає: просто в одному випадку ми відразу передаємо об'єкт, створюваний конструктором:
```cs
account.RegisterHandler(new Account.AccountStateHandler(Show_Message));
```

У другому випадку створюємо змінну і її вже передаємо в метод `account.RegisterHandler(colorDelegate)`.
В рядку `account.UnregisterHandler(colorDelegate);` цей метод видаляється зі списку делегата, тому цей метод більше не буде спрацьовувати.

Консольний застосунок буде мати наступну форму:
```
  >  Сума 150 знята з рахунку
  >  Сума 150 знята з рахунку
  >  Недостатньо грошей на рахунку
  >  Недостатньо грошей на рахунку
  >  Сума 50 знята з рахунку
```

Також ми можемо використовувати скорочену форму додавання та видалення делегатів. Для цього перепишемо методи `RegisterHandler` і `UnregisterHandler` наступним чином:
```cs
// Реєструємо делегат
public void RegisterHandler(AccountStateHandler _del) {
    del + = _del; // додаємо делегат
}

// Скасування реєстрації делегата
public void UnregisterHandler(AccountStateHandler _del) {
    del - = _del; // видаляємо делегат
}
```



### Події. Оголошення та застосування подій.
У минулій темі ми розглянули, як за допомогою делегатів можна створювати механізм зворотних викликів в програмі. Однак `C#` для тієї ж мети надає більш зручні і прості конструкції під назвою `події`, які сигналізують системі про те, що відбулося певна дію.
Події оголошуються в класі з допомогою ключового слова `event`, після якого йде назва делегата:
```cs
// Оголошуємо делегат
public delegate void AccountStateHandler(string message); // Подія, що виникає при виведенні грошей
public event AccountStateHandler Withdrowed;
```

Зв'язок з делегатом означає, що метод, який обробляє цю подію, повинен приймати ті ж параметри, що і делегат, і повертати той же тип, що і делегат.
Отже, подивимося на прикладі. Для цього візьмемо клас `Account` з минулого теми і змінимо його наступним чином:
```cs
class Account {
    // Оголошуємо делегат
    public delegate void AccountStateHandler(string message); // Подія, що виникає при виведенні грошей
    public event AccountStateHandler Withdrowed;
    // Подія, що виникає при додавання на рахунок
    public event AccountStateHandler Added;
    int _sum; // Змінна для зберігання суми
    int _percentage; // Змінна для зберігання відсотка

    public Account(int sum, int percentage) {
        _sum = sum;
        _percentage = percentage;
    }

    public int CurrentSum {
        get { return _sum; }
    }

    public void Put(int sum) {
        _sum + = sum;
        if (Added! = Null)
        Added( "На рахунок надійшло" + Sum);
    }

    public void Withdraw(int sum) {
        if (Sum <= _sum) {
            _sum - = sum;
            if (Withdrowed! = Null) {
                Withdrowed( "Сума" + Sum + "знята з рахунку"); }
            } else {
                if (Withdrowed! = Null) {
                    Withdrowed( "Недостатньо грошей на рахунку");
                }
            }
    }

    public int Percentage {
        get { return _percentage; }
    }
}
```

Тут ми визначили дві події: `Withdrowed` і `Added`. Обидві події оголошені як екземпляри делегата `AccountStateHandler`, тому для обробки цих подій буде потрібно метод, який приймає рядок в якості параметра.

Потім в методах `Put` і `Withdraw` ми викликаємо ці події. Перед викликом ми перевіряємо,чи закріплені за цими подіями обробники (`if (Withdrowed! = null)`).Такяк ці події представляють делегат `AccountStateHandler`, що приймає як параметр рядок, то і при виклику подій ми передаємо в них рядок.

Тепер використовуємо події в основній програмі:
```cs
class Program {
    static void Main(string [] args) {
        Account account = new Account(200, 6);
        
        // Додаємо обробники події
        account.Added + = Show_Message;
        account.Withdrowed + = Show_Message;
        account.Withdraw(100);
        
        // Видаляємо обробник події
        account.Withdrowed - = Show_Message;
        account.Withdraw(50);
        account.Put(150);
        Console.ReadLine();
    }

    private static void Show_Message(string message) {
        Console.WriteLine(message);
    }
}
```

Для прикріплення обробника події до певної події використовується операція `+=` і відповідно для відкріплення `-` операція `-=`: подія `+= метод_обрабобника_події`. Знову ж звертаю увагу, що метод обробника повинен мати такі ж параметри, як і делегат події, і повертати той же тип.
У підсумку ми отримаємо наступний консольний висновок:
```
  >  Сума 100 знята з рахунку
  >  На рахунок надійшло 150
```

Крім використаного вище способу прикріплення обробників є й інший з використанням делегата.
Але обидва способи будуть рівноцінні:
```cs
account.Added + = Show_Message;
account.Added + = new Account.AccountStateHandler(Show_Message);
```



### Клас даних події `AccountEventArgs`
Якщо раптом ви коли-небудь створювали графічні додатки з допомогою `Windows Forms` або `WPF`, то, ймовірно, стикалися з обробниками, які в якості параметра приймають аргумент типу `EventArgs`, Наприклад, обробник натискання кнопки `private void button1_Click(object sender, System.EventArgs e) {}`. Параметр, будучи об'єктом класу `EventArgs`, містить всі дані події. Додамо і в нашу програму подібний клас. Назвемо його `AccountEventArgs` і додамо в нього наступний код:
```cs
class AccountEventArgs {
    // Повідомлення
    public string message;

    // Сума, на яку змінився рахунок public int sum;
    public AccountEventArgs(string _mes, int _sum) {
        message = _mes;
        sum = _sum;
    }
}
```

Даний клас має два поля:
 1. message - для зберігання виведеного повідомлення
 2. sum - для зберігання суми, на яку змінився рахунок.

Тепер застосуємо клас `AccoutEventArgs`, змінивши клас `Account` наступним чином:
```cs
class Account {
    // Оголошуємо делегат
    // Подія, що виникає при виведенні грошей
    public delegate void AccountStateHandler(object sender, AccountEventArgs e);

    // Подія, що виникає при додаванні на рахунок
    public event AccountStateHandler Withdrowed;
    public event AccountStateHandler Added;

    int _sum; // Змінна для зберігання суми
    int _percentage; // Змінна для зберігання відсотка

    public Account(int sum, int percentage) {
        _sum = sum;
        _percentage = percentage;
    }

    public int CurrentSum {
        get { return _sum; }
    }

    public void Put(int sum) {
        _sum + = sum;
        if (Added! = Null) {
            Added(this, new AccountEventArgs( "На рахунок надійшло" + Sum, sum));
        }
    }

    public void Withdraw(int sum) {
        if (Sum <= _sum) {
            _sum - = sum;
            if (Withdrowed! = Null) {
                Withdrowed(this, new AccountEventArgs( "Сума" + Sum + "знята з рахунку", sum));
            }
        } else {
            if (Withdrowed! = Null) {
                Withdrowed(this, new AccountEventArgs( "Недостатньо грошей на рахунку", sum));
            }
        }
    }

    public int Percentage {
        get {return _percentage; }
    }
}
```

У порівнянні з попередньою версією класу `Account` тут змінилося тільки кількість параметрів у делегата і відповідно кількість параметрів при виклику події. Тепер вони також беруть об'єкт `AccountEventArgs`, який зберігає інформацію про подію, що отримується через конструктор.
Тепер змінимо основну програму:
```cs
class Program {
    static void Main(string [] args) {
        Account account = new Account(200, 6);
        
        // Додаємо обробники події
        account.Added + = Show_Message;
        account.Withdrowed + = Show_Message;
        account.Withdraw(100);
        
        // Видаляємо обробник події
        account.Withdrowed - = Show_Message;
        account.Withdraw(50);
        account.Put(150);
        Console.ReadLine();
    }
    
    private static void Show_Message(object sender, AccountEventArgs e) {
        Console.WriteLine( "Сума транзакції: {0}", e.sum);
        Console.WriteLine(e.message);
    }
}
```

У порівнянні з попереднім варіантом тут ми тільки змінюємо кількість параметрів і сутність їх використання в обробнику `Show_Message`.