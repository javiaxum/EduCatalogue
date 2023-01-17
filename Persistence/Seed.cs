using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            // Seed states with cities
            if (!context.States.Any())
            {
                var states = new List<Region>
                {
                    new Region
                    {
                        Name = "м. Севастополь",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Севастополь"
                            },
                            new City
                            {
                                Name = "Інкерман"
                            },
                        },
                    },
                    new Region
                    {
                        Name = "АР Крим",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Алупка"
                            },
                            new City
                            {
                                Name = "Алушта"
                            },
                            new City
                            {
                                Name = "Армянськ"
                            },
                            new City
                            {
                                Name = "Бахчисарай"
                            },
                            new City
                            {
                                Name = "Білогірськ"
                            },
                            new City
                            {
                                Name = "Джанкой"
                            },
                            new City
                            {
                                Name = "Євпаторія"
                            },
                            new City
                            {
                                Name = "Керч"
                            },
                            new City
                            {
                                Name = "Красноперекопськ(Яни Капу)"
                            },
                            new City
                            {
                                Name = "Саки"
                            },
                            new City
                            {
                                Name = "Сімферополь"
                            },
                            new City
                            {
                                Name = "Старий Крим"
                            },
                            new City
                            {
                                Name = "Судак"
                            },
                            new City
                            {
                                Name = "Феодосія"
                            },
                            new City
                            {
                                Name = "Щолкіне"
                            },
                            new City
                            {
                                Name = "Ялта"
                            },
                        }
                    },
                    new Region
                    {
                        Name = "Вінницька",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Бар"
                            },
                            new City
                            {
                                Name = "Бершадь"
                            },
                            new City
                            {
                                Name = "Вінниця"
                            },
                            new City
                            {
                                Name = "Гайсин"
                            },
                            new City
                            {
                                Name = "Гнівань"
                            },
                            new City
                            {
                                Name = "Жмеринка"
                            },
                            new City
                            {
                                Name = "Іллінці"
                            },
                            new City
                            {
                                Name = "Калинівка"
                            },
                            new City
                            {
                                Name = "Козятин"
                            },
                            new City
                            {
                                Name = "Ладижин"
                            },
                            new City
                            {
                                Name = "Липовець"
                            },
                            new City
                            {
                                Name = "Могилів-Подільський"
                            },
                            new City
                            {
                                Name = "Немирів"
                            },
                            new City
                            {
                                Name = "Погребище"
                            },
                            new City
                            {
                                Name = "Тульчин"
                            },
                            new City
                            {
                                Name = "Хмільник"
                            },
                            new City
                            {
                                Name = "Шаргород"
                            },
                            new City
                            {
                                Name = "Ямпіль"
                            },
                        }
                    },
                    new Region
                    {
                        Name = "Волинська",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Берестечко"
                            },
                            new City
                            {
                                Name = "Володимир"
                            },
                            new City
                            {
                                Name = "Горохів"
                            },
                            new City
                            {
                                Name = "Камінь-Каширський"
                            },
                            new City
                            {
                                Name = "Ківерці"
                            },
                            new City
                            {
                                Name = "Ковель"
                            },
                            new City
                            {
                                Name = "Луцьк"
                            },
                            new City
                            {
                                Name = "Любомль"
                            },
                            new City
                            {
                                Name = "Нововолинськ"
                            },
                            new City
                            {
                                Name = "Рожище"
                            },
                            new City
                            {
                                Name = "Устилуг"
                            },
                        }
                    },
                    new Region
                    {
                        Name = "Дніпропетровська",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Апостолове"
                            },
                            new City
                            {
                                Name = "Верхівцеве"
                            },
                            new City
                            {
                                Name = "Верхньодніпровськ"
                            },
                            new City
                            {
                                Name = "Вільногірськ"
                            },
                            new City
                            {
                                Name = "Дніпро"
                            },
                            new City
                            {
                                Name = "Жовті Води"
                            },
                            new City
                            {
                                Name = "Зеленодольськ"
                            },
                            new City
                            {
                                Name = "Кам'янське"
                            },
                            new City
                            {
                                Name = "Кривий Ріг"
                            },
                            new City
                            {
                                Name = "Марганець"
                            },
                            new City
                            {
                                Name = "Нікополь"
                            },
                            new City
                            {
                                Name = "Новомосковськ"
                            },
                            new City
                            {
                                Name = "Павлоград"
                            },
                            new City
                            {
                                Name = "Перещепине"
                            },
                            new City
                            {
                                Name = "Першотравенськ"
                            },
                            new City
                            {
                                Name = "Підгородне"
                            },
                            new City
                            {
                                Name = "Покров"
                            },
                            new City
                            {
                                Name = "П'ятихатки"
                            },
                            new City
                            {
                                Name = "Синельникове"
                            },
                            new City
                            {
                                Name = "Тернівка"
                            },
                        }
                    },
                    new Region
                    {
                        Name = "Донецька",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Авдіївка"
                            },
                            new City
                            {
                                Name = "Амвросіївка"
                            },
                            new City
                            {
                                Name = "Бахмут"
                            },
                            new City
                            {
                                Name = "Білицьке"
                            },
                            new City
                            {
                                Name = "Білозерське"
                            },
                            new City
                            {
                                Name = "Бунге"
                            },
                            new City
                            {
                                Name = "Волноваха"
                            },
                            new City
                            {
                                Name = "Вуглегірськ"
                            },
                            new City
                            {
                                Name = "Вугледар"
                            },
                            new City
                            {
                                Name = "Гірник"
                            },
                            new City
                            {
                                Name = "Горлівка"
                            },
                            new City
                            {
                                Name = "Дебальцеве"
                            },
                            new City
                            {
                                Name = "Добропілля"
                            },
                            new City
                            {
                                Name = "Докучаєвськ"
                            },
                            new City
                            {
                                Name = "Донецьк"
                            },
                            new City
                            {
                                Name = "Дружківка"
                            },
                            new City
                            {
                                Name = "Єнакієве"
                            },
                            new City
                            {
                                Name = "Жданівка"
                            },
                            new City
                            {
                                Name = "Залізне"
                            },
                            new City
                            {
                                Name = "Зугрес"
                            },
                            new City
                            {
                                Name = "Іловайськ"
                            },
                            new City
                            {
                                Name = "Кальміуське"
                            },
                            new City
                            {
                                Name = "Костянтинівка"
                            },
                            new City
                            {
                                Name = "Краматорськ"
                            },
                            new City
                            {
                                Name = "Красногорівка"
                            },
                            new City
                            {
                                Name = "Курахове"
                            },
                            new City
                            {
                                Name = "Лиман"
                            },
                            new City
                            {
                                Name = "Макіївка"
                            },
                            new City
                            {
                                Name = "Маріуполь"
                            },
                            new City
                            {
                                Name = "Мар'їнка"
                            },
                            new City
                            {
                                Name = "Миколаївка"
                            },
                            new City
                            {
                                Name = "Мирноград"
                            },
                            new City
                            {
                                Name = "Моспине"
                            },
                            new City
                            {
                                Name = "Новоазовськ"
                            },
                            new City
                            {
                                Name = "Новогродівка"
                            },
                            new City
                            {
                                Name = "Покровськ"
                            },
                            new City
                            {
                                Name = "Родинське"
                            },
                            new City
                            {
                                Name = "Світлодарськ"
                            },
                            new City
                            {
                                Name = "Святогірськ"
                            },
                            new City
                            {
                                Name = "Селидове"
                            },
                            new City
                            {
                                Name = "Сіверськ"
                            },
                            new City
                            {
                                Name = "Слов'янськ"
                            },
                            new City
                            {
                                Name = "Сніжне"
                            },
                            new City
                            {
                                Name = "Соледар"
                            },
                            new City
                            {
                                Name = "Торецьк"
                            },
                            new City
                            {
                                Name = "Українськ"
                            },
                            new City
                            {
                                Name = "Харцизьк"
                            },
                            new City
                            {
                                Name = "Хрестівка"
                            },
                            new City
                            {
                                Name = "Часів Яр"
                            },
                            new City
                            {
                                Name = "Чистякове"
                            },
                            new City
                            {
                                Name = "Шахтарськ"
                            },
                            new City
                            {
                                Name = "Ясинувата"
                            },
                        }
                    },
                    new Region
                    {
                        Name = "Житомирська",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Андрушівка"
                            },
                            new City
                            {
                                Name = "Баранівка"
                            },
                            new City
                            {
                                Name = "Бердичів"
                            },
                            new City
                            {
                                Name = "Житомир"
                            },
                            new City
                            {
                                Name = "Звягель"
                            },
                            new City
                            {
                                Name = "Коростень"
                            },
                            new City
                            {
                                Name = "Коростишів"
                            },
                            new City
                            {
                                Name = "Малин"
                            },
                            new City
                            {
                                Name = "Овруч"
                            },
                            new City
                            {
                                Name = "Олевськ"
                            },
                            new City
                            {
                                Name = "Радомишль"
                            },
                            new City
                            {
                                Name = "Чуднів"
                            },
                        }
                    },
                    new Region
                    {
                        Name = "Закарпатська",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Берегове"
                            },
                            new City
                            {
                                Name = "Виноградів"
                            },
                            new City
                            {
                                Name = "Іршава"
                            },
                            new City
                            {
                                Name = "Мукачево"
                            },
                            new City
                            {
                                Name = "Перечин"
                            },
                            new City
                            {
                                Name = "Рахів"
                            },
                            new City
                            {
                                Name = "Свалява"
                            },
                            new City
                            {
                                Name = "Тячів"
                            },
                            new City
                            {
                                Name = "Ужгород"
                            },
                            new City
                            {
                                Name = "Хуст"
                            },
                            new City
                            {
                                Name = "Чоп"
                            },
                        }
                    },
                    new Region
                    {
                        Name = "Запорізька",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Бердянськ"
                            },
                            new City
                            {
                                Name = "Василівка"
                            },
                            new City
                            {
                                Name = "Вільнянськ"
                            },
                            new City
                            {
                                Name = "Гуляйполе"
                            },
                            new City
                            {
                                Name = "Дніпрорудне"
                            },
                            new City
                            {
                                Name = "Енергодар"
                            },
                            new City
                            {
                                Name = "Запоріжжя"
                            },
                            new City
                            {
                                Name = "Кам'янка-Дніпровська"
                            },
                            new City
                            {
                                Name = "Мелітополь"
                            },
                            new City
                            {
                                Name = "Молочанськ"
                            },
                            new City
                            {
                                Name = "Оріхів"
                            },
                            new City
                            {
                                Name = "Оріхів"
                            },
                            new City
                            {
                                Name = "Пологи"
                            },
                            new City
                            {
                                Name = "Приморськ"
                            },
                            new City
                            {
                                Name = "Токмак"
                            },
                        }
                    },
                    new Region
                    {
                        Name = "Івано-Франківська",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Болехів"
                            },
                            new City
                            {
                                Name = "Бурштин"
                            },
                            new City
                            {
                                Name = "Галич"
                            },
                            new City
                            {
                                Name = "Городенка"
                            },
                            new City
                            {
                                Name = "Долина"
                            },
                            new City
                            {
                                Name = "Івано-Франківськ"
                            },
                            new City
                            {
                                Name = "Калуш"
                            },
                            new City
                            {
                                Name = "Коломия"
                            },
                            new City
                            {
                                Name = "Косів"
                            },
                            new City
                            {
                                Name = "Надвірна"
                            },
                            new City
                            {
                                Name = "Рогатин"
                            },
                            new City
                            {
                                Name = "Снятин"
                            },
                            new City
                            {
                                Name = "Тисмениця"
                            },
                            new City
                            {
                                Name = "Тлумач"
                            },
                            new City
                            {
                                Name = "Яремче"
                            },
                        }
                    },
                    new Region
                    {
                        Name = "Київська",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Березань"
                            },
                            new City
                            {
                                Name = "Біла Церква"
                            },
                            new City
                            {
                                Name = "Богуслав"
                            },
                            new City
                            {
                                Name = "Бориспіль"
                            },
                            new City
                            {
                                Name = "Боярка"
                            },
                            new City
                            {
                                Name = "Бровари"
                            },
                            new City
                            {
                                Name = "Буча"
                            },
                            new City
                            {
                                Name = "Васильків"
                            },
                            new City
                            {
                                Name = "Вишгород"
                            },
                            new City
                            {
                                Name = "Вишневе"
                            },
                            new City
                            {
                                Name = "Ірпінь"
                            },
                            new City
                            {
                                Name = "Кагарлик"
                            },
                            new City
                            {
                                Name = "Миронівка"
                            },
                            new City
                            {
                                Name = "Обухів"
                            },
                            new City
                            {
                                Name = "Переяслав"
                            },
                            new City
                            {
                                Name = "Прип'ять"
                            },
                            new City
                            {
                                Name = "Ржищів"
                            },
                            new City
                            {
                                Name = "Сквира"
                            },
                            new City
                            {
                                Name = "Славутич"
                            },
                            new City
                            {
                                Name = "Тараща"
                            },
                            new City
                            {
                                Name = "Тетіїв"
                            },
                            new City
                            {
                                Name = "Узин"
                            },
                            new City
                            {
                                Name = "Українка"
                            },
                            new City
                            {
                                Name = "Фастів"
                            },
                            new City
                            {
                                Name = "Чорнобиль"
                            },
                            new City
                            {
                                Name = "Яготин"
                            },
                        }
                    },
                    new Region
                    {
                        Name = "Кіровоградська",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Благовіщенське"
                            },
                            new City
                            {
                                Name = "Бобринець"
                            },
                            new City
                            {
                                Name = "Гайворон"
                            },
                            new City
                            {
                                Name = "Долинська"
                            },
                            new City
                            {
                                Name = "Знам'янка"
                            },
                            new City
                            {
                                Name = "Кропивницький"
                            },
                            new City
                            {
                                Name = "Мала Виска"
                            },
                            new City
                            {
                                Name = "Новомиргород"
                            },
                            new City
                            {
                                Name = "Новоукраїнка"
                            },
                            new City
                            {
                                Name = "Олександрія"
                            },
                            new City
                            {
                                Name = "Помічна"
                            },
                            new City
                            {
                                Name = "Світловодськ"
                            },
                        }
                    },
                    new Region
                    {
                        Name = "Луганська",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Алмазна"
                            },
                            new City
                            {
                                Name = "Алчевськ"
                            },
                            new City
                            {
                                Name = "Антрацит"
                            },
                            new City
                            {
                                Name = "Боково-Хрустальне"
                            },
                            new City
                            {
                                Name = "Брянка"
                            },
                            new City
                            {
                                Name = "Вознесенівка"
                            },
                            new City
                            {
                                Name = "Гірське"
                            },
                            new City
                            {
                                Name = "Голубівка"
                            },
                            new City
                            {
                                Name = "Довжанськ"
                            },
                            new City
                            {
                                Name = "Зимогір'я"
                            },
                            new City
                            {
                                Name = "Золоте"
                            },
                            new City
                            {
                                Name = "Зоринськ"
                            },
                            new City
                            {
                                Name = "Ірміно"
                            },
                            new City
                            {
                                Name = "Кадіївка"
                            },
                            new City
                            {
                                Name = "Кипуче"
                            },
                            new City
                            {
                                Name = "Кремінна"
                            },
                            new City
                            {
                                Name = "Лисичанськ"
                            },
                            new City
                            {
                                Name = "Луганськ"
                            },
                            new City
                            {
                                Name = "Лутугине"
                            },
                            new City
                            {
                                Name = "Міусинськ"
                            },
                            new City
                            {
                                Name = "Молодогвардійськ"
                            },
                            new City
                            {
                                Name = "Новодружеськ"
                            },
                            new City
                            {
                                Name = "Олександрівськ"
                            },
                            new City
                            {
                                Name = "Первомайськ"
                            },
                            new City
                            {
                                Name = "Перевальськ"
                            },
                            new City
                            {
                                Name = "Петрово-Красносілля"
                            },
                            new City
                            {
                                Name = "Попасна"
                            },
                            new City
                            {
                                Name = "Привілля"
                            },
                            new City
                            {
                                Name = "Ровеньки"
                            },
                            new City
                            {
                                Name = "Рубіжне"
                            },
                            new City
                            {
                                Name = "Сватове"
                            },
                            new City
                            {
                                Name = "Сєвєродонецьк"
                            },
                            new City
                            {
                                Name = "Сорокине"
                            },
                            new City
                            {
                                Name = "Старобільськ"
                            },
                            new City
                            {
                                Name = "Суходільськ"
                            },
                            new City
                            {
                                Name = "Хрустальний"
                            },
                            new City
                            {
                                Name = "Щастя"
                            },
                        }
                    },
                    new Region
                    {
                        Name = "Львівська",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Белз"
                            },
                            new City
                            {
                                Name = "Бібрка"
                            },
                            new City
                            {
                                Name = "Борислав"
                            },
                            new City
                            {
                                Name = "Броди"
                            },
                            new City
                            {
                                Name = "Буськ"
                            },
                            new City
                            {
                                Name = "Великі Мости "
                            },
                            new City
                            {
                                Name = "Винники"
                            },
                            new City
                            {
                                Name = "Глиняни"
                            },
                            new City
                            {
                                Name = "Городок"
                            },
                            new City
                            {
                                Name = "Добромиль"
                            },
                            new City
                            {
                                Name = "Дрогобич"
                            },
                            new City
                            {
                                Name = "Дубляни"
                            },
                            new City
                            {
                                Name = "Жидачів"
                            },
                            new City
                            {
                                Name = "Жовква"
                            },
                            new City
                            {
                                Name = "Золочів"
                            },
                            new City
                            {
                                Name = "Кам'янка-Бузька"
                            },
                            new City
                            {
                                Name = "Комарно"
                            },
                            new City
                            {
                                Name = "Львів"
                            },
                            new City
                            {
                                Name = "Миколаїв"
                            },
                            new City
                            {
                                Name = "Моршин"
                            },
                            new City
                            {
                                Name = "Мостиська"
                            },
                            new City
                            {
                                Name = "Новий Калинів"
                            },
                            new City
                            {
                                Name = "Новий Розділ"
                            },
                            new City
                            {
                                Name = "Новояворівськ"
                            },
                            new City
                            {
                                Name = "Перемишляни"
                            },
                            new City
                            {
                                Name = "Пустомити"
                            },
                            new City
                            {
                                Name = "Рава-Руська"
                            },
                            new City
                            {
                                Name = "Радехів"
                            },
                            new City
                            {
                                Name = "Рудки"
                            },
                            new City
                            {
                                Name = "Самбір"
                            },
                            new City
                            {
                                Name = "Сколе"
                            },
                            new City
                            {
                                Name = "Сокаль"
                            },
                            new City
                            {
                                Name = "Соснівка"
                            },
                            new City
                            {
                                Name = "Старий Самбір"
                            },
                            new City
                            {
                                Name = "Стебник"
                            },
                            new City
                            {
                                Name = "Стрий"
                            },
                            new City
                            {
                                Name = "Судова Вишня"
                            },
                            new City
                            {
                                Name = "Трускавець"
                            },
                            new City
                            {
                                Name = "Турка"
                            },
                            new City
                            {
                                Name = "Угнів"
                            },
                            new City
                            {
                                Name = "Хирів"
                            },
                            new City
                            {
                                Name = "Ходорів"
                            },
                            new City
                            {
                                Name = "Червоноград"
                            },
                            new City
                            {
                                Name = "Яворів"
                            },
                        }
                    },
                    new Region
                    {
                        Name = "Миколаївська",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Баштанка"
                            },
                            new City
                            {
                                Name = "Вознесенськ"
                            },
                            new City
                            {
                                Name = "Миколаїв"
                            },
                            new City
                            {
                                Name = "Нова Одеса"
                            },
                            new City
                            {
                                Name = "Новий Буг"
                            },
                            new City
                            {
                                Name = "Очаків"
                            },
                            new City
                            {
                                Name = "Первомайськ"
                            },
                            new City
                            {
                                Name = "Снігурівка"
                            },
                            new City
                            {
                                Name = "Южноукраїнськ"
                            },
                        }
                    },
                    new Region
                    {
                        Name = "Одеська",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Ананьїв"
                            },
                            new City
                            {
                                Name = "Арциз"
                            },
                            new City
                            {
                                Name = "Балта"
                            },
                            new City
                            {
                                Name = "Березівка"
                            },
                            new City
                            {
                                Name = "Білгород-Дністровський "
                            },
                            new City
                            {
                                Name = "Біляївка"
                            },
                            new City
                            {
                                Name = "Болград"
                            },
                            new City
                            {
                                Name = "Вилкове"
                            },
                            new City
                            {
                                Name = "Ізмаїл"
                            },
                            new City
                            {
                                Name = "Кілія"
                            },
                            new City
                            {
                                Name = "Кодима"
                            },
                            new City
                            {
                                Name = "Одеса"
                            },
                            new City
                            {
                                Name = "Подільськ"
                            },
                            new City
                            {
                                Name = "Рені"
                            },
                            new City
                            {
                                Name = "Роздільна"
                            },
                            new City
                            {
                                Name = "Татарбунари"
                            },
                            new City
                            {
                                Name = "Теплодар"
                            },
                            new City
                            {
                                Name = "Чорноморськ"
                            },
                            new City
                            {
                                Name = "Южне"
                            },
                        }
                    },
                    new Region
                    {
                        Name = "Полтавська",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Гадяч"
                            },
                            new City
                            {
                                Name = "Глобине"
                            },
                            new City
                            {
                                Name = "Горішні Плавні"
                            },
                            new City
                            {
                                Name = "Гребінка"
                            },
                            new City
                            {
                                Name = "Заводське"
                            },
                            new City
                            {
                                Name = "Зіньків"
                            },
                            new City
                            {
                                Name = "Карлівка"
                            },
                            new City
                            {
                                Name = "Кобеляки"
                            },
                            new City
                            {
                                Name = "Кременчук"
                            },
                            new City
                            {
                                Name = "Лохвиця"
                            },
                            new City
                            {
                                Name = "Лубни"
                            },
                            new City
                            {
                                Name = "Миргород"
                            },
                            new City
                            {
                                Name = "Пирятин"
                            },
                            new City
                            {
                                Name = "Полтава"
                            },
                            new City
                            {
                                Name = "Решетилівка"
                            },
                            new City
                            {
                                Name = "Хорол"
                            }
                        }
                    },
                    new Region
                    {
                        Name = "Рівненська",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Березне"
                            },
                            new City
                            {
                                Name = "Вараш"
                            },
                            new City
                            {
                                Name = "Дубно"
                            },
                            new City
                            {
                                Name = "Дубровиця"
                            },
                            new City
                            {
                                Name = "Здолбунів"
                            },
                            new City
                            {
                                Name = "Корець"
                            },
                            new City
                            {
                                Name = "Костопіль"
                            },
                            new City
                            {
                                Name = "Острог"
                            },
                            new City
                            {
                                Name = "Радивилів"
                            },
                            new City
                            {
                                Name = "Рівне"
                            },
                            new City
                            {
                                Name = "Сарни"
                            },
                        }
                    },
                    new Region
                    {
                        Name = "Сумська",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Білопілля"
                            },
                            new City
                            {
                                Name = "Буринь"
                            },
                            new City
                            {
                                Name = "Ворожба"
                            },
                            new City
                            {
                                Name = "Глухів"
                            },
                            new City
                            {
                                Name = "Дружба"
                            },
                            new City
                            {
                                Name = "Конотоп"
                            },
                            new City
                            {
                                Name = "Кролевець"
                            },
                            new City
                            {
                                Name = "Лебедин"
                            },
                            new City
                            {
                                Name = "Охтирка"
                            },
                            new City
                            {
                                Name = "Путивль"
                            },
                            new City
                            {
                                Name = "Ромни"
                            },
                            new City
                            {
                                Name = "Середина-Буда"
                            },
                            new City
                            {
                                Name = "Суми"
                            },
                            new City
                            {
                                Name = "Тростянець"
                            },
                            new City
                            {
                                Name = "Шостка"
                            },
                        }
                    },
                    new Region
                    {
                        Name = "Тернопільська",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Бережани"
                            },
                            new City
                            {
                                Name = "Борщів"
                            },
                            new City
                            {
                                Name = "Бучач"
                            },
                            new City
                            {
                                Name = "Заліщики"
                            },
                            new City
                            {
                                Name = "Збараж"
                            },
                            new City
                            {
                                Name = "Зборів"
                            },
                            new City
                            {
                                Name = "Копичинці"
                            },
                            new City
                            {
                                Name = "Кременець"
                            },
                            new City
                            {
                                Name = "Ланівці"
                            },
                            new City
                            {
                                Name = "Монастириська"
                            },
                            new City
                            {
                                Name = "Підгайці"
                            },
                            new City
                            {
                                Name = "Почаїв"
                            },
                            new City
                            {
                                Name = "Скалат"
                            },
                            new City
                            {
                                Name = "Теребовля"
                            },
                            new City
                            {
                                Name = "Тернопіль"
                            },
                            new City
                            {
                                Name = "Хоростків"
                            },
                            new City
                            {
                                Name = "Чортків"
                            },
                            new City
                            {
                                Name = "Шумськ"
                            },
                        }
                    },
                    new Region
                    {
                        Name = "Харківська",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Балаклія"
                            },
                            new City
                            {
                                Name = "Барвінкове"
                            },
                            new City
                            {
                                Name = "Богодухів"
                            },
                            new City
                            {
                                Name = "Валки"
                            },
                            new City
                            {
                                Name = "Вовчанськ"
                            },
                            new City
                            {
                                Name = "Дергачі"
                            },
                            new City
                            {
                                Name = "Зміїв"
                            },
                            new City
                            {
                                Name = "Ізюм"
                            },
                            new City
                            {
                                Name = "Красноград"
                            },
                            new City
                            {
                                Name = "Куп'янськ"
                            },
                            new City
                            {
                                Name = "Лозова"
                            },
                            new City
                            {
                                Name = "Люботин"
                            },
                            new City
                            {
                                Name = "Мерефа"
                            },
                            new City
                            {
                                Name = "Первомайський"
                            },
                            new City
                            {
                                Name = "Південне"
                            },
                            new City
                            {
                                Name = "Харків"
                            },
                            new City
                            {
                                Name = "Чугуїв"
                            },
                        }
                    },
                    new Region
                    {
                        Name = "Херсонська",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Берислав"
                            },
                            new City
                            {
                                Name = "Генічеськ"
                            },
                            new City
                            {
                                Name = "Гола Пристань"
                            },
                            new City
                            {
                                Name = "Каховка"
                            },
                            new City
                            {
                                Name = "Нова Каховка"
                            },
                            new City
                            {
                                Name = "Олешки"
                            },
                            new City
                            {
                                Name = "Скадовськ"
                            },
                            new City
                            {
                                Name = "Таврійськ"
                            },
                            new City
                            {
                                Name = "Херсон"
                            },
                        }
                    },
                    new Region
                    {
                        Name = "Хмельницька",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Волочиськ"
                            },
                            new City
                            {
                                Name = "Городок"
                            },
                            new City
                            {
                                Name = "Деражня"
                            },
                            new City
                            {
                                Name = "Дунаївці"
                            },
                            new City
                            {
                                Name = "Ізяслав"
                            },
                            new City
                            {
                                Name = "Кам'янець-Подільський"
                            },
                            new City
                            {
                                Name = "Красилів"
                            },
                            new City
                            {
                                Name = "Нетішин"
                            },
                            new City
                            {
                                Name = "Полонне"
                            },
                            new City
                            {
                                Name = "Славута"
                            },
                            new City
                            {
                                Name = "Старокостянтинів"
                            },
                            new City
                            {
                                Name = "Хмельницький"
                            },
                            new City
                            {
                                Name = "Шепетівка"
                            },
                        }
                    },
                    new Region
                    {
                        Name = "Черкаська",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Ватутіне"
                            },
                            new City
                            {
                                Name = "Городище"
                            },
                            new City
                            {
                                Name = "Жашків"
                            },
                            new City
                            {
                                Name = "Звенигородка"
                            },
                            new City
                            {
                                Name = "Золотоноша"
                            },
                            new City
                            {
                                Name = "Кам'янка"
                            },
                            new City
                            {
                                Name = "Канів"
                            },
                            new City
                            {
                                Name = "Корсунь-Шевченківський"
                            },
                            new City
                            {
                                Name = "Монастирище"
                            },
                            new City
                            {
                                Name = "Сміла"
                            },
                            new City
                            {
                                Name = "Тальне"
                            },
                            new City
                            {
                                Name = "Умань"
                            },
                            new City
                            {
                                Name = "Христинівка"
                            },
                            new City
                            {
                                Name = "Черкаси"
                            },
                            new City
                            {
                                Name = "Чигирин"
                            },
                            new City
                            {
                                Name = "Шпола"
                            },
                        }
                    },
                    new Region
                    {
                        Name = "Чернівецька",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Вашківці"
                            },
                            new City
                            {
                                Name = "Вижниця"
                            },
                            new City
                            {
                                Name = "Вашківці"
                            },
                            new City
                            {
                                Name = "Герца"
                            },
                            new City
                            {
                                Name = "Заставна"
                            },
                            new City
                            {
                                Name = "Кіцмань"
                            },
                            new City
                            {
                                Name = "Новодністровськ"
                            },
                            new City
                            {
                                Name = "Новоселиця"
                            },
                            new City
                            {
                                Name = "Сокиряни"
                            },
                            new City
                            {
                                Name = "Сторожинець"
                            },
                            new City
                            {
                                Name = "Хотин"
                            },
                            new City
                            {
                                Name = "Чернівці"
                            },
                        }
                    },
                    new Region
                    {
                        Name = "Чернігівська",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Чернігів"
                            },
                            new City
                            {
                                Name = "Сновськ"
                            },
                            new City
                            {
                                Name = "Семенівка"
                            },
                            new City
                            {
                                Name = "Прилуки"
                            },
                            new City
                            {
                                Name = "Остер"
                            },
                            new City
                            {
                                Name = "Носівка"
                            },
                            new City
                            {
                                Name = "Новгород-Сіверський"
                            },
                            new City
                            {
                                Name = "Ніжин"
                            },
                            new City
                            {
                                Name = "Мена"
                            },
                            new City
                            {
                                Name = "Корюківка"
                            },
                            new City
                            {
                                Name = "Ічня"
                            },
                            new City
                            {
                                Name = "Городня"
                            },
                            new City
                            {
                                Name = "Борзна"
                            },
                            new City
                            {
                                Name = "Бобровиця"
                            },
                            new City
                            {
                                Name = "Бахмач"
                            },
                            new City
                            {
                                Name = "Батурин"
                            }
                        }
                    },
                    new Region
                    {
                        Name = "м.Київ",
                        Cities = new List<City>
                        {
                            new City
                            {
                                Name = "Київ"
                            }
                        }
                    },
                };
                await context.States.AddRangeAsync(states);
                await context.SaveChangesAsync();
            }
            // Seed localbranches
            if (!context.Branches.Any())
            {
                var branches = new List<Branch>
                {
                    new Branch
                    {
                        Id = "01",
                        Name = "Освіта/Педагогіка"
                    },
                    new Branch
                    {
                        Id = "02",
                        Name = "Культура і мистецтво"
                    },
                    new Branch
                    {
                        Id = "03",
                        Name = "Гуманітарні науки"
                    },
                    new Branch
                    {
                        Id = "04",
                        Name = "Богослов’я"
                    },
                    new Branch
                    {
                        Id = "05",
                        Name = "Соціальні та поведінкові науки"
                    },
                    new Branch
                    {
                        Id = "06",
                        Name = "Журналістика"
                    },
                    new Branch
                    {
                        Id = "07",
                        Name = "Управління та адміністрування"
                    },
                    new Branch
                    {
                        Id = "08",
                        Name = "Право"
                    },
                    new Branch
                    {
                        Id = "09",
                        Name = "Біологія"
                    },
                    new Branch
                    {
                        Id = "10",
                        Name = "Природничі науки"
                    },
                    new Branch
                    {
                        Id = "11",
                        Name = "Математика та статистика"
                    },
                    new Branch
                    {
                        Id = "12",
                        Name = "Інформаційні технології"
                    },
                    new Branch
                    {
                        Id = "13",
                        Name = "Механічна інженерія"
                    },
                    new Branch
                    {
                        Id = "14",
                        Name = "Електрична інженерія"
                    },
                    new Branch
                    {
                        Id = "16",
                        Name = "Хімічна інженерія та біоінженерія"
                    },
                    new Branch
                    {
                        Id = "17",
                        Name = "Електроніка, автоматизація та електронні комунікації"
                    },
                    new Branch
                    {
                        Id = "18",
                        Name = "Виробництво та технології"
                    },
                    new Branch
                    {
                        Id = "19",
                        Name = "Архітектура та будівництво"
                    },
                    new Branch
                    {
                        Id = "20",
                        Name = "Аграрні науки та продовольство"
                    },
                    new Branch
                    {
                        Id = "21",
                        Name = "Ветеринарія"
                    },
                    new Branch
                    {
                        Id = "22",
                        Name = "Охорона здоров’я"
                    },
                    new Branch
                    {
                        Id = "23",
                        Name = "Соціальна робота"
                    },
                    new Branch
                    {
                        Id = "24",
                        Name = "Сфера обслуговування"
                    },
                    new Branch
                    {
                        Id = "25",
                        Name = "Воєнні науки, національна безпека, безпека державного кордону"
                    },
                    new Branch
                    {
                        Id = "26",
                        Name = "Цивільна безпека"
                    },
                    new Branch
                    {
                        Id = "27",
                        Name = "Транспорт"
                    },
                    new Branch
                    {
                        Id = "28",
                        Name = "Публічне управління та адміністрування"
                    },
                    new Branch
                    {
                        Id = "29",
                        Name = "Міжнародні відносини"
                    },
                };
                await context.Branches.AddRangeAsync(branches);
                await context.SaveChangesAsync();
            }
            // Seed ISCEDCores
            if (!context.ISCEDCores.Any())
            {
                var iscedCores = new List<ISCEDCore>
                {
                    new ISCEDCore
                    {
                        Id = "0111",
                        Name = "Education science",
                    },
                    new ISCEDCore
                    {
                        Id = "0112",
                        Name = "Training for pre-school teachers",
                    },
                    new ISCEDCore
                    {
                        Id = "0113",
                        Name = "Teacher training without subject specialisation",
                    },
                    new ISCEDCore
                    {
                        Id = "0114",
                        Name = "Teacher training with subject specialisation",
                    },
                    new ISCEDCore
                    {
                        Id = "1014",
                        Name = "Sports",
                    },
                    new ISCEDCore
                    {
                        Id = "0211",
                        Name = "Audio-visual techniques and media production",
                    },
                    new ISCEDCore
                    {
                        Id = "0212",
                        Name = "Fashion, interior and industrial design",
                    },
                    new ISCEDCore
                    {
                        Id = "0213",
                        Name = "Fine arts",
                    },
                    new ISCEDCore
                    {
                        Id = "0214",
                        Name = "Handicrafts",
                    },
                    new ISCEDCore
                    {
                        Id = "0215",
                        Name = "Music and performing arts",
                    },
                    new ISCEDCore
                    {
                        Id = "0322",
                        Name = "Library, information and archival studies",
                    },
                    new ISCEDCore
                    {
                        Id = "0413",
                        Name = "Management and administration",
                    },
                    new ISCEDCore
                    {
                        Id = "0415",
                        Name = "Secretarial and office work",
                    },
                    new ISCEDCore
                    {
                        Id = "0221",
                        Name = "Religion and theology",
                    },
                    new ISCEDCore
                    {
                        Id = "0222",
                        Name = "History and archaeology",
                    },
                    new ISCEDCore
                    {
                        Id = "0223",
                        Name = "Philosophy and ethics",
                    },
                    new ISCEDCore
                    {
                        Id = "0314",
                        Name = "Sociology and cultural studies",
                    },
                    new ISCEDCore
                    {
                        Id = "0231",
                        Name = "Language acquisition",
                    },
                    new ISCEDCore
                    {
                        Id = "0232",
                        Name = "Literature and linguistics",
                    },
                    new ISCEDCore
                    {
                        Id = "0311",
                        Name = "Economics",
                    },
                    new ISCEDCore
                    {
                        Id = "0312",
                        Name = "Political sciences and civics",
                    },
                    new ISCEDCore
                    {
                        Id = "0313",
                        Name = "Psychology",
                    },
                    new ISCEDCore
                    {
                        Id = "0321",
                        Name = "Journalism and reporting",
                    },
                    new ISCEDCore
                    {
                        Id = "0411",
                        Name = "Accounting and taxation",
                    },
                    new ISCEDCore
                    {
                        Id = "0412",
                        Name = "Finance, banking and insurance",
                    },
                    new ISCEDCore
                    {
                        Id = "0414",
                        Name = "Marketing and advertising",
                    },
                    new ISCEDCore
                    {
                        Id = "0416",
                        Name = "Wholesale and retail sales",
                    },
                    new ISCEDCore
                    {
                        Id = "0421",
                        Name = "Law",
                    },
                    new ISCEDCore
                    {
                        Id = "0511",
                        Name = "Biology",
                    },
                    new ISCEDCore
                    {
                        Id = "0512",
                        Name = "Biochemistry",
                    },
                    new ISCEDCore
                    {
                        Id = "0522",
                        Name = "Natural environments and wildlife",
                    },
                    new ISCEDCore
                    {
                        Id = "0521",
                        Name = "Environmental sciences",
                    },
                    new ISCEDCore
                    {
                        Id = "0531",
                        Name = "Chemistry",
                    },
                    new ISCEDCore
                    {
                        Id = "0532",
                        Name = "Earth sciences",
                    },
                    new ISCEDCore
                    {
                        Id = "0533",
                        Name = "Physics",
                    },
                    new ISCEDCore
                    {
                        Id = "0588",
                        Name = "Inter-disciplinary programmes and qualifications involving natural sciences, mathematics and statistics",
                    },
                    new ISCEDCore
                    {
                        Id = "0541",
                        Name = "Mathematics",
                    },
                    new ISCEDCore
                    {
                        Id = "0542",
                        Name = "Statistics",
                    },
                    new ISCEDCore
                    {
                        Id = "0613",
                        Name = "Software and applications development and analysis",
                    },
                    new ISCEDCore
                    {
                        Id = "0612",
                        Name = "Database and network design and administration",
                    },
                    new ISCEDCore
                    {
                        Id = "0714",
                        Name = "Electronics and automation",
                    },
                    new ISCEDCore
                    {
                        Id = "0688",
                        Name = "Inter-disciplinary programmes and qualifications involving Information and Communication Technologies (ICTs)",
                    },
                    new ISCEDCore
                    {
                        Id = "0611",
                        Name = "Computer use",
                    },
                    new ISCEDCore
                    {
                        Id = "0715",
                        Name = "Mechanics and metal trades",
                    },
                    new ISCEDCore
                    {
                        Id = "0788",
                        Name = "Inter-disciplinary programmes and qualifications involving engineering, manufacturing and construction",
                    },
                    new ISCEDCore
                    {
                        Id = "0716",
                        Name = "Motor vehicles, ships and aircraft",
                    },
                    new ISCEDCore
                    {
                        Id = "0713",
                        Name = "Electricity and energy",
                    },
                    new ISCEDCore
                    {
                        Id = "0711",
                        Name = "Chemical engineering and processes",
                    },
                    new ISCEDCore
                    {
                        Id = "0721",
                        Name = "Food processing",
                    },
                    new ISCEDCore
                    {
                        Id = "0723",
                        Name = "Textiles (clothes, footwear and leather)",
                    },
                    new ISCEDCore
                    {
                        Id = "0712",
                        Name = "Environmental protection technology",
                    },
                    new ISCEDCore
                    {
                        Id = "0724",
                        Name = "Mining and extraction",
                    },
                    new ISCEDCore
                    {
                        Id = "0722",
                        Name = "Materials (glass, paper, plastic and wood)",
                    },
                    new ISCEDCore
                    {
                        Id = "0731",
                        Name = "Architecture and town planning",
                    },
                    new ISCEDCore
                    {
                        Id = "0732",
                        Name = "Building and civil engineering",
                    },
                    new ISCEDCore
                    {
                        Id = "0811",
                        Name = "Crop and livestock production",
                    },
                    new ISCEDCore
                    {
                        Id = "0812",
                        Name = "Horticulture",
                    },
                    new ISCEDCore
                    {
                        Id = "0821",
                        Name = "Forestry",
                    },
                    new ISCEDCore
                    {
                        Id = "0831",
                        Name = "Fisheries",
                    },
                    new ISCEDCore
                    {
                        Id = "0888",
                        Name = "Inter-disciplinary programmes and qualifications involving agriculture, forestry, fisheries and veterinary",
                    },
                    new ISCEDCore
                    {
                        Id = "0841",
                        Name = "Veterinary",
                    },
                    new ISCEDCore
                    {
                        Id = "1022",
                        Name = "Occupational health and safety",
                    },
                    new ISCEDCore
                    {
                        Id = "0911",
                        Name = "Dental studies",
                    },
                    new ISCEDCore
                    {
                        Id = "0912",
                        Name = "Medicine",
                    },
                    new ISCEDCore
                    {
                        Id = "0913",
                        Name = "Nursing and midwifery",
                    },
                    new ISCEDCore
                    {
                        Id = "0914",
                        Name = "Medical diagnostic and treatment technology",
                    },
                    new ISCEDCore
                    {
                        Id = "0916",
                        Name = "Pharmacy",
                    },
                    new ISCEDCore
                    {
                        Id = "0915",
                        Name = "Therapy and rehabilitation",
                    },
                    new ISCEDCore
                    {
                        Id = "0988",
                        Name = "Inter-disciplinary programmes and qualifications involving health and welfare",
                    },
                    new ISCEDCore
                    {
                        Id = "1021",
                        Name = "Community sanitation",
                    },
                    new ISCEDCore
                    {
                        Id = "0921",
                        Name = "Care of the elderly and of disabled adults",
                    },
                    new ISCEDCore
                    {
                        Id = "0922",
                        Name = "Child care and youth services",
                    },
                    new ISCEDCore
                    {
                        Id = "0923",
                        Name = "Social work and counselling",
                    },
                    new ISCEDCore
                    {
                        Id = "1013",
                        Name = "Hotel, restaurants and catering",
                    },
                    new ISCEDCore
                    {
                        Id = "1015",
                        Name = "Travel, tourism and leisure",
                    },
                    new ISCEDCore
                    {
                        Id = "1031",
                        Name = "Military and defence",
                    },
                    new ISCEDCore
                    {
                        Id = "1032",
                        Name = "Protection of persons and property",
                    },
                    new ISCEDCore
                    {
                        Id = "1041",
                        Name = "Transport services",
                    },
                    new ISCEDCore
                    {
                        Id = "0388",
                        Name = "Inter-disciplinary programmes and qualifications involving social sciences, journalism and information",
                    },
                };
                await context.ISCEDCores.AddRangeAsync(iscedCores);
                await context.SaveChangesAsync();
            }


            // Seed specialtyCores
            if (!context.SpecialtyCores.Any())
            {
                var specialtyCores = new List<SpecialtyCore>
                {
                    new SpecialtyCore
                    {

                            Id="011",
                            Name="Освітні, педагогічні науки",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0111"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="012",
                            Name="Дошкільна освіта",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0112"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="013",
                            Name="Початкова освіта",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0113"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="014",
                            Name="Середня освіта (за предметними спеціальностями)",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0114"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="015",
                            Name="Професійна освіта (за спеціалізаціями)",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0114"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="016",
                            Name="Спеціальна освіта",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0113"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="017",
                            Name="Фізична культура і спорт",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1014"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="021",
                            Name="Аудіовізуальне мистецтво та виробництво",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0211"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="022",
                            Name="Дизайн",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0212"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="023",
                            Name="Образотворче мистецтво, декоративне мистецтво, реставрація",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0213"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0214"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="024",
                            Name="Хореографія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0215"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="025",
                            Name="Музичне мистецтво",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0215"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="026",
                            Name="Сценічне мистецтво",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0215"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="027",
                            Name="Музеєзнавство, пам’яткознавство",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0322"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="028",
                            Name="Менеджмент соціокультурної діяльності",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0413"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="029",
                            Name="Інформаційна, бібліотечна та архівна справа",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0322"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0415"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="031",
                            Name="Релігієзнавство",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0221"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="032",
                            Name="Історія та археологія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0222"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="033",
                            Name="Філософія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0223"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="034",
                            Name="Культурологія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0314"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="035",
                            Name="Філологія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0231"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0232"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="041",
                            Name="Богослов’я",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0221"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="051",
                            Name="Економіка",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0311"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="052",
                            Name="Політологія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0312"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="053",
                            Name="Психологія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0313"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="054",
                            Name="Соціологія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0314"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="061",
                            Name="Журналістика",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0321"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="071",
                            Name="Облік і оподаткування",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0411"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="072",
                            Name="Фінанси, банківська справа, страхування та фондовий ринок",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0412"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="073",
                            Name="Менеджмент",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0413"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0415"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="075",
                            Name="Маркетинг",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0414"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="076",
                            Name="Підприємництво та торгівля",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0413"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0416"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="081",
                            Name="Право",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0421"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="091",
                            Name="Біологія та біохімія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0511"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0512"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0522"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="101",
                            Name="Екологія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0521"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0522"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="102",
                            Name="Хімія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0531"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="103",
                            Name="Науки про Землю**",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0532"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="104",
                            Name="Фізика та астрономія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0533"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="105",
                            Name="Прикладна фізика та наноматеріали",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0533"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0588"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="106",
                            Name="Географія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0314"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="111",
                            Name="Математика",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0541"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="112",
                            Name="Статистика",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0542"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="113",
                            Name="Прикладна математика",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0541"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0588"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0613"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="121",
                            Name="Інженерія програмного забезпечення",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0613"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="122",
                            Name="Комп’ютерні науки",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0613"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="123",
                            Name="Комп’ютерна інженерія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0612"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0714"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="124",
                            Name="Системний аналіз",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0688"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="125",
                            Name="Кібербезпека та захист інформації",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0612"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0688"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="126",
                            Name="Інформаційні системи та технології",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0611"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0612"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="131",
                            Name="Прикладна механіка",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0715"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="132",
                            Name="Матеріалознавство",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0588"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0715"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0788"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="133",
                            Name="Галузеве машинобудування",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0715"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0716"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="134",
                            Name="Авіаційна та ракетно-космічна техніка",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0716"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="135",
                            Name="Суднобудування",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0716"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="136",
                            Name="Металургія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0715"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="141",
                            Name="Електроенергетика, електротехніка та електромеханіка",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0713"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="142",
                            Name="Енергетичне машинобудування",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0713"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0716"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="143",
                            Name="Атомна енергетика",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0713"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="144",
                            Name="Теплоенергетика",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0713"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="145",
                            Name="Відновлювані джерела енергії та гідроенергетика",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0713"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="161",
                            Name="Хімічні технології та інженерія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0711"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="162",
                            Name="Біотехнології та біоінженерія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0512"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0711"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="163",
                            Name="Біомедична інженерія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0588"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0788"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="171",
                            Name="Електроніка",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0714"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="172",
                            Name="Електронні комунікації та радіотехніка",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0714"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="173",
                            Name="Авіоніка",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0714"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0716"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="174",
                            Name="Автоматизація, комп’ютерно-інтегровані технології та робототехніка",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0714"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="175",
                            Name="Інформаційно-вимірювальні технології",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0714"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0788"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="176",
                            Name="Мікро- та наносистемна техніка",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0714"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0788"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="181",
                            Name="Харчові технології",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0721"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="182",
                            Name="Технології легкої промисловості",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0723"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="183",
                            Name="Технології захисту навколишнього середовища",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0712"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="184",
                            Name="Гірництво",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0724"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="185",
                            Name="Нафтогазова інженерія та технології",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0724"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="186",
                            Name="Видавництво та поліграфія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0211"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0611"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="187",
                            Name="Деревообробні та меблеві технології",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0722"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="191",
                            Name="Архітектура та містобудування",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0731"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="192",
                            Name="Будівництво та цивільна інженерія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0732"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="193",
                            Name="Геодезія та землеустрій",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0532"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0731"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="194",
                            Name="Гідротехнічне будівництво, водна інженерія та водні технології",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0732"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="201",
                            Name="Агрономія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0811"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="202",
                            Name="Захист і карантин рослин",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0811"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="203",
                            Name="Садівництво, плодоовочівництво та виноградарство",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0811"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0812"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="204",
                            Name="Технологія виробництва і переробки продукції тваринництва",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0811"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="206",
                            Name="Садово-паркове господарство",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0812"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="207",
                            Name="Водні біоресурси та аквакультура",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0831"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="208",
                            Name="Агроінженерія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0716"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0888"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="211",
                            Name="Ветеринарна медицина",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0841"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1022"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="221",
                            Name="Стоматологія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0911"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="222",
                            Name="Медицина",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0912"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="223",
                            Name="Медсестринство",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0913"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="224",
                            Name="Технології медичної діагностики та лікування",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0914"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="225",
                            Name="Медична психологія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0313"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="226",
                            Name="Фармація, промислова фармація",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0588"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0711"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0916"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="227",
                            Name="Терапія та реабілітація",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0915"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="228",
                            Name="Педіатрія",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0912"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="229",
                            Name="Громадське здоров’я",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0413"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0988"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1021"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1022"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="231",
                            Name="Соціальна робота",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0921"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0922"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0923"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="232",
                            Name="Соціальне забезпечення",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0413"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0923"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="241",
                            Name="Готельно-ресторанна справа",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1013"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="242",
                            Name="Туризм і рекреація",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1015"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="251",
                            Name="Державна безпека",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1031"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="252",
                            Name="Безпека державного кордону",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1031"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="253",
                            Name="Військове управління (за видами збройних сил)",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1031"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="254",
                            Name="Забезпечення військ (сил)",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1031"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="255",
                            Name="Озброєння та військова техніка",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1031"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="256",
                            Name="Національна безпека (за окремими сферами забезпечення і видами діяльності)***",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1031"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="257",
                            Name="Управління інформаційною безпекою",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1031"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="261",
                            Name="Пожежна безпека",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1032"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="262",
                            Name="Правоохоронна діяльність",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1032"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="263",
                            Name="Цивільна безпека",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1022"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1032"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="271",
                            Name="Морський та внутрішній водний транспорт****",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0716"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1041"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="272",
                            Name="Авіаційний транспорт",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0716"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1041"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="273",
                            Name="Залізничний транспорт",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0716"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0732"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1041"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="274",
                            Name="Автомобільний транспорт",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0716"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1041"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="275",
                            Name="Транспортні технології (за видами)",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1041"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="281",
                            Name="Публічне управління та адміністрування",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0413"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="291",
                            Name="Міжнародні відносини, суспільні комунікації та регіональні студії",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0312"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0314"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0388"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="292",
                            Name="Міжнародні економічні відносини",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0311"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0312"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="293",
                            Name="Міжнародне право",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0421"),
                        },
                    },
                };
                await context.SpecialtyCores.AddRangeAsync(specialtyCores);
                await context.SaveChangesAsync();
            }
            // in case of an empty DB seed users
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser> {
                    new AppUser {
                        DisplayName = "Test User",
                        UserName = "testuser",
                        Email = "testmail@test.com"
                    },
                    new AppUser {
                        DisplayName = "Test User2",
                        UserName = "testuser2",
                        Email = "testmail2@test.com"
                    },
                    new AppUser {
                        DisplayName = "Test User3",
                        UserName = "testuser3",
                        Email = "testmail3@test.com"
                    }
                };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "2dS92jD72jsdLsS");
                }
            }

            var powerUser = new AppUser
            {
                UserName = "CatalogueOperator",
                DisplayName = "CatalogueOperator",
                Email = "EduCatalogue@service.com",
            };

            string userPassword = "2dS92jD72jsdLsS";
            var _user = await userManager.FindByEmailAsync("EduCatalogue@service.com");

            if (_user == null)
            {
                var createPowerUser = await userManager.CreateAsync(powerUser, userPassword);
            }

            // check for institutions and seed if none was found
            if (!context.Institutions.Any())
            {
                var Institutions = new List<Institution>
                {
                    new Institution
                    {
                        Name = "Львівський національний медичний університет імені Данила Галицького",
                        Description = "Львівський національний медичний університет імені Данила Галицького (ЛНМУ; лат. Universitatis Medicinalis Leopoliensis) — один з найбільших та найстаріших медичних навчальних закладів України. Готує спеціалістів за напрямами: медицина, медико-профілактична справа, стоматологія та фармація. За даними міжнародної бази Scopus університет посідає перше місце серед медичних вишів України",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Львів"),
                        StudentCount = 5150,
                        StreetAddress = "вул. Пекарська, 69",
                        TitleImage = null,
                        SiteURL = "new.meduniv.lviv.ua",
                        ContactInformation = "0231231028"
                    },
                    new Institution
                    {
                        Name = "Київський національний університет імені Тараса Шевченка",
                        Description = "державний заклад вищої освіти України, розташований у місті Києві. За рейтингами ВНЗ, на 2020 рік посідав 1 місце і є найбільшим університетом за кількістю студентів і спеціальностей. З 2009 до 2014 року мав статус автономного дослідницького університету",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Київ"),
                        StudentCount = 32000,
                        StreetAddress = "вул. Володимирська, 60",
                        SiteURL = "knu.ua",
                        ContactInformation = "6683328733"
                    },
                    new Institution
                    {
                        Name = "Буковинський державний медичний університет",
                        Description = "один із найбільших закладів вищої освіти м. Чернівці. Це сучасний багатопрофільний заклад вищої медичної освіти, включений до загального реєстру Всесвітньої організації охорони здоров'я, Великої Хартії університетів, Європейської асоціації університету, що здійснює підготовку здобувачів вищої освіти за ступеневою системою освіти. ",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Чернівці"),
                        StudentCount = 5284,
                        StreetAddress = "Театральна площа, 2",
                        SiteURL = "www.bsmu.edu.ua",
                        ContactInformation = "23474623659"
                    },
                    new Institution
                    {
                        Name = "Львівський національний медичний університет імені Данила Галицького 2",
                        Description = "один з найбільших та найстаріших медичних навчальних закладів України. Готує спеціалістів за напрямами: медицина, медико-профілактична справа, стоматологія та фармація. ",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Львів"),
                        StudentCount = 5150,
                        StreetAddress = "вул. Пекарська, 69",
                        SiteURL = "www.meduniv.lviv.ua",
                        ContactInformation = "02312328"
                    },
                    new Institution
                    {
                        Name = "Тернопільський національний медичний університет",
                        Description = "державний заклад вищої освіти України, розташований у місті Києві. За рейтингами ВНЗ, на 2020 рік посідав 1 місце і є найбільшим університетом за кількістю студентів і спеціальностей. З 2009 до 2014 року мав статус автономного дослідницького університету",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Тернопіль"),
                        StudentCount = 6530,
                        StreetAddress = "Майдан Волі, 1",
                        SiteURL = "tdmu.edu.ua",
                        ContactInformation = "023sdads8"
                    },
                    new Institution
                    {
                        Name = "Національний технічний університет «Харківський політехнічний інститут» 2",
                        Description = "заснований в 1885 році в Харкові. Другий технологічний інститут в Російській імперії після санкт-петербурзького. Також другий за часом відкриття технологічний інститут в Україні після Львівської технічної академії (1844). В даний час — найбільший навчальний центр східної України і найбільший ВНЗ міста Харкова. В університеті навчаються приблизно 26 тисяч студентів. ",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Харків"),
                        StudentCount = 12000,
                        StreetAddress = "вул. Кирпичова, 21",
                        SiteURL = "kpi.kharkov.ua",
                        ContactInformation = "3rwe2ddsw8"
                    },
                    new Institution
                    {
                        Name = "Національний технічний університет «Харківський політехнічний інститут» 3",
                        Description = "заснований в 1885 році в Харкові. Другий технологічний інститут в Російській імперії після санкт-петербурзького. Також другий за часом відкриття технологічний інститут в Україні після Львівської технічної академії (1844). В даний час — найбільший навчальний центр східної України і найбільший ВНЗ міста Харкова. В університеті навчаються приблизно 26 тисяч студентів. ",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Харків"),
                        StudentCount = 12000,
                        StreetAddress = "вул. Кирпичова, 21",
                        SiteURL = "kpi.kharkov.ua",
                        ContactInformation = "3rwe2ddsw8"
                    },
                    new Institution
                    {
                        Name = "Національний технічний університет «Харківський політехнічний інститут» 4",
                        Description = "заснований в 1885 році в Харкові. Другий технологічний інститут в Російській імперії після санкт-петербурзького. Також другий за часом відкриття технологічний інститут в Україні після Львівської технічної академії (1844). В даний час — найбільший навчальний центр східної України і найбільший ВНЗ міста Харкова. В університеті навчаються приблизно 26 тисяч студентів. ",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Харків"),
                        StudentCount = 12000,
                        StreetAddress = "вул. Кирпичова, 21",
                        SiteURL = "kpi.kharkov.ua",
                        ContactInformation = "3rwe2ddsw8"
                    },
                    new Institution
                    {
                        Name = "Національний технічний університет «Харківський політехнічний інститут» 5",
                        Description = "заснований в 1885 році в Харкові. Другий технологічний інститут в Російській імперії після санкт-петербурзького. Також другий за часом відкриття технологічний інститут в Україні після Львівської технічної академії (1844). В даний час — найбільший навчальний центр східної України і найбільший ВНЗ міста Харкова. В університеті навчаються приблизно 26 тисяч студентів. ",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Харків"),
                        StudentCount = 12000,
                        StreetAddress = "вул. Кирпичова, 21",
                        SiteURL = "kpi.kharkov.ua",
                        ContactInformation = "3rwe2ddsw8"
                    },
                    new Institution
                    {
                        Name = "Національний технічний університет «Харківський політехнічний інститут» 6",
                        Description = "заснований в 1885 році в Харкові. Другий технологічний інститут в Російській імперії після санкт-петербурзького. Також другий за часом відкриття технологічний інститут в Україні після Львівської технічної академії (1844). В даний час — найбільший навчальний центр східної України і найбільший ВНЗ міста Харкова. В університеті навчаються приблизно 26 тисяч студентів. ",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Харків"),
                        StudentCount = 12000,
                        StreetAddress = "вул. Кирпичова, 21",
                        SiteURL = "kpi.kharkov.ua",
                        ContactInformation = "3rwe2ddsw8"
                    },
                    new Institution
                    {
                        Name = "Національний технічний університет «Харківський політехнічний інститут» 7",
                        Description = "заснований в 1885 році в Харкові. Другий технологічний інститут в Російській імперії після санкт-петербурзького. Також другий за часом відкриття технологічний інститут в Україні після Львівської технічної академії (1844). В даний час — найбільший навчальний центр східної України і найбільший ВНЗ міста Харкова. В університеті навчаються приблизно 26 тисяч студентів. ",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Харків"),
                        StudentCount = 12000,
                        StreetAddress = "вул. Кирпичова, 21",
                        SiteURL = "kpi.kharkov.ua",
                        ContactInformation = "3rwe2ddsw8"
                    },
                    new Institution
                    {
                        Name = "Національний технічний університет «Харківський політехнічний інститут» 8",
                        Description = "заснований в 1885 році в Харкові. Другий технологічний інститут в Російській імперії після санкт-петербурзького. Також другий за часом відкриття технологічний інститут в Україні після Львівської технічної академії (1844). В даний час — найбільший навчальний центр східної України і найбільший ВНЗ міста Харкова. В університеті навчаються приблизно 26 тисяч студентів. ",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Харків"),
                        StudentCount = 12000,
                        StreetAddress = "вул. Кирпичова, 21",
                        SiteURL = "kpi.kharkov.ua",
                        ContactInformation = "3rwe2ddsw8"
                    },
                    new Institution
                    {
                        Name = "Національний технічний університет «Харківський політехнічний інститут» 9",
                        Description = "заснований в 1885 році в Харкові. Другий технологічний інститут в Російській імперії після санкт-петербурзького. Також другий за часом відкриття технологічний інститут в Україні після Львівської технічної академії (1844). В даний час — найбільший навчальний центр східної України і найбільший ВНЗ міста Харкова. В університеті навчаються приблизно 26 тисяч студентів. ",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Харків"),
                        StudentCount = 12000,
                        StreetAddress = "вул. Кирпичова, 21",
                        SiteURL = "kpi.kharkov.ua",
                        ContactInformation = "3rwe2ddsw8"
                    },
                    new Institution
                    {
                        Name = "Національний технічний університет «Харківський політехнічний інститут» 10",
                        Description = "заснований в 1885 році в Харкові. Другий технологічний інститут в Російській імперії після санкт-петербурзького. Також другий за часом відкриття технологічний інститут в Україні після Львівської технічної академії (1844). В даний час — найбільший навчальний центр східної України і найбільший ВНЗ міста Харкова. В університеті навчаються приблизно 26 тисяч студентів. ",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Харків"),
                        StudentCount = 12000,
                        StreetAddress = "вул. Кирпичова, 21",
                        SiteURL = "kpi.kharkov.ua",
                        ContactInformation = "3rwe2ddsw8"
                    },
                    new Institution
                    {
                        Name = "Національний технічний університет «Харківський політехнічний інститут» 11",
                        Description = "заснований в 1885 році в Харкові. Другий технологічний інститут в Російській імперії після санкт-петербурзького. Також другий за часом відкриття технологічний інститут в Україні після Львівської технічної академії (1844). В даний час — найбільший навчальний центр східної України і найбільший ВНЗ міста Харкова. В університеті навчаються приблизно 26 тисяч студентів. ",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Харків"),
                        StudentCount = 12000,
                        StreetAddress = "вул. Кирпичова, 21",
                        SiteURL = "kpi.kharkov.ua",
                        ContactInformation = "3rwe2ddsw8"
                    },
                    new Institution
                    {
                        Name = "Національний технічний університет «Харківський політехнічний інститут» 12",
                        Description = "заснований в 1885 році в Харкові. Другий технологічний інститут в Російській імперії після санкт-петербурзького. Також другий за часом відкриття технологічний інститут в Україні після Львівської технічної академії (1844). В даний час — найбільший навчальний центр східної України і найбільший ВНЗ міста Харкова. В університеті навчаються приблизно 26 тисяч студентів. ",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Харків"),
                        StudentCount = 12000,
                        StreetAddress = "вул. Кирпичова, 21",
                        SiteURL = "kpi.kharkov.ua",
                        ContactInformation = "3rwe2ddsw8"
                    },
                };
                await context.Institutions.AddRangeAsync(Institutions);
                await context.SaveChangesAsync();


                // Seed managers
                var usermanager = await userManager.FindByEmailAsync("EduCatalogue@service.com");
                var institution = await context.Institutions.FindAsync(Institutions[0].Id);

                var manager = new AppUserInstitution
                {
                    Manager = usermanager,
                    Institution = institution,
                };

                institution.Managers.Add(manager);


                // Seed Specialties
                var specialtyCore1 = await context.SpecialtyCores.FirstOrDefaultAsync(x => x.Id == "012");
                var specialtyCore2 = await context.SpecialtyCores.FirstOrDefaultAsync(x => x.Id == "011");
                var specialties = new List<Specialty>
                {
                    new Specialty
                    {
                        SpecialtyCore = specialtyCore1,
                        Description = "Specialty test description",
                        EctsCredits = 240,
                        Degree = "Bachelor",
                        PriceUAH = 80000,
                        StartYear = 2021,
                        EndYear = 2025,
                    },
                    new Specialty
                    {
                        SpecialtyCore = specialtyCore2,
                        Description = "Specialty test description",
                        EctsCredits = 180,
                        Degree = "Bachelor",
                        PriceUAH = 80001,
                        StartYear = 2021,
                        EndYear = 2025,
                    },
                };
                
                institution.Specialties.Add(specialties[0]);
                institution.Specialties.Add(specialties[1]);
                await context.SaveChangesAsync();
            }
        }
    }
}