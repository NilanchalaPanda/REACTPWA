# Web Application

## Framework and Design

### a. Tech Stack Used
- ReactJS
- Tailwind CSS
- PHP
- MySQL

### b. Implemented PWA with responsive UI
- The web application was successfully converted into a Progressive Web App(PWA) and can be downloaded and used with ease.

### c. Implemented Offline Functionality
- In scenarios where in the Internet connection is not available but the application must be used, so to cater this exact problem we've implemented the Offline caching functionality wherein the data collected from the user input in the web application first gets stored in an array in local storage and shows a loading toast indicating the absence of internet connection. Once the application detects that the Internet connection is available then it automatically syncs the stored data with the server and appends it in the database. This presence/absence of network connection is ensured using the Navigator.online function.

## Security Measures

### d. Authenticated login
- We've implemented the JSON Web Tokens(JWT) which are compact, self-contained tokens used for securely transmitting information between parties. This ensures that only authenticated users are allowed and validated to login and access the web application.

### e. Multi-factor Authentication
- We've implemented multi-factor authentication for enhanced security using OTP which is received via the email-id of the registered user. The PHPMailer package was used for sending the OTPs to the users and OTPs are 5 digits unique randomly generated numbers lying in the range of (11111,99999). The otp generated is first added to the session storage which is then compared with the otp enetered by the user in the input fields, if both the values for otp in the session are equal then only the login is validated and vice-versa.
- For sending the OTP email to the user the PHPMailer functionality uses authentic Google accounts wherein we can navigate to 'manage my google account' and then search for 'app passwords' and we can simply create an app password as per the requirement. A unique password which gets generated can be integrated in our connection file in the project. This is done so that we don't have to use our authentic credentials and prevent any unauthorised access of the application.    

### f. Implement Hashing for Password Storage
- The credentials entered by the user are successfully hashed and stored in the database using hashing techniques which makes it difficult to decrypt. 

### g. Implement CSRF (Cross-Site Request Forgery) Tokens
- CSRF tokens are a security measure used to protect against Cross-Site Request Forgery attacks. They are unique, unpredictable values embedded in web requests, ensuring that actions can only be executed by the intended user, mitigating the risk of malicious exploitation.
- The CSRF tokens are validated in a similar manner like multi-factor authentication. If any manipulation or changes are done in the CSRF token in local storage of the application and an attempt to login is made then that unauthorised login is denied and the login is validated only for correct CSRF tokens which were stored in the session.  

### h. Protection Against Common Web App Attacks
- Ensured protection against the following common web application attacks:
  - i. Brute Force Attack
  - ii. Injection Attacks
  - iii. Fuzz Testing (Fuzzing)
  - iv. Cross-Site Scripting (XSS)
  - v. DDoS (Distributed Denial-of-Service)
  - vi. Cross-Site Request Forgery (CSRF)
  - vii. Path Traversal

### i. Implemented Logs and Configuration Functionalities
- We've implemented the logging functionality for tracking events and configurations for managing various aspects of the application. The logs are created in the local directory of the web application and the code for the same is currently commented to avoid the possibility of a merge conflict.
