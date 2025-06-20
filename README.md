# Generic Project Startup Package

For developing web projects using Typescript & Prisma, supported by Jest and Storybook.

## Notes

change prisma db push to prisma migrate dev after going live

npm run build will throw errors locally because there is no accessible database. this is intentional.

## Setup

### Configure Secrets

Create a `secrets` folder with the following files:

- auth_google_id.txt
- auth_google_secret.txt
- auth_discord_id.txt
- auth_discord_secret.txt
- auth_github_id.txt
- auth_github_secret.txt
- auth_secret.txt
- db_password.txt
- db_root_password.txt
- db_url.txt

`db_url.txt` should be a single line formatted as: `mysql://db_user:{db_password}@mysql:3306/projects`

See [`docker-compose.yml`](./docker-compose.yml)`#secrets` for a complete list

### Configure Deployment

Update [`docker-image`](./github/workflows/docker-image.yml) to use your docker account and project tags.

## Running

`docker compose up -d --build`

## Deployment

There is a github workflow to create a docker image. Alternatively, run the following locally:

```powershell
docker build -t {account/project} --target prod .
docker push {account/project}
```

## Testing

### Component Testing

Once: `npm run test:storybook`
Watch: `npm run storybook`

### Service Testing

Once: `npm t`
Watch: `npm t --watch`

Run for Services

### Integration Tests

`npm run test:integration`

Run for Repositories

### End to End Tests

TBD

## Technology

ORM / Database connections: Prisma
Frameworks: NextJS / React
Component TDD: Storybook
Git Hooks (Commit time verification): Husky
Service TDD: Jest
Repository TDD: Jest
Consistent Developer Experience: VSCode settings & extension recommendations, docker, cross-env
Form Validation: Zod
Authentication: NextAuth
Linting: eslint w/ react and storybook plugins
Mocking: moq.ts
Styling: TailwindCSS
