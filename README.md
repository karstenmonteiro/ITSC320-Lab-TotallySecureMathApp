# Cross-Platform Security Assessment Report


## 🔎 Vulnerabilities Identified

### *❶ "Login.tsx":*

- #### *Insecure Data Storage:*
  - The ***‘users’*** array contains hardcoded credentials data *(usernames/passwords)*, which poses a severe security risk. More specifically, it could cause issues such as unauthorized access and data leakage. Hardcoded data is typically stored in plain text, making the process of extracting this data from the source code much easier for the attackers. This data could also be easily identified and extracted from the binary file.

- #### *Improper Authentication:*
  - The authentication logic for the login function validates the user’s credentials directly within the app. Client-side authentication allows attackers to gain unauthorized access through methods such as replay attacks, which are attacks where the attacker intercepts a request and replays it to gain unauthorized access. It also inadequately protects against brute force attacks, or could potentially be bypassed entirely by an attacker.

- #### *Insufficient Input Validation:*
  - The lack of validation for user input is a very high-risk vulnerability that could lead to a range of vulnerabilities, including cross-site scripting *(XSS)*, path traversal, and most prominently, a wide range of code injection attacks. Some of these include SQL injection, command injection, XML injection, and more. Lack of user input sanitization is extremely dangerous and can lead to many vulnerabilities.

- #### *Insecure Code Practices:*
  - Based on the vulnerabilities found in ***"Login.tsx"***, here are the ***insecure code practices*** I have identified:**
	1. Hardcoded credentials.
	2. Lack of secure user data storage.
	3. Client-side authentication.
	4. No account lockout functionality to prevent brute-force attacks.
	5. No encryption for sensitive data, like user credentials.
	6. Direct state manipulation upon authentication.
##

### *❷ "Notes.tsx":*

- #### *Insecure Data Storage:*
  - The notes are stored with ***‘AsyncStorage’*** using a key that combines the user’s credentials *(username/password)*. This is an extremely insecure method for storing sensitive data and poses a huge security risk. Using user credentials in storage keys, or anywhere in the client-side code, should always be avoided.

- #### *Insufficient Input Validation*
  - Currently, the app only checks if the note's *'title'* and *'text'* fields are empty before adding the note, but it doesn't validate the contents of the notes. Therefore, more input validation needs to be implemented to ensure that the contents do not contain malicious scripts, invalid characters, *etc*.

- #### *Insecure Code Practices:*
  - Based on the vulnerabilities found in ***"Notes.tsx"***, here are the ***insecure code practices*** I have identified:
	1. Insecure storage key composition.
       - *Using the username/password as part of the storage key is insecure.*
	2. Lack of sensitive data protection.
       - *The use of user credentials in client-side storage/logic should be replaced with more secure methods, such as session tokens.*
	3. Potential account enumeration.
	4. State management.
##

### *❸ "Note.tsx":*

- #### *Code Injection:*
  - The use of ***'eval()'*** to evaluate ***'props.text'*** poses a significant security risk. In JavaScript, the ***'eval()'*** function can execute arbitrary/malicious code, making it vulnerable to attacks like ***arbitrary code execution***, ***code injection attacks***, ***bypassing security implementations***, *and more*.

- #### *Insufficient Input Validation:*
  - The app does not include *any* input validation on the ***'props.text'*** value *(which is passed to the ***'eval()'*** function)*. Due to this lack of validation, the risk of code injection attacks are heavily increased. Thorough input validation and sanitization of ***'props.text'*** needs to be implemented to ensure it does not contain malicious code.

- #### *Insecure Code Practices:*
  - Based on the vulnerabilities found in ***"Note.tsx"***, here are the ***insecure code practices*** I have identified:
    1. The use of the ***'eval()'*** function.
		- *Due to the potential for executing arbitrary and potentially malicious code.*
##


## 🔐 Importance of the Security Enhancement Measures Implemented
1. ***Secure Storage of Sensitive Data:***
	- Secure storage of sensitive data such as API keys and access tokens, are essentially the same as your keys to your house, or the passcode to your phone; *they keep things secure*. Suppose an attacker maliciously gained access to this data. They could then do things such as impersonate users, steal data, perform irreversible actions *(causing permanent damage to the app)*, and more. Hence the reason why it is so important to secure this data. Encrypting this data ensures that, even if accessed by an attacker, it cannot be used, as the attacker wouldn't have the key to decrypt it.
2. ***Secure Authentication Practices:***
	- Secure authentication practices are very important as it is the process of verifying the identity of a user. A lack of authentication can lead to vulnerabilities, such as unauthorized access. The use of strong, hashed passwords, 2-factor authentication, and secure token handling are a few measures that will ensure only authorized users can access the system.
3. ***Proper Input Validation and Sanitization:***
	- Input validation/sanitization are the key to success against a wide array of attacks, including SQL injection, cross-site scripting *(XSS)*, and code injection. These attacks can result in unauthorized data access, data corruption, execution of malicious code on both the server or client-side, and much more. By validating/sanitizing inputs, it is guaranteed that only expected/properly formatted data is processed by the app *(mitigating potential vulnerabilities)*.
4. ***Addressing Insecure Code Practices:***
	- It is extremely important to address any insecure code practices in your app, in order to reduce the vulnerabilities of your app and ensuring that if one or more areas are compromised, the others can protect the system as a whole. When it comes to securing your application, it's all about layers. Each security measure adds an extra layer of security that an attacker must bypass, reducing the chances of successful attacks.
##


## 👍 Reflection and Best Practices
Throughout the process of completing this lab *(especially the 'implementing security measures' part)*, I learned a lot about security and best practices. From now on, I will ensure I perform a thorough security assessment on all of my applications before deploying them. To mitigate potential risks moving forward, I will make sure to implement best practices such as secure storage of sensitive data, secure authentication practices, and proper input validation and sanitization. In conclusion, I have gained a lot of new knowledge/skills when it comes to securing apps and will be implementing these moving forward.
##


## 📚 References
List of references *(in IEEE format)*:

1. *K. Piatek, “Hard-coded tokens, Keys and credentials in mobile apps,” Netguru, [https://www.netguru.com/blog/hardcoded-keys-storage-mobile-app](https://www.netguru.com/blog/hardcoded-keys-storage-mobile-app) (accessed Apr. 5, 2024).*
2. *M. Hill, “Hard-coded secrets up 67% as secrets sprawl threatens software supply chain,” CSO Online, [https://www.csoonline.com/article/574687/hard-coded-secrets-up-67-as-secrets-sprawl-threatens-software-supply-chain.html](https://www.csoonline.com/article/574687/hard-coded-secrets-up-67-as-secrets-sprawl-threatens-software-supply-chain.html) (accessed Apr. 5, 2024).*
3. *“Authentication vulnerabilities,” PortSwigger, [https://portswigger.net/web-security/authentication](https://portswigger.net/web-security/authentication) (accessed Apr. 5, 2024).*
4. *“M4: Insufficient Input/Output Validation,” OWASP Foundation, [https://owasp.org/www-project-mobile-top-10/2023-risks/m4-insufficient-input-output-validation](https://owasp.org/www-project-mobile-top-10/2023-risks/m4-insufficient-input-output-validation) (accessed Apr. 5, 2024).*