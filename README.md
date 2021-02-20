# Project Overview
This repo is the backend for Tarot Journal a personal journal app where the user can generate a tarot reading per entry.

# Link to Frontend Repo
The frontend of our app can be found [here](https://github.com/regularvanessaperson/frontend-next-tarot)


# Installation Instructions
- Fork & clone this repo
- cd into local directory and `npm install` to install dependencies
- You will need to have mongoDB installed on your computer

# Approach and ERD
The core functionality of our app involves a user making a post, so we began by defining how we wanted to associate posts and models. [Here](https://lucid.app/lucidchart/invitations/accept/8a5ee3bc-9af1-4987-b8d1-c4cc620a7719) is a link to our ERD.

# Tech Stack
## Security and Authentication
- bcrypt: securely stores user passwords
- JSON Web Tokens: used to authorize users

## Framework
- Express: allows us to write routes that send/retrieve information from our database

## Database
- MongoDB: we used a non-relational database for our app because it provided us with more flexibility than a SQL database
- Mongoose: allows our backend to communicate with our Mongo database

# Routes
Methods | URLs | Actions
--------|------|---------
POST  | /api/auth/signup | register new users
POST  | /api/auth/signin | log in existing users
GET   | /api/test/all    | retrieve public content
GET   | /api/test/user   | access user's content
POST  | api/entry/make   | make a new entry
GET   | api/entry/:idx   | get a specific entry
GET   | api/entry/date/:date/creator/:creator   | get a specific day
GET   | api/entry/month/:date/creator/:creator| get entrys by month
PUT   | api/entry/edit  | edit an entry
PUT   | api/entry/favorite   | make an entry into a favorite by user
DELETE   | api/entry/delete | delete individual entry
POST  | api/reading | generages a reading and returns fields for reading
POST   | api/five/reading | generates a reading and returns five cards 
GET  | /api/reading/:idx | favorite a post 


# Challenges
- At first there were too many models and I tried to divide everything like the Cards in their own functions to connect with the readings then finally the entry. Since the purpose is to create a journal entry with or without a reading I didn't make any routes for the cards individually and just generated the reading only if there was already an entry. 
- Since the routes on the front end were made with the pages for nextjs it got a bit confusing when trying to use it with a separate Mongodb backend. In the future I want to create the endpoints in the pages of the nextjs frontend so that the data fetching is much smoother.
