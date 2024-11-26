# AI Architect

AI Architect is a tool that helps you design software architecture using AI assistance.

## Prerequisites

- Python 3.8 or higher
- Node.js and npm
- A Google Cloud account for Gemini API access

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/lod-io/clod-mini-apps.git
cd ai-architect
```

### 2. Set Up the Backend

#### Create a Python Virtual Environment (Recommended)

#### Navigate to the server directory

```bash
cd server
```

#### Create a Python virtual environment

```bash
python -m venv venv
```

#### Activate the virtual environment

```bash
source venv/bin/activate
```

#### Install dependencies

```bash
pip install -r requirements.txt
```

#### Set Up Environment Variables

1. Get your Gemini API key:

   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select an existing one
   - Enable the Gemini API
   - Create API credentials and copy your API key

2. Create a `.env` file in the server directory:
3. Add your Gemini API key to the `.env` file:

```bash
GOOGLE_API_KEY=[your-api-key]
```

### 3. Set Up the Frontend

#### Navigate to the client directory

```bash
cd client
```

#### Install dependencies

```bash
npm install
```

## Running the Application

### 1. Start the backend server

```bash
cd server
python3 main.py
```

The backend server will be running on `http://localhost:8000`.

### 2. Start the frontend server

```bash
cd client
npm start
```

The frontend server will be running on `http://localhost:3000`.

## Accessing the Application

Open your web browser and visit `http://localhost:3000` to use AI Architect.

## Troubleshooting

- If you get a module not found error, make sure you've activated the virtual environment and installed all requirements
- If the backend fails to start, check that your `.env` file is properly configured
- If the frontend fails to start, ensure all npm dependencies are installed correctly

## Support

If you encounter any issues, please open an issue in the repository's issue tracker.
