# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### 'Getting Started'
To run this program, notice that you must install Node Js on your computer.
Clone this repository by using the git clone command.
Enter to the project folder and execute the following on CLI:
$ npm install.
$ npm install react-bootstrap.
$ npm install react-router-dom.
You are now ready to start using the app. To get started use the npm start command.
At this point, the app should be open in your default browser.

The app contains three main pages:
Sign In Page:
-If you already have a user in the app, this page allows you to connect to the app and start chatting with your friends.
-If you are not already registered. You can click the button below and sign-up.
When successfully logged in, your chat screen will be open.
Sign-Up Page
This page allows you to create a new account.
The username, password, password confirmation, and nickname fields are required to register. If one of the mentioned is empty or invalid, the system will not allow you to register. The image field is optional, if you decide not to upload an image you will see a default image in your profile.
Chat Page
The page has two parts, the left menu, and the chat section.
left-Menu - from top to bottom
When you log in to your account, you will see your name and profile picture at the top left of the screen. This section also contains a sign-out button.
You will see a search box and a + button under your profile info. This button allows you to add contacts to your contact list. Notice that you have to insert the username and not the nickname in this section. On the search box, you can look for specific contact from your list and filter the list as you wish.
From the middle of the page until the end you will see your contact list.
Chat  - from top to bottom
The first section is used for information about the contact you currently chatting with. Notice when you log in that you must pick contact in order to start chatting.
The second section is for displaying the chat history with this specific contact.
The third section is for creating new messages and sending them. You can choose to send one of the following:
Text messages.
Images.
Recordings.
Videos.
General Information
Images for sending messages or profile pictures must be in one of the following formats: .jpg, .jpeg, .png.
Sending messages and adding contact could be approved by clicking on the correct button or pressing Enter on the keyboard.
Hardcoded users:
The database contains 7 hardcoded users:
Username: a1, Password: a1, Nickname: aa
Username: b2, Password: b2, Nickname: bb
Username: c3, Password: c3, Nickname: cc
Username: d4, Password: d4, Nickname: dd
Username: e5, Password: e5, Nickname: ee
Username: f6, Password: f6, Nickname: ff
Username: g7, Password: g7, Nickname: gg
All the users have a profile picture except a1 who owns the default profile picture.

According to the exercise description we needed one of the users to be involved in at least 5 conversations and use all types of messages. We chose to implement this demand on the user profile of a1.
