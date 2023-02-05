DROP DATABASE IF EXISTS snack_a_log;
CREATE DATABASE snack_a_log; 

\c snack_a_log; 

DROP TABLE IF EXISTS snacks;

CREATE TABLE snacks (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL, 
    fiber NUMERIC NOT NULL DEFAULT 0,
    protein NUMERIC NOT NULL DEFAULT 0,
    added_sugar NUMERIC NOT NULL DEFAULT 0,
    is_healthy BOOLEAN,
    image TEXT
);




--DEFAULT `https\://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image`,
--CHECK (fiber < 5 AND protein < 5),  snacks_id INTEGER REFERENCES snacks (id)    ON DELETE CASCADE
