# 🚀 ReloMatch – Job Search Platform

ReloMatch is a full-stack web application designed to help users discover, track, and manage job opportunities through a clean and intuitive interface.  
The platform aggregates real-time job data and provides a streamlined workflow for job search and application tracking.

🔗 **Live Demo**: https://relomatchfront.onrender.com/  
🔗 **Backend Repository**: https://github.com/DoraYaroshenko/reloMatchServer  
🔗 **Frontend Repository**: https://github.com/DoraYaroshenko/reloMatchFront  

---

## ✨ Features

- 🔍 Search and browse job listings from external sources  
- 👤 User authentication with a personalized experience  
- 📌 Save and manage job applications  
- 🔄 Real-time job data aggregation via external APIs  
- 🎯 Clean and intuitive UI for efficient job tracking  

---

## 🧠 AI-Assisted Development

AI tools were integrated throughout the development process to improve productivity, code quality, and decision-making.

**Used ChatGPT to:**
- Generate initial API and component structures  
- Debug frontend-backend integration issues  
- Validate architectural decisions  
- Improve code design and development speed  

---

## 🏗️ Architecture

The application follows a **client-server architecture**:

### Frontend
- React (Single Page Application)  
- Component-based architecture  
- Axios for API communication  

### Backend
- Node.js + Express  
- RESTful API design  
- MongoDB for data storage  

### External Integrations
- Job data APIs for real-time listings  

---

## ⚙️ Tech Stack

### Frontend
- React  
- JavaScript (ES6+)  
- Axios  
- CSS  

### Backend
- Node.js  
- Express.js  
- MongoDB  

---

## 📦 Getting Started

### Prerequisites
- Node.js installed  
- npm or yarn  

---

### Run Frontend

```bash
git clone https://github.com/DoraYaroshenko/reloMatchFront
cd reloMatchFront
npm install
npm start
```
### Run Backend

```bash
git clone https://github.com/DoraYaroshenko/reloMatchServer
cd reloMatchServer
npm install
npm start
```

## ⚙️ Configuration

To run the project locally, you need to update the API endpoints for both frontend and backend.

### Backend

In `server/app.js` (line 21), update the frontend URL:

```javascript
origin: "http://localhost:3000" // replace with your frontend URL
```
### Frontend

In `src/services/apiService.jsx` (line 3), update the backend API URL:

```javascript
const API_URL = "http://localhost:5000"; // replace with your backend URL
```
## 🔐 Environment Variables

To run the backend locally, create a `.env` file in the root of the server directory and add the following variables:

```env
URLDB=your_mongodb_connection_string
TOKENSECRET=your_jwt_secret
CLOUDNAME=your_cloudinary_cloud_name
APIKEY=your_cloudinary_api_key
APISECRET=your_cloudinary_api_secret
```
  
## 📸 Screenshots
  <img width="1893" height="946" alt="image" src="https://github.com/user-attachments/assets/1daba14e-8bf9-484e-81f8-76959a56f69f" />
  <img width="1893" height="951" alt="image" src="https://github.com/user-attachments/assets/6f716279-e4ef-4f3f-a9a2-63553e327a2f" />
  <img width="1886" height="946" alt="image" src="https://github.com/user-attachments/assets/6a8eeb67-410a-4f7a-97c7-e0eb6b0fd75e" />
  <img width="1887" height="943" alt="image" src="https://github.com/user-attachments/assets/830445d1-37c5-4869-ad93-53dfea5b35b9" />
  <img width="1885" height="869" alt="image" src="https://github.com/user-attachments/assets/97143113-e076-44c5-9518-d6a64f78458c" />

## 🚀 Future Improvements
 - Improve recommendation system for job matching
 - Add advanced filtering and search capabilities
 - Enhance performance and scalability
 - Integrate AI-based job recommendations
 - 
## 💡 Key Takeaways
-  Built and deployed a full-stack application from concept to production
-  Designed scalable backend architecture and REST APIs
-  Integrated external data sources for real-time functionality
-  Leveraged AI tools to accelerate development and improve decision-making
  
## 👩‍💻 Author
-  Dora Yaroshenko
-  Noa Falik
