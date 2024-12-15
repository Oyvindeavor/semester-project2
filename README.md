# Peregrine Auctions, Next.js TypeScript MUI Project
<img width="1161" alt="Screenshot 2024-12-15 at 18 08 05" src="https://github.com/user-attachments/assets/7d13445e-bd2e-489c-9152-a4c087825399" />


A modern web application built with Next.js, TypeScript, and Material-UI (MUI) for a clean, responsive user interface. Utilizes nextjs SSR as much as possible to snappy user interface.

## 🚀 Features

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Static type checking
- **Material-UI (MUI)** - Comprehensive UI component library
- **Responsive Design** - Mobile-first approach
- **Environment Configuration** - Secure handling of environment variables
- **ESLint & Prettier** - Code formatting and linting
- **Custom Theme Support** - MUI theme customization
- **Next.js Image & Link** - Optimized image loading and navigation

## 📋 Prerequisites

Before you begin, ensure you have installed:

- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <your-repository-url>
```

2. Navigate to the project directory:

```bash
cd your-project-name
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_API_BASE=your_api_base_url
API_KEY=your_api_key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 🚀 Development

Start the development server:

```bash
npm run dev
```

Your application will be available at `http://localhost:3000`.

## 📁 Project Structure

```
├── public/           # Static files
├── src/
│   ├── app/         # App router pages
│   ├── components/  # Reusable components
│   ├── theme/       # MUI theme configuration
│   ├── types/       # TypeScript type definitions
│   └── utils/       # Utility functions
├── .env.local       # Local environment variables
└── package.json     # Project dependencies
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🎨 Styling

This project uses MUI's styling solution with the following approaches:

- Theme customization via `src/theme`
- Styling with MUI's `sx` prop
- CSS-in-JS using MUI's styled components

Example:

```tsx
import { Box, styled } from '@mui/material';

// Using sx prop
<Box sx={{ p: 2, bgcolor: 'background.paper' }}>Content</Box>;

// Using styled components
const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));
```

## 🔒 Environment Variables

Required environment variables:

| Variable               | Description            | Public |
| ---------------------- | ---------------------- | ------ |
| `NEXT_PUBLIC_API_BASE` | API base URL           | Yes    |
| `API_KEY`              | API authentication key | No     |
| `NEXT_PUBLIC_BASE_URL` | Application URL        | Yes    |

## 📚 Best Practices

- Use TypeScript interfaces for component props
- Implement proper error handling
- Follow MUI's design patterns
- Use Next.js Image component for optimized images
- Implement responsive designs using MUI's breakpoints

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

## 🔌 API Usage

### API Structure

The project uses Next.js App Router's API folder structure (`src/app/api`). Key components include:

- `/api/config/headers` - Contains header configuration
- `/api/config/endpoints` - Contains Noroff API endpoint configurations
- `/api/auth/[...nextauth]` - Authentication logic and endpoints

### Making API Calls

#### Using Utility Functions (Recommended)

The project provides utility functions in `src/utils/api` for all API operations. This is the recommended approach as it:

- Provides cleaner, more maintainable code
- Handles client-side error management
- Automatically manages environmental variables
- Takes care of headers and authentication

Example using utility function:

```ts
import createAuction from '@utils/api/createNewAuction';

const response = await createAuction(formData);
```

#### Direct API Calls

If needed, you can also call the API endpoints directly:

```ts
const data = await fetch('/api/create/', {
  body: JSON.stringify(formData),
});
```

### Headers

The project includes a headers utility function that automatically:

- Adds required API keys
- Manages authentication tokens
- Handles server-side sessions

To use headers in custom requests:

```ts
import noroffApi from '@/api/config/endpoints';
import { headers } from '@/api/config/headers';

const response = await fetch(noroffApi.login, {
  headers: await headers(),
});
```

### Authentication

The project uses NextAuth for authentication. To access authentication endpoints:

```ts
// Login endpoint
await fetch('/api/auth/');
```

### Best Practices

- Always use utility functions when available
- Don't expose API keys in client-side code
- Use proper error handling in API calls
- Check authentication state before making protected requests

### Useful links:

- Nextjs documentation
- MUI documentation
-
