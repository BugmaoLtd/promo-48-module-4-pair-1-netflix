
-- La usuaria con ID 1 tiene como favoritas las películas 1 y 2
INSERT INTO users_movies (fk_user, fk_movie)
VALUES (1, 1);
INSERT INTO users_movies (fk_user, fk_movie)
VALUES (1, 2);

-- La usuaria con ID 2 tiene como favorita la película 2
INSERT INTO users_movies (fk_user, fk_movie)
VALUES (2, 2);

SELECT fk_user, COUNT(fk_movie) AS cantidad_peliculas_favoritas
FROM users_movies
GROUP BY fk_user;

SELECT fk_user, COUNT(fk_movie) AS cantidad_peliculas_favoritas
FROM users_movies
GROUP BY fk_user
ORDER BY cantidad_peliculas_favoritas DESC
LIMIT 1;



