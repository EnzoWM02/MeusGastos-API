CREATE TABLE Gastos (
    id BIGSERIAL primary key,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    value DOUBLE PRECISION NOT NULL,
    created_at timestamp not null DEFAULT now(),
    updated_at timestamp not null default now()
)