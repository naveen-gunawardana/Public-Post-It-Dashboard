# Public Post-It Dashboard

**Public Post-It Dashboard** is a fun and interactive web app that allows users to create and share virtual post-it notes on a shared board. The app allows users to drag and position their notes freely, with real-time syncing for everyone viewing the board.

## Features
- **Create Post-Its**: Add new post-it notes to the board with custom text.
- **Drag and Drop**: Move your post-it notes anywhere on the screen.
- **Shared Board**: Real-time syncing ensures everyone sees updates immediately.
- **GitHub and LinkedIn links**: Easy access to the creator's GitHub and LinkedIn profiles from the control panel.
- **Responsive UI**: The app is fully responsive and works on both desktop and mobile devices.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Firebase (Firestore for real-time data)
- **Styling**: CSS (including custom styles for the control panel and post-it notes)
- **Deployment**: GitHub Pages

## Live Demo
Check out the live app on GitHub Pages:  
[Public Post-It Dashboard](https://naveen-gunawardana.github.io/public-post-it-dashboard)

## Installation

To run this project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/naveen-gunawardana/Public-Post-It-Dashboard.git
    ```

2. Navigate into the project directory:
    ```bash
    cd Public-Post-It-Dashboard
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm start
    ```

Your app should now be running locally at [http://localhost:3000](http://localhost:3000).

## Deploying to GitHub Pages

1. Build the app:
    ```bash
    npm run build
    ```

2. Deploy the app to GitHub Pages:
    ```bash
    npm run deploy
    ```

This will automatically publish your app to GitHub Pages at the URL defined in the `homepage` field of `package.json`.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository, make your changes, and submit a pull request.

### Steps:
1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to your branch: `git push origin feature-name`
6. Open a pull request to the `main` branch

## License

This project is open-source and available under the [MIT License](LICENSE).

## Acknowledgements
- **React**: For building the user interface.
- **Firebase**: For real-time database functionality.
- **Font Awesome**: For the social media icons.
