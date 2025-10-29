# Ruby & Rails Learning Platform

An interactive learning platform similar to RubyMonk, built with React and Node.js, where users can learn Ruby and Ruby on Rails through hands-on exercises and tutorials.

![Ruby & Rails Learning Platform](https://img.shields.io/badge/Ruby-3.2+-red.svg) ![React](https://img.shields.io/badge/React-18-blue.svg) ![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg) ![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Features

- **Interactive Code Editor**: Write and execute Ruby code directly in your browser using Monaco Editor (VS Code's editor)
- **Comprehensive Lessons**: Learn Ruby from basics to advanced topics, plus Ruby on Rails fundamentals
- **Hands-on Exercises**: Practice with real coding challenges and get instant feedback
- **Progress Tracking**: Track your learning progress with automatic saving to localStorage
- **Beautiful UI**: Modern, responsive dark theme inspired by GitHub
- **Safe Code Execution**: Backend API executes Ruby code securely with timeouts

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Monaco Editor** - Code editor (VS Code editor)
- **Axios** - HTTP client
- **React Markdown** - Markdown rendering

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Ruby 3.2+** - Code execution engine

## Project Structure

```
rails_guide/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── CodeEditor.jsx       # Monaco editor wrapper
│   │   │   ├── LessonViewer.jsx     # Lesson content display
│   │   │   └── Sidebar.jsx          # Navigation sidebar
│   │   ├── data/          # Lesson content
│   │   │   ├── rubyLessons.js       # Ruby tutorials & exercises
│   │   │   └── railsLessons.js      # Rails tutorials & exercises
│   │   ├── App.jsx        # Main application component
│   │   ├── App.css        # Application styles
│   │   └── main.jsx       # Entry point
│   └── package.json
│
├── backend/               # Node.js backend API
│   ├── server.js          # Express server & Ruby execution API
│   ├── Dockerfile         # Docker configuration
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites

- **Node.js** 20+ and npm
- **Ruby** 3.2+ installed and available in PATH
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rails_guide
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure environment (optional)**
   ```bash
   cp .env.example .env
   # Edit .env if you want to change the API URL
   ```

### Running the Application

You'll need two terminal windows/tabs:

**Terminal 1 - Start the backend API:**
```bash
cd backend
npm start
```

The backend will run on `http://localhost:3001`

**Terminal 2 - Start the frontend dev server:**
```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is taken)

### Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## Usage

### Learning Ruby

1. Click on any lesson in the sidebar to start learning
2. Read the lesson content and examples
3. Write code in the editor
4. Click "Run Code" to execute and see the output
5. For exercises, click "Submit Solution" to validate your answer
6. Navigate between lessons using the Previous/Next buttons

### Lesson Types

- **Tutorial**: Learn concepts with examples and practice code
- **Exercise**: Solve coding challenges with automated tests

### Progress Tracking

Your progress is automatically saved to your browser's localStorage. You can:
- See completed lessons marked with a checkmark (✓)
- View overall progress percentage in the top bar
- Reset all progress using the "Reset Progress" button

## API Endpoints

### Health Check
```
GET /health
```

Returns the API status.

### Execute Ruby Code
```
POST /api/execute
Content-Type: application/json

{
  "code": "puts 'Hello, World!'",
  "testCode": "# Optional test code"
}
```

### Validate Exercise Solution
```
POST /api/validate
Content-Type: application/json

{
  "code": "def add(a, b)\n  a + b\nend",
  "tests": "raise 'Failed' unless add(2, 3) == 5"
}
```

## Lesson Content

### Ruby Lessons

1. **Ruby Basics**
   - Introduction to Ruby
   - Variables and Data Types
   - Numbers and Math
   - String Methods

2. **Control Flow**
   - If Statements
   - Loops (while, for, times, each)
   - FizzBuzz Challenge

3. **Arrays and Hashes**
   - Working with Arrays
   - Array Methods
   - Hash Basics

4. **Methods**
   - Defining Methods
   - Parameters and Return Values
   - Calculator Exercise

### Ruby on Rails Lessons

1. **Introduction to Rails**
   - What is Ruby on Rails?
   - MVC Architecture
   - Rails Application Structure

2. **Routing**
   - Basic Routes
   - RESTful Resources
   - Route Parameters

3. **Models and ActiveRecord**
   - ActiveRecord Basics
   - CRUD Operations
   - Validations
   - Associations

4. **Controllers and Views**
   - Controllers
   - Actions
   - Views and ERB
   - Layouts

## Development

### Adding New Lessons

1. Open `frontend/src/data/rubyLessons.js` or `railsLessons.js`
2. Add a new lesson object to the appropriate section:

```javascript
{
  id: 'unique-lesson-id',
  title: 'Lesson Title',
  content: `# Markdown content here`,
  starterCode: 'puts "starter code"',
  solution: 'puts "solution"',
  tests: '# Optional test code',
  type: 'tutorial' // or 'exercise'
}
```

### Customizing Styles

Edit `frontend/src/App.css` to customize the appearance. The color scheme is based on GitHub's dark theme.

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
The backend runs as-is in production. Consider adding:
- Docker containerization for Ruby code execution
- Rate limiting
- Authentication
- Code execution sandboxing

## Security Considerations

**Current Implementation:**
- 5-second timeout on code execution
- 1MB output buffer limit

**Recommended for Production:**
- Docker containers for code execution
- Resource limits (CPU, memory)
- Input sanitization
- Rate limiting
- User authentication
- Code execution sandboxing (firejail, nsjail)

## Roadmap

- [ ] Add more Ruby lessons (Classes, Modules, Metaprogramming)
- [ ] Add more Rails lessons (Forms, Authentication, Testing)
- [ ] Implement user accounts and cloud progress sync
- [ ] Add code execution in Docker containers
- [ ] Add syntax highlighting in lesson content
- [ ] Add code snippets library
- [ ] Add community solutions sharing
- [ ] Add difficulty levels
- [ ] Add achievement badges
- [ ] Add hints system

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by [RubyMonk](https://rubymonk.com/)
- Built with [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- UI design inspired by [GitHub](https://github.com/)

## Support

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) page
2. Create a new issue if your problem isn't already listed
3. Provide as much detail as possible

## Screenshots

### Main Learning Interface
The sidebar shows all available lessons organized by topic, with the code editor and lesson content in the main area.

### Exercise Validation
Submit your solutions and get instant feedback on whether your code passes the tests.

### Progress Tracking
Track your learning journey with the built-in progress bar and completion markers.

---

**Happy Learning!** 🚀

Built with ❤️ for Ruby and Rails learners everywhere.
