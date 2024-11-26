# AI Architect: Your Software Design Assistant 🚀

## What is AI Architect?
AI Architect is a tool that helps you design software architecture. Asking the right questions is often more important than having immediate answers. By walking you through a series of thoughtful, strategic questions, it helps you clarify your vision, identify potential challenges, and create more robust architectural designs.

## Before You Begin: What You'll Need 🛠️

### Technical Requirements
- **Python**: Version 3.8 or higher
- **Node.js and npm**: These help run the frontend of your application

### Beginner's Tip 💡
If you're new to programming, don't panic! This guide will walk you through everything step-by-step.

## Let's Get Started! 🌟

### Step 1: Download the Project
Open your computer's terminal (or command prompt):

```bash
# This downloads the project to your computer
git clone https://github.com/lod-io/clod-mini-apps.git

# Move into the project folder
cd ai-architect
```

### Step 2: Set Up the Backend (Python Part)

#### Create a Virtual Environment
A virtual environment is like a special room for your project's Python packages. It keeps everything organized!

```bash
# Go to the server folder
cd server

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# For Mac/Linux:
source venv/bin/activate

# For Windows:
venv\Scripts\activate
```

#### Install Required Packages
```bash
# This installs all the Python libraries the project needs
pip install -r requirements.txt
```

#### Get Your API Key
1. Visit [CLōD Console](https://dashboard.clod.io/api-key)
2. Click "Generate +" to create a new API key
3. Copy your API key

#### Create an Environment File
Create a file named `.env` in the `server` folder and add your API key:

```bash
CLOD_API_KEY="[your-api-key]"
```

### Step 3: Set Up the Frontend (Web Interface)
```bash
# Move to the client folder
cd ../client

# Install web dependencies
npm install
```

## Running the Application 🖥️

### Start the Backend Server
```bash
# Go back to the server folder
cd ../server

# Launch the backend
python3 main.py
```

### Start the Frontend
```bash
# Go to the client folder
cd ../client

# Start the web interface
npm start
```

## How to Use the Application
Open your web browser and go to `http://localhost:3000`

## Troubleshooting 🛠️

### Common Issues and Solutions
- **Module Not Found Error**
  - Make sure you've activated the virtual environment
  - Confirm all requirements are installed

- **Backend Won't Start**
  - Double-check your `.env` file
  - Ensure your API key is correct and properly formatted

- **Frontend Fails**
  - Verify all npm dependencies are installed
  - Check for any error messages in the terminal

## Pro Tips 💡
- Always keep your virtual environment activated when working on the project
- If you close your terminal, reactivate the virtual environment
- Don't share your API key publicly

Happy Coding! 👩‍💻👨‍💻
