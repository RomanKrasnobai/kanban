# Kanban board: learning project

## Goal
Full-stack practice. I write the features myself; Claude explains patterns and
shows small reference slices, and reviews my code. Don't build whole features unasked.

## Stack
- Monorepo, Yarn 4 (nodeLinker: node-modules), workspaces: apps/*, packages/*
- apps/web: Next.js App Router, TypeScript, Tailwind, shadcn/ui, TanStack Query, dnd-kit
- apps/api: NestJS (CJS, Jest), TypeORM, PostgreSQL (Docker Compose), port 4000
- Validation: class-validator + ValidationPipe; Swagger for the OpenAPI spec
- REST only for now; WebSockets later

## Auth design
- Access JWT (15m) in response body, kept in memory on the frontend
- Refresh JWT (7d) in httpOnly cookie, path /auth, sameSite lax
- Refresh rotation: each refresh token has a jti row in refresh_tokens (sha256 hash)
- Reuse detection: valid signature but missing row -> revoke all of the user's tokens
- Passwords hashed with argon2; global JwtAuthGuard + @Public() decorator
- TypeORM migrations only (synchronize: false)

## Data model
users, boards, board_members (owner|editor|viewer), columns (position),
cards (position, assignee_id, due_date). Later: labels, comments, activity log.

## Hard problems to tackle
card ordering (fractional indexing), board-membership guard, transactional card moves,
N+1 when loading boards, optimistic updates.

## Build order
Scaffold -> Docker/Postgres/TypeORM -> auth -> boards CRUD -> columns/cards ->
frontend -> drag-and-drop -> roles -> tests -> deploy

## Status
Scaffolded Yarn monorepo with apps/web and apps/api (in progress).
