# StayNest

StayNest is a full-stack web application for listing, discovering, and reviewing rental properties. It features user authentication, property listings with geolocation, image uploads, and a review system.

## Features

- User authentication (sign up, login, logout)
- Create, edit, and delete property listings
- Upload property images (Cloudinary)
- Geocode property locations (Mapbox)
- Leave reviews and ratings on listings
- Flash messages for user feedback
- Responsive UI with EJS templates

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** EJS, Bootstrap (assumed from class usage)
- **Authentication:** Passport.js (Local Strategy)
- **Geocoding:** Mapbox SDK
- **Image Uploads:** Multer, Cloudinary
- **Session Store:** connect-mongo
- **Validation:** Joi

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd StayNest
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     ATLASDB_URL=your_mongodb_atlas_connection_string
     MAP_TOKEN=your_mapbox_token
     SECRET=your_session_secret
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_KEY=your_cloudinary_key
     CLOUDINARY_SECRET=your_cloudinary_secret
     ```

4. **Run the app:**
   ```bash
   node app.js
   ```
   or, for development with auto-restart:
   ```bash
   npx nodemon app.js
   ```

5. **Visit:**  
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
controllers/      # Route handlers for listings, reviews, users
models/           # Mongoose models (Listing, Review, User)
routes/           # Express route definitions
views/            # EJS templates
public/           # Static assets (CSS, JS, images)
utils/            # Utility classes (error handling, async wrapper)
init/             # Data seeding scripts
app.js            # Main application entry point
cloudConfig.js    # Cloudinary configuration
schema.js         # Joi validation schemas
```

## Listing Model

- `title`: String (required)
- `description`: String
- `image`: { filename, url }
- `price`: Number
- `location`: String
- `country`: String
- `reviews`: [ObjectId] (references Review)
- `author`: ObjectId (references User)
- `geometry`: { type: "Point", coordinates: [Number, Number] }

## Scripts

- `npm start` — Start the server
- `npm test` — Placeholder for tests

## Author

Aditya Shankar Sahoo

## License

ISC