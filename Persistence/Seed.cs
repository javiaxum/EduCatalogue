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

            if (!context.Cities.Any())
            {
                var cities = new List<City>
                {
                    new City
                    {
                        Name = "Київ",
                    },
                    new City
                    {
                        Name = "Буча",
                    },
                    new City
                    {
                        Name = "Одесса",
                    },
                    new City
                    {
                        Name = "Житомир",
                    },
                    new City
                    {
                        Name = "Харків",
                    },
                    new City
                    {
                        Name = "Львів",
                    },
                    new City
                    {
                        Name = "Чернівці",
                    },
                    new City
                    {
                        Name = "Тернопіль",
                    },
                };
                await context.Cities.AddRangeAsync(cities);
                await context.SaveChangesAsync();
            }
            // Seed specialtyCores
            if (!context.SpecialtyCores.Any())
            {
                var specialtyCores = new List<SpecialtyCore>
                {
                    new SpecialtyCore
                    {
                        LICore = new LocalIdentifierCore
                        {
                            Id="011",
                            Name="Освітні, педагогічні науки",
                        },
                        ISCEDCore = new ISCEDCore
                        {
                            Id="0111",
                            Name="Education science"
                        },
                        LocalBranch = await context.Branches.FindAsync("01"),
                    },
                    new SpecialtyCore
                    {
                        LICore = new LocalIdentifierCore
                        {
                            Id="012",
                            Name="Дошкільна освіта",
                        },
                        ISCEDCore = new ISCEDCore
                        {
                            Id="0112",
                            Name="Training for pre-school teachers"
                        },
                        LocalBranch = await context.Branches.FindAsync("01"),
                    },
                    new SpecialtyCore
                    {
                        LICore = new LocalIdentifierCore
                        {
                            Id="013",
                            Name="Початкова освіта",
                        },
                        ISCEDCore = new ISCEDCore
                        {
                            Id="0113",
                            Name="Teacher training without subject specialisation"
                        },
                        LocalBranch = await context.Branches.FindAsync("01"),
                    },
#region Deprecated
	                //     new SpecialtyCore
	                //     {
	                //         Name="Середня освіта (за предметними спеціальностями)",
	                //         UaCode="014",
	                //         IscedCode="0114"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Професійна освіта (за спеціалізаціями)",
	                //         UaCode="015",
	                //         IscedCode="0113"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Спеціальна освіта",
	                //         UaCode="016",
	                //         IscedCode="0113"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Фізична культура і спорт",
	                //         UaCode="017",
	                //         IscedCode="1014"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Аудіовізуальне мистецтво та виробництво",
	                //         UaCode="021",
	                //         IscedCode="0211"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Дизайн",
	                //         UaCode="022",
	                //         IscedCode="0212"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Образотворче мистецтво, декоративне мистецтво, реставрація",
	                //         UaCode="023",
	                //         IscedCode="0213, 0214"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Хореографія",
	                //         UaCode="024",
	                //         IscedCode="0215"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Музичне мистецтво",
	                //         UaCode="025",
	                //         IscedCode="0215"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Сценічне мистецтво",
	                //         UaCode="026",
	                //         IscedCode="0215"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Музеєзнавство, пам’яткознавство",
	                //         UaCode="027",
	                //         IscedCode="0322"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Менеджмент соціокультурної діяльності",
	                //         UaCode="028",
	                //         IscedCode="0413"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Музеєзнавство, пам’яткознавство",
	                //         UaCode="029",
	                //         IscedCode="0322"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Релігієзнавство",
	                //         UaCode="031",
	                //         IscedCode="0221"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Історія та археологія",
	                //         UaCode="032",
	                //         IscedCode="0222"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Філософія",
	                //         UaCode="033",
	                //         IscedCode="0223"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Культурологія",
	                //         UaCode="034",
	                //         IscedCode="0314"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Філологія",
	                //         UaCode="035",
	                //         IscedCode="0231, 0232"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Богослов’я",
	                //         UaCode="041",
	                //         IscedCode="0221"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Економіка",
	                //         UaCode="051",
	                //         IscedCode="0311"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Політологія",
	                //         UaCode="052",
	                //         IscedCode="0312"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Психологія",
	                //         UaCode="053",
	                //         IscedCode="0313"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Соціологія",
	                //         UaCode="054",
	                //         IscedCode="0314"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Журналістика",
	                //         UaCode="061",
	                //         IscedCode="0321"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Облік і оподаткування",
	                //         UaCode="071",
	                //         IscedCode="0411"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Фінанси, банківська справа, страхування та фондовий ринок",
	                //         UaCode="072",
	                //         IscedCode="0412"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Менеджмент",
	                //         UaCode="073",
	                //         IscedCode="0413, 0415"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Маркетинг",
	                //         UaCode="075",
	                //         IscedCode="0414"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Підприємництво та торгівля",
	                //         UaCode="076",
	                //         IscedCode="0413, 0416"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Право",
	                //         UaCode="081",
	                //         IscedCode="0421"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Біологія та біохімія",
	                //         UaCode="091",
	                //         IscedCode="0511, 0512, 0522"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Екологія",
	                //         UaCode="101",
	                //         IscedCode="0521, 0522"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Хімія",
	                //         UaCode="102",
	                //         IscedCode="0531"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Науки про Землю**",
	                //         UaCode="103",
	                //         IscedCode="0532"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Фізика та астрономія",
	                //         UaCode="104",
	                //         IscedCode="0533"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Прикладна фізика та наноматеріали",
	                //         UaCode="105",
	                //         IscedCode="0533, 0588"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Географія",
	                //         UaCode="106",
	                //         IscedCode="0314, 0532"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Математика",
	                //         UaCode="111",
	                //         IscedCode="0541"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Статистика",
	                //         UaCode="112",
	                //         IscedCode="0542"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Прикладна математика",
	                //         UaCode="113",
	                //         IscedCode="0541, 0588, 0613"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Інженерія програмного забезпечення",
	                //         UaCode="121",
	                //         IscedCode="0613"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Комп’ютерні науки",
	                //         UaCode="122",
	                //         IscedCode="0613"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Комп’ютерна інженерія",
	                //         UaCode="123",
	                //         IscedCode="0612, 0714"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Системний аналіз",
	                //         UaCode="124",
	                //         IscedCode="0688"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Кібербезпека та захист інформації",
	                //         UaCode="125",
	                //         IscedCode="0612"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Інформаційні системи та технології",
	                //         UaCode="126",
	                //         IscedCode="0611, 0612"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Прикладна механіка",
	                //         UaCode="131",
	                //         IscedCode="0715"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Матеріалознавство",
	                //         UaCode="132",
	                //         IscedCode="0588, 0715, 0788"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Галузеве машинобудування",
	                //         UaCode="133",
	                //         IscedCode="0715, 0716"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Авіаційна та ракетно-космічна техніка",
	                //         UaCode="134",
	                //         IscedCode="0716"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Суднобудування",
	                //         UaCode="135",
	                //         IscedCode="0716"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Металургія",
	                //         UaCode="136",
	                //         IscedCode="0715"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Електроенергетика, електротехніка та електромеханіка",
	                //         UaCode="141",
	                //         IscedCode="0713"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Енергетичне машинобудування",
	                //         UaCode="142",
	                //         IscedCode="0713, 0716"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Атомна енергетика",
	                //         UaCode="143",
	                //         IscedCode="0713"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Теплоенергетика",
	                //         UaCode="144",
	                //         IscedCode="0713"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Відновлювані джерела енергії та гідроенергетика",
	                //         UaCode="145",
	                //         IscedCode="0713"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Хімічні технології та інженерія",
	                //         UaCode="161",
	                //         IscedCode="0711"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Біотехнології та біоінженерія",
	                //         UaCode="162",
	                //         IscedCode="0512, 0711"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Біомедична інженерія",
	                //         UaCode="163",
	                //         IscedCode="0588, 0788"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Електроніка",
	                //         UaCode="171",
	                //         IscedCode="0714"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Електронні комунікації та радіотехніка",
	                //         UaCode="172",
	                //         IscedCode="0714"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Авіоніка",
	                //         UaCode="173",
	                //         IscedCode="0714, 0716"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Автоматизація, комп’ютерно-інтегровані технології та робототехніка",
	                //         UaCode="174",
	                //         IscedCode="0714"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Інформаційно-вимірювальні технології",
	                //         UaCode="175",
	                //         IscedCode="0714, 0788"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Мікро- та наносистемна техніка",
	                //         UaCode="176",
	                //         IscedCode="0714, 0788"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Харчові технології",
	                //         UaCode="181",
	                //         IscedCode="0721"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Технології легкої промисловості",
	                //         UaCode="182",
	                //         IscedCode="0723"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Технології захисту навколишнього середовища",
	                //         UaCode="183",
	                //         IscedCode="0712"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Гірництво",
	                //         UaCode="184",
	                //         IscedCode="0724"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Нафтогазова інженерія та технології",
	                //         UaCode="185",
	                //         IscedCode="0724? (no ISCED were specified in the law)"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Видавництво та поліграфія",
	                //         UaCode="186",
	                //         IscedCode="0211, 0611"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Деревообробні та меблеві технології",
	                //         UaCode="187",
	                //         IscedCode="0722"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Архітектура та містобудування",
	                //         UaCode="191",
	                //         IscedCode="0731"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Будівництво та цивільна інженерія",
	                //         UaCode="192",
	                //         IscedCode="0732"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Геодезія та землеустрій",
	                //         UaCode="193",
	                //         IscedCode="0532, 0731"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Гідротехнічне будівництво, водна інженерія та водні технології",
	                //         UaCode="194",
	                //         IscedCode="0732"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Агрономія",
	                //         UaCode="201",
	                //         IscedCode="0811"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Захист і карантин рослин",
	                //         UaCode="202",
	                //         IscedCode="0811"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Садівництво, плодоовочівництво та виноградарство",
	                //         UaCode="203",
	                //         IscedCode="0811, "
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Технологія виробництва і переробки продукції тваринництва",
	                //         UaCode="204",
	                //         IscedCode="0811"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Лісове господарство",
	                //         UaCode="205",
	                //         IscedCode="0821"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Садово-паркове господарство",
	                //         UaCode="206",
	                //         IscedCode="0812"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Водні біоресурси та аквакультура",
	                //         UaCode="207",
	                //         IscedCode="831"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Агроінженерія",
	                //         UaCode="208",
	                //         IscedCode="0716, 0888"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Ветеринарна медицина",
	                //         UaCode="211",
	                //         IscedCode="0841, 1022"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Стоматологія",
	                //         UaCode="221",
	                //         IscedCode="0911"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Медицина",
	                //         UaCode="222",
	                //         IscedCode="0912"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Медсестринство",
	                //         UaCode="223",
	                //         IscedCode="0913"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Технології медичної діагностики та лікування",
	                //         UaCode="224",
	                //         IscedCode="0914"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Медична психологія",
	                //         UaCode="225",
	                //         IscedCode="0313"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Фармація, промислова фармація",
	                //         UaCode="226",
	                //         IscedCode="0588, 0711, 0916"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Терапія та реабілітація",
	                //         UaCode="227",
	                //         IscedCode="0915"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Педіатрія",
	                //         UaCode="228",
	                //         IscedCode="0912"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Громадське здоров’я",
	                //         UaCode="229",
	                //         IscedCode="0413, 0988, 1021, 1022"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Соціальна робота",
	                //         UaCode="231",
	                //         IscedCode="0921, 0922, 0923"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Соціальне забезпечення",
	                //         UaCode="232",
	                //         IscedCode="0413, 0923"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Готельно-ресторанна справа",
	                //         UaCode="241",
	                //         IscedCode="1013"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Туризм і рекреація",
	                //         UaCode="242",
	                //         IscedCode="1015"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Державна безпека",
	                //         UaCode="251",
	                //         IscedCode="1031"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Безпека державного кордону",
	                //         UaCode="252",
	                //         IscedCode="1031"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Військове управління (за видами збройних сил)",
	                //         UaCode="253",
	                //         IscedCode="1031"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Забезпечення військ (сил)",
	                //         UaCode="254",
	                //         IscedCode="1031"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Озброєння та військова техніка",
	                //         UaCode="255",
	                //         IscedCode="1031"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Національна безпека (за окремими сферами забезпечення і видами діяльності)***",
	                //         UaCode="256",
	                //         IscedCode="1031"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Управління інформаційною безпекою",
	                //         UaCode="257",
	                //         IscedCode="1031"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Пожежна безпека",
	                //         UaCode="261",
	                //         IscedCode="1032"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Правоохоронна діяльність",
	                //         UaCode="262",
	                //         IscedCode="1032? (no ISCED were specified in the law)"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Цивільна безпека",
	                //         UaCode="263",
	                //         IscedCode="1022, 1032"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Морський та внутрішній водний транспорт****",
	                //         UaCode="271",
	                //         IscedCode="0716, 1041"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Авіаційний транспорт",
	                //         UaCode="272",
	                //         IscedCode="0716, 1041"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Залізничний транспорт",
	                //         UaCode="273",
	                //         IscedCode="0716, 0732, 1041"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Автомобільний транспорт",
	                //         UaCode="274",
	                //         IscedCode="0716, 1041"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Транспортні технології (за видами)",
	                //         UaCode="275",
	                //         IscedCode="1041"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Публічне управління та адміністрування",
	                //         UaCode="281",
	                //         IscedCode="0413"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Міжнародні відносини, суспільні комунікації та регіональні студії",
	                //         UaCode="291",
	                //         IscedCode="0312, 0314, 0388"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Міжнародні економічні відносини",
	                //         UaCode="292",
	                //         IscedCode="0311, 0312"
	                //     },
	                //     new SpecialtyCore
	                //     {
	                //         Name="Міжнародне право",
	                //         UaCode="293",
	                //         IscedCode="0421"
	                //     },
#endregion
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
                        Name = "Національний технічний університет «Харківський політехнічний інститут»",
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
                var specialtyCore1 = await context.SpecialtyCores.FirstOrDefaultAsync(x => x.LICore.Id == "012");
                var specialtyCore2 = await context.SpecialtyCores.FirstOrDefaultAsync(x => x.LICore.Id == "011");
                var specialties = new List<Specialty>
                {
                    new Specialty
                    {
                        SpecialtyCore = specialtyCore1,
                        Description = "Specialty test description",
                        EctsCredits = 240,
                        Degree = "Bachelor",
                        PriceUAH = 80000,
                        StartsAt = DateTime.UtcNow,
                        EndsAt = DateTime.UtcNow.AddYears(4),
                    },
                    new Specialty
                    {
                        SpecialtyCore = specialtyCore2,
                        Description = "Specialty test description",
                        EctsCredits = 180,
                        Degree = "Bachelor",
                        PriceUAH = 80001,
                        StartsAt = DateTime.UtcNow,
                        EndsAt = DateTime.UtcNow.AddYears(4),
                    },
                };
				var InstitutionSpecialty = new List<InstitutionSpecialty>
				{
					new InstitutionSpecialty
					{
						Specialty = specialties[0],
					},
					new InstitutionSpecialty
					{
						Specialty = specialties[1],
					},
				};
				institution.Specialties.Add(InstitutionSpecialty[0]);
				institution.Specialties.Add(InstitutionSpecialty[1]);
                await context.SaveChangesAsync();
            }
        }
    }
}