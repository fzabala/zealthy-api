# Zealthy API

This project is a challenge for zealthy.

The frontend project is https://github.com/fzabala/zealthy-web

### How to run it?

1. clone this repo
2. create your `.env` file based on `.env.example`
3. create your `.env.test` file based on `.env.test.example`
4. install dependencies with `npm install`
5. run `docker-compose up --build`
6. go to the project container and run the migrations `npm run migrate`

#### Without docker
1. Create your postgres database and configure the `.env` file accordingly
2. Run the migrations `npm run migrate`
3. Run the project `npm run dev`

### How to test it?

Just run `npm run test`, it runs the tests using sqlite in-memory database