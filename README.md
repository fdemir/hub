# Employee Management Hub

A modern, responsive web application for managing employee records efficiently. This application provides a complete solution for HR departments to maintain employee information with a clean, intuitive interface.

## Features

- **Employee Listing**: View all employees with pagination support
- **Employee Management**: Add, edit, and delete employee records
- **Department & Position Management**: Organize employees by departments and positions
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Data Persistence**: Employee data is stored locally for demonstration purposes

## Technology Stack

- **Frontend Framework**: Lit (Web Components)
- **State Management**: Redux with Redux Toolkit
- **Routing**: Vaadin Router
- **Internationalization**: Lit Localize
- **Form Validation**: Zod
- **Build Tool**: Vite
- **Testing**: Web Test Runner with Playwright

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm

### Installation

1. Clone the repository

   ```
   git clone [repository-url]
   cd hub
   ```

2. Install dependencies

   ```
   npm install
   # or with pnpm
   pnpm install
   ```

3. Start the development server

   ```
   npm run dev
   # or with pnpm
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```
npm run build
# or with pnpm
pnpm build
```

The built files will be in the `dist` directory.

## Testing

Run all tests:

```
npm test
# or with pnpm
pnpm test
```

Run development tests only:

```
npm run test:dev
# or with pnpm
pnpm test:dev
```

Run tests in watch mode:

```
npm run test:watch
# or with pnpm
pnpm test:watch
```

## Internationalization

The application supports multiple languages. To extract and build localization files:

```
npm run localize:extract
npm run localize:build
# or with pnpm
pnpm localize:extract
pnpm localize:build
```

## Project Structure

- `src/components`: UI components and custom elements
- `src/views`: Application pages
- `src/services`: Data services for API interactions
- `src/store`: Redux store and slices
- `src/styles`: Global styles and theme variables
- `src/mixins`: Shared component behaviors
- `src/assets`: Static assets like images and icons

## License

[License Information]

## Contact

[Contact Information]
