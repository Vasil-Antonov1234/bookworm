# bookworm
JS Backend workshop

## Part one

### Setup
- [x] Initialize project
- [x] Add express server
- [x] Config debugging mode and add dev script
- [x] Add "home", "details", "create", "about", "search" and "404" pages
- [x] Setup Handlebars
- [x] Setup static files
- [x] Add about page
- [x] Add layout

### Architecture and dynamic rendering
- [x] Add home controller
- [x] Add book data layer
- [x] Add service layer
- [x] Render books on home page dynamically
- [x] Show no movies screen

### Create book
- [x] Show create book page
- [x] Show 404 page
- [x] Ready body data
- [x] Install uuid
- [x] Add unique id for each movie

### Details
- [x] Add navigation button for details page
- [x] Add route with params for details page

### Search
- [x] Show static search page
- [x] Render all books
- [x] Add patrial for each book
- [x] Modify search form
- [x] Filter books
    - [x] By year
    - [x] By genre
    - [x] By title
- [x] Remember search words
### Bonus
- [x] Dynamic page title
- [x] Rating

## Part two

### Prerequsities
- [x] Postgre SQL installed
- [x] GUI Client

### Setup database
- [x] Install and setup typescript support
- [x] Change npm start script to use tsx
- [x] Install prisma related packages
- [x] Initialize prisma
- [x] Add database url and variable
- [x] Geberate first client
- [x] Instantiate prisma client

### Setup models
- [x] Add Book model
- [x] Migrate database

### Refactor Books
- [x] Remove uuid
- [x] Create book
- [x] Read all books
- [x] Book details page
- [x] Remove file persistence releated code

### Reviews
- [x] Add resources
- [x] Add critic model
- [x] Add create critic page
- [x] Add critic controller
- [x] Add header link
- [x] Refactor create review page and critics table
- [x] Add critic controller
- [x] Add critic servise
- [x] Add critic repository
- [x] Modify create critic form
- [x] Create explicit BooksCritics join table and add review field
- [x] Add review when attach a critic to a book

### Atach Critic to Book
- [x] Add relation between books and critics
- [x] Add page view
- [x] Add dynamic data
- [x] Populate critic select
- [x] Attach function

### Show Reviews on Details Page
- [x] Modify book details view
- [x] Link to attach page
- [x] Show dynamic critic

### Bonus
- [X] Show filtered reviews in attach page
- [X] Search filter in db

## Part Three Session and Authentication
- [x] Add register, login and edit pages

### Register
- [x] Add auth controller
- [x] Modify register page
- [x] Add register post action
- [x] Add auth service
- [x] Add users repository and users table
- [x] Add create new user flow