# Yash Frontend - Business Idea Validation Platform

A React-based web application for validating business ideas with AI-powered suggestions, analytics, and comprehensive reporting features.

## 🚀 Features

- **User Authentication & Dashboard**: Secure login system with personalized user dashboards
- **Business Idea Validation**: Comprehensive form for validating business concepts
- **AI-Powered Suggestions**: Intelligent recommendations based on validation data
- **Analytics & Reporting**: Detailed insights and downloadable reports
- **PDF Generation**: Export validation reports to PDF format
- **Responsive Design**: Modern, mobile-friendly user interface

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Routing**: React Router DOM 6.8.1
- **HTTP Client**: Axios 1.6.0
- **PDF Generation**: jsPDF 2.5.1
- **HTML to Canvas**: html2canvas 1.4.1
- **Icons**: Lucide React 0.263.1
- **Testing**: React Testing Library suite
- **Build Tool**: Create React App 5.0.1

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16.0.0 or higher)
- **npm** (comes with Node.js) or **yarn**

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd yash-frontend
```

### 2. Install Dependencies
```bash
npm install
```

This will install all the required dependencies listed in `package.json`:

#### Core Dependencies
- `react`: ^19.1.1 - React library for building user interfaces
- `react-dom`: ^19.1.1 - React DOM rendering
- `react-router-dom`: ^6.8.1 - Client-side routing
- `react-scripts`: 5.0.1 - Build scripts and configuration

#### Utility Libraries
- `axios`: ^1.6.0 - HTTP client for API requests
- `jspdf`: ^2.5.1 - PDF generation library
- `html2canvas`: ^1.4.1 - HTML to canvas conversion
- `lucide-react`: ^0.263.1 - Modern icon library

#### Testing Dependencies
- `@testing-library/react`: ^16.3.0 - React testing utilities
- `@testing-library/dom`: ^10.4.1 - DOM testing utilities
- `@testing-library/jest-dom`: ^6.8.0 - Custom Jest matchers
- `@testing-library/user-event`: ^13.5.0 - User event simulation

### 3. Start Development Server
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### 5. Run Tests
```bash
npm test
```

## 📁 Project Structure

```
yash-frontend/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── Component/          # React components
│   │   ├── Auth.js        # Authentication component
│   │   ├── Dashboard.js   # User dashboard
│   │   ├── Home.js        # Landing page
│   │   ├── ValidationForm.js # Business idea validation form
│   │   ├── Report.js      # Report generation
│   │   ├── Analytics.js   # Data analytics
│   │   ├── AISuggestions.js # AI recommendations
│   │   ├── Header.js      # Navigation header
│   │   └── Footer.js      # Page footer
│   ├── App.js             # Main application component
│   ├── App.css            # Application styles
│   ├── index.js           # Application entry point
│   └── index.css          # Global styles
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🌐 Browser Support

The application supports:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## 🔒 Environment Variables

If you need to configure environment variables, create a `.env` file in the root directory:

```env
REACT_APP_API_URL=your_api_endpoint_here
REACT_APP_AI_SERVICE_KEY=your_ai_service_key_here
```

## 🚨 Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   ```bash
   # Kill the process using port 3000
   npx kill-port 3000
   # Or use a different port
   PORT=3001 npm start
   ```

2. **Dependencies installation fails**
   ```bash
   # Clear npm cache
   npm cache clean --force
   # Delete node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build fails**
   ```bash
   # Check for syntax errors
   npm run build
   # Look for specific error messages in the output
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 📞 Support

For support and questions, please contact the development team.

---

**Happy Coding! 🎉**
