
# Employee Data Management System

A comprehensive, full-stack application designed to streamline HR workflows, manage employee records, and visualize workforce analytics. Built with a modern tech stack to deliver high performance, reliable data management, and an intuitive user experience.

## ✨ Features

- **📊 Interactive Dashboard:** Displays key workforce metrics, including total employees, active staff, and recent hires.
- **👥 Employee Directory:** Provides a searchable employee table with pagination and department/status filtering.
- **✍️ Complete CRUD Operations:** Add, view, update, and delete employee records through a responsive interface.
- **🏢 Department Management:** Organizes employees by department and provides an overview of workforce distribution.
- **📈 Workforce Analytics:** Visualizes employee distribution and employment statistics using interactive charts.
- **🔍 Real-Time Search:** Search employee records using relevant information and filter results efficiently.
- **🔒 Backend Validation:** Uses FastAPI and Pydantic for request validation and parameterized SQL queries for safer database operations.
- **📱 Responsive Interface:** Built with React and Tailwind CSS for a clean and user-friendly experience.

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Lucide React
- Recharts
- Axios

### Backend
- Python
- FastAPI
- Uvicorn
- Pydantic
- psycopg2-binary

### Database
- PostgreSQL

## 📂 Project Structure

```text
Employee-Management-system/
├── backend/
│   ├── main.py              # FastAPI server and REST API endpoints
│   ├── database.py          # Database connection utility
│   ├── requirements.txt     # Python dependencies
│   └── venv/                # Python virtual environment (local only)
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Application pages
│   │   ├── App.jsx          # Main application layout
│   │   └── index.css        # Global styles and Tailwind CSS
│   ├── package.json         # Node.js dependencies and scripts
│   └── vite.config.js       # Vite configuration
├── schema.sql               # Database schema and optional seed data
└── README.md                # Project documentation
```

## 🚀 Setup and Installation

Follow these steps to run the project locally.

### Prerequisites

Make sure the following tools are installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Python](https://www.python.org/) (v3.10 or higher)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

## 1. Clone the Repository

```bash
git clone https://github.com/Janitberwal/Employee-Management-System.git
cd Employee-Management-System
```

## 2. Database Configuration

1. Start your PostgreSQL server.
2. Open PostgreSQL using `psql` or pgAdmin.
3. Create the database if it does not already exist.

For example, using `psql`:

```sql
CREATE DATABASE employee_db;
```

4. Connect to the database and execute the SQL schema.

If `schema.sql` contains the table definitions and seed data, run:

```bash
psql -U postgres -d employee_db -f schema.sql
```

**Note:** Update the database name, username, password, host, and port in the backend configuration to match your local PostgreSQL setup.

## 3. Backend Setup (FastAPI)

Open a terminal and navigate to the backend directory:

```bash
cd backend
```

### Create a Virtual Environment

**Windows (Git Bash):**

```bash
python -m venv venv
source venv/Scripts/activate
```

**Windows (Command Prompt):**

```bat
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**

```bash
python3 -m venv venv
source venv/bin/activate
```

### Install Dependencies

```bash
python -m pip install -r requirements.txt
```

### Configure the Database

Verify that the database configuration in your backend matches your PostgreSQL credentials.

Typical local settings:

- **Database:** `employee_db`
- **Host:** `localhost`
- **Port:** `5432`

Do not commit real database passwords or other secrets to GitHub.

### Start the Backend Server

```bash
python main.py
```

The backend API should be available at:

- **API Base URL:** http://localhost:8000
- **Interactive API Documentation:** http://localhost:8000/docs
- **Alternative API Documentation:** http://localhost:8000/redoc

Keep the backend terminal running while using the application.

## 4. Frontend Setup (React + Vite)

Open a **new terminal** and navigate to the frontend directory from the project root:

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

The frontend will typically be available at:

**http://localhost:5173**

Open this URL in your browser to use the application.

## 🔄 Running the Application

Whenever you want to run the project again:

1. Start PostgreSQL.
2. Open a terminal, navigate to `backend`, activate the virtual environment, and run `python main.py`.
3. Open another terminal, navigate to `frontend`, and run `npm run dev`.
4. Open http://localhost:5173 in your browser.

## 🛡️ Security Notes

- Validate incoming data before storing it in the database.
- Use parameterized SQL queries to reduce the risk of SQL injection.
- Keep database credentials and secret keys out of source control.
- Configure CORS with appropriate origins before deploying to production.
- Add authentication and authorization before exposing employee data publicly.

## 🔮 Future Enhancements

- Authentication and role-based access control
- Employee profile management
- Advanced filtering and reporting
- Export employee records to CSV or Excel
- Improved analytics and workforce insights
- Cloud deployment and production configuration

## 👨‍💻 Author

**Janit Berwal**

B.Tech in Information Technology

[GitHub Profile](https://github.com/Janitberwal)

---

⭐ If you find this project useful, consider giving the repository a star!
