# Kitkat - Ecommerce project

Dynamic Vue 3 & Pinia based e-commerce platform with category-based discounts and interactive product UI

## Live Demo

- Live URL: [https://kitkat-ecom.web.app/](https://kitkat-ecom.web.app/)

## Repository

- GitHub Client: [https://github.com/mahmoodfoysal/full-dynamic-ecommerce-site-vue3](https://github.com/mahmoodfoysal/full-dynamic-ecommerce-site-vue3)
-
- GitHub Backend: [https://github.com/mahmoodfoysal/kitkat-ecommerce-server](https://github.com/mahmoodfoysal/kitkat-ecommerce-server)

## Technologies Used

- Vue.js
- vue router 4
- Pinia
- Firebase
- Node.js
- Express.js
- MongoDB
- HTML
- Bootstrap CSS
- CSS

## Key Features

- Category-wise discount posters and special offers
- Dynamic cart management with quantity
- Restricted review system allowing only logged-in users to participate

## Setup and Installation

### 1) Clone the repository

```terminal
git clone https://github.com/mahmoodfoysal/full-dynamic-ecommerce-site-vue3.git
cd project_name
```

### 2) Install dependencies

```terminal
npm install
```

### 3) Configure environment variables

Create a `.env.local` file in the root directory and add:

```env

VITE_APP_API_KEY=your_key
VITE_APP_AUTH_DOMAIN=your_domain
VITE_APP_PROJECT_ID=your_project_id
VITE_APP_STORAGE_BUCKET=your_storage_bucket
VITE_APP_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_APP_ID=your_app_id

```

Do not commit `.env.local` to version control.

### 4) Run the development server

```terminal
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5) Build for production

```terminal
npm run build
```
