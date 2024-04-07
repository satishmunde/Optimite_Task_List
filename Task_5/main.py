import psycopg2

try:

    conn = psycopg2.connect(
        dbname="Task_5",
        user="postgres",
        password="Admin",
        host="localhost",
        port="5432"
    )

    cursor = conn.cursor()


    cursor.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';")
    tables = cursor.fetchall()


    for table in tables:
        table_name = table[0]
        print("Table:", table_name)


        sql_query = f"""
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = '{table_name}';
        """
        cursor.execute(sql_query)
        columns_info = cursor.fetchall()

        print("Columns and Data Types for Table:", table_name)
        for column_info in columns_info:
            column_name, data_type = column_info
            print(f"{column_name}: {data_type}")

    
        sql_query = f"SELECT * FROM {table_name} LIMIT 5;"


        cursor.execute(sql_query)


        rows = cursor.fetchall()

        for row in rows:
            print(row)

        print("\n") 



    cursor = conn.cursor()

    sql_query_q1 = """
     SELECT DISTINCT c.course_id, c.title
FROM course c
JOIN section s_winter ON c.course_id = s_winter.course_id 
JOIN section s_spring ON c.course_id = s_spring.course_id 
JOIN time_slot ts_winter ON s_winter.time_slot_id = ts_winter.time_slot_id
JOIN time_slot ts_spring ON s_spring.time_slot_id = ts_spring.time_slot_id
WHERE s_winter.semester = 'Winter' AND s_spring.semester = 'Spring';

    """
    cursor.execute(sql_query_q1)
    courses_taught_both = cursor.fetchall()

    print("Courses taught in both Winter and Spring semesters:")
    for course in courses_taught_both:
        print(course)

    print("\n")

    sql_query_q2 = """
        SELECT 
            instructor.name,
            instructor.id,
            COUNT(teaches.course_id) AS num
        FROM 
            instructor
        JOIN 
            teaches ON instructor.id = teaches.id
        JOIN 
            section ON teaches.course_id = section.course_id
        JOIN 
            time_slot ON section.time_slot_id = time_slot.time_slot_id
        WHERE 
            time_slot.day = 'W'
        GROUP BY 
            instructor.name, instructor.id
        ORDER BY 
            num DESC
        LIMIT 1;

        """



    cursor.execute(sql_query_q2)
    instructor_max_classes_W = cursor.fetchone()

    if instructor_max_classes_W is not None:
        print("Instructor(s) who has taught the maximum class:")
        print("Name:", instructor_max_classes_W[0])
        print("ID:", instructor_max_classes_W[1])
        print("Number of classes:", instructor_max_classes_W[2])
    else:
        print("No instructor found.")

    cursor.close()
    conn.close()

except psycopg2.Error as e:
    print("Error while connecting to PostgreSQL:", e)

