## 🎵 Recording Studio Management Application 🎵

This project is a Recording Studio Management Application designed to help manage music albums, creators, and tracks. The platform allows users to register, log in, and perform actions based on their roles, such as managing albums and selling music. The app features a clean, intuitive, and multi-window interface that supports various user functions, from browsing music to administrative controls. Below is a high-level overview of the app's main functionalities and goals.

## 🔑 Key Features
* Multi-window interface: Clean and intuitive UI with support for standard menu structures, key shortcuts, and customizable logo and studio name.
* User Registration and Authentication: Users can register, log in, and manage their profiles. The first registered user becomes the system administrator.
* Role-Based Access Control:
* Administrator: Can manage albums, creators, tracks, promote other users to admin, and resign.
* Standard Users: Can browse content but not modify it.
* Music Management:
* Create, edit, and delete albums, creators, and tracks.
* Automatically assign creators to all tracks in an album.
* View album art from a specified folder.
* Shop System: Users can buy albums/tracks, with personal details auto-filled for logged-in users.
* Secure Password Storage: Passwords stored as sha1(sha1(password)) hashes.
* Database Flexibility: Supports MySQL, PostgreSQL, SQLite, or MongoDB.
* Data Backup: Export data (e.g., in ZIP format) for backup purposes.
* Multi-language Support: The app offers different language versions.
* Dark/Light Modes: Automatically set based on user preferences after login.
* File Transfer: Transfer purchased music between users.
* Demo Mode: Available with limited options, with the ability to unlock full functionality via a license key.

## 🚀 Technologies Used
The application is built using the following technologies:

* Electron: For building the cross-platform desktop application.
* React: For creating a dynamic and user-friendly UI.
* Flask (REST API): Powers the backend, handling authentication, database operations, and data exchanges.

## 🛠️ Installation
Prerequisites
Ensure you have the following installed:

* Node.js
* Python

## Setup
1. Clone the repository:
`git clone https://github.com/Schoji/SoundNest.git`

2. Install frontend dependencies (Electron/React):s
`cd soundnest-src`
`npm install`

3. Install backend dependencies (Flask):
`cd ..`
`cd soundnest-backend`
`py -m venv .venv`
`pip install -r requirements.txt`

4. Run the Flask API:
`py create_db.py`
`py main.py`

5. Start the Electron app:
`cd ..`
`cd soundnest-src`
`npm start`
