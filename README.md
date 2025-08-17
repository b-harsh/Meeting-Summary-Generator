# 🚀 AI Meeting Notes Summarizer

An intelligent full-stack web application designed to streamline your workflow by summarizing long meeting transcripts and facilitating easy sharing. Users can upload text, provide custom instructions, and generate concise, editable summaries powered by the Groq AI API. The final summary can be shared directly via email.

**Project Detail DOC:** https://docs.google.com/document/d/1dkuH8l_qCqXoOQdACvz3Zn1SPOlDaxkYUfp3fPKYzZI/edit?usp=sharing

https://github.com/user-attachments/assets/9cadc790-3f06-4964-96d8-74cf7cccb553



## ✨ Features

📝 **Upload Transcripts**: Easily paste any length of text, such as meeting notes or call transcripts.
🤖 **Custom AI Prompts**: Guide the AI by providing custom instructions (e.g., "Summarize for an executive audience," "Extract only action items").
⚡ **Fast Summarization**: Leverages the high-speed Groq API to generate summaries almost instantly.
✏️ **Editable Summaries**: The generated summary is fully editable, allowing for tweaks and corrections before sharing. The application supports Markdown rendering for styled text like bolding and bullet points.
📧 **Share via Email**: Enter a recipient's email address to send the final, styled summary directly from the application.
💾 **Persists Data**: Saves a copy of the original transcript and the final summary to a MongoDB database.

### 🛠️ Tech Stack
This project is a full-stack MERN application, built with a focus on modern, efficient, and scalable technologies.

**Frontend**
React: A component-based JavaScript library for building user interfaces.
Axios: A promise-based HTTP client for making API requests to the backend.
Marked: A library for parsing and rendering Markdown text as HTML.
Vercel: The platform used for deploying the frontend.

**Backend**
Node.js: A JavaScript runtime for building the server-side application.
Express.js: A minimal and flexible web application framework for Node.js.
MongoDB: A NoSQL database used for storing transcripts and summaries.
Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.
Groq API: The AI service used for generating summaries.
Nodemailer: A module for sending emails from the Node.js server.
Render: The platform used for deploying the backend.

### 🏁 Getting Started
To get a local copy up and running, follow these simple steps.

**Prerequisites**

Node.js (v14 or later)
npm (Node Package Manager)
Git

**Installation & Setup**

Clone the repository to your local machine:
```
git clone https://github.com/your-username/ai-summarizer-app.git
cd Meeting-Summary-Generator
```

Install backend dependencies:
```
cd backend
npm install
```

Install frontend dependencies:
```
cd ../frontend
npm install
```

Set up environment variables:

Navigate back to the backend directory.

Create a new file named .env.

Copy the contents of .env.example (or the structure below) into your new .env file and fill in your credentials.

## backend/.env

#### Server Port
PORT=5001
#### MongoDB Connection String
MONGO_URI=your_mongodb_connection_string
#### Groq API Key
GROQ_API_KEY=your_groq_api_key
#### Gmail Credentials for Nodemailer
#### NOTE: EMAIL_PASS must be a 16-character App Password from your Google Account
#### EMAIL_USER=your-email@gmail.com
#### EMAIL_PASS=your_16_character_app_password

**Running the Application**

You will need two terminals to run both the frontend and backend servers simultaneously.

Start the backend server:

In your first terminal, navigate to the backend directory.

## From the /backend directory

```
npm run dev
```
Your backend should now be running on http://localhost:5001.

Start the frontend development server:
In your second terminal, navigate to the frontend directory.

## From the /frontend directory

```
npm start
```

Your application should automatically open in your browser at http://localhost:3000.

### 🚀 Deployment
This application is deployed with a decoupled frontend and backend architecture.
The Backend is deployed as a Web Service on Render. It connects to a MongoDB Atlas cluster and handles all API logic, including communication with the Groq API and sending emails.

The Frontend is deployed on Vercel. It is configured to make API calls to the live Render backend URL.

This setup ensures a scalable and efficient separation of concerns.


**                                                                                                                                  **HARSH BAJAJ || bajajharsh154@gmail.com || 9258080924**
**
