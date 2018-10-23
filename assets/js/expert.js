function winOpen(){
var obj=document.getElementById("divWin").style;
obj.visibility="visible";
winOpen2(3, 0, obj);
 };
 
function winOpen2(s, o, obj){//показываем окно
o+=s;
if(o<100){
obj.opacity=o/100;
obj.filter='alpha(opacity='+o+')';
setTimeout(function(){winOpen2(s, o, obj);}, 55);}
else{//показать полностью
obj.opacity=1;
obj.filter='alpha(opacity=100)';};
 };
 
function winCloset(){
winCloset2(5, 100, document.getElementById("divWin").style);
window.location.reload("divWin");//оновлюємо експертну систему
  
}


function winCloset2(s, o, obj){//скрываем окно
o-=s;
if(o>0){
obj.opacity=o/100;
obj.filter='alpha(opacity='+o+')';
setTimeout(function(){winCloset2(s, o, obj);}, 5);}
else{//обнуляем на выходе
obj.opacity=0;
obj.filter='alpha(opacity=0)';
obj.visibility="hidden";};
 };

 var testSystem;

/**
 *Перевірка доступності localStorage
 * @returns {boolean} true - браузер підтримує LocalStorage
 */
function checkLocalStorage()
{
    try {
        return 'localStorage' in window && window['localStorage'] !== null && localStorage != undefined;
    } catch (e) {
        return false;
    }
}

/**
 *  Завантаження тестів (пунктів меню) існуючих в localStorage тестів
 */
function loadItemsFromLocalStorage()
{
    if (!checkLocalStorage())
    {
        return;
    }
    var template = '<div class="b-page-test-switch__item b-page border-radius" index="{1}">{0}</div>';
    var target = $(".b-page-test-switch");

    for (var i = 0; localStorage["ExpertSys" + i]; i++)
    {
        target.html(target.html() + template.replace("{1}","ExpertSys" + i).replace("{0}",JSON.parse(localStorage["ExpertSys" + i]).title));

    }
}

/**
*Завантаження тесту з localStorage
 * @param localStorageIndex – індекс тесту
 * @returns {Test} тест (база знань) для експертної системи

 */
function loadFromLocalStorage(localStorageIndex)
{
    return new Test(JSON.parse(localStorage[localStorageIndex]));
}

/**
 *Зберігання тесту (бази знань) в localStorage (при умові підтримки його браузером)
 * @param test – тест що зберігається (база знань)
 */
function saveToLocalStorage(test)
{
    if (!checkLocalStorage())
    {
        return;
    }
    for (var i = 0; localStorage[i]; i++)
    {
        if (localStorage["ExpertSys"+i].match(test.title))
        {
            localStorage.setItem("ExpertSys" + i,test.stringify());
            return;
        }
    }
    localStorage.setItem("ExpertSys" + i,test.stringify());
}

/**
 * Реакція натискання кнопки «далі», введення даних і перехід до наступного питання
 */
function step()
{
    var ans = parseFloat($("#current-answer").attr("value"));
    if (ans < 0 || ans > 100) {
        alert("Неверный ввод!");
        return;
    }
    testSystem.processAnswer(ans);
    testSystem.nextStep();
}

/**
 * Ініціалізація
 */
