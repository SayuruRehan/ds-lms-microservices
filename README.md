# Microservices Backend using ReactJS, NodeJS, MongoDB, and Docker

## Group Details (Group S2-SE-WE-18)
IT21470004 - Bopitiya S. R. <br/>
IT21479250 - Gunathilaka I. U. <br/>
IT21454882 - Thilakarathna H. A. C. S. M. <br/>
IT21388248 - Fernando B. K. M. <br/>

# Guide to Deploying the System Locally

To set up the system locally for development or testing, follow these step-by-step instructions.

## What You Need

- Visual Studio Code (for the frontend)
- Docker Desktop
- Node.js (to use npm)

## Steps for Deployment

1. **Clone the repo**

2. **Setting Up the Backend**
   - Open VS Code and navigate to the backend directory.
   - Ensure Docker Desktop is installed and active.
   - In each service directory, execute:
     mvn clean install
   - This command will build the backend services.

2. **Configuring the Frontend**
   - Launch Visual Studio Code and open the frontend directory.
   - Confirm that Node.js and npm are installed.
   - In the terminal, run these commands:
     npm i
     npm start
   - This will deploy the frontend application.

3. **Docker Setup**
   - Open a terminal in the main backend directory.
   - Execute the following command to build and start Docker containers:
     docker-compose up --build
   - Wait for the containers to initialize.

4. **Verifying Deployment**
   - Once the Docker containers are running, open your web browser and go to:
     http://localhost:3000/
   - This should display the Eureka service dashboard, indicating that the services are operational.

## Additional Information
- Ensure all services are built and running without errors before using the application.
- Troubleshoot any deployment issues promptly.
- For production deployment, additional configurations and steps may be necessary.


CODE MODIFICATION
- Please add your SendGrid API key in the frontend directory -> src -> lerner -> CoursePage.js line number 56
- Please update the .env in the notification-microservice directory with the following properties.
     - SENDGRID_API_KEY=Add your key here
     - SENDGRID_API_EMAIL=Add the sender's API key here
