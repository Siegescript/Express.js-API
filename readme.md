# The Omnissiah's Express.js REST API

A sacred RESTful shrine built with Express.js, Sequelize ORM, and MySQL, consecrated with session-based authentication, validation rites, rate-limiting wards, and cryptographic password hashing.

## ⚙️ Technological Rites (Tech Stack)

* **Runtime:** Node.js (ES Modules)

* **Framework:** Express.js

* **Database & Relational Matrix:** MySQL, Sequelize

* **Authentication Rites:** Passport.js (`LocalStrategy`), `express-session`, `bcrypt`

* **Sanitization & Wards:** `express-validator`, `express-rate-limit`, `cors`

---

## 📂 Sanctuary Architecture (Project Structure)

```text
├── src/
│   ├── config/
│   │   ├── database.mjs     # Sequelize connection, sync, and unique-hash seeding rites
│   │   └── passport.mjs     # Local strategy and soul-serialization configuration
│   ├── controllers/
│   │   ├── authController.mjs # Authentication and session management handlers
│   │   └── userController.mjs # CRUD operations for user entities
│   ├── middlewares/
│   │   ├── auth.mjs         # Route safeguarding and authentication checks
│   │   ├── logger.mjs       # Vox-net request logging ritual
│   │   ├── rateLimiters.mjs # Global and auth brute-force wards
│   │   └── validate.mjs     # Express-validator error handling interceptor
│   ├── models/
│   │   ├── userModel.mjs    # Sequelize User schema with cryptographic hooks
│   │   └── userModel_mock.mjs # Initial raw dataset for the Machine Spirit
│   ├── routes/
│   │   ├── authRoutes.mjs   # Authentication endpoints
│   │   └── userRoutes.mjs   # User resource endpoints
│   └── utils/
│       └── validationSchemas.mjs # DRY field validation and sanitization schemas
└── index.mjs                # Application entry point and server startup liturgy

```

---

## 🛠️ Litany of Activation (Getting Started)

### Prerequisites

* Node.js (v18+ recommended)

* MySQL Server installed and operational

### Installation Rites

1. Clone the repository to your local cogitator:
```bash
git clone https://github.com/Siegescript/Express.js-API.git
cd Express.js-API

```

2. Invoke the package installation:
```bash
npm install

```

3. Configure your environment variables. Create a `.env` file in the root sanctum matching this template:
```env
NODE_ENV=development
PORT=3000
SESSION_SECRET=[sacred_machine_key]
DATABASE_PASSWORD=[your_mysql_root_password]

```

4. Prepare your MySQL database:
Ensure a database named `expressjs_api` exists within your MySQL instance.

5. Awaken the Machine Spirit:
```bash
npm run dev

```


*(The application automatically establishes database communication, synchronizes models, and seeds the initial mock users with uniquely hashed passwords on first boot).*

---

## 🔌 Sacred Vox-Channels (API Endpoints)

### Authentication (`/api/auth`)

* `POST /api/auth/login` - Validates credentials, compares cryptographic hashes, and establishes a secure session cookie (Protected by strict rate limiting).

* `POST /api/auth/logout` - Destroys the active session and purges the cookie.

* `GET /api/auth/status` - Consults the Machine Spirit to return the active user payload or `401 Unauthorized`.

### Users (`/api/users`)

* `GET /api/users` - Retrieves a paginated, filterable list of users utilizing fuzzy search operators.

* `POST /api/users` - Registers a new user with automatic password hashing rites.

* `GET /api/users/:id` - Retrieves a single user by primary key.

* `PUT /api/users/:id` - Complete replacement of a user record.

* `PATCH /api/users/:id` - Partial update of a user record.

* `DELETE /api/users/:id` - Purges a user record (Requires active authentication).