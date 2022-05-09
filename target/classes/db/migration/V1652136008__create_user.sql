CREATE TABLE Users (
    id BIGSERIAL primary key,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    createdAt timestamp not null DEFAULT current_timestamp
)