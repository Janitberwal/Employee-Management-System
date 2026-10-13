-- schema.sql
-- Database Creation
CREATE DATABASE employee_db;

-- Connect to database (if running via psql)
\c employee_db;

-- Table Structure
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    department VARCHAR(100) NOT NULL,
    job_title VARCHAR(100) NOT NULL,
    hire_date DATE NOT NULL,
    address TEXT,
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional Seed Data (Matches Reference UI Directory Mockup)
INSERT INTO employees (full_name, email, phone_number, department, job_title, hire_date, address, status) VALUES
('Ananya Sharma', 'ananya@brixigo.com', '+91 98765 43210', 'Engineering', 'Software Engineer', '2024-01-10', 'Bengaluru, Karnataka', 'Active'),
('Rohit Kumar', 'rohit@brixigo.com', '+91 91234 56789', 'Marketing', 'Marketing Manager', '2023-02-15', 'Mumbai, Maharashtra', 'Active'),
('Sneha Patel', 'sneha@brixigo.com', '+91 99887 77665', 'Human Resources', 'HR Executive', '2023-03-01', 'Ahmedabad, Gujarat', 'Active'),
('Vikram Prasad', 'vikram@brixigo.com', '+91 90000 12345', 'Finance', 'Finance Analyst', '2023-04-18', 'Delhi, India', 'Active'),
('Neha Tiwari', 'neha@brixigo.com', '+91 88997 66554', 'Sales', 'Sales Executive', '2023-06-12', 'Pune, Maharashtra', 'Active'),
('Arjun Mehta', 'arjun@brixigo.com', '+91 77665 44332', 'Operations', 'Operations Manager', '2023-08-01', 'Hyderabad, Telangana', 'Active'),
('Pooja Chavan', 'pooja@brixigo.com', '+91 99881 22334', 'IT', 'System Administrator', '2023-09-05', 'Mumbai, Maharashtra', 'Active'),
('Deepak Mishra', 'deepak@brixigo.com', '+91 88776 66554', 'Engineering', 'DevOps Engineer', '2023-11-14', 'Noida, UP', 'Active'),
('Kavya Reddy', 'kavya@brixigo.com', '+91 90009 88776', 'Marketing', 'Content Strategist', '2024-01-22', 'Chennai, Tamil Nadu', 'Active'),
('Suresh Lal', 'suresh@brixigo.com', '+91 98760 11223', 'Finance', 'Accounts Executive', '2024-03-10', 'Kolkata, West Bengal', 'Active')
ON CONFLICT (email) DO NOTHING;