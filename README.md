# 🗂️ Company Announcements Manager App

A full-stack web application that allows users to create, update, delete, and view company announcements. It includes rich-text editing, search functionality, and a clean UI for better content management.

---

## 🚀 Features

- Create, read, update, delete (CRUD) announcements
- Rich text formatting with description editor
- Search announcements by title or content
- Responsive UI with TailwindCSS
- MySQL database for structured data storage
- Modular Express backend with RESTful API

---


## 🛠️ Tech Stack

**Frontend:** React.js, Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MySQL  

---

## ⚙️ Setup Instructions

### 🧩 Prerequisites

- Node.js & npm installed
- MySQL installed and running

---

### 🖥️ 1. Clone the Repository

```bash
git clone https://github.com/your-username/announcements-manager.git
cd company_announcement
cd backend
npm install
cd frontend
npm install

create .env in backend folder

DB_PASSWORD=your_password
DB_NAME=announcements_db
PORT=5000

start the backend and frontend
Frontend runs at: http://localhost:5173
Backend runs at: http://localhost:5000

---

📡 API Endpoints

GET	/api/announcements	Get all announcements
GET	/api/announcements/:id	Get announcement by ID
GET	/api/announcements/search?query=x	Search by title or description
POST	/api/announcements	Create a new announcement
PUT	/api/announcements/:id	Update an announcement by ID



