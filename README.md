# 👹 Demon List - Full Stack Cloud Application

A robust, full-stack web application that tracks, ranks, and analyzes "Demon" level difficulties. Built with a modern Next.js frontend and a high-performance FastAPI backend, fully containerized and deployed on a 3-tier AWS cloud architecture.

**🌐 Project Status:** Archive / Read-Only (Cloud infrastructure spun down to prevent AWS costs)

---

## 🛠️ Tech Stack

This project utilizes a decoupled client-server architecture deployed on AWS.

### **Frontend (Client)**
* **Framework:** Next.js (React)
* **Styling:** Tailwind CSS
* **Hosting:** AWS Amplify (CI/CD connected to GitHub)

### **Backend (API)**
* **Framework:** FastAPI (Python)
* **ORM:** SQLAlchemy
* **Runtime:** Docker & Docker Compose
* **Hosting:** AWS EC2 (Ubuntu Linux)

### **Database (Storage)**
* **Database:** PostgreSQL 16
* **Hosting:** AWS RDS (Relational Database Service)

### **AI & DevOps**
* **AI Integration:** Gemini API & Groq API (Chatbot functionality)
* **Containerization:** Docker
* **Version Control:** Git & GitHub

---

## ☁️ Cloud Architecture

The application follows a standard **3-Tier Cloud Architecture**:

### Architecture Breakdown

- **Presentation Tier:**  
  Hosted on AWS Amplify, providing global edge caching, HTTPS delivery, and automated CI/CD deployment.

- **Logic Tier:**  
  A Dockerized FastAPI backend running on an AWS EC2 instance (Ubuntu), managed using Docker Compose.

- **Data Tier:**  
  A managed PostgreSQL database hosted on AWS RDS, secured within a VPC Security Group.

---

## ✨ Key Features

- **Demon Database:**  
  View, search, and filter a comprehensive list of Demon levels.

- **AI Chatbot:**  
  Integrated AI assistant powered by Gemini and Groq APIs to answer user queries and provide contextual insights.

- **User Authentication:**  
  Secure login and registration using OAuth2 with JWT-based authentication.

- **Dynamic Data:**  
  Real-time data fetching from a relational SQL database via a RESTful API.

- **Responsive Design:**  
  Fully optimized for desktop and mobile devices using Tailwind CSS.
