using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
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
                Email = "EduCatalogue@service.com",
            };

            string userPassword = "2dS92jD72jsdLsS";
            var _user = await userManager.FindByEmailAsync("EduCatalogue@service.com");
            
            if (_user == null)
            {
                var createPowerUser = await userManager.CreateAsync(powerUser, userPassword);
            }

            // check for institutions and seed if none was found
            if (context.Institutions.Any()) return;

            var Institutions = new List<Institution>
            {
                new Institution
                {
                    Name = "Danylo Halytsky Lviv National Medical University",
                    Description = "Danylo Halytsky Lviv National Medical University - formerly known as the Lviv State Medical Institute, earlier the Faculty of Medicine of the John Casimir University and, before that, Faculty of Medicine of the Francis I University — is one of the oldest and biggest medical universities in Ukraine. LNMU begins from the Medical Faculty of Lviv University, which was opened on November 16, 1784, according to the privilege of the Austrian emperor Josef II. The medical school is named after King Daniel of Galicia, the historical founder of the city in 1256 AD. In 2009 University celebrated its 225 anniversary",
                    Address = "Pekarska St, 69, Lviv, Lviv Oblast, 79010",
                    TitleImage = null,
                    SiteURL = "new.meduniv.lviv.ua/en/",
                },
                new Institution
                {
                    Name = "Yuriy Fedkovych Chernivtsi National University",
                    Description = "a public university in the City of Chernivtsi in Western Ukraine. One of the leading Ukrainian institutions for higher education, it was founded in 1875 as the Franz-Josephs-Universität Czernowitz when Chernivtsi (Czernowitz) was the capital of the Duchy of Bukovina, a Cisleithanian crown land of Austria-Hungary. Today the university is based at the Residence of Bukovinian and Dalmatian Metropolitans building complex, a UNESCO World Heritage Site since 2011.",
                    Address = "Kotsyubyns'koho St, 2, Chernivtsi, Chernivtsi Oblast, 58012",
                    TitleImage = null,
                    SiteURL = "www.chnu.edu.ua",
                }
            };
            await context.Institutions.AddRangeAsync(Institutions);
            await context.SaveChangesAsync();
        }
    }
}