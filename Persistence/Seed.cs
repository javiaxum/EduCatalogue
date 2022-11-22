using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if(context.Institutions.Any()) return;

            var Institutions = new List<HigherEducationalInstitution>
            {
                new HigherEducationalInstitution
                {
                    Name = "Danylo Halytsky Lviv National Medical University",
                    Description = "Danylo Halytsky Lviv National Medical University - formerly known as the Lviv State Medical Institute, earlier the Faculty of Medicine of the John Casimir University and, before that, Faculty of Medicine of the Francis I University — is one of the oldest and biggest medical universities in Ukraine. LNMU begins from the Medical Faculty of Lviv University, which was opened on November 16, 1784, according to the privilege of the Austrian emperor Josef II. The medical school is named after King Daniel of Galicia, the historical founder of the city in 1256 AD. In 2009 University celebrated its 225 anniversary",
                    Address = "Pekarska St, 69, Lviv, Lviv Oblast, 79010",
                    TitleImage = null,
                    SiteURL = "new.meduniv.lviv.ua/en/",
                },
                new HigherEducationalInstitution
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