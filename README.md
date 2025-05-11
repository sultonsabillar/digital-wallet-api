# Digital Wallet API

Proyek ini adalah API backend untuk sistem dompet digital (e-wallet) yang menyediakan beberapa fitur dasar seperti registrasi akun, cek saldo, deposit, penarikan, dan transfer antar akun. API ini dibangun menggunakan **Express.js**, **TypeScript**, dan **Prisma ORM** dengan **PostgreSQL** sebagai database.

## Fitur Utama
- **Register**: Membuat akun baru dengan nama dan email.
- **Check Balance**: Memeriksa saldo akun.
- **Deposit**: Menambah saldo ke akun.
- **Withdraw**: Menarik saldo dari akun.
- **Transfer**: Transfer uang antar akun.
- **Riwayat Transaksi**: Melihat riwayat transaksi untuk suatu akun.

## Persyaratan
Pastikan Anda telah menginstal perangkat berikut:
- Node.js (LTS Version 23.0)
- Expresss.js
- Typescript 
- PostgreSQL

## Instalasi

1. **Clone Repository:**
   ```bash
   git clone https://github.com/sultonsabillar/digital-wallet-api.git
   ```
   ```bash
   cd digital-wallet-api
   ```
2. **Install Depedency:**
   ```bash
   npm install
   ```
   ```bash
   npm install @prisma/client
   ```
   ```bash
   npm install prisma --save-dev
   ```

3. **Setup Database:**

   Buat file `.env` masukan konfigurasi berikut
   ```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/your_database_name?schema=public"
   ```
   ```bash
   npx prisma migrate dev --name init
   ```
   ```bash
   npx prisma generate
   ```
4. **Ganti script package.json:**
   ```bash
      "scripts": {
      "start": "ts-node src/services/server.ts"
      }
   ```
5. **Run Server:**
   ```bash
      npm run start
   ```
6. **File Direktori:**

   ```bash
   digital-wallet-api/
   ├── node_modules
   ├── prisma
   │   ├── migrations
   │   ├── schema.prisma
   ├── src
   │   ├── controllers
   │     └── accountController.ts
   │     └── balanceController.ts
   │     └── depositController.ts
   │   ├── routes
   │     └── accountRoutes.ts
   │     └── balanceRoutes.ts
   │     └── depositRoutes.ts
   │   └── services
   │     └── server.ts
   ├── .env
   ├── .gitignore
   ├── package-lock.json
   ├── package.json
   ├── tsconfig.json
   └── README.md

7. **Postman:**

   Register
   
   POST :  `http://localhost:3000/api/accounts`

   Deposit

   POST :  `http://localhost:3000/api/accounts/:id/deposit`

   Balance

   GET :  `http://localhost:3000/api/accounts/:id/balance`

   Withdraw

   POST :  `http://localhost:3000/api/accounts/:id/withdraw`

   Transfer

   POST :  `http://localhost:3000/api/accounts/:id/transfer`