function init()
{
    loadItemsFromLocalStorage();
    /**
          * Вибір тесту. Його завантаження з localStorage, або парсинг з textarea
     */
    $("#start-test").bind("click keypress",function()
    {

        if ($(".b-page-test-switch__selected") && $(".b-page-test-switch__selected").length > 0)
        {
            testSystem = loadFromLocalStorage($(".b-page-test-switch__selected").attr("index"));
        }
        else
        {
            testSystem = new Test();
            if (!testSystem.parseData($("#test").val()))
            {
                alert("Ви зробили помилку. Перевірте данні що ввели, більш за все Ви десь забули відступити.")
                return;
            }
            saveToLocalStorage(testSystem);
        }

        $("#test").addClass("hide");
        $(".b-page-test").removeClass("hide");
        $(".b-page-main").add("#start-test,#data-format").addClass("hide");
        $("#test-title").html(testSystem.title);

        testSystem.nextStep();
    });

    /**
         * Enter == кнопка далі при введені імовірності
     */
    $("#current-answer").bind('keydown ',function(e)
    {
        if (e.keyCode == 13) step();
    });
    $("#complete-answer").bind("click keypress", step);

    /**
    * візуалізація вибору тесту
     */
    $(".b-page-test-switch__item").live("click keypress", function()
    {
        if ($(this).hasClass("b-page-test-switch__selected"))
        {
            $(this).removeClass("b-page-test-switch__selected");
            return;
        }
        $(".b-page-test-switch__selected").removeClass("b-page-test-switch__selected");
        $(this).addClass("b-page-test-switch__selected");
    });

    $("#data-format").bind("click keypress",function()
    {
        $("#test").val(
            
                "Вибір типу\n" +
                "\n" +
                "Команда від 1 до 5 розробників?\n"+//невелика команда (органічний)
                "Ваша команда постійно реалізовує подібні проекти?\n"+ //гарний досвід розробки подібних проектів(органічний)
                "Всі методи, функції розроблюваного продукту Вам відомі?\n"+ //жорсткі умови (органічний)
                "Постійна зарплата та умови праці?\n"+ //умови роботи стабільні (органічний)
                "Вам відомі лише деякі характеристики розроблюваного продкту?\n"+ //команда знайома лише з деякими характеристиками (або компонентами) створюваної системи (напівнезалежний)
                "Ваша команда кілька разів реалізовувала подібні проекти?\n"+ //команда має середній досвід роботи з подібними розробками (напівнезалежний)
                "Ви частково можете змінювати вимоги до розробки?\n"+ //Тільки частина вимог до виробу жорстко фіксується, в іншому розробки мають ступені вибору(напівнезалежний)
                "В розробці присутній елемент новизни?\n"+ //(напівнезалежний)
                "Вимоги до параметрів ЕОМ, розробки, інтерфейсів змінювати неможна?\n"+ //жорсткі вимоги на ПП, інтерфейси, параметри ЕОМ.(вбудований)
                "Ви володієте недостатньою кількістю інформації про розробку?\n"+ //планування робіт здійснюється при недостатній інформації, як про саму розробку, так і про умови роботи.(вбудований)
                "Розробка буде займати багато часу на зміни та виправлення?\n"+ //(вбудований)
                 "Команди працює над принципово новим проектом?\n"+ //висока ступінь новезни(вбудований)
                "\n"   +
                "Органічний\n" +
                "0.5 1) 0.9 0.01 2) 0.5 0.5 3) 0.7 0.3 4) 0.9 0.01\n" +
                "Напівнезалежний\n"+
                "0.5 1) 0.5 0.01 5) 0.7 0.3 6) 0.9 0.01 7) 0.8 0.01 8) 0.8 0.1\n" +
                "Вбудований\n" +
                "0.5 9) 0.9 0.1 10) 0.8 0.01 11) 0.9 0.01 12) 0.9 0.01" 
                              );


    })  ;
     $(".test2").bind("click keypress",function()
    {
        $("#test").val(
            
                "Розмір БД\n" +
                "\n" +
"БД будується на основі симантичної моделі виду: Студент-група-спеціальність?\n" +//низький, середній (така БД має мало таблиць та просту схему)
"Для роботи з розроблюваним проектом реєстрація непотрібна?\n" + //низький (якщо немає реєстрації БД непотрібна)
"Ви розроблюєте клієнт-серверний додаток?\n" + //середній, високий, дуже високий (створюється БД)
"Ви збираєтесь зберігати результати обчилень?\n" + //середній, високий, дуже високий (створюється БД)
"На кожній сторінці відбувається обробка інформації?\n" + //дуже високий
"Потрібно зберігати багато XML?\n" + //дуже високий
"Ви використовуте парсинг інформації?\n" + //дуже високий, високий, середній
"Вам потрібна статистика сайту?\n" + //середній, високий, дуже високий
"Ви плануєте використовувати кешування запитів?\n" +  //дуже вискоий (використовується для зберігання н.п. статтей які часто проглядаються щоб витягати одразу з бд звільняючи трохи сервер)
"Ви плануєте розробку статичної веб-сторінки?\n" + //низький 10
"Ви плануєте розробку сайту типу портфоліо або візитка?\n" + //низький
"Ваша розробка спрямована на вирішення однієї невеликої задачі?\n" + //низький
"Ви плануєте розробку інтернет магазину?\n" +  //високий, дуже високий 
 "\n" +
 "Низький\n" +
"0.4 1) 0.6 0.4 2) 0.95 0.05 10) 0.9 0.1 11) 0.9 0.1 12) 0.9 0.1 3) 0.2 0.8 4) 0.2 0.8 5) 0.1 0.9\n" +
"Середній\n" +
"0.4 1) 0.8 0.2 3) 0.7 0.3 4) 0.5 0.5 7) 0.5 0.5 10) 0.7 0.3 11) 0.3 0.7 12) 0.3 0.7 13) 0.2 0.8 5) 0.2 0.9\n" +
"Високий\n" +
"0.4 1) 0.2 0.8 3) 0.8 0.2 4) 0.8 0.2 5) 0.7 0.3 10) 0.2 0.8 11) 0.2 0.8 12) 0.2 0.8 13) 0.6 0.4\n" +
"Дуже високий\n" +
"0.3  1) 0.1 0.9 3) 0.9 0.1 4) 0.9 0.1 5) 0.9 0.1 6) 0.9 0.1 7) 0.9 0.1 8) 0.9 0.1 9) 0.9 0.1 10) 0.1 0.9 11) 0.1 0.9 12) 0.1 0.9 13) 0.9 0.1"
             );


    })  ;
      $(".test3").bind("click keypress",function()
    {
        $("#test").val(
            
                "Вибір мови програмування\n" +
                "\n" +
                "Ви бажаєте працювати з программи для операційної системи?\n" +
"Ви бажаєте писати драйвери пристроїв?\n" +
"Ви бажаєте писати корисні і цікаві програми для операційної системи?\n" +
"Ви бажаєте писати корисні програми для мобільних пристроїв?\n" +
"Ви бажаєте писати web-сайти і отримувати за це прибуток?\n" +
"Чи хотіли б Ви займатися системним програмуванням?\n" +
"Чи готові Ви вивчати стандартні бібліотеки для програмування?\n" +
"Чи готові Ви вивчати високорівневі мови програмування?\n" +
"Чи хотіли б Ви писати ігри, віконні програми, спеціалізовані редактори,  унікальні віджети тощо?\n" +
"Чи хотіли б Ви вивчати мову без якої важко уявити Інтернет?\n" + 
"Ви бажаєте вивчати мову яка не потребує багато зусиль?\n" +
"Ви хочете вивчати найвідомішу і сучаснішу мову програмування?\n" +
"Вам подобається 3D графіка?\n" +
"Ви в захваті від Інтернет ігор?\n" +
"Вам подобається користуватись програмами на Аndroid і ви хочете розроблювати власні?\n" +
"Ви б хотіли створювати Інтернет-блоги, інтернет-сайти чи магазини?\n" +
"Ви б хотіли далі працювати в галузі бізнесу?\n" +
"Ви б хотіли створювати програмне забезпечення для взаємодії з іншими комп'ютерами у мережі?\n" +
"Ви прагнете вже через 1-2 місяці вільно створювати власні програми?\n" +
"Ви прагнете бути досить цінним спеціалістом?\n" +
"Ви прагнете вивчати мову яка входить у 10 найкращих?\n" +
"Ви б хотіли писати невеликі програми що виконуються за запитом користувача?\n" +
"Ви б хотіли вивчати просту і популярну мову на ринку?\n" + 
"Ви б хотіли писати коди як легко читати?\n" +
"Ви б хотіли вивчати мову яку можуть вивчити навіть діти?\n" +
"Ви хочете вберегти нерви і час маючи досить велику бібліотеку?\n" +
"Ви хотіли б вивчати мову яка дітям буде даватися трохи складніше?\n" +
"Ви вже не новачок у програмуванні?\n" +
"Ви б хотіли вивчити універсальну мову програмування?\n" +
"Ви б хотіли вивчати мінімалістичну мову програмування?\n" + 
                "\n"   +
                "Java\n" +
"0.463 3) 0.9 0.01 4) 1 0 8) 1 0 9) 1 0 10) 0.9 0.01 11) 0.3 0.7 12) 1 0 13) 0.9 0.1 15) 1 0 17) 1 0 18) 0.9 0.01 21) 1 0 27) 1 0 28) 1 0\n" +
"Python\n" +
"0.333 3) 0.8 0.01 11) 0.2 0.8 16) 1 0 18) 1 0 20) 1 0 21) 1 0 23) 1 0 24) 1 0 25) 1 0 26) 1 0 28) 1 0\n" +
"PHP\n" +
"0.35 5) 1 0 10) 1 0 11) 1 0 12) 0.9 0.01 19) 1 0 20) 0.9 0.01 21) 1 0 22) 1 0 24) 0.9 1 26) 0.8 1, 28) 1 0\n" +
"C\n" +
"0.276 1) 0.9 0.01 2) 0.8 0.01 6) 0.9 0.01 7) 0.8 0.01 9) 1 0 14) 0.1 0.01 20) 0.8 0.2 21) 1 0 28) 0 1 29) 1 0 30) 1 0\n" +
"С++\n" +
"0.393 1) 1 0.01 2) 0.9 0.01 5) 1 0 6) 1 0.01 7) 1 0 8) 1 0 9) 1 0 12) 1 0.01 13) 1 0 14) 0.9 0.1 15) 0.9 0.01 18) 1 0.01 21) 1 0 28) 0 1"

              );


    })  ;
}

