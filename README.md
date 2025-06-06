# 🌍 Wanderlust Travel App

**Wanderlust** is a dynamic travel planning and destination exploration web application built using **Node.js**, **Express**, **EJS**, and **MongoDB**. It allows users to discover, review, and bookmark beautiful travel destinations across the world.

## ✨ Features

- 🗺️ Browse curated travel destinations
- 📝 Leave reviews and comments
- 💾 Bookmark favorite places
- 🔐 User authentication & authorization
- 📸 Upload destination images (Cloudinary integrated)
- 📍 Google Maps API for location previews

## 🔧 Tech Stack

| Tech | Description |
|------|-------------|
| Node.js | Backend runtime environment |
| Express.js | Web application framework |
| MongoDB + Mongoose | NoSQL database for storing destinations and users |
| EJS | Templating engine for rendering dynamic HTML |
| Passport.js | Authentication middleware |
| Cloudinary | Image upload and storage |
| Mapbox/Google Maps | For showing map views of destinations |

## 📸 Screenshots

> Add screenshots here:
- Home Page
- Destination Detail Page
- Review Section
- Add New Destination Page

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- MongoDB Atlas or Local MongoDB
- Cloudinary account
- Mapbox/Google Maps API Key

### Installation

```bash
git clone https://github.com/your-username/wanderlust-travel-app.git
cd wanderlust-travel-app
npm install

DATABASE_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
MAPBOX_TOKEN=your_mapbox_token
SECRET=your_session_secret

wanderlust/
├── public/             # Static assets
├── routes/             # Express route handlers
├── views/              # EJS templates
├── models/             # Mongoose models
├── controllers/        # Business logic
├── app.js              # Main app entry
└── package.json


Security & Best Practices
Input sanitization using express-mongo-sanitize

Helmet for HTTP header security

Rate limiting for requests

Password hashing with bcrypt

🙌 Acknowledgments
Inspired by YelpCamp by Colt Steele

Images courtesy of Unsplash and Pexels

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

markdown
Copy
Edit
