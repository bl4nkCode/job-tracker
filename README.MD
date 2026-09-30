# Job Application Tracker

A full-stack app to track job applications on a Kanban board.

## Stack
- Backend: Laravel (REST API), Sanctum, MySQL
- Frontend: React + Vite + Tailwind CSS

## Structure
- `backend/` - Laravel API
- `frontend/` - React app

## Running the backend
```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan serve
```