# Binary Synergy7 CH6 
Chapter 6 Binar Car Rental API

## Instalation
1. Use git clone to clone this project into your local.
2. Open clone directory and start IDE.
3. `npm install` to get all required packages.
4. Setup database with postgres.
5. Setup your `.env` from copying `.env.example`, and fill the requirements.
6. Migrate the table with `npm run migrate:latest`.
7. Populate table with `npx knex seed:run --specific=users.ts` and `npx knex seed:run --specific=cars.ts`.
8. Run server `npm run dev`
10. Access http://localhost:3000/api-docs/ for API Docs

# CRUD Cars (only Superadmin & Admin)
## Get Cars
### Request
`GET /api/cars`

## Get Cars Available
### Request
`GET /api/cars/available`

## Create Cars
### Request
`GET /api/cars/create`

## Update Cars
### Request
`GET /api/cars/update/:id`

## Delete Cars
### Request
`GET /api/cars/delete/:id`

# GET Logs (only Superadmin & Admin)
## Get All Logs
### Request
`GET /api/logs`

## Get Insert Logs
### Request
`GET /api/logs/insert`

## Get Update Logs
### Request
`GET /api/logs/update`

## Get Delete Logs
### Request
`GET /api/logs/delete`

## ERD
![App Screenshot](resources/img/erd.png)