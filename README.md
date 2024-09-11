# Endpoints
 ## Sign Up
- Register a new user in the system. If a user tries to register as an admin and an admin already exists, it will return an error.
- 
## POST /signup
-Request Body:
```
{
  "name": "string",
  "email": "string",
  "citizenshipNo": "string",
  "password": "string",
  "role": "string" // E.g., 'admin' or 'user'
}
```
- Responses:
- 200 OK: User registered successfully.
```
{
  "token": "string",
  "message": "user created successfully",
  "id": "string"
}
403 Forbidden: Admin already exists.
{
  "message": "Admin already exists"
}
500 Internal Server Error: Server encountered an error.
{
  "err": "error message"
}
```
# Login

## Login a user with citizenship number and password.

## POST /login
Request Body:
```
{
  "citizenshipNo": "string",
  "password": "string"
}
```
- Responses:
- 200 OK: Login successful.
```{
  "token": "string",
  "message": "login successful",
  "id": "string"
}

- 404 Not Found: User not found.

{
  "message": "user not found"
}
- 501 Not Implemented: Incorrect password.

{
  "message": "incorrect Password"
}
- 500 Internal Server Error: Server encountered an error.

{
  "error": "internal server error"
}
```
# View Profile

- View the profile of a user by their ID.
- 
## GET /profile/:id

- Parameters:
- id (string): The user's ID.
- Responses:
- 200 OK: User profile retrieved successfully.

```
{
  "userdata": {
    "_id": "string",
    "name": "string",
    "citizenshipNo": "string",
    "email": "string"
  }
}
-404 Not Found: User not found.
{
  "message": "user not found"
}
- 500 Internal Server Error: Server encountered an error.
{
  "error": "internal server error"
}
```
# Change Password
- Change the password of a user by verifying their citizenship number and current password.

## PUT /change-password
Request Body:
```
{
  "citizenshipNo": "string",
  "password": "string",    // Current password
  "newPassword": "string"  // New password
}
```
- Responses:
- 200 OK: Password changed successfully.
```
{
  "message": "password changed successfully"
}
- 501 Not Implemented: Incorrect old password or new password is the same as the old one.

{
  "message": "incorrect old password"
}

{
  "message": "new password cannot be same as old password"
}
- 500 Internal Server Error: Server encountered an error.
{
  "error": "internal server error"
}
```
