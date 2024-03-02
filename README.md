## Eclipse Estate

 Eclipse Estate is a user-friendly web application designed to streamline real estate transactions. Whether you're buying, renting, or selling properties like houses and villas, Eclipse Estate provides a seamless experience. Explore a diverse range of listings, filter based on your preferences, and connect directly with sellers or buyers. 


## Project Status (Completed)

This project is already completed.

## Project Screen Shot(s)
![profile page ](https://github.com/Rangga056/eclipse-estate/assets/136163122/0c4040d1-7d7e-40cb-9aa9-d06e55c42993)
![listing page](https://github.com/Rangga056/eclipse-estate/assets/136163122/fe0a30bc-8797-43f1-a10c-6ef3dd19cc31)

## Installation and Setup Instructions

Clone down this repository. You will need node and npm installed globally on your machine.  

Installation:

```bash
npm install  
```

To Start Server:
 ```bash
npm run dev  
 ```

To Visit App:

(Currently is not deployed)
http://localhost:5173

## Reflection

  - What was the context for this project? (ie: was this a side project? was this for Turing? was this for an experiment?)
  - What did you set out to build?
  - Why was this project challenging and therefore a really good learning experience?
  - What were some unexpected obstacles?
  - What tools did you use to implement this project?
  - This might seem obvious because you are IN this codebase, but to all other humans now is the time to talk about why you chose webpack instead of create react app, or D3, or vanilla JS instead of a framework etc. Brag about your choices and justify them here.  

This was a 3 week long project built during my study at Universitas Nasional. Project goals included using technologies learned up until this point and familiarizing myself with documentation for new features.  

Originally I wanted to build an application that allowed users to sell, buy or rent properties based on what they were interested in. I started this process by using the  create-vite boilerplate with react, then adding react-router-dom and redux for the from end, on the backend i used MongoDB as the database, expressJS and NodeJS.  

One of the main challenges I ran into was Maanging the user listing. This lead me to spend a few days on a research spike into the MongoDB database and redux-toolkit.

At the end of the day, the technologies implemented in this project are React, React-Router-dom, Redux, Express, NodeJS, MongoDB, and a significant amount of VanillaJS, JSX, and TailwindCSS. I chose to use the create vite react template boilerplate to minimize initial setup and invest more time in diving into weird technological rabbit holes. In the next iteration I plan on handrolling a webpack.config.js file to more fully understand the build process
