const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
/*
 [
          {
            id: '1',
            title: 'Gambita de dama',
            genre: 'Drama',
            image:
              '//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/images/gambito-de-dama.jpg'
          },
          {
            id: '2',
            title: 'Friends',
            genre: 'Comedia',
            image:
              '//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/images/friends.jpg'
          }
        ]
*/
// create and config server
const server = express();
server.use(cors());
server.use(express.json());

async function getDBConnection() {
  const connection = await mysql.createConnection({
    host: 'http://mysql-94f360f-loreto0105-57e4.f.aivencloud.com/',
    user: 'avnadmin',
    database: 'netflix',
    password: '', //Preguntar a Ana
    port: '18306'
    /*mysql-94f360f-loreto0105-57e4.f.aivencloud.com
18306  avnadmin*/
  })
  connection.connect();
  return connection;
}

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

const fakeMovies = [
  {
    id: 1,
    title: "Wonder Woman",
    genre: "Action",
    image:
      "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2022/12/gal-gadot-como-wonder-woman-universo-extendido-dc-2895594.jpg?tf=3840x",
    category: "Superhero",
    year: 2017,
    director: "Patty Jenkins",
  },
  {
    id: 2,
    title: "Inception",
    genre: "Science Fiction",
    image:
      "https://m.media-amazon.com/images/S/pv-target-images/e826ebbcc692b4d19059d24125cf23699067ab621c979612fd0ca11ab42a65cb._SX1080_FMjpg_.jpg",
    category: "Thriller",
    year: 2010,
    director: "Christopher Nolan",
  },
];


server.get("/api/movies", async (req, res) => {
  const connection = await getDBConnection();
  const query = "SELECT * FROM movies;";
  const [moviesResult] = await connection.query(query);
  console.log(moviesResult);
  connection.end();
  if (fakeMovies.length === 0) {
    res.status(404).json({
      status: "error",
      message: "No se han encontrado resultados"
    })
  } else {
    res.status(200).json({
      succes: true,
      result: moviesResult
    });
  }
})