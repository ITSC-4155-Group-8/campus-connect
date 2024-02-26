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
