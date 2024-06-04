# Overview

This is a clone of the Voyager application. React is used to develop the frontend application with minimum dependencies (Three main dependencies - `react-infinite-scroll-component`, `@radix-ui/react-popover`, `react-router-dom`). The backend is developed using Node and Fastify web framework. MongoDB is used as database. Major dependencies for backend are `mongoose`, `fastify` and `dotenv`.

## HOW TO USE

1. Clone the repo
2. Install the dependencies for both frontend and backend using `npm install`
3. Add a `.env` file in backend root directory. It should have the following values
  a. `NODE_ENV` - development or production
  b. `MONGO_ATLAS_USER` - User name for MongoDB
  c. `MONGO_ATLAS_PASSWORD` - Password for MongoDB
  d. `PORT` - Default is `3000`
  e. `HOST` - Default is `127.0.0.1`
4. Run the backend using `npm run dev`
5. Run the frontend development server using `npm run dev` after updating `./frontend/src/api/config.js` with appropriate `URL_PREFIX`.

## Test

To manually test the node application, you can use the files in `tests` directory.
