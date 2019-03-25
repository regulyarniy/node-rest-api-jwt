## Express JWT + MongoDB simple rest API example

Install: `npm install`

Start: `node index.js`

#### Endpoints:

`GET /` Simple JSON message

*Users* `/users`:

`POST /register` Register new user. Fields: name, email, password

`POST /authenticate` Auth user. Fields: email, password

*Movies* `/movies` - only for authenticated users(token passed in x-access-token header):

`GET /` Get all movies

`POST /` Create movie. Fields: name, released_on

`GET /:movie_id` Get movie by id

`PUT /:movie_id` Update movie by id. One or all fields: name, released_on

`DEL /:movie_id` Delete movie by id
