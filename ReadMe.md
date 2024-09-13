# Password Generator CLI App

This is a simple command-line interface (CLI) tool that generates random passwords. It allows you to customize the length of the password and include numbers, capital letters, and symbols.

## Installation

To install this tool, follow these steps:

1. Clone this repository:
   ```
   git clone [your-repository-url]
   ```
2. Navigate to the project directory:
   ```
   cd password-generator-cli
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
This type of password is generally not secure!

### Options

- `-l, --length <number>`: Set the length of the password (default: 8)
- `-n, --numbers`: Include numbers in the password
- `-c, --capitals`: Include capital letters in the password
- `-s, --symbols`: Include symbols in the password
- `-h, --help`: Display help message

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

## Features

- Customizable password length
- Option to include numbers
- Option to include capital letters
- Option to include symbols
- Colorful console output for better readability

## Password Best Practices

While this tool helps you generate random passwords, it's important to follow these best practices for password security:

- Longer passwords are generally more secure. Aim for at least 12 characters, but longer is better.
- Combine lowercase and uppercase letters, numbers, and symbols to increase complexity.
- Don't use easily guessable information like birthdays, names, or common words.
- Never reuse passwords across different accounts.
- Change your passwords periodically, especially for critical accounts.
- Use a reputable password manager to securely store and generate complex passwords.
- Where possible, enable two-factor authentication for an extra layer of security.

Remember, while this tool generates random passwords, the security of the password also depends on how it's used and stored.

## Dependencies

- [@clack/prompts](https://www.npmjs.com/package/@clack/prompts): For creating the loading spinner
- [picocolors](https://www.npmjs.com/package/picocolors): For adding colors to console output

## Author

Brian Janes
