# 🎬 Movie Manager React App
 
 Manage your favorite movies with ease! Add, edit, and delete movies dynamically. This app is built using React and demonstrates core React concepts like state management, props, and component-based architecture.

 ## Features
   * ➕ Add new movies with title, genre, and year.

   * ✏️ Edit existing movies.

   * ❌ Delete movies.

   * 🔍 Live search (filter movies as you type)

   * 🏆 Grid & List toggle layouts.

   * 💬 Feedback messages:
      *  🟢 Add → Top notification
      *  🔵 Update → Top notification(different color)
      *  🔴 Delete → Floating message near the deleted card
    
   * 🎨 Dynamic genre color badges

   * ⚡ Smooth hover animations and interactive buttons.

   * 💾 LocalStorage persistence (data saved even after refresh)

   * 📱 Fully responsive design for desktop and mobile

# Folder Structure

```bash

   src/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ItemForm.jsx
│   ├── ItemList.jsx
│   └── ItemCard.jsx
├── styles/
│   └── app.css
├── App.js
└── index.js
```

# 🛠 Tech Stack
  * ⚛️ React
  * 🧩 JSX
  * 🎨 CSS (Flexbox + Grid + Animations)
  * 🧠 JavaScript
  * 💾 LocalStorage
  * 🔧 Git & GitHub 

# 🚀 Getting Started  
  
## 📌 Prerequisites
  
  * Node.js >= 14
  * npm or yarn installed

## 📥 Installation
  
  ```bash
    git clone https://github.com/jasmi1901/movie-manager.git
    cd movie-manager
    npm install
    npm start
  ```
 👉 Open http://localhost:3000
 to view it in the browser.

  
  # 🎮 Available Scripts
   
  In the project directory, you can run:

  * npm start - Runs the app in the development mode.
   
  * npm test -  Launches the test runner
   
  * npm run build - Builds the app for production
 
   It correctly bundles React in production mode and optimizes the build for the best performance.

   The build is minified and the filenames include the hashes.\
   Your app is ready to be deployed!

   See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

   learn more in the [Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

  To learn React, check out the https://reactjs.org/.

# 🎯 How It Works
  
  1. Add a movie using the form at the top → shows top notification.
  2. Edit a movie → auto-scrolls to form → shows update popup.(blue)
  3. Delete a movie → triggers confirmation modal → shows center popup.
  4. Toggle layouts between grid and list views for browsing.
  
# Live Demo
  [movie-manager](https://jasmi1901.github.io/movie-manager/)

  
