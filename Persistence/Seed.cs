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
            // Seed institution types
            if (!context.InstitutionTypes.Any())
            {
                var types = new List<InstitutionType>
                {
                    new InstitutionType
                    {
                        Name="Public",
                    },
                    new InstitutionType
                    {
                        Name="Private",
                    }
                };
                await context.InstitutionTypes.AddRangeAsync(types);
                await context.SaveChangesAsync();
            }

            // Seed states with cities
            if (!context.Regions.Any())
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
                await context.Regions.AddRangeAsync(states);
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
                for (int i = 1; i < 50; i++)
                {
                    var user = new AppUser
                    {
                        DisplayName = $"Test User{i}",
                        UserName = $"testuser{i}",
                        Email = $"testmail{i}@test.com",
                    };
                    await userManager.CreateAsync(user, "2dS92jD72jsdLsS");
                }
            }

            var powerUser = new AppUser
            {
                UserName = "CatalogueOperator",
                DisplayName = "CatalogueOperator",
                Email = "EduCatalogue@service.com",
            };

            var _user = await userManager.FindByEmailAsync("EduCatalogue@service.com");

            if (_user == null)
            {
                var createPowerUser = await userManager.CreateAsync(powerUser, "2dS92jD72jsdLsS");
            }
            await context.SaveChangesAsync();

            // check for institutions and seed if none was found
            if (!context.Institutions.Any())
            {
                var institutions = new List<Institution>
                {
                    new Institution
                    {
                        Name = "Львівський національний медичний університет імені Данила Галицького",
                        Description = "Львівський національний медичний університет імені Данила Галицького (ЛНМУ; лат. Universitatis Medicinalis Leopoliensis) — один з найбільших та найстаріших медичних навчальних закладів України. Готує спеціалістів за напрямами: медицина, медико-профілактична справа, стоматологія та фармація. За даними міжнародної бази Scopus університет посідає перше місце серед медичних вишів України",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Львів"),
                        UndergraduateCount = 5150,
                        StreetAddress = "вул. Пекарська, 69",
                        SiteURL = "new.meduniv.lviv.ua",
                        ContactInformation = "0231231028"
                    },
                    new Institution
                    {
                        Name = "Київський національний університет імені Тараса Шевченка",
                        Description = "державний заклад вищої освіти України, розташований у місті Києві. За рейтингами ВНЗ, на 2020 рік посідав 1 місце і є найбільшим університетом за кількістю студентів і спеціальностей. З 2009 до 2014 року мав статус автономного дослідницького університету",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Київ"),
                        UndergraduateCount = 32000,
                        StreetAddress = "вул. Володимирська, 60",
                        SiteURL = "knu.ua",
                        ContactInformation = "6683328733"
                    },
                    new Institution
                    {
                        Name = "Буковинський державний медичний університет",
                        Description = "один із найбільших закладів вищої освіти м. Чернівці. Це сучасний багатопрофільний заклад вищої медичної освіти, включений до загального реєстру Всесвітньої організації охорони здоров'я, Великої Хартії університетів, Європейської асоціації університету, що здійснює підготовку здобувачів вищої освіти за ступеневою системою освіти. ",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Чернівці"),
                        UndergraduateCount = 5284,
                        StreetAddress = "Театральна площа, 2",
                        SiteURL = "www.bsmu.edu.ua",
                        ContactInformation = "23474623659"
                    },
                    new Institution
                    {
                        Name = "Тернопільський національний медичний університет",
                        Description = "державний заклад вищої освіти України, розташований у місті Києві. За рейтингами ВНЗ, на 2020 рік посідав 1 місце і є найбільшим університетом за кількістю студентів і спеціальностей. З 2009 до 2014 року мав статус автономного дослідницького університету",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Тернопіль"),
                        UndergraduateCount = 6530,
                        StreetAddress = "Майдан Волі, 1",
                        SiteURL = "tdmu.edu.ua",
                        ContactInformation = "023sdads8"
                    },
                    new Institution
                    {
                        Name = "Львівський національний університет імені Івана Франка",
                        Description = "один із найстаріших університетів України й Східної Європи та найпрестижніших в Україні. Є спадкоємцем колегіуму (1608—1661) та академії (1661—1773) єзуїтів, Йосифинського університету (1784—1805), Львівського ліцею (1805—1817), Університету Франца I (1817—1918), Львівського університету Яна-Казимира (1919—1939), Львівського державного університету імені Івана Франка (1939—1999).",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Львів"),
                        UndergraduateCount = 25000,
                        StreetAddress = "вул. Університетська, 1",
                        SiteURL = "lnu.edu.ua",
                        ContactInformation = "0322 603 402"
                    },
                    new Institution
                    {
                        Name = "Національний університет «Києво-Могилянська академія»",
                        Description = "Національний університет «Києво-Могилянська академія» це заклад вищої освіти в Україні. Заснований 1615 року. Розміщується в корпусах історичної Києво-Могилянської академії, від якої отримав свою назву. Університетське містечко розташоване на Подолі в Києві, між Контрактовою площею та набережною Дніпра. ",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Київ"),
                        UndergraduateCount = 4422,
                        StreetAddress = "вулиця Григорія Сковороди, 2",
                        SiteURL = "www.ukma.edu.ua",
                        ContactInformation = "044 425 6059"
                    },
                    new Institution
                    {
                        Name = "Державний торговельно-економічний університет",
                        Description = "вищий навчальний заклад Міністерства освіти і науки України в Києві, Україна. Заснований як Київський філіал Всесоюзного заочного інституту радянської торгівлі в 1946 році. Знаходиться у Деснянському районі на території Лісового масиву між вулицями Кіото і Мілютенка.",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Київ"),
                        UndergraduateCount = 36600,
                        StreetAddress = "вулиця Кіото, 19",
                        SiteURL = "knute.edu.ua",
                        ContactInformation = "044 513 3348"
                    },
                    new Institution
                    {
                        Name = "Прикарпатський національний університет імені Василя Стефаника",
                        Description = "Прикарпатський національний університет імені Василя Стефаника є одним з найстаріших вищих навчальних закладів Івано-Франківської області. Згідно з указом Президента України від 26 серпня 1992 р. його створено на базі педагогічного інституту, заснованого 1940 р. ",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Івано-Франківськ"),
                        UndergraduateCount = 18000,
                        StreetAddress = "вулиця Шевченка, 57",
                        SiteURL = "pnu.edu.ua",
                        ContactInformation = "0342 531 574"
                    },
                    new Institution
                    {
                        Name = "Національний технічний університет «Дніпровська політехніка»",
                        Description = "Національний технічний університет «Дніпро́вська політе́хніка» — державний заклад вищої освіти, багатогалузевий технічний університет, найстаріший заклад вищої освіти в м. Дніпро, перший заклад вищої гірничої освіти України. Має статус національного.",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Дніпро"),
                        UndergraduateCount = 8260,
                        StreetAddress = "проспект Дмитра Яворницького, 19",
                        SiteURL = "nmu.org.ua",
                        ContactInformation = "056 744 1411"
                    },
                    new Institution
                    {
                        Name = "Київський національний університет технологій та дизайну",
                        Description = "Ки́ївський націона́льний університе́т техноло́гій та диза́йну — вищий навчальний заклад в Україні IV рівня акредитації, заснований 1930 року. В університеті навчається більше 10 тис. Київський національний університет технологій та дизайну увійшов у рейтинг «ТОР-100 кращих дизайнерських шкіл світу» і посів 71 місце.",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Київ"),
                        UndergraduateCount = 15000,
                        StreetAddress = "вулиця Немировича-Данченка, 2",
                        SiteURL = "knutd.com.ua",
                        ContactInformation = "044 256 2975"
                    },
                    new Institution
                    {
                        Name = "Волинський національний університет імені Лесі Українки",
                        Description = "державний вищий навчальний заклад IV рівня акредитації у місті Луцьк, Україна. Заснований у 1940 році, впродовж історії змінював назви: Луцький державний учительський інститут, Луцький державний педагогічний інститут; у статусі університету мав назви Волинського державного, Волинського національного і Східноєвропейського національного. З 2020 року повернув назву Волинський національний університет. Названий на честь письменниці Лесі Українки.",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Луцьк"),
                        UndergraduateCount = 12369,
                        StreetAddress = "проспект Волі, 13",
                        SiteURL = "vnu.edu.ua",
                        ContactInformation = "0332 720 123"
                    },
                    new Institution
                    {
                        Name = "Національний університет «Полтавська політехніка імені Юрія Кондратюка»",
                        Description = "Університет володіє сучасними матеріально-технічними ресурсами. 9 навчальних корпусів із загальною площею 87 000 м², безпечні сприятливі умови для високоякісного навчання. Бібліотека налічує приблизно 500 тисяч одиниць літератури, 5 читальних залів з 400 місцями, 55 навчальних лабораторій та 10 науково-дослідницьких, споряджених стаціонарним обладнанням, 26 комп'ютерних класів у розпорядженні студентів і викладачів. ",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Полтава"),
                        UndergraduateCount = 10000,
                        StreetAddress = "Першотравневий проспект, 24",
                        SiteURL = "nupp.edu.ua",
                        ContactInformation = "05325 61604"
                    },
                    new Institution
                    {
                        Name = "Дніпропетровський державний університет внутрішніх справ",
                        Description = "Університет заснований 16 березня 1966, як Дніпропетровська спеціальна середня школа міліції МВС СРСР. В 1992 вона була реорганізована в Дніпропетровське училище міліції МВС України. 1 вересня 1997 училище міліції було перетворено у вищий навчальний заклад — Дніпропетровський юридичний інститут МВС України. 1998 р. заклад з вул. Артема, 147 переїхав до приміщень колишнього Дніпропетровського військового зенітно-ракетного училища за адресою просп. Гагарина, 26. ",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Дніпро"),
                        UndergraduateCount = 0,
                        StreetAddress = "проспект Гагаріна, 26",
                        SiteURL = "dduvs.in.ua",
                        ContactInformation = "Не зазначено"
                    },
                    new Institution
                    {
                        Name = "Запорізький державний медичний університет",
                        Description = "Запорізький державний медичний університет — заклад вищої освіти в Україні. Запорізький державний медичний університет — це сучасний навчальний центр, що має вищий (IV) ступінь акредитації. Університет — один з найстаріших вищих медичних навчальних закладів України.",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Запоріжжя"),
                        UndergraduateCount = 8879,
                        StreetAddress = "проспект Маяковського, 26",
                        SiteURL = "www.zsmu.edu.ua",
                        ContactInformation = "0612 246 469"
                    },
                    new Institution
                    {
                        Name = "Чернівецький національний університет імені Юрія Федьковича",
                        Description = "Чернівецький національний університет імені Юрія Федьковича — державний вищий заклад освіти 4-го рівня акредитації у місті Чернівці.",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Чернівці"),
                        UndergraduateCount = 19227,
                        StreetAddress = "вулиця Коцюбинського, 2",
                        SiteURL = "www.chnu.edu.ua",
                        ContactInformation = "0372 584 810"
                    },
                    new Institution
                    {
                        Name = "Національний університет біоресурсів і природокористування України",
                        Description = "Націона́льний університе́т біоресу́рсів і природокористува́ння Украї́ни, є провідним вищим аграрним закладом освіти України. З 2009 до 2014 року мав статус автономного дослідницького університету. Розташований у місті Києві. ",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Київ"),
                        UndergraduateCount = 0,
                        StreetAddress = "вулиця Героїв Оборони, 15",
                        SiteURL = "www.nubip.edu.ua",
                        ContactInformation = "044 527 8205"
                    },
                    new Institution
                    {
                        Name = "Західноукраїнський національний універиситет",
                        Description = "Західноукраїнський національний університет — вищий навчальний заклад України IV-го рівня акредитації в м. Тернополі. Університет здійснює підготовку майже 25 тисяч студентів на всіх рівнях вищої освіти. ЗУНУ є підписантом Великої хартії університетів та членом Асоціації європейських університетів.",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Тернопіль"),
                        UndergraduateCount = 14963,
                        StreetAddress = "вулиця Львівська, 11",
                        SiteURL = "wunu.edu.ua",
                        ContactInformation = "0352 517 575"
                    },
                    new Institution
                    {
                        Name = "Національний педагогічний університет імені М. П. Драгоманова",
                        Description = "З осені 1989 року колектив вишу став активно домагатися повернення інститутові несправедливо відібраного в середині 20-х років імені Михайла Петровича Драгоманова. Це питання постійно стало порушуватися на зборах викладачів і студентів, засіданнях ради інституту і рад філологічного, історичного, педагогічного та інших факультетів й у статтях в періодичній пресі. Усі ці вимоги й акції завершилися перемогою справедливості: в 1993 році інститутові було повернуто ім'я видатного українського вченого-енциклопедиста, борця за вільну українську школу М. П. Драгоманова. ",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Київ"),
                        UndergraduateCount = 36000,
                        StreetAddress = "вулиця Пирогова, 9",
                        SiteURL = "www.npu.edu.ua",
                        ContactInformation = "044 239 3017"
                    },
                    new Institution
                    {
                        Name = "Хмельницький національний університет",
                        Description = "вищий навчальний заклад на Поділлі, який готує спеціалістів із багатьох галузей знань і проводить навчальну, методичну, наукову та виховну роботу. Університет засновано 1962 року. Пройшов шлях від загальнотехнічного факультету Українського поліграфічного інституту до Хмельницького національного університету, який має найвищий IV рівень акредитації. ",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Хмельницький"),
                        UndergraduateCount = 9759,
                        StreetAddress = "вулиця Інститутська, 11",
                        SiteURL = "khnu.km.ua",
                        ContactInformation = "0382 670 276"
                    },
                    new Institution
                    {
                        Name = "Вінницький національний технічний університет",
                        Description = "український заклад вищої освіти четвертого рівня акредитації, який здійснює підготовку фахівців інженерно-технічного профілю. Заклад є центром освіти, науки та культури Подільського регіону. ",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Вінниця"),
                        UndergraduateCount = 6000,
                        StreetAddress = "Хмельницьке шосе, 95",
                        SiteURL = "vntu.edu.ua",
                        ContactInformation = "0432 560 848"
                    },
                    new Institution
                    {
                        Name = "Житомирський державний університет імені Івана Франка",
                        Description = "найстаріший вищий навчальний заклад Житомирщини. Заснований у 1919 році як «Волинський педагогічний інститут».",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Житомир"),
                        UndergraduateCount = 4456,
                        StreetAddress = "вулиця Велика Бердичівська, 40",
                        SiteURL = "zu.edu.ua",
                        ContactInformation = "0412 431 417"
                    },
                    new Institution
                    {
                        Name = "Харківський політехнічний інститут",
                        Description = "Національний технічний університет «Харківський політехнічний інститут», до 1929 Харківський технологічний інститут, з 1975 Харківський ордена Леніна політехнічний інститут імені В. І. Леніна — заснований в 1885 році в Харкові. Другий технологічний інститут в Російській імперії після санкт-петербурзького.",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Харків"),
                        UndergraduateCount = 12000,
                        StreetAddress = "вулиця Кирпичова, 2",
                        SiteURL = "kpi.kharkov.ua",
                        ContactInformation = "057 707 6634"
                    },
                    new Institution
                    {
                        Name = "Харківський національний медичний університет",
                        Description = "Ха́рківський націона́льний меди́чний університе́т, раніше Харківський державний медичний інститут. Вищий навчальний заклад, метою якого є підготовка медичних фахівців та підвищення кваліфікації, формування на базі університету науково-виробничого кластеру.",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Харків"),
                        UndergraduateCount = 6167,
                        StreetAddress = "проспект Науки, 4",
                        SiteURL = "knmu.edu.ua",
                        ContactInformation = "057 707 7380"
                    },
                    new Institution
                    {
                        Name = "Ужгородський національний університет",
                        Description = "Ужгородський національний університет є членом Асоціації університетів Карпатського регіону (ACRU), яка входить до Асоціації європейських університетів (EUA) та є асоційованим членом Міжнародної асоціації університетів (IAU). Виш співпрацює зі 125 партнерами з різних країн, зокрема з такими, як Карлів університет, Технічний університет у м. Прага (Чехія), Університет Корвіна, Університет держави і права ім. Л.Кошута (Угорщина), Кошицький університет ім. П. Й. Шафарика, Університет ім. Я. А. Коменського (Словаччина), Університет м. Орадеа, Клузький університет м. Бабеш-Бояї (Румунія), Інститут германістики Університету м. Ландау, Університет Регенсбургу (Німеччина), Асоціація гомеопатичної медицини м. Рим (Італія), Загребський університет (Хорватія), Словацьким медичним університетом (Братислава) та іншими. У 2020 році укладено 7 нових міжнародних білатеральних угод, 7 угод з реалізації міжнародних проєктів та 8 угод з метою супроводу академічної мобільності Erasmus+.",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Ужгород"),
                        UndergraduateCount = 14460,
                        StreetAddress = "вулиця Університетська, 14",
                        SiteURL = "uzhnu.edu.ua",
                        ContactInformation = "0312 643 084"
                    },
                    new Institution
                    {
                        Name = "Національний університет «Львівська Політехніка»",
                        Description = "найстаріший технічний заклад вищої освіти України та Східної Європи, заснований у 1816 році як Реальна школа з дозволу австрійського імператора Франца І.",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Львів"),
                        UndergraduateCount = 35000,
                        StreetAddress = "вул. Степана Бандери, 12",
                        SiteURL = "lp.edu.ua",
                        ContactInformation = "0322 582 111"
                    },
                };
                await context.Institutions.AddRangeAsync(institutions);
                await context.SaveChangesAsync();

                // Seed managers
                for (int i = 1; i < 12; i++)
                {
                    var institution = await context.Institutions.FindAsync(institutions[i].Id);
                    var startIndex = new Random().Next(2, 8);
                    var endIndex = startIndex + new Random().Next(0, 7 - startIndex);

                    for (; startIndex <= endIndex; startIndex++)
                    {
                        var managerEntity = await userManager.FindByEmailAsync($"testmail{startIndex}@test.com");
                        var manager = new AppUserInstitution
                        {
                            Manager = managerEntity,
                            Institution = institution,
                        };
                        institution.Managers.Add(manager);
                    }
                    await context.SaveChangesAsync();
                }


                // Seed Components
                if (!context.ComponentCores.Any())
                {
                    var componentCores = new List<ComponentCore>();
                    var componentsCoreStrings = new List<string>
                {
                    "Цивільне право",
                    "Правові висновки Верховного Cуду",
                    "Альтернативні способи вирішення суперечок",
                    "Нотаріальний процес",
                    "Порівняльне цивільне право і процес",
                    "Школа прикладної юриспруденції",
                    "Практична підготовка",
                    "Дискретна математика",
                    "Математичний аналіз",
                    "Фізика",
                    "Вступ до комп'ютерних наук",
                    "Іноземна мова",
                    "Теорія ймовірностей та математична статистика",
                    "Комп'ютерні технології обробки та візуалізації даних",
                    "Алгоритмізація та програмування",
                    "Оптимізаційні методи та моделі",
                    "Штучний інтелект",
                    "Управління ІТ-проектами",
                    "Технологія Java",
                    "Адміністрування серверних систем",
                    "Web-технології",
                    "Інженерна та комп'ютерна графіка",
                    "Технології аналізу даних",
                    "Технології створення програмних продуктів",
                    "Правознавство",
                    "Психологія",
                    "Ораторське мистецтво",
                    "Безпека життя",
                    "Історія української культури",
                    "Ораторське мистецтво",
                    "Менеджмент",
                    "Філософія",
                    "Соціологія",
                    "Логіка",
                    "Бухгалтерський облік",
                    "Організація баз даних та знань",
                    "Архітектура обчислювальних систем",
                    "Теорія управління в інформаційних системах",
                };
                    foreach (var componentStr in componentsCoreStrings)
                    {
                        componentCores.Add(new ComponentCore
                        {
                            Name = componentStr,
                        });
                    }
                    await context.ComponentCores.AddRangeAsync(componentCores);
                    await context.SaveChangesAsync();
                };
            }

            // Seed Degrees 
            if (!context.Degrees.Any())
            {
                var degrees = new List<Degree>
                {
                    new Degree
                    {
                        Name="Bachelor",
                    },
                    new Degree
                    {
                        Name="Master",
                    },
                    new Degree
                    {
                        Name="Doctorate",
                    },
                };

                await context.Degrees.AddRangeAsync(degrees);
                await context.SaveChangesAsync();
            }
            // Seed languages

            if (!context.Languages.Any())
            {
                var languages = new List<Language>
                {
                    new Language
                    {
                        Id = "en",
                        ISOLanguageName = "English",
                    },
                    new Language
                    {
                        Id = "uk",
                        ISOLanguageName="Ukrainian",
                    },
                };

                await context.Languages.AddRangeAsync(languages);
                await context.SaveChangesAsync();
            }
            // Seed studyForms

            if (!context.StudyForms.Any())
            {
                var studyForms = new List<StudyForm>
                {
                    new StudyForm
                    {
                        Name = "Full-time"
                    },
                    new StudyForm
                    {
                        Name = "Part-time"
                    },
                    new StudyForm
                    {
                        Name = "Extramural"
                    },
                };

                await context.StudyForms.AddRangeAsync(studyForms);
                await context.SaveChangesAsync();
            }
            List<string> reviewStrings = new List<string>();
            reviewStrings.Add("I couldn't have asked for a better university experience than what I received at [University Name]. The supportive community, excellent faculty, diverse academic programs, and abundant opportunities for personal growth make it stand out as one of the best universities in the country.");
            reviewStrings.Add("My time at [University Name] was a truly transformative experience. The academic programs are top-notch, the faculty are passionate and knowledgeable, and the campus community is welcoming and inclusive. I highly recommend this university to anyone seeking an exceptional education.");
            reviewStrings.Add("If you're looking for a university that provides an exceptional academic experience along with ample opportunities for personal growth, [University Name] is the place for you. With its passionate community, world-class faculty, and diverse academic programs, it truly stands out as one of the best universities in the country.");
            reviewStrings.Add("[University Name] exceeded all my expectations and then some. The supportive community, diverse academic programs, and numerous opportunities for personal growth and involvement make it an outstanding university. I highly recommend it to anyone seeking a transformative higher education experience.");
            reviewStrings.Add("As a recent graduate of [University Name], I can attest to its exceptional academic programs, passionate faculty, and welcoming community. With its diverse academic offerings and ample opportunities for personal growth and involvement, [University Name] is truly one of the best universities in the country.");

            // Seed Reviews
            if (!context.Reviews.Any())
            {
                foreach (var item in context.Institutions.ToList())
                {
                    var reviews = new List<Review>();
                    var reviewRate = new Random().Next(1, 10);
                    for (int i = 1; i < 50; i++)
                    {
                        if (new Random().Next(0, reviewRate) == 1) continue;
                        var review = new Review
                        {
                            Institution = item,
                            Author = await userManager.FindByEmailAsync($"testmail{i}@test.com"),
                            ReviewMessage = reviewStrings[new Random().Next(0, 5)],
                            Rating = new Random().Next(2, 6)
                        };
                        reviews.Add(review);
                    }
                    await context.AddRangeAsync(reviews);
                    await context.SaveChangesAsync();
                }
            }
            if (!context.Specialties.Any())
            {
                foreach (var item in context.Institutions.ToList())
                {

                    var descriptionString = @"
                    Університетська спеціальність, також відома як спеціалізація, — це цілеспрямована область навчання, яка дозволяє студентам поглиблено досліджувати певний предмет або сферу інтересів. Обираючи університетську спеціальність, студенти можуть розвинути високий рівень знань і майстерності в обраній галузі навчання. Вони також можуть отримати практичні навички та знання, які мають відношення до їхньої майбутньої кар’єри чи академічної діяльності.

Університетські спеціальності можуть охоплювати широкий спектр предметів і дисциплін, включаючи науку, технології, інженерію, математику, соціальні науки, гуманітарні науки, мистецтво тощо. Кожна університетська спеціальність має власний унікальний набір вимог, результатів навчання та очікувань, які покликані підготувати студентів до успіху в обраній сфері.

Однією з ключових особливостей університетської спеціальності є вимога до відданості та працьовитості. Очікується, що студенти, які обирають університетську спеціальність, будуть високомотивованими та відданими навчанню. Вони повинні володіти сильним критичним мисленням, аналітичними та дослідницькими навичками, а також бути готовими брати участь у незалежних дослідженнях.

Іншим важливим аспектом університетської спеціальності є зосередженість на практичному застосуванні та реальному досвіді. Студентам надається можливість отримати практичний досвід через стажування, кооперативні програми, дослідницькі проекти та інші форми експериментального навчання. Це дозволяє їм розвивати практичні навички та знання, які цінують роботодавці та аспіранти.
                    ";
                    var specialties = new List<Specialty>();
                    foreach (var sc in context.SpecialtyCores.ToList())
                    {
                        if (new Random().Next(0, 15) == 1)
                            continue;
                        var specialty = new Specialty
                        {
                            SpecialtyCore = sc,
                            Description = descriptionString,
                            PriceUAH = new Random().Next(60000, 400000),
                            StartYear = 2023,
                            EndYear = 2027,
                            Institution = item,
                        };
                        specialties.Add(specialty);
                    }

                    await context.AddRangeAsync(specialties);
                    await context.SaveChangesAsync();
                }
            }

            //Seed components into specialties
            if (context.Components.Any())
            {
                foreach (var item in context.Specialties.ToList())
                {
                    var components = new List<Component>();

                    foreach (var componentCore in context.ComponentCores.ToList())
                    {
                        if (new Random().Next(0, 15) == 0)
                            continue;
                        var eCreds = new Random().Next(0, 3);
                        components.Add(new Component
                        {
                            ComponentCore = componentCore,
                            ECTSCredits = eCreds == 0 ? 6 : eCreds == 1 ? 12 : 18,
                            isOptional = new Random().Next(0, 20) == 0,
                            Specialty = item,
                        });
                    }
                    await context.AddRangeAsync(components);
                    await context.SaveChangesAsync();
                }
            }
            // Seed Skills to Specialties
            if (!context.Skills.Any())
            {
                var skills = new List<string>
                {
                    "C#",
                    "Java",
                    "Python",
                    "JavaScript",
                    "SQL",
                    "HTML",
                    "CSS",
                    "PHP",
                    "C++",
                    "Ruby",
                    "Swift",
                    "Objective-C",
                    "Go",
                    "Scala",
                    "Kotlin",
                    "Rust",
                    "Assembly",
                    "MATLAB",
                    "Perl",
                    "Visual Basic",
                    "TypeScript",
                    "React",
                    "Angular",
                    "Vue.js",
                    "Node.js",
                    "jQuery",
                    "Bootstrap",
                    "Sass",
                    "Less",
                    "Webpack",
                    "Gulp",
                    "Grunt",
                    "Git",
                    "GitHub",
                    "Bitbucket",
                    "SVN",
                    "Docker",
                    "Kubernetes",
                    "AWS",
                    "Azure",
                    "Google Cloud Platform",
                    "Firebase",
                    "Heroku",
                    "Netlify",
                    "MongoDB",
                    "MySQL",
                    "PostgreSQL",
                    "Oracle",
                    "Redis",
                    "Elasticsearch",
                    "Cassandra",
                    "Neo4j",
                    "Hadoop",
                    "Spark",
                    "Kafka",
                    "RabbitMQ",
                    "Nginx",
                    "Apache",
                    "IIS",
                    "Linux",
                    "Unix",
                    "Windows",
                    "MacOS",
                    "iOS",
                    "Android",
                    "React Native",
                    "Flutter",
                    "Ionic",
                    "Xamarin",
                    "Unity",
                    "Unreal Engine",
                    "Photoshop",
                    "Illustrator",
                    "InDesign",
                    "Premiere Pro",
                    "After Effects",
                    "Final Cut Pro",
                    "Blender",
                    "Maya",
                    "3ds Max",
                    "AutoCAD",
                    "SolidWorks",
                    "SketchUp",
                    "Revit",
                    "Rhino",
                    "Grasshopper",
                    "Figma",
                    "Adobe XD",
                    "InVision",
                    "Zeplin",
                    "Sketch",
                    "Marvel",
                    "Principle",
                    "Axure",
                    "Balsamiq",
                    "Lucidchart",
                    "Trello",
                    "Asana",
                    "Jira",
                    "Slack",
                    "Microsoft Office",
                    "Google Suite",
                    "Zoom",
                    "WebEx",
                    "Skype",
                    "Teams",
                    "Salesforce",
                    "HubSpot",
                    "Zoho",
                    "Mailchimp",
                    "ActiveCampaign",
                    "Constant Contact",
                    "Sendinblue",
                    "Hootsuite",
                    "Buffer",
                    "Sprout Social",
                    "Google Analytics",
                    "Google Ads",
                    "Facebook Ads",
                    "Instagram Ads",
                    "LinkedIn Ads",
                    "Twitter Ads",
                    "SEO",
                    "PPC",
                    "SEM",
                    "Content Marketing",
                    "Email Marketing",
                    "Social Media Marketing",
                    "Affiliate Marketing",
                    "Influencer Marketing",
                    "Video Marketing",
                    "Mobile Marketing",
                    "Analytics",
                    "Data Science",
                    "Machine Learning",
                    "Artificial Intelligence",
                    "Big Data",
                    "Data Mining",
                    "Data Visualization",
                    "Statistical Analysis",
                    "Quantitative Analysis",
                    "Qualitative Analysis",
                    "Market Research",
                    "Business Intelligence",
                    "Project Management",
                    "Agile Methodology",
                    "Scrum",
                    "Kanban",
                    "Waterfall",
                    "PR",
                    "Media Relations",
                    "Crisis Communications",
                    "Internal Communications",
                    "Brand Management",
                    "Public Speaking",
                    "Presentation Skills",
                    "Leadership",
                    "Team Management",
                    "Conflict Resolution",
                    "Time Management",
                    "Organizational Skills",
                    "Problem Solving",
                    "Decision Making",
                    "Critical Thinking",
                    "Creativity",
                    "Innovation",
                    "Collaboration",
                    "Networking",
                    "Negotiation",
                    "Sales",
                    "Business Development",
                    "Account Management",
                    "Customer Service",
                    "Client Relations",
                    "Product Management",
                    "Product Development",
                    "Product Marketing",
                    "User Experience (UX)",
                    "User Interface (UI)",
                    "Interaction Design",
                    "Visual Design",
                    "Graphic Design",
                    "Motion Graphics",
                    "Animation",
                    "Game Design",
                    "Virtual Reality",
                    "Augmented Reality",
                    "Web Design",
                    "Mobile Design",
                    "Front-End Development",
                    "Back-End Development",
                    "Full-Stack Development",
                    "DevOps",
                    "Quality Assurance",
                    "Testing",
                    "Security",
                    "Cybersecurity",
                    "Network Security",
                    "Information Security",
                    "Ethical Hacking",
                    "Penetration Testing",
                    "Compliance",
                    "Risk Management",
                    "Financial Analysis",
                    "Accounting",
                    "Bookkeeping",
                    "Taxation",
                    "Auditing",
                    "Investment Management",
                    "Financial Planning",
                    "Insurance",
                    "Real Estate",
                    "Law",
                    "Legal Research",
                    "Legal Writing",
                    "Contracts",
                    "Intellectual Property",
                    "Corporate Law",
                    "International Law",
                    "Human Resources",
                    "Recruiting",
                    "Onboarding",
                    "Training",
                    "Compensation and Benefits",
                    "Employee Relations",
                    "Workforce Planning",
                    "Talent Management",
                    "Diversity and Inclusion",
                    "Performance Management",
                    "Learning and Development",
                    "Organizational Development",
                    "Change Management",
                    "Employee Engagement",
                    "Wellness",
                    "Health and Safety",
                    "Environmental Sustainability",
                    "Corporate Social Responsibility",
                    "Nonprofit Management",
                    "Fundraising",
                    "Grant Writing",
                    "Program Management",
                    "Community Outreach",
                    "Volunteer Management",
                    "Social Services",
                    "Education",
                    "Curriculum Development",
                    "Teaching",
                    "Instructional Design",
                    "E-Learning",
                    "Student Affairs",
                    "Academic Advising",
                    "Research",
                    "Writing",
                    "Copywriting",
                    "Editing",
                    "Proofreading",
                    "Content Development",
                    "Technical Writing",
                    "Journalism",
                    "Blogging",
                    "Social Media",
                    "Photography",
                    "Videography",
                    "Music Production",
                    "Sound Design",
                    "Audio Engineering",
                    "Film Production",
                    "Screenwriting",
                    "Acting",
                    "Theater",
                    "Dance",
                    "Fine Arts",
                    "Museum Studies",
                    "Library Science",
                    "Archives",
                    "History",
                    "Anthropology",
                    "Sociology",
                    "Psychology",
                    "Counseling",
                    "Social Work",
                    "Political Science",
                    "International Relations",
                    "Economics",
                    "Geography",
                    "Environmental Science",
                    "Biology",
                    "Chemistry",
                    "Physics",
                    "Mathematics",
                    "Statistics",
                    "Engineering",
                    "Architecture",
                    "Urban Planning",
                    "Transportation Planning",
                    "Energy",
                    "Renewable Energy",
                    "Mechanical Engineering",
                    "Electrical Engineering",
                    "Civil Engineering",
                    "Aerospace Engineering",
                    "Biomedical Engineering",
                    "Chemical Engineering",
                    "Materials Science",
                    "Computer Science",
                    "Artificial Intelligence",
                    "Machine Learning",
                    "Data Science",
                    "Data Analysis",
                    "Big Data",
                    "Data Visualization",
                    "Database Management",
                    "Cloud Computing",
                    "Information Technology",
                    "Software Development",
                    "Agile Methodology",
                    "Scrum",
                    "Project Management",
                    "Program Management",
                    "Portfolio Management",
                    "Business Analysis",
                    "Business Intelligence",
                    "Business Process Improvement",
                    "Six Sigma",
                    "Lean Manufacturing",
                    "Supply Chain Management",
                    "Logistics",
                    "Procurement",
                    "Operations Management",
                    "Quality Control",
                    "Quality Assurance",
                    "Customer Relationship Management (CRM)",
                    "Marketing",
                    "Digital Marketing",
                    "Search Engine Optimization (SEO)",
                    "Search Engine Marketing (SEM)",
                    "Email Marketing",
                    "Content Marketing",
                    "Social Media Marketing",
                    "Affiliate Marketing",
                    "Influencer Marketing",
                    "Brand Strategy",
                    "Marketing Analytics",
                    "Market Research",
                    "Consumer Behavior",
                    "Product Design",
                    "Product Strategy",
                    "Product Launch",
                    "Innovation Management",
                    "Entrepreneurship",
                    "Startups",
                    "Venture Capital",
                    "Angel Investing",
                    "Mergers and Acquisitions",
                    "Corporate Finance",
                    "Investment Banking",
                    "Private Equity",
                    "Hedge Funds",
                    "Asset Management",
                    "Trading",
                    "Quantitative Analysis",
                    "Risk Analysis",
                    "Financial Modeling",
                    "Derivatives",
                    "Fixed Income",
                    "Equity Research",
                    "Sales and Trading",
                    "Wealth Management",
                    "Retail Banking",
                    "Commercial Banking",
                    "Investor Relations",
                    "Public Relations",
                    "Event Planning",
                    "Hospitality",
                    "Tourism",
                    "Customer Experience",
                    "User Research",
                    "Marketplace Management",
                    "Retail Operations",
                    "E-commerce",
                    "Supply Chain Optimization",
                    "Fulfillment",
                    "Inventory Management",
                    "Procure to Pay",
                    "Order to Cash",
                    "Accounts Payable",
                    "Accounts Receivable",
                    "Payroll",
                    "Treasury Management",
                    "Financial Reporting",
                    "Financial Statements",
                    "Audit",
                    "Internal Audit",
                    "External Audit",
                    "Fraud Detection",
                    "Risk Assessment",
                    "Information Management",
                    "Data Governance",
                    "Master Data Management",
                    "Metadata Management",
                    "Data Warehousing",
                    "ETL",
                    "Data Integration",
                    "Data Migration",
                    "Data Cleansing",
                    "Data Quality",
                    "Data Privacy",
                    "Data Protection",
                    "Data Ethics",
                    "Artificial Intelligence Ethics",
                    "Machine Learning Ethics",
                    "Cyber Ethics",
                    "Digital Ethics",
                    "Social Ethics",
                    "Environmental Ethics",
                    "Healthcare Ethics",
                    "Legal Ethics",
                    "Business Ethics",
                    "Media Ethics",
                    "Research Ethics",
                    "Ethics Education",
                    "Ethics Consulting",
                    "Ethics Training",
                    "Ethics Auditing",
                    "Ethics Compliance",
                    "Ethics Investigations",
                    "Ethics Policy Development",
                    "Ethics Risk Management",
                    "Ethics Reporting",
                    "Ethics Governance",
                    "Ethics Leadership",
                    "Ethics Culture",
                    "Ethics Strategy",
                    "Ethics Innovation",
                    "Ethics Sustainability",
                    "Ethics Advocacy",
                    "Intellectual Property Law",
                    "Contract Law",
                    "Corporate Law",
                    "Criminal Law",
                    "Environmental Law",
                    "Family Law",
                    "Health Law",
                    "Immigration Law",
                    "International Law",
                    "Labor Law",
                    "Real Estate Law",
                    "Tax Law",
                    "Litigation",
                    "Alternative Dispute Resolution (ADR)",
                    "Mediation",
                    "Arbitration",
                    "Negotiation",
                    "Employment Law",
                    "Intellectual Property",
                    "Patent Law",
                    "Trademark Law",
                    "Copyright Law",
                    "Trade Secret Law",
                    "Entertainment Law",
                    "Sports Law",
                    "Bankruptcy Law",
                    "Mergers and Acquisitions Law",
                    "Securities Law",
                    "Insurance Law",
                    "Public Interest Law",
                    "Human Rights Law",
                    "Civil Rights Law",
                    "International Development",
                    "International Relations",
                    "International Trade",
                    "Diplomacy",
                    "Foreign Policy",
                    "International Security",
                    "International Law and Organizations",
                    "International Humanitarian Law",
                    "Peace and Conflict Studies",
                    "Humanitarian Assistance",
                    "Social Work",
                    "Counseling",
                    "Psychology",
                    "Psychotherapy",
                    "Psychiatry",
                    "Behavioral Therapy",
                    "Cognitive Therapy",
                    "Emotion-focused Therapy",
                    "Existential Therapy",
                    "Gestalt Therapy",
                    "Humanistic Therapy",
                    "Interpersonal Therapy",
                    "Mindfulness-based Therapy",
                    "Narrative Therapy",
                    "Person-centered Therapy",
                    "Psychodynamic Therapy",
                    "Solution-focused Therapy",
                    "Art Therapy",
                    "Music Therapy",
                    "Dance Therapy",
                    "Play Therapy",
                    "Occupational Therapy",
                    "Physical Therapy",
                    "Speech Therapy",
                    "Rehabilitation",
                    "Gerontology",
                    "Public Health",
                    "Epidemiology",
                    "Health Promotion",
                    "Health Education",
                    "Health Policy",
                    "Healthcare Management",
                    "Nursing",
                    "Medical Assisting",
                    "Medical Billing and Coding",
                    "Pharmacy",
                    "Radiology",
                    "Medical Imaging",
                    "Medical Laboratory Science",
                    "Biotechnology",
                    "Bioinformatics",
                    "Genomics",
                    "Proteomics",
                    "Biochemistry",
                    "Molecular Biology",
                    "Cell Biology",
                    "Immunology",
                    "Microbiology",
                    "Ecology",
                    "Evolutionary Biology",
                    "Behavioral Ecology",
                    "Conservation Biology",
                    "Zoology",
                    "Botany",
                    "Marine Biology",
                    "Paleontology",
                    "Geology",
                    "Physical Geography",
                    "Human Geography",
                    "Cartography",
                    "Geographic Information Systems (GIS)",
                    "Remote Sensing",
                    "Environmental Science",
                    "Climate Science",
                    "Atmospheric Science",
                    "Oceanography",
                    "Meteorology",
                    "Astronomy",
                    "Astrophysics",
                    "Cosmology",
                    "Particle Physics",
                    "Nuclear Physics",
                    "Condensed Matter Physics",
                    "Optics",
                    "Acoustics",
                    "Fluid Mechanics",
                    "Solid Mechanics",
                    "Thermodynamics",
                    "Electromagnetism",
                    "Computer Hardware",
                    "Computer Networking",
                    "Information Security",
                    "Cybersecurity",
                    "Computer Forensics",
                    "Data Recovery",
                    "Computer Vision",
                    "Natural Language Processing",
                    "Robotics",
                    "Embedded Systems",
                    "Internet of Things (IoT)",
                    "Virtual Reality (VR)",
                    "Augmented Reality (AR)",
                    "Artificial Intelligence (AI)",
                    "Machine Learning",
                    "Deep Learning",
                    "Neural Networks",
                    "Computer Graphics",
                    "User Interface (UI) Design",
                    "User Experience (UX) Design",
                    "Web Development",
                    "Front-end Development",
                    "Back-end Development",
                    "Full-stack Development",
                    "Mobile Development",
                    "iOS Development",
                    "Android Development",
                    "Game Development",
                    "Unity Development",
                    "Unreal Engine Development",
                    "Software Development",
                    "Agile Development",
                    "Waterfall Development",
                    "Scrum",
                    "Kanban",
                    "DevOps",
                    "Cloud Computing",
                    "Amazon Web Services (AWS)",
                    "Microsoft Azure",
                    "Google Cloud Platform (GCP)",
                    "Blockchain",
                    "Cryptocurrency",
                    "Financial Analysis",
                    "Investment Management",
                    "Financial Planning",
                    "Financial Modeling",
                    "Accounting",
                    "Bookkeeping",
                    "Auditing",
                    "Tax Preparation",
                    "Risk Management",
                    "Insurance",
                    "Actuarial Science",
                    "Statistics",
                    "Data Analysis",
                    "Data Visualization",
                    "Business Intelligence",
                    "Big Data",
                    "Data Science",
                    "Marketing",
                    "Digital Marketing",
                    "Content Marketing",
                    "Social Media Marketing",
                    "Email Marketing",
                    "Search Engine Optimization (SEO)",
                    "Pay-per-click (PPC) Advertising",
                    "Affiliate Marketing",
                    "Sales",
                    "Business Development",
                    "Account Management",
                    "Customer Relationship Management (CRM)",
                    "Supply Chain Management",
                    "Logistics",
                    "Operations Management",
                    "Project Management",
                    "Product Management",
                    "Quality Assurance (QA)",
                    "Quality Control (QC)",
                    "Six Sigma",
                    "Lean Management",
                    "Human Resources",
                    "Talent Acquisition",
                    "Employee Relations",
                    "Compensation and Benefits",
                    "Training and Development",
                    "Organizational Development",
                    "Leadership Development",
                    "Change Management",
                    "Executive Coaching",
                    "Performance Management",
                    "Office Administration",
                    "Executive Assistance",
                    "Administrative Support",
                    "Event Planning",
                    "Hospitality",
                    "Travel Planning",
                    "Facilities Management",
                    "Property Management",
                    "Real Estate",
                    "Interior Design",
                    "Architecture",
                    "Construction",
                    "Civil Engineering",
                    "Mechanical Engineering",
                    "Electrical Engineering",
                    "Chemical Engineering",
                    "Aerospace Engineering",
                    "Materials Engineering",
                    "Industrial Engineering",
                    "Manufacturing",
                    "Supply Chain Optimization",
                    "Product Design",
                    "Quality Engineering",
                    "Testing",
                    "Maintenance",
                    "Technical Writing",
                    "Technical Editing",
                    "Translation",
                    "Localization",
                    "Copywriting",
                    "Content Writing",
                    "Creative Writing",
                    "Journalism",
                    "Public Relations",
                    "Corporate Communications",
                    "Advertising",
                    "Media Production",
                    "Film Production",
                    "Television Production",
                    "Radio Production",
                    "Audio Production",
                    "Graphic Design",
                    "Illustration",
                    "Motion Graphics",
                    "Animation",
                    "Industrial Design",
                    "Fashion Design",
                    "Jewelry Design",
                    "Fine Arts",
                    "Visual Arts",
                    "Performing Arts",
                    "Music",
                    "Theater",
                    "Dance",
                    "Photography",
                    "Photo Editing",
                    "Video Editing",
                    "Sound Design",
                    "Game Design",
                    "Game Art",
                    "Game Programming",
                    "Game Testing",
                    "Sports Coaching",
                    "Athletic Training",
                };
                var filteredSkills = skills.Distinct().ToList();
                var skillObjectList = new List<Skill>();
                foreach (var item in filteredSkills)
                {
                    skillObjectList.Add(new Skill
                    {
                        Name = item
                    });
                }

                await context.AddRangeAsync(skillObjectList);
                await context.SaveChangesAsync();

                foreach (var item in context.Specialties.Include(x => x.Components).ToList())
                {
                    var skills1 = new List<Skill>();
                    var sIndex = new Random().Next(1, await context.Skills.CountAsync() - 21);
                    var eIndex = sIndex + 20;
                    for (; sIndex < eIndex; sIndex++)
                    {
                        skills1.Add(await context.Skills.FirstOrDefaultAsync(x => x.Id == sIndex));
                    }
                    var componentsECTSCreds = item.Components.Select(x => x.ECTSCredits).Sum();
                    item.EctsCredits = componentsECTSCreds + new Random().Next(0, 2) == 1 ? 20 : 40;
                    item.AcceptanceRate = new Random().Next(5, 90);
                    item.GraduationRate = new Random().Next(20, 90);
                    item.GraduateEmploymentRate = new Random().Next(20, 90);
                    item.UndergraduateCount = new Random().Next(20, 150);
                    item.Skills = skills1;
                    item.Languages = new List<Language> { await context.Languages.FirstOrDefaultAsync(x => x.Id == "uk"), await context.Languages.FirstOrDefaultAsync(x => x.Id == "en") };
                    item.Degree = await context.Degrees.FirstOrDefaultAsync(x => x.Id == 1);
                    item.StudyForms = new List<StudyForm> { await context.StudyForms.FirstOrDefaultAsync(x => x.Id == 1) };
                    await context.SaveChangesAsync();
                }
                foreach (var item in context.Institutions.ToList())
                {
                    item.Type = await context.InstitutionTypes.FirstOrDefaultAsync(x => x.Id == 1);
                    item.UndergraduateCount = item.Specialties.Select(x => x.UndergraduateCount).Sum() + new Random().Next(0, 5000); ;
                    item.Accreditation = new Random().Next(3, 5);
                    item.Coordinates = new Coordinates { Latitude = 49.320175149, Longitude = 32.6557279 };
                    await context.SaveChangesAsync();
                }
            }

        }
    }
}