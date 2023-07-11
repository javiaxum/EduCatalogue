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
            var reviewDictionary = new[]
            {
                "The university provides a truly enriching academic experience with its diverse range of courses and dedicated faculty. The campus facilities are top-notch, offering a conducive environment for learning and personal growth. Overall, University stands out as an exceptional institution that nurtures students and prepares them for successful careers in their chosen fields.",
                "The university surpasses expectations with its exceptional resources, cutting-edge research opportunities, and a vibrant campus community. The faculty's expertise and passion for teaching foster an engaging learning environment, while the university's robust support services ensure student success both academically and personally. With its commitment to excellence, University is undoubtedly a top-tier institution that equips students with the skills and knowledge needed to thrive in a rapidly evolving world.",
                "Here students are not just numbers; they are valued individuals whose holistic development is prioritized. The university's commitment to inclusivity and diversity is evident in its comprehensive support programs and a welcoming atmosphere. With a wide array of extracurricular activities and student organizations, University goes beyond academics to foster well-rounded individuals who are ready to make a positive impact in their chosen fields.",
                "The bar is high for academic excellence with its rigorous curriculum and distinguished faculty members who are experts in their respective fields. The emphasis on practical application and real-world experiences through internships and industry partnerships equips students with invaluable skills and a competitive edge. With a vibrant campus life, state-of-the-art facilities, and a strong alumni network, University provides a well-rounded education that prepares students for a successful future.",
                "As a student, I am constantly impressed by the supportive and collaborative learning environment. The professors genuinely care about their students' success and go above and beyond to ensure their understanding and engagement. The university's commitment to innovation and research opportunities is commendable, fostering a culture of intellectual curiosity and discovery. University truly empowers its students to become lifelong learners and leaders in their respective fields",
                "I cannot speak highly enough of the career services at University X. From resume workshops to networking events and job fairs, the university's dedicated career advisors are proactive in helping students explore career paths and secure internships and job placements. The alumni network is a valuable resource, providing mentorship and professional connections that open doors to exciting opportunities. University X's commitment to career development sets it apart as an institution that prioritizes students' long-term success.",
                "One of the standout features of University is its global perspective. The university offers a wide range of study abroad programs and international exchange opportunities, allowing students to broaden their horizons and immerse themselves in different cultures. The diverse student body further enhances the multicultural environment, fostering a global mindset and preparing students to thrive in an interconnected world.",
                "This place goes beyond academics to prioritize the well-being of its students. The campus offers a wealth of support services, including counseling, health services, and student organizations focused on mental health and wellness. The inclusive and compassionate community at University ensures that students feel supported, valued, and empowered to overcome challenges and reach their full potential.",
                "In conclusion, the University exceeds expectations in every aspect, from its rigorous academics and dedicated faculty to its outstanding support services and vibrant campus life. It is a place where students can truly grow, thrive, and make lasting connections. Choosing University is an investment in a transformative educational experience that will pave the way for a successful future.",
            };


            await context.SaveChangesAsync();


            // foreach (var item in context.Institutions.ToList())
            // {
            //     if (item.Reviews != null && item.Reviews.Count > 0)
            //     {
            //         item.Rating = item.Reviews.Select(r => r.Rating).Average();
            //         item.ReviewsCount = item.Reviews.Count;
            //     }
            // }

            // Seed states with cities
            if (!context.Regions.Any())
            {
                var states = new List<Region>
                {
                    new Region
                    {
                        Name = "New York",
                        Cities = new List<City>
                        {
                            new City { Name = "New York City" },
                            new City { Name = "Buffalo" },
                            new City { Name = "Rochester" }
                        }
                    },
                    new Region
                    {
                        Name = "California",
                        Cities = new List<City>
                        {
                            new City { Name = "Los Angeles" },
                            new City { Name = "San Francisco" },
                            new City { Name = "San Diego" }
                        }
                    },
                    new Region
                    {
                        Name = "Texas",
                        Cities = new List<City>
                        {
                            new City { Name = "Houston" },
                            new City { Name = "Dallas" },
                            new City { Name = "Austin" }
                        }
                    },
                    new Region
                    {
                        Name = "Florida",
                        Cities = new List<City>
                        {
                            new City { Name = "Miami" },
                            new City { Name = "Orlando" },
                            new City { Name = "Tampa" }
                        }
                    },
                    new Region
                    {
                        Name = "Illinois",
                        Cities = new List<City>
                        {
                            new City { Name = "Chicago" },
                            new City { Name = "Springfield" },
                            new City { Name = "Peoria" }
                        }
                    }
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
                        Name = "Education/Pedagogy"
                    },
                    new Branch
                    {
                        Id = "02",
                        Name = "Culture and Art"
                    },
                    new Branch
                    {
                        Id = "03",
                        Name = "Humanities"
                    },
                    new Branch
                    {
                        Id = "04",
                        Name = "Theology"
                    },
                    new Branch
                    {
                        Id = "05",
                        Name = "Social and Behavioral Sciences"
                    },
                    new Branch
                    {
                        Id = "06",
                        Name = "Journalism"
                    },
                    new Branch
                    {
                        Id = "07",
                        Name = "Management and Administration"
                    },
                    new Branch
                    {
                        Id = "08",
                        Name = "Law"
                    },
                    new Branch
                    {
                        Id = "09",
                        Name = "Biology"
                    },
                    new Branch
                    {
                        Id = "10",
                        Name = "Natural Sciences"
                    },
                    new Branch
                    {
                        Id = "11",
                        Name = "Mathematics and Statistics"
                    },
                    new Branch
                    {
                        Id = "12",
                        Name = "Information Technology"
                    },
                    new Branch
                    {
                        Id = "13",
                        Name = "Mechanical Engineering"
                    },
                    new Branch
                    {
                        Id = "14",
                        Name = "Electrical Engineering"
                    },
                    new Branch
                    {
                        Id = "16",
                        Name = "Chemical Engineering and Bioengineering"
                    },
                    new Branch
                    {
                        Id = "17",
                        Name = "Electronics, Automation, and Electronic Communications"
                    },
                    new Branch
                    {
                        Id = "18",
                        Name = "Production and Technologies"
                    },
                    new Branch
                    {
                        Id = "19",
                        Name = "Architecture and Construction"
                    },
                    new Branch
                    {
                        Id = "20",
                        Name = "Agricultural Sciences and Food"
                    },
                    new Branch
                    {
                        Id = "21",
                        Name = "Veterinary Medicine"
                    },
                    new Branch
                    {
                        Id = "22",
                        Name = "Healthcare"
                    },
                    new Branch
                    {
                        Id = "23",
                        Name = "Social Work"
                    },
                    new Branch
                    {
                        Id = "24",
                        Name = "Service Sector"
                    },
                    new Branch
                    {
                        Id = "25",
                        Name = "Military Sciences, National Security, State Border Security"
                    },
                    new Branch
                    {
                        Id = "26",
                        Name = "Civil Security"
                    },
                    new Branch
                    {
                        Id = "27",
                        Name = "Transportation"
                    },
                    new Branch
                    {
                        Id = "28",
                        Name = "Public Administration and Management"
                    },
                    new Branch
                    {
                        Id = "29",
                        Name = "International Relations"
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
                            Name="Educational, pedagogical sciences",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0111"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="012",
                            Name="Pre-school education",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0112"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="013",
                            Name="Primary education",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0113"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="014",
                            Name="Secondary education (by subject specialties)",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0114"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="015",
                            Name="Professional education (by specialization)",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0114"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="016",
                            Name="Special education",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0113"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="017",
                            Name="Physical culture and sports",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1014"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="021",
                            Name="Audiovisual art and production",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0211"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="022",
                            Name="Design",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0212"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="023",
                            Name="Fine art, decorative art, restoration",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0213"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0214"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="024",
                            Name="Choreography",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0215"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="025",
                            Name="Musical art",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0215"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="026",
                            Name="Stage art",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0215"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="027",
                            Name="Museum studies, monument studies",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0322"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="028",
                            Name="Management of socio-cultural activities",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0413"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="029",
                            Name="Information, library and archival affairs",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0322"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0415"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="031",
                            Name="Religious studies",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0221"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="032",
                            Name="History and archaeology",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0222"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="033",
                            Name="Philosophy",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0223"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="034",
                            Name="Culturology",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0314"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="035",
                            Name="Philology",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0231"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0232"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="041",
                            Name="Theology",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0221"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="051",
                            Name="Economy",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0311"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="052",
                            Name="Politology",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0312"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="053",
                            Name="Psychology",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0313"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="054",
                            Name="Sociology",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0314"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="061",
                            Name="Journalism",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0321"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="071",
                            Name="Accounting and taxation",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0411"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="072",
                            Name="Finance, banking, insurance and stock market",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0412"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="073",
                            Name="Management",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0413"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0415"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="075",
                            Name="Marketing",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0414"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="076",
                            Name="Entrepreneurship and trade",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0413"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0416"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="081",
                            Name="Right",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0421"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="091",
                            Name="Biology and biochemistry",
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
                            Name="Ecology",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0521"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0522"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="102",
                            Name="Chemistry",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0531"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="103",
                            Name="Earth Sciences**",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0532"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="104",
                            Name="Physics and astronomy",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0533"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="105",
                            Name="Applied physics and nanomaterials",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0533"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0588"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="106",
                            Name="Geography",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0314"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="111",
                            Name="Math",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0541"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="112",
                            Name="Statistics",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0542"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="113",
                            Name="Applied Mathematics",
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
                            Name="Software engineering",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0613"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="122",
                            Name="Computer Science",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0613"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="123",
                            Name="Computer Engineering",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0612"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0714"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="124",
                            Name="System analysis",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0688"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="125",
                            Name="Cyber security and information protection",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0612"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0688"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="126",
                            Name="Information systems and technologies",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0611"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0612"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="131",
                            Name="Applied mechanics",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0715"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="132",
                            Name="Materials science",
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
                            Name="Industrial engineering",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0715"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0716"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="134",
                            Name="Aviation and rocket and space technology",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0716"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="135",
                            Name="Shipbuilding",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0716"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="136",
                            Name="Metallurgy",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0715"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="141",
                            Name="Electric power engineering, electrical engineering and electromechanics",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0713"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="142",
                            Name="Energy engineering",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0713"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0716"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="143",
                            Name="Atomic energy",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0713"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="144",
                            Name="Thermal power engineering",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0713"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="145",
                            Name="Renewable energy sources and hydropower",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0713"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="161",
                            Name="Chemical technologies and engineering",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0711"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="162",
                            Name="Biotechnology and bioengineering",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0512"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0711"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="163",
                            Name="Biomedical engineering",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0588"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0788"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="171",
                            Name="Electronics",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0714"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="172",
                            Name="Electronic communications and radio engineering",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0714"),
                        },
                    },
                    new SpecialtyCore
                    {
                            Id="173",
                            Name="Avionics",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0714"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0716"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="174",
                            Name="Automation, computer-integrated technologies and robotics",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0714"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="175",
                            Name="Information and measurement technologies",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0714"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0788"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="176",
                            Name="Micro- and nanosystem technology",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0714"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0788"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="181",
                            Name="Food technologies",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0721"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="182",
                            Name="Technologies of light industry",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0723"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="183",
                            Name="Environmental protection technologies",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0712"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="184",
                            Name="Mining",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0724"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="185",
                            Name="Oil and gas engineering and technologies",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0724"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="186",
                            Name="Publishing and printing",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0211"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0611"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="187",
                            Name="Woodworking and furniture technologies",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0722"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="191",
                            Name="Architecture and urban planning",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0731"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="192",
                            Name="Construction and civil engineering",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0732"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="193",
                            Name="Geodesy and land management",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0532"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0731"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="194",
                            Name="Hydrotechnical construction, water engineering and water technologies",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0732"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="201",
                            Name="Agronomy",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0811"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="202",
                            Name="Protection and quarantine of plants",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0811"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="203",
                            Name="Horticulture, fruit growing and viticulture",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0811"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0812"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="204",
                            Name="Technology of production and processing of animal husbandry products",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0811"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="206",
                            Name="Horticulture",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0812"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="207",
                            Name="Aquatic bioresources and aquaculture",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0831"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="208",
                            Name="Agricultural engineering",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0716"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0888"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="211",
                            Name="Veterinary medicine",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0841"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1022"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="221",
                            Name="Dentistry",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0911"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="222",
                            Name="Medicine",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0912"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="223",
                            Name="Nursing",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0913"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="224",
                            Name="Technologies of medical diagnosis and treatment",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0914"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="225",
                            Name="Medical psychology",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0313"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="226",
                            Name="Pharmacy, industrial pharmacy",
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
                            Name="Therapy and rehabilitation",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0915"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="228",
                            Name="Pediatrics",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0912"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="229",
                            Name="Public health",
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
                            Name="Social work",
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
                            Name="Social welfare",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0413"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0923"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="241",
                            Name="Hotel and restaurant business",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1013"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="242",
                            Name="Tourism and recreation",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1015"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="251",
                            Name="State security",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1031"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="252",
                            Name="State border security",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1031"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="253",
                            Name="Military administration (by types of armed forces)",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1031"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="254",
                            Name="Provision of troops (forces)",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1031"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="255",
                            Name="Armament and military equipment",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1031"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="256",
                            Name="National security (by separate areas of provision and types of activities)***",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1031"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="257",
                            Name="Information security management",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1031"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="261",
                            Name="Fire Security",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1032"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="262",
                            Name="Law enforcement activity",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1032"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="263",
                            Name="Civil security",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1022"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1032"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="271",
                            Name="Sea and inland water transport****",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0716"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1041"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="272",
                            Name="Aviation transport",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0716"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1041"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="273",
                            Name="Railway transport",
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
                            Name="Automobile transport",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0716"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1041"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="275",
                            Name="Transport technologies (by types)",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "1041"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="281",
                            Name="Public management and administration",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0413"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="291",
                            Name="International relations, public communications and regional studies",
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
                            Name="International Economic Relations",
                        ISCEDCores = new List<ISCEDCore>
                        {
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0311"),
                            await context.ISCEDCores.FirstOrDefaultAsync(x => x.Id == "0312"),
                        },
                    },
                    new SpecialtyCore
                    {

                            Id="293",
                            Name="International law",
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
                        Name = "Weer University",
                        Description = "Weer University is a private Christian university located in Buffalo, NY. It is one of the largest Christian universities in the world and offers a wide range of undergraduate and graduate programs.",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Buffalo"),
                        StreetAddress = "1971 Blvd",
                        SiteURL = "",
                        ContactInformation = "Phone: (000) 000-2000 | Email: info@weer.edu"
                    },
                    new Institution
                    {
                        Name = "Falcon University",
                        Description = "A leading institution for advanced education and research located in Dallas, TX.",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Dallas"),
                        StreetAddress = "182 Shile Street",
                        SiteURL = "",
                        ContactInformation = "Phone: (000) 000-2000 | Email: info@flcn.edu"
                    },
                    new Institution
                    {
                        Name = "Central University",
                        Description = "A prestigious educational institution offering a wide range of academic programs.",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "New York City"),
                        StreetAddress = "123 Main Street",
                        SiteURL = "www.centraluniversity.edu",
                        ContactInformation = "Phone: (000) 000-2000 | Email: info@centraluniversity.edu"
                    },
                    new Institution
                    {
                        Name = "Harmony University",
                        Description = "A leading medical facility providing comprehensive healthcare education.",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Los Angeles"),
                        StreetAddress = "456 Oka Avenue",
                        SiteURL = "www.harmonyhospital.com",
                        ContactInformation = "Phone: (000) 000-2000 | Email: info@harmonyhospital.com"
                    },
                    new Institution
                    {
                        Name = "Tech Institute",
                        Description = "An innovative institute offering technology-focused education and training programs.",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "San Francisco"),
                        StreetAddress = "789 Elm Street",
                        SiteURL = "www.techinstitute.edu",
                        ContactInformation = "Phone: (555) 555-5555 | Email: info@techinstitute.edu"
                    },
                    new Institution
                    {
                        Name = "University of Arts",
                        Description = "A renowned art university teaching art of all roads of life.",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Chicago"),
                        StreetAddress = "321 Maple Avenue",
                        SiteURL = "www.cartmuseum.org",
                        ContactInformation = "Phone: (555) 555-5555 | Email: info@cartmuseum.org"
                    },
                    new Institution
                    {
                        Name = "Riverbank Public University",
                        Description = "A community University offering a wide range of digital resources, and educational programs.",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Orlando"),
                        StreetAddress = "567 Sine Street",
                        SiteURL = "www.riverbanklibrary.org",
                        ContactInformation = "Phone: (555) 987-3210 | Email: info@riverbanklibrary.org"
                    },
                    new Institution
                    {
                        Name = "Major State University",
                        Description = "A comprehensive university offering a wide range of academic programs and research opportunities.",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "San Diego"),
                        StreetAddress = "123  Street",
                        SiteURL = "www.mjstateuniversity.edu",
                        ContactInformation = "Phone: (555) 555-5555 | Email: info@goldenstateuniversity.edu"
                    },
                    new Institution
                    {
                        Name = "Harborview College",
                        Description = "A community college known for its vocational training programs and industry partnerships.",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Miami"),
                        StreetAddress = "123 Harborview Road",
                        SiteURL = "www.harborviewcollege.edu",
                        ContactInformation = "Phone: (555) 555-5555 | Email: info@harborviewcollege.edu"
                    },
                    new Institution
                    {
                        Name = "Northern Lights University",
                        Description = "A liberal arts university committed to fostering creativity, critical thinking, and global citizenship.",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Tampa"),
                        StreetAddress = "789 Northern Lights Avenue",
                        SiteURL = "www.northernlightsu.edu",
                        ContactInformation = "Phone: (555) 987-6543 | Email: info@northernlightsu.edu"
                    }
                };
                var alphabet = new[] { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T" };
                for (int i = 0; i < 12; i++)
                {
                    var letter = alphabet[i];
                    institutions.Add(
                    new Institution
                    {
                        Name = $"University {letter}",
                        Description = $"A leading research institution focused on sustainability and environmental studies, founded in {new Random().Next(1992, 2005)}.",
                        City = await context.Cities.FirstOrDefaultAsync(x => x.Name == "Austin"),
                        StreetAddress = $"{letter} str, {new Random().Next(1, 10)}{new Random().Next(0, 10)}{new Random().Next(0, 10)}",
                        SiteURL = "",
                        ContactInformation = "(000) 000-0000"
                    });
                }
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
                    var componentCores1 = new List<ComponentCore>();
                    var componentsCoreStrings1 = new[]
                    {
                        "Civil law",
                        "Legal conclusions of the Supreme Court",
                        "Notarial process",
                        "Comparative civil law and process",
                        "School of Applied Jurisprudence",
                        "Practical training",
                        "Discrete mathematics",
                        "Mathematical analysis",
                        "Physics",
                        "Introduction to computer science",
                        "Foreign language",
                        "Probability theory and mathematical statistics",
                        "Computer data processing and visualization technologies",
                        "Algorithmization and programming",
                        "Optimization methods and models",
                        "Artificial intelligence",
                        "IT project management",
                        "Java technology",
                        "Administration of server systems",
                        "Web technologies",
                        "Engineering and computer graphics",
                        "Data analysis technologies",
                        "Software product development technologies",
                        "Jurisprudence",
                        "Psychology",
                        "Oratory art",
                        "Life safety",
                        "History of Ukrainian culture",
                        "Oratory art",
                        "Management",
                        "Philosophy",
                        "Sociology",
                        "Logic",
                        "Accounting",
                        "Database and knowledge organization",
                        "Computer architecture",
                        "Management theory in information systems",
                        "Animation",
                        "Fundamentals of software engineering",
                        "3D graphics and modeling",
                        "Modeling technologies",
                        "Cybersecurity technologies",
                        "Game engines",
                        "User interface design",
                        "Economics",
                        "Operating systems",
                        "Object-oriented programming",
                        "Computer architecture",
                        "Databases",
                        "Fundamentals of network technologies",
                        "Linear algebra and analytic geometry",
                    };

                    foreach (var componentStr in componentsCoreStrings1)
                        componentCores1.Add(new ComponentCore { Name = componentStr });

                    await context.ComponentCores.AddRangeAsync(componentCores1);
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
                        Id = "ge",
                        ISOLanguageName="German",
                    },
                    new Language
                    {
                        Id = "fr",
                        ISOLanguageName="French",
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

            // Seed Reviews
            if (!context.Reviews.Any())
            {
                foreach (var item in context.Institutions.ToList())
                {
                    var reviews = new List<Review>();
                    var reviewRate = new Random().Next(1, 8);
                    for (int i = 0; i < 8; i++)
                    {
                        if (new Random().Next(0, reviewRate) == 1) continue;
                        var review = new Review
                        {
                            Institution = item,
                            Author = await userManager.FindByEmailAsync($"testmail{1 + i}@test.com"),
                            ReviewMessage = reviewDictionary[new Random().Next(0, 8)],
                            Rating = new Random().Next(2, 6)
                        };
                        reviews.Add(review);
                    }
                    await context.AddRangeAsync(reviews);
                }
                await context.SaveChangesAsync();
            }
            if (!context.Specialties.Any())
            {
                foreach (var item in context.Institutions.ToList())
                {

                    var descriptionString = @"Introducing the University of Innovation's cutting-edge program, the Bachelor of Interdisciplinary Studies (BIS). This unique educational pathway fosters a holistic approach to knowledge acquisition, empowering students to transcend traditional disciplinary boundaries. By seamlessly blending diverse academic fields, the BIS program cultivates critical thinking, problem-solving, and adaptability skills essential for today's dynamic global landscape. Through a carefully curated curriculum, students engage in cross-disciplinary coursework, collaborative projects, and experiential learning opportunities, ensuring a well-rounded education that prepares them to tackle complex societal challenges. With the freedom to customize their learning journey, BIS students emerge as versatile thinkers equipped with a broad spectrum of knowledge and the ability to bridge gaps between different domains, making them highly sought-after professionals in a rapidly evolving world.
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
                            TuitionUSD = new Random().Next(50000, 150000),
                            StartYear = 2023,
                            EndYear = 2027,
                            Institution = item,
                        };
                        specialties.Add(specialty);
                    }

                    await context.AddRangeAsync(specialties);
                }
                await context.SaveChangesAsync();
            }

            //Seed components into specialties
            if (!context.Components.Any())
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
                }
                await context.SaveChangesAsync();
            }
            // Seed Skills to Specialties
            if (!context.Skills.Any())
            {
                var skills = new List<string>
                {
                    "ASP.NET",
                    ".NET",
                    "EntityFramework",
                    "ORM",
                    "Debugging",
                    "SSMS",
                    "Version Control",
                    "Visual Studio",
                    "SQL Server",
                    "Spring Boot",
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
                    item.Approved = true;
                    item.Visible = true;
                    var componentsECTSCreds = item.Components.Select(x => x.ECTSCredits).Sum();
                    item.EctsCredits = componentsECTSCreds + (new Random().Next(0, 2) == 1 ? 20 : 40);
                    item.UndergraduatesEnrolled = new Random().Next(20, 190);
                    item.AcceptanceRate = new Random().Next(5, 90);
                    item.GraduationRate = new Random().Next(20, 90);
                    item.GraduateEmploymentRate = new Random().Next(20, 90);
                    item.Skills = skills1;
                    item.FreeEducation = new Random().Next(0, 12) == 0;
                    item.Languages = new List<Language> { await context.Languages.FirstOrDefaultAsync(x => x.Id == "en") };
                    item.Degree = await context.Degrees.FirstOrDefaultAsync(x => x.Id == 1);
                    item.StudyForms = new List<StudyForm> { await context.StudyForms.FirstOrDefaultAsync(x => x.Id == 1) };
                }
                await context.SaveChangesAsync();
                foreach (var item in context.Institutions.ToList())
                {
                    item.Accreditation = new Random().Next(3, 5);
                    item.Coordinates = new Coordinates { Latitude = 39, Longitude = 77 };
                    item.StudyForms = new List<StudyForm>
                    {
                        await context.StudyForms.FirstOrDefaultAsync(x => x.Id == 1),
                        await context.StudyForms.FirstOrDefaultAsync(x => x.Id == 2),
                        await context.StudyForms.FirstOrDefaultAsync(x => x.Id == 3)
                    };
                    item.Languages = new List<Language>
                    {
                        await context.Languages.FirstOrDefaultAsync(x => x.Id == "en"),
                    };
                    var reviews = context.Reviews.Where(r => r.Institution.Id == item.Id).ToList();
                    if (reviews != null && reviews.Count > 0)
                    {
                        item.Rating = reviews.Select(r => r.Rating).Average();
                        item.ReviewsCount = reviews.Count;
                    }
                    item.Approved = true;
                    item.Visible = true;
                    await context.SaveChangesAsync();
                }
            }
            
        }
        
    }
}