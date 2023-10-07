# MyDiary

## Introduction
This system provides members with simple diary operations and folder operations.

## Display
### Folder Page and Diary Previewing
![image](https://github.com/yaoyao0103/diary-frontend/assets/76504560/bb3780ec-adc8-4cab-b4f1-00d9e9b53455)

### Diary Example with Markdown
![image](https://github.com/yaoyao0103/diary-frontend/assets/76504560/96a83c69-6c54-4a15-92a3-3c7b141e43ba)

## Frameworks
- Frontend：React.js, axios
- Backend：Express Node.js, MVC
- Database：MongoDB
- Connection of Frontend and Backend：HTTP API

## Third Part Packages
- Backend：Google Drive API

## CI/CD Platform
- Jenkins

## Deployment Platform
- Frontend Heroku Link:(branch: forHeroku): https://diary-frontend-app.herokuapp.com/
- Backend Heroku Link: https://diary-backend-app.herokuapp.com/

## Backend GitHub
Link: https://github.com/yaoyao0103/diary-backend

## Usage
Enter the frontend link to use it.

## Detial Function
### Member System
First, you can choose to register or log in. Please note that the registered email cannot be repeated. After registration, a verification code letter will be sent to the registration mailbox, and the page will be directed back to the verification code page. You must enter the correct verification code to log in.

The login verification method is to use jwt token for verification, and after successful login, it will be recorded in the browser so that you can log in automatically the next time you open it. 

You can click the Forgot Password button on the login page to reset your password. The system will send a randomly generated password to the user for login. After logging in, you can set a new password through the reset password in the upper right corner.

### Folder System
Users can check their existing folders, including a default folder named Uncategorized. Except for the default folder, all the folders can be deleted and renamed(cannot use duplicated name).

Click on a folder and all diaries that exist in that folder will be displayed on the right side.

### Diary
- Use calendar to browse the diaries written on the choosen day.
- Search for diaries with keywords.
- Create or edit a diary and enter a name, and then choose a folder to store in it. After that, input the content, choose a date and add some hashtags. In addition, you can also upload a picture as the diary cover.
- The editor supports Markdown.
- The diaries can be deleted, shared, download, collected in the diary preview page.
- Click the Favorite Page button to show all the favorite diaries.

## P.S.
All test scripts are included in the main branch, and the frontend SideeX script has an additional README for reference.
