<p align="center">
  <img src="https://static.vecteezy.com/system/resources/previews/023/552/814/non_2x/anime-minimalist-and-flat-logo-illustration-vector.jpg" width="150" alt="Project Logo">
  <h1 align="center">
    A&nbsp;n&nbsp;i&nbsp;m&nbsp;e&nbsp;X
  </h3>
</p>

## 🚀 Functionalities

### 👤 For Users
* **Smart Search:** Find any anime quickly by searching by **name**, **category**, or **release year**.
* **Detailed Insights:** View specific details for each anime, including:
    * **Episode count** and **Release date**.
    * **Full descriptions** and **Official trailers**.
* **Favorites:** Save and "Like" your favorite series (requires **Login**).

### 🔑 For Admins
* **Create:** Add new anime titles to the database.
* **Modify:** Edit information for existing anime entries.
* **Delete:** Remove anime from the system.
* **Manage:** Organize and curate the preferred content list.
* **Accounts control:** Oversee all registered users with the ability to create, update, or delete accounts and manage their profile data.


## ⚙️ Core Logic & System Features

### 🏆 Dynamic Ranking System
The Home Page features a **Live Leaderboard** that automatically ranks anime based on community engagement.
* **Algorithm:** Ranking is calculated in real-time based on the total number of "Likes" and how many users have added the title to their "Favorites."
* **Visibility:** The most popular series are highlighted at the top of the global board.

### 🔐 Security & Session Management
The application implements a secure authentication flow using **JSON Web Tokens (JWT)**:
* **Persistent Sessions:** Upon login, a JWT is generated to maintain a seamless user session.
* **Token Expiry:** For security, sessions are valid for **30 days**. 
* **Auto-Re-authentication:** After the 30-day period, the token expires, and the user is securely prompted to log in again to refresh their credentials.



## License

MIT License

Copyright&copy; 2026 - Riccardo Chen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

**THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.**
