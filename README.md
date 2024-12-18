# Next.js Blog App with GoRest API

This project is a blog application built with **Next.js**, **TypeScript**, and various other libraries to provide a user-friendly experience.

## Technologies Used

### Frontend

- **Next.js v13 (Page Router)**
- **TypeScript**
- **Tailwind CSS v3**
- **Ant Design v5**

### API

- **Axios**
- **TanStack Query (v5)**

### Backend (Optional)

- **MSW (Mock Service Worker)** (for testing)

### Data Source

- **GoRest** [GoRest API](https://gorest.co.in/) (registration/login required)

---

## Installation

1. Ensure you have **Node.js v16.20.2** or higher and **npm v8.19.4** or higher installed on your machine.
2. Clone this repository:

   ```bash
   git clone <repository-url>
3. Run the following command to install all project dependencies:

   ```bash
   npm install

### Startup

## For Development

To start the application in development mode, run:

  ```bash
  npm run dev
  ```

This will open the app in your browser at <http://localhost:3>

### Optional (For Mock API Responses)

If using MSW (Mock Service Worker) for testing, run:

```bash
  npm run mock
```

alongside npm run dev for mock API responses.

## Features

This application implements the following features:

- Credential Access: Upon first access, a dialog prompts for your name and GoRest API token. It validates inputs and displays appropriate messages.
- Post List: Fetches and displays a paginated list of blog posts from the GoRest API. It allows searching and filtering posts to refine the list.
- Detail Post: Allows users to view detailed information about a specific post in a dedicated page, including title, body, and author information.
- Create Post: Implements a form to create new posts with validation for required fields (title and body). Success or error messages are displayed based on   the API response.
- Update Post: Enables users to edit an existing post with pre-filled values for easy modification. It handles success and error states for updates.
- Delete Post: Allows users to delete posts with confirmation through a modal dialog. It provides feedback on the success or failure of the deletion.

## How to Contribute

This project welcomes contributions. Please feel free to fork the repository, make changes, and submit pull requests. Ensure your code adheres to the existing coding style and formatting conventions.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
