Inventoria Application
----
This app for managing orders and products.

https://inventoria-app.vercel.app

----------

Technologies:
-

**Frontend:** Nuxt 3, Vue 3, Pinia, TypeScript, Tailwind, GraphQL, Chart.js, Leaflet, 

**Backend:** Node.js, Express, MongoDB, TypeScript,  Socket.io, GraphQL, AWS S3

**Deployment:** Docker, Docker Compose.

**Other:** Git, ESLint, Prettier, i18n, JWT, date-fns.

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
```bash
git clone https://github.com/DennyAge/inventoria-app.git
```

```bash
cd inventoria-app
```

**Set up environment variables:**

Create a .env file in the server folder with the following variables:

```env
PORT=8080
NODE_ENV=development
CLIENT_URL=http://localhost:3000
CLIENT_DOMAINE=localhost


DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
SESSION_SECRET=your_session_secret_key

AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_s3_bucket_name
```

Create a .env file in the client folder with the following variables:

```env
NUXT_PUBLIC_API_URL=http://localhost:8080
GQL_HOST=http://localhost:8080/graphql
```

**Run the application:**

```bash
docker-compose up --build
```

Frontend will be available at: http://localhost:3000.

Backend will be available at: http://localhost:8080.

**Stop the application:**

```bash
docker-compose down
```
---------
Running without Docker
-

### **Frontend (Client)**

Navigate to the client folder:

```bash
cd client
```

**Install dependencies:**

```bash
npm install
```

**Start the development server:**

```bash
npm run dev
```

Frontend will be available at: http://localhost:3000.

### **Backend (Server)**

**Navigate to the server folder:**

```bash
cd server
```

**Install dependencies:**

```bash
npm install
```

**Start the server:**
```bash
npm run start
```


Backend will be available at: http://localhost:8080.