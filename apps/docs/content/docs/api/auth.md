# API Documentation

## User

### Register

**Path:** `/api/auth/register`

**Parameters:**
- `username` (string): The username of the user.
- `email` (string): The email address of the user.
- `password` (string): The password for the user account.
- `avatar` (string, optional): URL or identifier for the user’s avatar.

**Returns:**
- `_id` (string): Unique id of user
- `token` (string): JWT token for authentication.
- `username` (string): The registered username.
- `email` (string): The registered email address.
- `avatar` (string): The user’s avatar.

---

### Login

**Path:** `/api/auth/login`

**Parameters:**
- `email` (string): The email address of the user.
- `password` (string): The password for the user account.

**Returns:**
- `_id` (string): Unique id of user
- `token` (string): JWT token for authentication.
- `username` (string): The username associated with the account.
- `email` (string): The email address associated with the account.
- `avatar` (string): The user’s avatar.

