# `auth`

## admin

```sh
cd apps/admin
mkdir -p "./src/app/api/auth/[...nextauth]"
#pnpm add @repo/database --workspace --filter admin
pnpm add @repo/auth --workspace --filter admin
```

## front

```sh
cd apps/front
mkdir -p "./src/app/api/auth/[...nextauth]"
#pnpm add @repo/database --workspace --filter front
pnpm add @repo/auth --workspace --filter front
```

```sh
pnpm add next-auth@beta path-to-regexp @auth/prisma-adapter bcrypt
pnpm add @types/bcrypt --save-dev
```
