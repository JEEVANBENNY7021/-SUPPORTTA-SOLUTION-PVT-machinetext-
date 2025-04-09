#  Product Management API

A RESTful API for Product Management with **User/Admin Authentication**, **Role-based Access Control**, **Product CRUD with Image Upload**, **Search, Filter, Sort**, and **Wishlist functionality** using **Node.js**, **Express**, **MongoDB**, and **JWT**.

---

##  Features

### 1. Authentication & Authorization
- User Registration & Login using JWT.
- Admin Login (pre-created admin user).
- Role-based access control (Admin / User).
- Users manage their own products.
- Admins can manage all products.

### 2. Product Management
- Add, Update, Delete, View Products (CRUD).
- Upload image with `Multer` (jpg, jpeg, png; max size 1MB).
- Store image path in MongoDB.
- Only owner or admin can update/delete.

### 3. Search, Filter, Sort & Pagination
- Search by Product Name or ID (case-insensitive).
- Filter by Category or Price Range.
- Sort by Price, Date Added, or Name.
- Pagination: 5 products per page.

### 4. Wishlist / Favourites
- Add/Remove products to/from user’s wishlist (max 15).
- Retrieve wishlist items.

---

##  Technologies Used
- **Node.js + Express.js**
- **MongoDB + Mongoose**
- **JWT for Authentication**
- **Multer for File Uploads**
- **bcrypt.js for Password Hashing**
- **Express-validator for Input Validation**
- **Postman for API Testing**

---

##  Project Structure


```bash
git clone https://github.com/JEEVANBENNY7021/-SUPPORTTA-SOLUTION-PVT-machinetext-.git

cd supportta
npm install
npm install bcryptjs jsonwebtoken mongoose express cors dotenv        
npm start