window.onload = init;

/**
  *  Сортування ймовірностей. Порівняння двох items
 * @returns {number} порівняння
 */
function sortItems(a,b)
{
    if (a.points > b.points || (a.points == b.points && a.title > b.title)) return 1;
    if (a.points == b.points && a.title == b.title) return 0;
    return -1;
}


/**
 * порівняння двох об’єктів - питань
 */
function sortQuestion(a,b)
{

    var aPoints = 0, bPoints = 0;
    for (var i = 0; i < a.items.length; i++)
    {

        aPoints += a.items[i].questionPoints[a.index].min + a.items[i].questionPoints[a.index].max + a.items[i].points;
    }
    for (var i = 0; i < b.items.length; i++)
    {
        bPoints += b.items[i].questionPoints[b.index].min + b.items[i].questionPoints[b.index].max + b.items[i].points;
    }

    if (aPoints > bPoints) return -1;
    if (aPoints == bPoints)
    {
        if (a.items.length > b.items.length) return -1;
        if (a.items.length == b.items.length) return 0;
    }
    return 1;
}

/**
  * База знань або тест
 * @param testObject - конструктор з вже введеними назвами, варіантів і питань

 */
function Test(testObject)
{

    this.title = "";
    this.items = [];
    this.questions = [];
    this.currentQuestion = -1;
    this.complete = false;
    if (testObject)
    {
        this.title = testObject.title;
        this.items = testObject.items;
        this.questions = testObject.questions;
    }
}

