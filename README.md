# ArtMindscape

ArtMindscape is a website for creating art with AI models via text prompts. It leverages the Dezgo API to provide a seamless and intuitive art creation experience. The website allows users to generate unique artwork by combining their creativity with the power of Artificial Intelligence.

## Features

- AI-powered art creation using text prompts
- Conditional routing for three types of users:
  - Viewer: Can view the main album, like content, and sort content by "liked" for easy access.
  - Editor: Can create content, own a private collection, like content, and enjoy all features available to viewers.
  - Web-admin: Has all the capabilities of an editor and access to a dashboard for user role management.
- Search functionality:
  - Search art by name or creator name in the main album.
  - Search users by name or email in the dashboard.
- Like system: Users can like their favorite art pieces and later access them easily.
- Sharing to the main album: Editors can share art from their private collection to the main album.
- Profile editing: Users can edit their name, email, and avatar in their profile section.
- CRUD options: Users can edit the art name, delete creations, and perform all other CRUD operations.

## Tech Stack

The project is built using the following technologies:

### Frontend

- React
- React Router DOM
- Formik
- Axios
- Bootstrap
- React Bootstrap
- Lottie React
- React Toastify
- Sass
- Joi

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Bcrypt
- JSONWebToken
- Lodash
- Nodemon
- Cors

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ZuK94/artmindscape.git
   ```

2. Install the frontend dependencies:

   ```bash
   cd artmindscape/frontend
   npm install
   ```

3. Install the backend dependencies:

   ```bash
   cd ../backend
   npm install
   ```

4. Configure the environment variables:

   - Create a .env file in the backend directory.
   - Define the necessary environment variables (Dezgo API credentials (API_HOST = "dezgo.p.rapidapi.com" and API_KEY wich has to be acquired via dezgo API), and SECRET_TOKEN for bcrypt operation.) in the .env file.

5. Start the development server:

   For the frontend:

   ```bash
   cd ../frontend
   npm start
   ```

   For the backend:

   ```bash
   cd ../backend
   npm start
   ```

Access the application at http://localhost:3000 in your browser.

## Creator

zuk94 - david zyulkovsky

## License

This project is licensed under the MIT License.
