# Kimple Technical Test

This doc will guide you through the setup to run the project locally, but you can also view the live demo at [kimple.nosuite.fr](https://kimple.nosuite.fr).

## 🛠️ Technology Stack

-   **Frontend Framework** : React 19.1.0
-   **Build Tool** : Vite 7.0.4
-   **Styling** : SCSS with CSS compilation
-   **Server** : Express.js for production serving
-   **Process Management** : PM2 (optional)

### Installation

1. **Clone the repository** :

    ```bash
    git clone https://github.com/Iconejey/Test-technique-Kimple.git
    cd Test-technique-Kimple
    ```

2. **Install dependencies** :
    ```bash
    npm install
    ```

### Development

1. **Compile SCSS** :

    ```bash
    # One-time compilation
    npm run scss

    # Watch mode for automatic compilation
    npm run scss:watch
    ```

2. **Start the development server (vite)** :

    ```bash
    npm run dev
    ```

    The application will be available at http://localhost:5173.

### Production Deployment

1. **Compile SCSS** :

    ```bash
    # One-time compilation
    npm run scss

    # Watch mode for automatic compilation
    npm run scss:watch
    ```

2. **Build for production** :

    ```bash
    npm run build
    ```

    This creates a `dist/` directory with optimized production files.

3. **Start the production server** :

    ```bash
    npm run express
    ```

    The application will be served at `http://localhost:8020`

4. **Using PM2 (optional)** :

    Close the express server if it is running, then you can use PM2 to manage the process:

    ```bash
    npm run pm2
    ```

## Development choices

### React 19.\*

I know that React 19 has some breaking changes compared to React 18, so I'm aware that some companies may not have migrated their codebase yet. You told me that Kimple was workin on a V2 of their product, so I guess it was also a good opportunity to use the latest version of React.

### SCSS

The test requires the use of a CSS framework, but I chose to use the SCSS preprocessor instead of a framework like Bootstrap or Tailwind. I'm used to this approach, even though it's mainly for the ability to use nesting.

I still use native CSS variables, for SCSS ones, and nesting has been integrated to native CSS so you may wonder why I didn't just use native CSS. The reason is that I wanted to keep the ability to use SCSS functions and loops like `@for`, even though I didn't have a specific use case for them in this project.

### No libraries

I mentioned that I found it sad that new web developers often run to learn frameworks without taking the time to assimilate native web technologies first.

Well, I'm willing to do the same with React. I wanted to avoid using libraries first, to focus on the core of React and its features. Then I'll be able to use libraries more effectively when I need them :

-   **[Tanstack Query](https://tanstack.com/query/latest/docs/framework/react/overview)** : For data fetching and caching. I chose to try and make my own data fetching system using a custom `useFetch` hook. I then made a `useKimpleAPI` hook to include the base URL and API keys. Finally, I made a `useContestsList` hook to only provide the `state` filter, search `name` and `page` number.

-   **[React Suspense](https://react.dev/reference/react/Suspense)** : Not really a library, but a React feature that allows for lazy loading components and data. I wanted to use simple conditional rendering for now, but this will definitely be a good feature to use in the future.

-   **[use-debounce](https://www.npmjs.com/package/use-debounce)** : I wanted the search input not to require to press Enter to search (as I wasn't given any instructions about it), so I had to debounce the input value to avoid too many API calls. I could have used this library, but I wanted to make a custom `useDebounce` hook.

Of course, using libraries allows for faster development with code that has been reviewed, optimized and tested by the community. Reinventing the wheel is not always the best choice. Of course I will use libraries in professional projects.

### Express server

The express server is only for me to serve the production build on my VPS server. It is in no way part of the test since it does not inclue backend.
