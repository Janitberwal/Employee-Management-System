 Employee Data Management System

A comprehensive, full-stack application designed to streamline HR workflows, manage employee records, and visualize workforce analytics. Built with a modern tech stack to ensure high performance, security, and an excellent user experience.

✨ Features

📊 Interactive Dashboards: High-level metrics showing total headcount, active staff, and recent hires.

👥 Employee Directory: Fully featured data table with pagination, real-time search, and department/status filtering.

✍️ Complete CRUD Capabilities: Seamlessly add, view, edit, and delete employee records via responsive modal interfaces.

🏢 Department Management: Visual grid grouping employees by their respective departments and tracking active statuses.

📈 Workforce Analytics: Dynamic charts built with Recharts to visualize headcount distribution and employment status.

🔒 Secure Backend: RESTful API built with FastAPI, utilizing Pydantic for strict data validation and psycopg2 with parameterized queries to prevent SQL injection.

🛠️ Tech Stack

Frontend: React (Vite), Tailwind CSS, Lucide React (Icons), Recharts (Data Visualization), Axios

Backend: Python, FastAPI, Uvicorn, Pydantic

Database: PostgreSQL, psycopg2-binary

📂 Project Structure

Employee-Management-system/
├── backend/
│   ├── main.py              # FastAPI server & REST endpoints
│   ├── database.py          # Database connection utility
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components (Navbar, Sidebar)
│   │   ├── pages/           # Core views (Overview, Directory, Add, Reports, etc.)
│   │   ├── App.jsx          # Main layout & routing logic
│   │   └── index.css        # Tailwind directives & global styles
│   ├── package.json         # Node dependencies
│   └── vite.config.js       # Vite & Tailwind configuration
├── schema.sql               # PostgreSQL table creation & seed script
└── README.md                # Project documentation


🚀 Setup & Installation

Prerequisites

Node.js (v18 or higher recommended)

Python (v3.10 or higher)

PostgreSQL (running locally on port 5432)

1. Database Configuration

Open your PostgreSQL terminal (psql) or a GUI like pgAdmin.

Execute the included SQL script to create the database, table, and populate seed data:

psql -U postgres -f schema.sql


2. Backend Setup (FastAPI)

Open a terminal and navigate to the backend directory:

cd backend


Create and activate a virtual environment:

# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate


Install the required Python packages:

pip install -r requirements.txt


Verify your database credentials in main.py (DB_CONFIG dictionary matches your local PostgreSQL setup).

Start the API server:

python main.py


The backend will be available at http://localhost:8000. You can view the interactive API documentation at http://localhost:8000/docs.

3. Frontend Setup (React + Vite)

Open a new terminal window and navigate to the frontend directory:

cd frontend


Install the Node modules:

npm install


Start the development server:

npm run dev


The application will be available at http://localhost:5173.
