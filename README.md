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


## ‼️🔐 Importance of the Security Enhancement Measures
‼️‼️ Discuss the measures implemented to address each identified vulnerability, referencing specific commits or code blocks where applicable.
##


## ‼️👍 Reflection and Best Practices
‼️‼️ Reflect on the lessons learned during the assessment process and outline the best practices you will implement to mitigate potential risks moving forward.
##


## 📚 References
List of references *(in IEEE format)*:

1. *K. Piatek, “Hard-coded tokens, Keys and credentials in mobile apps,” Netguru, [https://www.netguru.com/blog/hardcoded-keys-storage-mobile-app](https://www.netguru.com/blog/hardcoded-keys-storage-mobile-app) (accessed Apr. 5, 2024).*
2. *M. Hill, “Hard-coded secrets up 67% as secrets sprawl threatens software supply chain,” CSO Online, [https://www.csoonline.com/article/574687/hard-coded-secrets-up-67-as-secrets-sprawl-threatens-software-supply-chain.html](https://www.csoonline.com/article/574687/hard-coded-secrets-up-67-as-secrets-sprawl-threatens-software-supply-chain.html) (accessed Apr. 5, 2024).*
3. *“Authentication vulnerabilities,” PortSwigger, [https://portswigger.net/web-security/authentication](https://portswigger.net/web-security/authentication) (accessed Apr. 5, 2024).*
4. *“M4: Insufficient Input/Output Validation,” OWASP Foundation, [https://owasp.org/www-project-mobile-top-10/2023-risks/m4-insufficient-input-output-validation](https://owasp.org/www-project-mobile-top-10/2023-risks/m4-insufficient-input-output-validation) (accessed Apr. 5, 2024).*