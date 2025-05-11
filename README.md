# 🚗 Parking Online

**Parking Online** is a web application for booking parking spots online.

**Deploy:** https://parking-online.netlify.app/

---

## 📦 Tech Stack

- **Frontned:** React, Typescript
- **Backend:** NestJS
- **Database:** MySQL
- **Docker** (used to run the database)

## 📥 Downloading

Clone the project

```
git clone https://github.com/gryzun33/parking.git
```

Go to folder with project

```
cd parking
```

Check if you are in branch `develop`

⚠️ **_Note:_** To run project in development mode, it's recommended to run frontend and backend in separate terminals:

## 📦 Installing NPM modules

In the first terminal go to folder with frontend-part:

```
cd frontend
npm install
```

In the second terminal go to folder with backend-part:

```
cd backend
npm install
```

## ⚙️ Preparing to run

#### Backend:

1. In folder `backend` rename file `.env.example` to `.env`

2. Run database

```
docker-compose up -d
```

3. Apply migratinons and add seeds :

To create database (apply prisma migrations and add seeds)

```
npm run migrate:seed
```

## 🚀 Running the project

#### Running project in development mode

To run frontend:

```
npm run dev
```

To run backend:

```
npm run start:dev
```

#### Running project in production mode

To run frontend:

```
npm run build
npm run preview
```

To run backend:

```
npm run build
npm run start:prod
```
