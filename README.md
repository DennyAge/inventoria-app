Inventoria Application
----
This app for managing orders and products.

https://inventoria-app.vercel.app

----------

Technologies:
-

**Frontend:** Nuxt 3, Vue 3, Pinia, TypeScript, Bootstrap, GraphQL, Chart.js, Leaflet, 

**Backend:** Node.js, Express, MongoDB, TypeScript,  Socket.io, GraphQL, AWS S3

**Deployment:** Docker, Docker Compose.

**Other:** Git, ESLint, Prettier, i18n, JWT, date-fns,

------------
Setup and Running
-
**Requirements**

Docker and Docker Compose (recommended)

Node.js (version 16 or higher, if running without Docker)


----------
**Running with Docker Compose**
-

**Clone the repository:**

`git clone https://github.com/DennyAge/inventoria-app.git`

`cd inventoria-app`

**Run the application:**

`docker-compose up --build`

Frontend will be available at: http://localhost:3000.

Backend will be available at: http://localhost:8080.

**Stop the application:**

`docker-compose down`

---------
Running without Docker
-

### **Frontend (Client)**

Navigate to the client folder:

`cd client`

**Install dependencies:**

`npm install `

**Start the development server:**

`npm run dev`

Frontend will be available at: http://localhost:3000.

### **Backend (Server)**

**Navigate to the server folder:**

`cd server`

**Install dependencies:**

`npm install`

**Start the server:**

`npm run start`

Backend will be available at: http://localhost:8080.