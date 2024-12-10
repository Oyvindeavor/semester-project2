This is a [Next.js](https://nextjs.org) project With Typescript, Sass for modular approach and Joy ui.

## Getting Started

### 1. Clone the repo

### 2. Naviagte to the project directory

```bash
cd my-project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add .env.local file

Create a file named `.env.local` to the root directory of the project and add the following variables:

```bash
NEXT_PUBLIC_API_BASE_URL=https://example.com/api
API_KEY=your-private-api-key
```

- Replace `https://example.com/api` with the base URL for the API.
- Replace `your-private-api-key` with the actual private API key.

Note: Keep the .env.local file private and do not commit it to version control. It is already included in .gitignore.

Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the pages by modifying page.tsx files eg `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features

- TypeScript: For type safety and improved developer experience
- Sass: For modular and customizable styling
- Joy UI: For modern flexible ui Components
- Environment Variables:
  - Public variables (e.g., NEXT_PUBLIC_API_BASE_URL) are accessible client-side.
  - Private variables (e.g., API_KEY) are kept secure on the server-side.

## Project Structure

- `src/app` Contains the application logic and page components.
- `src/app/api` Contains custom server api points
-
- `src/styles` Contains global styles, variables, and mixins
  - \_variables.scss
  - \_mixins.scss
  - \_typography.scss
  - globals.scss
- `src/components` Reusable components like `Navbar`, "Footer", etc.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run start`: Start the production server

## Workflow

This project includes a CI/CD pipeline configured with GitHub Actions. Test it by committing changes and pushing to the repository. The pipeline includes:

- Linting: Automatically checks code quality.
- Testing: Ensures all tests pass.
- Build: Builds the application.

## Learn More

To learn more take a look at the following resources:

- link
- link
