from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import date

app = FastAPI(title="Employee Data Management System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_CONFIG = {
    "dbname": "employee_db",
    "user": "postgres",
    "password": "Janit", 
    "host": "localhost",
    "port": "5432"
}

def get_db_connection():
    return psycopg2.connect(**DB_CONFIG)

# ----------------- PYDANTIC MODELS -----------------

class EmployeeCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone_number: str
    department: str
    job_title: str
    hire_date: date
    address: Optional[str] = None

class EmployeeUpdate(EmployeeCreate):
    status: Optional[str] = "Active"

class EmployeeResponse(EmployeeCreate):
    id: int
    status: str

# ----------------- API ENDPOINTS -----------------

@app.post("/api/employees", response_model=dict, status_code=201)
def add_employee(employee: EmployeeCreate):
    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        insert_query = """
            INSERT INTO employees (full_name, email, phone_number, department, job_title, hire_date, address)
            VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id;
        """
        cursor.execute(insert_query, (
            employee.full_name,
            employee.email,
            employee.phone_number,
            employee.department,
            employee.job_title,
            employee.hire_date,
            employee.address
        ))
        conn.commit()
        return {"message": "Employee saved successfully"}
    
    except psycopg2.IntegrityError:
        if conn:
            conn.rollback()
        raise HTTPException(status_code=400, detail="Email already exists")
    except Exception as e:
        if conn:
            conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            cursor.close()
            conn.close()


@app.get("/api/employees", response_model=List[EmployeeResponse])
def get_employees(search: Optional[str] = None, department: Optional[str] = None):
    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        query = "SELECT * FROM employees WHERE 1=1"
        params = []
        
        if search:
            query += " AND (full_name ILIKE %s OR email ILIKE %s OR job_title ILIKE %s OR phone_number ILIKE %s)"
            search_term = f"%{search}%"
            params.extend([search_term, search_term, search_term, search_term])
            
        if department and department != "All Departments":
            query += " AND department = %s"
            params.append(department)
            
        query += " ORDER BY id ASC"
        
        cursor.execute(query, tuple(params))
        employees = cursor.fetchall()
        return employees
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            cursor.close()
            conn.close()


@app.put("/api/employees/{employee_id}", response_model=dict)
def update_employee(employee_id: int, employee: EmployeeUpdate):
    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        update_query = """
            UPDATE employees
            SET full_name = %s,
                email = %s,
                phone_number = %s,
                department = %s,
                job_title = %s,
                hire_date = %s,
                address = %s,
                status = %s
            WHERE id = %s RETURNING id;
        """
        cursor.execute(update_query, (
            employee.full_name,
            employee.email,
            employee.phone_number,
            employee.department,
            employee.job_title,
            employee.hire_date,
            employee.address,
            employee.status,
            employee_id
        ))
        updated = cursor.fetchone()
        if not updated:
            raise HTTPException(status_code=404, detail="Employee not found")
            
        conn.commit()
        return {"message": "Employee updated successfully"}
    except psycopg2.IntegrityError:
        if conn:
            conn.rollback()
        raise HTTPException(status_code=400, detail="Email already in use by another employee")
    except Exception as e:
        if conn:
            conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            cursor.close()
            conn.close()


@app.delete("/api/employees/{employee_id}", response_model=dict)
def delete_employee(employee_id: int):
    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("DELETE FROM employees WHERE id = %s RETURNING id;", (employee_id,))
        deleted = cursor.fetchone()
        if not deleted:
            raise HTTPException(status_code=404, detail="Employee not found")
            
        conn.commit()
        return {"message": "Employee deleted successfully"}
    except Exception as e:
        if conn:
            conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            cursor.close()
            conn.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)