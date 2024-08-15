# Health Buddy

This project is actively deployed for your use at https://project17-cen4010.firebaseapp.com/

## Overview

Health Buddy is a user-friendly web application designed to help individuals monitor their daily food intake and exercise routines. With a simple and intuitive interface, users can easily track their health and fitness goals, log meals, and exercise activities, and review their progress over time.

## Contributors
- **William Reed**: Lead Developer, Firebase Integration, Version Control Management
- **Nicolas Kraft**: Firebase Hosting and Authentication, Documentation
- **Jenny Jacob**: Documentation, Demo Videos, PowerPoints
- **Joao Ribeiro**: Documentation, Wireframe creation

## Features

- **User Registration and Authentication**: Secure account creation and login with email and password.
- **Food Diary**: Log meals, including meal names and calorie counts, and view or edit logged meals.
- **Exercise Log**: Track exercise activities, including workout types and durations.
- **User Profile**: Personalize profiles with details such as height, weight, and fitness goals, and track progress towards these goals.
- **Calorie Tracking**: Calculate and display daily calorie intake based on logged meals.
- **Reports and Insights**: Generate basic reports with visual graphs and charts to track progress over time.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: Firebase Firestore
- **APIs**: Food Nutrition Information from RapidAPI
- **Hosting**: Firebase Hosting
- **Authentication**: Firebase Authentication

## Getting Started

### Prerequisites

To run this project locally, you need to have Node.js and npm installed.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/willmreed14/health-buddy.git

2. Navigate to the project directory:
   ```bash
   cd health-buddy

3. Install the required dependencies:
   ```bash
   npm install

4. Create a .env file in the root directory and add your Firebase credentials:
   ```bash
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your_auth_domain
   FIREBASE_PROJECT_ID=your_project_id

5. Start the development server:
   ```bash
   npm start

6. Open your browser and navigate to 'http://localhost:3000'

## Usage

- **Register an account**: Sign up with a unique email and password.
- **Log meals and exercises**: Navigate to the Food Diary and Exercise Log sections to track your daily intake and activities.
- **Monitor progress**: View your profile to see a summary of your progress and adjust your goals as needed.

## Project Structure
- **/public**: Contains static files such as HTML, CSS, and JavaScript
- **/src**: Contains the application logic, including routes and Firebase config.
- **/views**: Contains the HTML templates used by the application.
- **/config**: Contains configuration files for Firebase and other services.

## Future Enhancements
- **API Integration**: Linking with more food and workout APIs to provide users with a broader range of tracking options.
- **Advanced Analytics**: Implementing more detailed reports and insights based on user data.
- **Mobile Responsiveness**: Enhancing the mobile experience for better accessibility.




