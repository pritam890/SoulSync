# SoulSync 🧘‍♀️✨

**SoulSync** is a self-care web application designed to promote wellness through engaging activities. Users can sign up or log in to access predefined self-care activities. Upon completing an activity, they earn reward points which can later be redeemed. The app also features an activity and reward history log.

## 🌐 Live Demo
*Coming soon* 

---

## 🛠️ Tech Stack

### Frontend
- ReactJS
- Tailwind CSS 

### Backend
- Node.js
- Express.js
- MongoDB

---

## 📁 Folder Structure

### Backend
```
server/
├── controllers/
│   └── userController.js
├── middlewares/
│   └── auth.js
├── models/
│   ├── userModel.js
│   ├── rewardModel.js
│   └── careModel.js
├── routes/
│   └── userRoutes.js
└── server.js
```

### Frontend (React)
```
client/
├── pages/
│   ├── Home.jsx
│   ├── History.jsx
│   ├── Reward.jsx
│   └── Care.jsx
├── App.jsx
└── main.jsx
```

---

## 🔐 Features

- **Authentication**: Login and Signup functionality
- **Self-Care Activities**: Access a predefined list of care activities
- **Reward System**: Earn and redeem reward points for completed tasks
- **History Tracking**: View logs of completed activities and rewards redeemed
- **Logout**: Secure logout functionality

---

## 📦 Installation

### Backend Setup

```bash
cd server
npm init
npm start server.js
```

### Frontend Setup

```bash
cd client
npm install 
npm run dev
```

Ensure your frontend API requests correctly target your backend (e.g., using `http://localhost:PORT`).

---

## 🌱 Environment Variables

Create a `.env` file in the backend root and add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=4000
```


## 🤝 Contributions

Pull requests are welcome! For major changes, open an issue first to discuss what you would like to change.



## 🧑‍💻 Developed by

**Pritam Adhikari**
