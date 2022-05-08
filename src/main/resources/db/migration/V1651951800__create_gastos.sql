CREATE TABLE Gastos (
    id BIGSERIAL primary key,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    value DOUBLE PRECISION NOT NULL,
    createdAt timestamp not null DEFAULT current_timestamp
)