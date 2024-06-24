Todo List Application
Overview
This project is a Todo List application built with React. It allows users to manage their tasks with features like adding, completing, removing, and filtering todo items. The application includes authentication, API interaction, routing, and responsive design.

#Setup and Run
Prerequisites
Node.js (v14.x or later)
npm (v6.x or later)

#Installation
Clone the repository:
git clone https://github.com/abdelquodr/todo-list-app.git
cd todo-list-app

#Install dependencies:
npm install

#Run the application:
npm start

#Running Unit Tests
npm test

#Assumptions and Decisions
API: The application uses https://jsonplaceholder.typicode.com/todos for fetching todo items.
Authentication: JWT tokens are used for user authentication.
State Management: React's useState and useEffect hooks are used for state management.
Styling: Basic CSS is used for styling the application.

#Branching Strategy
main: Contains production-ready code.
feature/: Used for developing new features.
bugfix/: Used for fixing bugs.
hotfix/: Used for urgent fixes to the main branch.
This README provides essential information to set up and run the Todo List application, along with details about the project structure and assumptions made during implementation.
