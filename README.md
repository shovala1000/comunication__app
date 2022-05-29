# Getting Started

* To run this program, notice that you must install Node Js on your computer.
* Clone this repository by using the git clone command.
* Enter to the project folder and execute the following on CLI:
  - $ npm install.
  - $ npm install react-bootstrap.
  - $ npm install react-router-dom.
  - $ npm install @microsoft/signalr.
* You might have a recommendation to fix errors using $ npm audit fix --force. If so, type it in the terminal.
* Make sure to start the Api solution before compiling this one. You can find instruction at: 

* You are now ready to start using the app. To get started use the npm start command.
* At this point, the app should be open in your default browser.

## The app contains three main pages:

## Sign In Page:
  * If you already have a user in the app, this page allows you to connect to the app and start chatting with your friends.
  * If you are not already registered. You can click the button below and
 sign-up.
  * If you want to see the ratings on the app you can use the "Go to Ratings" button.
  * When successfully logged in, your chat screen will be open.

## Sign-Up Page
  * This page allows you to create a new account.
  * The username, password, password confirmation, and nickname fields are required to register. If one of the mentioned is empty or invalid, the system will not allow you to register. The image field is optional, if you decide not to upload an image you will see a default image in your profile.

## Chat Page
The page has two parts, the left menu and the chat section.

### left-Menu - from top to bottom
  - When you log in to your account, you will see your name and profile picture at the top left of the screen. This section also contains a sign-out button.
  - You will see a search box and a + button under your profile info. This button allows you to add contacts to your contact list. Notice that you have to insert the username and not the nickname in this section.
  -  On the search box, you can look for specific contact from your list and filter the list as you wish.
  - From the middle of the page until the end you will see your contact list.

### Chat  - from top to bottom
  - The first section is used for information about the contact you currently chatting with. Notice when you log in that you must pick contact in order to start chatting. In addition, right next to the log out button, you will find a button that redirect the page for the rating page.
  - The second section is for displaying the chat history with this specific contact.
  - The third section is for creating new messages and sending them.

## General Information
Images for sending messages or profile pictures must be in one of the following formats: .jpg, .jpeg, .png.
Sending messages and adding contact could be approved by clicking on the correct button or pressing Enter on the keyboard.

