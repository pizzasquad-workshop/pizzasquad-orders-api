# pizzasquad-orders-api

API B2B de gestión de pedidos para **Pizza Squad platform**. Node 20 + TypeScript + Express + Postgres.

> **Estado:** este es el repo "antes" del workshop. **No** contiene `AGENTS.md` ni `.github/copilot-instructions.md`. Esa es la diferencia con `pizzasquad-orders-instructed`.

## Requisitos

- Node 20+
- Postgres 15+ corriendo en local (o `DATABASE_URL` apuntando a uno)

## Instalación

```bash
npm install
```

## Esquema

```bash
psql $DATABASE_URL -f src/db/schema.sql
```

## Desarrollo

```bash
npm run dev
```

El servidor escucha en `http://localhost:3000`.

## Endpoints

| Método | Ruta           | Descripción                |
|--------|----------------|----------------------------|
| GET    | `/health`      | Healthcheck                |
| GET    | `/orders`      | Lista pedidos              |
| GET    | `/orders/:id`  | Detalle de un pedido       |
| POST   | `/orders`      | Crea pedido                |
| PATCH  | `/orders/:id`  | Actualiza estado           |
| DELETE | `/orders/:id`  | Elimina pedido             |

## Tests

```bash
npm test
```

## Notas

Código heredado. Hay deuda técnica conocida que el equipo planea pulir durante el workshop usando GitHub Copilot.
