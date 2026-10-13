import psycopg2
from psycopg2 import OperationalError

DB_CONFIG = {
    "dbname": "employee_db",
    "user": "postgres",
    "password": "Janit", 
    "host": "localhost",
    "port": "5432"
}

def test_connection():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        print("Database connection successful!")
        
        # Test fetching the dummy data
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM employees;")
        record = cursor.fetchone()
        print("Test Record Found:", record)
        
        cursor.close()
        conn.close()
    except OperationalError as e:
        print(f"Error connecting to database: {e}")

if __name__ == "__main__":
    test_connection()