DROP TABLE Users;

CREATE TABLE Users (
    id BIGSERIAL primary key,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at timestamp not null DEFAULT now(),
    updated_at timestamp not null default now()
)