/**
  * серіалізація в рядок, формату JSON
 * @returns {String} JSON	
 */
Test.prototype.stringify = function()
{
    return JSON.stringify({
        title       : this.title,
        items       : this.items,
        questions   : this.questions
    });
}

/**
 * Вивід "ймовірностей" відповідей по заданому шаблону
 */
Test.prototype.printData = function()
{
    this.items.sort(sortItems);
    var template = '<div title="{0}: {1}" class="b-page-test-items__item border-radius"><span class="b-page-test-items__item-title">{0}</span><span class="b-page-test-items__item-percent">{1}</span></div>';
    var t = $(".b-page-test-items");
    t.html("");
    for (var i = this.items.length-1; i >= 0; i--)
    { 
        var res = this.items[i].points > 1? 1 : this.items[i].points;
        t.html(t.html() + template.replace("{0}",this.items[i].title).replace("{0}",this.items[i].title).replace("{1}",res).replace("{1}",res));
        if (res == 1)
        {
            this.complete = true;
        }
    }
}

/**
 * перехід до наступного питання
 */
Test.prototype.nextStep = function()
{

    this.printData();
    this.questions.sort(sortQuestion);
    if (this.questions.length == 0 || this.complete)
    {
        $("#current-question").html("Ознайомтесь з результатами системи. Питання закінчені.");
        $("#complete-answer").add("#current-answer").addClass("hide");
        return;
    }
    $("#current-question").html(this.questions[0].q);
    $("#current-answer").attr("value",'');
};

