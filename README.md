# Password Generator CLI App

This is a simple command-line interface (CLI) tool that generates random passwords. It allows you to customize the length of the password and include numbers, capital letters, and symbols.

## Installation

To install this tool, follow these steps:

1. Clone this repository:
   ```
   git clone https://github.com/Brianjanes/QAP1-JavaScript.git
   ```
2. Navigate to the project directory:
   ```
   cd QAP1-JavaScript
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Install the tool globally:
   ```
   npm install -g .
   ```

## Usage

After installation, you can use the tool by typing `generate-pw` in your terminal, followed by any options you want to use.

Basic usage:

```
generate-pw
```

This will generate an 8-character password with only lowercase letters.

TIP: This type of password is generally not secure!

### Options

- `-l, --length <number>`: Set the length of the password (default: 8, recommended: 16 +)
- `-n, --numbers`: Includes numbers in the password
- `-c, --capitals`: Includes capital letters in the password
- `-s, --symbols`: Includes symbols in the password
- `-h, --help`: Displays help message

### Examples

Generate a 12-character password:

```
generate-pw -l 12
```

Generate a password with numbers and capital letters:

```
generate-pw -n -c
```

Generate a 16-character password with numbers, capitals, and symbols:

```
generate-pw -l 16 -n -c -s

```

## Password Best Practices

While this tool helps you generate random passwords, it's important to follow these best practices for password security:

- Longer passwords are generally more secure. Aim for at least 16 characters, but longer is better.
- Combine lowercase and uppercase letters, numbers, and symbols to increase complexity.
- Don't use easily guessable information like birthdays, names, or common words.
- Never reuse passwords across different accounts.
- Change your passwords periodically (some say quarterly), especially for critical accounts.
- Where possible, enable two-factor authentication for an extra layer of security.

Remember, while this tool generates random passwords, the security of the password also depends on how it's used and stored.

Check out [Have I Been Pwned](https://www.haveibeenpwned.com) to see if any of your password have been leaked!

## Dependencies

- [@clack/prompts](https://www.npmjs.com/package/@clack/prompts): For creating the loading spinner
- [picocolors](https://www.npmjs.com/package/picocolors): For adding colors to console output

## Author

Brian Janes
