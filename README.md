# Website-aggregator of Higher Educational Institutions

This is a pet project aimed at creating a website aggregator of Higher Educational Institutions. The goal is to provide users with a centralized platform to search and compare institutions and specialties they are offering. Here are the outlines of the project.

The website based on this repositoryis is hosted on Fly.io at the following link: [EduCatalogue](https://educatalogue.fly.dev/)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies_used)
- [Credits](#credits)
- [Contact](#contact)
- [License](#license)

## Introduction

EduCatalogue aggregator is a web-based SPA application based on React frontend and .NET backend enabling users to browse and compare institutions, specialties, leave reviews, and perform CRUD operations on the aforementioned entities. It aims to simplify the process of finding the best choice, making informed career decisions.

## Features

- **Search:** Users can search for specific institution or specialty and get the detailed information on each of them.
- **Comparison:** Users are able to add institution of interest to the comparison table to find the best deal.
- **User Reviews:** Registered users can see or leave their own reviews and ratings for institutions.
- **Authentication and authorization:** Users can create accounts, log in, and manage their profiles. There are several categories of users with different level of access to endpoints. JWT tokens are used for persistent authentication of the user.
- **Content management:** The application provides tools to perform CRUD operations on institutions and specialties with respective UI forms and controls.
- **Responsive Design:** The application is designed to be responsive and compatible with various devices and screen sizes.

## Installation

1. Clone the repository: `git clone https://github.com/javiaxum/EduCatalogue.git`
4. Navigate to the API directory: `cd ../API`
5. Install dependencies: `dotnet restore`
6. (Optional) Some features depending on external APIs like Cloudinary or SendGrid require API keys which can be set in the `appsettings.json` file(s).
7. The project is tailored to work with dockerized PostgreSQL database. The database connection string is specified in the `appsettings.Development.json` file. Assuming docker daemon being installed and running execute the following command from the project folder in order to initialize and start docker PostgreSQL container: `docker run --name <name> -e POSTGRES_USER=<username> -e POSTGRES_PASSWORD=<password> -p 5432:5432 -d postgres:latest`. Password and username should be reflected in the ConnectionStrings section of the `appsettings.json` file.


## Usage

1. Navigate to the API directory: `cd API`
2. Start the dotnet API: `dotnet run`
5. Visit `https://localhost:5000` through a browser to access the website.

## Technologies Used

    Front-end: React, HTML, CSS, TypeScript, Node.js, MobX, Leaflet(Map), Semamtic UI React (Component library), Axios
    Back-end: .NET 6, ASP.NET 6, EntityFramework 
    Database: PostgreSQL
    External APIs: Cloudinary, SendGrid, Facebook(Authentication), OpenStreetMap API (Nominatim geocoding)

## Credits

#### Photos
 [Maksym Tymchyk](https://unsplash.com/photos/5nxCoYcx2kM?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink)
 [Rostyslav Savchyn](https://unsplash.com/photos/l5bahW1aANU?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink)
 [Kseniia Rastvorova](https://unsplash.com/photos/htG9Fsn-IjI)
 [Vadym](https://unsplash.com/photos/eK5VpAFQ3Mo?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink)
 [Zayyinatul Millah](https://unsplash.com/photos/WXRKNKuC7yo?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink)
 [Eleanor Brooke](https://unsplash.com/photos/1n5wJpamg1k?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink)
 [Dom Fou](https://unsplash.com/photos/YRMWVcdyhmI?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink)
 [Sangga Rima Roman Selia](https://unsplash.com/photos/8CqDvPuo_kI?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink)
 [Einar H Reynis](https://unsplash.com/photos/YW1i_xi8dt8?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink)
 [Einar H Reynis](https://unsplash.com/photos/YW1i_xi8dt8?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink)
 [Scott Webb](https://unsplash.com/photos/-4N06ks06JA?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink)

## Contact

If you have any questions, suggestions, or feedback, please feel free to reach out: javi.axum@gmail.com.

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit/). Feel free to modify and distribute this project as needed.
