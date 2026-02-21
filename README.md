🎓 Intern Management System
A Full-Stack Intern Management System built using Spring Boot (Backend) and Angular Standalone (Frontend).
This application allows management of interns, batches, and reports with clean UI and REST API integration.

🚀 Tech Stack
🔹 Backend
Java 17+


Spring Boot


Spring Data JPA


MySQL


REST APIs


DTO Pattern


Global Exception Handling


CORS Configuration


Maven


🔹 Frontend
Angular 17+ (Standalone Components)


Angular Router (Lazy Loading)


HttpClient


TypeScript


Tailwind CSS



📂 Project Structure
Intern-Management-System/
│
├── Backend (Spring Boot)
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── entity/
│   ├── dto/
│   ├── config/
│   ├── exception/
│   └── security/
│
├── Frontend (Angular)
│   ├── dashboard/
│   ├── interns/
│   ├── batches/
│   ├── report/
│   ├── services/
│   └── app.routes.ts
│
└── README.md

✨ Features
👨‍💼 Intern Management
Add Intern


Edit Intern


Delete Intern


View Intern List


Assign Intern to Batch


📦 Batch Management
Create Batch


View All Batches


View Interns in a Batch


Track Start & End Dates


Batch Status Management


📊 Reports
Generate reports


View system data summary



⚙️ Backend Setup (Spring Boot)
1️⃣ Configure Database
Update application.properties:
spring.datasource.url=jdbc:mysql://localhost:3306/intern_db
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
2️⃣ Run Backend
mvn spring-boot:run
Backend will run on:
http://localhost:8080

🌐 Frontend Setup (Angular)
1️⃣ Navigate to frontend folder
cd frontend-folder-name
2️⃣ Install dependencies
npm install
3️⃣ Run Angular app
ng serve
Frontend will run on:
http://localhost:4200

🔗 API Configuration
Frontend connects to backend using:
http://localhost:8080
CORS configuration is enabled in:
CorsConfig.java
Allowed Origin:
http://localhost:4200

🛣️ Routing Structure (Angular)
/dashboard
/interns
/interns/new
/interns/edit/:id
/batches
/batches/new
/batch/:id
/report
All components are lazy-loaded using loadComponent.

🧠 Architecture
Backend
Controller → Service → Repository → Database
Frontend
Standalone Components + Angular Router + Service Layer
Design Pattern
DTO Pattern


Layered Architecture


RESTful API Design



🧪 Future Enhancements
JWT Authentication


Role-Based Access Control


Pagination


Search & Filtering


Export Reports (PDF/Excel)


Docker Deployment



👨‍💻 Author
 Harshit Mishra
 GitHub: https://github.com/your-username