/**
  * обработка відповіді. Зміна ймовірності події по відповіді
 * @param ans  - відповідь (ймовірність, от 0 до 100)

 */
Test.prototype.processAnswer = function(ans)
{
    for (var i = 0 ; i < this.items.length; i++)
    {
        var point = this.items[i].questionPoints[this.questions[0].index];
        if (point)
        {
            var up = ((2*point.max - 1)*ans/100 + 1 - point.max) * this.items[i].points;
            var down = ((2*point.max - 1)*ans/100 + 1 - point.max) * this.items[i].points + ((2*point.min - 1)*ans/100 + 1 - point.min)*(1 - this.items[i].points);
            this.items[i].points = down != 0? up/down : this.items[i].points;
        }
    }
    var template = '<div class="b-page-questions__answers-item">{0}</div>'
    $("#answers").html($("#answers").html() + template.replace("{0}", this.questions[0].q))
    this.questions.shift();
}

/**
  * Отримання питань, подій і ймовірностей з рядку
 * @param data - рядок, що містить дані
 * @returns {boolean} успіх обробки рядку

 */
Test.prototype.parseData = function(data)
{
    try
    {
        //Пропуск зайвих порожніх рядків
        var passEmptyStrings = function() {
            while (position < items.length && items[position] == "" ) { position++; }
        }

        var items = data.split("\n");
        var position = 0;
        passEmptyStrings();
        this.title = items[position++];
        passEmptyStrings();
        //Введення питань
        while (items.length > position && items[position] != "")
        {
            this.questions.push({
                q    :items[position++],
                items: [],
                index:this.questions.length
            });
        }
        if (items.length <= position) throw "Invalid data format";

        passEmptyStrings();

        var index = 0;
        //Введення подій
        while (items.length > position && items[position] != "")
        {
            var  pointItems = items[position + 1].split(" ");
            var newItem = {
                title          : items[position],
                points         : parseFloat(pointItems[0]),
                index          : index,
                questionPoints : []
            };
         //Ймовірності подій при 100 і 0% ймовірності відповіді на питання
            for (var i = 1; i < pointItems.length; i+= 3)
            {
                while (pointItems[i] == "") i++;
                var questionIndex = parseFloat(pointItems[i]) - 1;
                var questionPoint = {
                    max : parseFloat(pointItems[i+1]),
                    min : parseFloat(pointItems[i+2])
                };
                newItem.questionPoints[questionIndex] = questionPoint;

                this.questions[questionIndex].items.push(newItem);


            }

            this.items.push(newItem);
            index++;
            position += 2;
        }
        return true;
    }
    catch(e)
    {
        console.log(e);
        return false;
    }
}

