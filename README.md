# Social Media Network

## Laravel 11 (API) + React 18 (SPA)

![Home page](./images/home-page.jpg)

![ERD Diagram](./images/thread.png)

## Deploy

Laravel: https://thread-laravel.vercel.app

ReactJS: https://thread-reactjs.vercel.app

PostgreSQL: railway

## Install
### Laravel : 
```
cd laravel
composer install
```

Copy the .env.example file to create a new .env file:

`cp .env.example .env`

Generate Application Key:

`php artisan key:generate`

Run: 
```
cd laravel
php artisan serve
```

### ReactJS:

```
cd reactjs
npm install
```

Run: 
```
cd reactjs
npm run dev
```