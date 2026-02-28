# DesignHive

DesignHive is a modern web application designed for users to authenticate, browse a visual feed, and create their own posts with image uploads.

## Features

- **User Authentication:** Secure login and signup flows using bcrypt and JWT.
- **Dynamic Feed:** A fully interactive dashboard feed for users to view uploaded posts, including seamless video playback.
- **Media Uploads (Images & Videos):** Robust support for uploading images and videos (up to 50MB) straight from the dashboard.
- **Persistent Cloud Storage:** Integration with Cloudinary to ensure uploads are permanently stored and served securely via CDN, making the app serverless-deployment ready.
- **Responsive Design:** Clean and accessible UI with custom styling, animated tooltips, and interactive 'Like' components.

## Previews

Here's an overview of the key screens in DesignHive.

### 1. Login
![Login](public/images/1%20Login.png)

### 2. Feed
![Feed](public/images/2%20Feed.png)

### 3. Post
![Post](public/images/3%20Post.png)

## Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Frontend View Engine:** EJS
- **Authentication:** bcryptjs, jsonwebtoken, express-session
- **Storage/Uploads:** Cloudinary, Multer, multer-storage-cloudinary

