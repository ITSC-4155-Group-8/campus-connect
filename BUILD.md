# Running Campus Connect

## Project Setup

1. Clone the repository
2. Install dev dependencies
   ```sh
   npm i -D
   ```
3. Install client dependencies
   ```sh
   cd client
   npm i
   ```
4. Install server dependencies
   ```sh
   cd server
   python -m venv .venv
   source .venv/bin/activate     # For Linux
   .venv/Scripts/activate.bat    # For Windows cmd
   source .venv/Scripts/activate # For Windows Bash
   pip install -r requirements.txt
   ```
5. Setup a MongoDB database, add the connection string in `server/.env`
6. Setup a Google OAuth key [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials), add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to `server/.env`
7. Set `URL` in `server/.env` to the URL your frontend is reached at (`https://127.0.0.1:5173` in the dev environment)

## Development Server
The development server can be started from the root directory with the following command:
```sh
npm run dev
```

## Production Builds
The project can be built from the root directory with the following command:
```sh
npm run build
```
The build files will be output into the `dist` folder
