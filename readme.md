# ChatGPT Clone  

A full-stack ChatGPT clone built with **React (Frontend)** and **Laravel (Backend)**.  

## Features  

✅ Remember Last Message  
✅ New Chat Support  
✅ Guest Chat Support  
✅ Google Login using Firebase  
✅ Dockerized Laravel Backend  

---

Here’s the updated README section with a **Screenshots** section:  

---

## 🎯 Notes  
- Google Login is optional. The app works without it.  
- Ensure Docker is installed and running before starting the backend.  
- Supports multiple backend implementations: **FastAPI, Node.js** (more can be added).  
- Supports multiple LLMs: **DeepSeek (local), Gemini (online), and others (extensible).**  

**## 📸 Screenshots  **

### Guest User  
![Guest User](https://raw.githubusercontent.com/Gurinder-Batth/chat-gpt-clone/refs/heads/main/client/screenshot/guest-user.png)  

### Logged-in User  
![Logged-in User](https://raw.githubusercontent.com/Gurinder-Batth/chat-gpt-clone/refs/heads/main/client/screenshot/login-user.png)  

### Login with Google  
![Login with Google](https://raw.githubusercontent.com/Gurinder-Batth/chat-gpt-clone/refs/heads/main/client/screenshot/login-with-goole.png)  


## 🚀 Getting Started  

### Frontend (React)  

1. **Navigate to the client directory:**  
   ```sh
   cd client
   ```
2. **Install dependencies:**  
   ```sh
   npm install
   ```
3. **Create a `.env` file and configure API URL:**  
   ```sh
   REACT_APP_API_BASE_URL="http://localhost:9000/api"
   ```
4. **(Optional) If using Google Login, add Firebase credentials:**  
   ```sh
   FIREBASE_PUBLIC_FIREBASE_API_KEY="{api_key}"
   FIREBASE_PUBLIC_FIREBASE_AUTH_DOMAIN="{project_id}.firebaseapp.com"
   FIREBASE_PUBLIC_FIREBASE_PROJECT_ID="{project_id}"
   FIREBASE_PUBLIC_FIREBASE_APP_ID="{app_id}"
   ```
5. **Start the development server:**  
   ```sh
   npm run start
   ```

---

### Backend (Laravel)  

1. **Navigate to the backend directory:**  
   ```sh
   cd backend
   ```
2. **Start the backend using Docker:**  
   ```sh
   docker compose up -d
   ```
3. **Navigate to the backend source folder:**  
   ```sh
   cd backend/src
   ```
4. **Copy the environment file and update it:**  
   ```sh
   cp .env.example .env
   ```
5. **Set your OpenAI API key:**  
   ```sh
   OPENAI_API_KEY="Your_Key"
   ```
6. **(Optional) Firebase Service Account Path (Required for Google Login):**  
   ```sh
   FIREBASE_CREDENTIALS="/var/www/html/firebase_credentials.json"
   ```
   *You can generate this file from Firebase Authentication settings.*  
   
7. **Install dependencies:**  
   ```sh
   docker compose exec app composer install
   ```
8. **Run database migrations:**  
   ```sh
   docker compose exec app php artisan migrate
   ```
9. **Check if the backend is running:**  
   Open `http://localhost:9000` in your browser.  

---

Here’s an updated README section incorporating your requirements:  

---

Here’s an improved version of your README update with a contribution request:  

---

## 🎯 Notes  
- Google Login is optional. The app works without it.  
- Ensure Docker is installed and running before starting the backend.  

### 🤝 Contribute & Support  
This project aims to support multiple backends and LLMs. If you’d like to contribute, feel free to raise a PR to:  
✅ Add more backend implementations (Django, Fast API, Express, etc.).  
✅ Extend support for more LLMs (Mistral, OpenAI, Llama, etc.).  
✅ Improve overall performance and stability.  

Your support is appreciated! 🚀  !
---

## 👨‍💻 Author  

**Gurinderpal Singh**  
🔗 [LinkedIn](https://www.linkedin.com/in/gurinderpal-batth)  
🌍 [Portfolio](https://gurinder.mondaygeek.live)  
