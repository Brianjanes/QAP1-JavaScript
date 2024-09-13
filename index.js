#!/usr/bin/env node

import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import pc from "picocolors";
import process from "node:process";

function printHelpMessage() {
  console.log(`
    ${pc.cyan("Usage:")} ${pc.bold("generate-pw")} ${pc.yellow("[options]")}
    
    ${pc.cyan("Options:")}
        ${pc.yellow("-l, --length")} ${pc.green("<number>")}    ${pc.white(
    "Length of the password to generate"
  )} ${pc.dim("(default: 8)")}
        ${pc.yellow("-n, --numbers")}            ${pc.white(
    "Include numbers in the password"
  )}
        ${pc.yellow("-c, --capitals")}           ${pc.white(
    "Include capital letters in the password"
  )}
          ${pc.yellow("-s, --symbols")}           ${pc.white(
    "Include symbols in the password"
  )}
        ${pc.yellow("-h, --help")}               ${pc.white(
    "Display this help message"
  )}
    
    ${pc.cyan("Examples:")}
        ${pc.bold("generate-pw")}                ${pc.dim(
    "# Generates an 8-character password"
  )}
        ${pc.bold("generate-pw")} ${pc.yellow("-l")} ${pc.green(
    "12"
  )}           ${pc.dim("# Generates a 12-character password")}
        ${pc.bold("generate-pw")} ${pc.yellow("-l")} ${pc.green(
    "10"
  )} ${pc.yellow("-n -c -s")}     ${pc.dim(
    "# Generates a 10-character password with numbers, capitals, and symbols"
  )}
  `);
}

// Parse the user's arguments to understand what they want
function parseArguments(args) {
  const options = {
    length: 8,
    includeNumbers: false,
    includeCapitals: false,
    includeSymbols: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "-l" || arg === "--length") {
      const nextArg = args[i + 1];
      if (nextArg && !nextArg.startsWith("-")) {
        const length = parseInt(nextArg);
        if (isNaN(length) || length <= 0) {
          throw new Error("Invalid length. Please provide a positive number.");
        }
        options.length = length;
        i++; // Skip the next argument as we've used it
      } else {
        throw new Error("Length option requires a value.");
      }
    } else if (arg === "-n" || arg === "--numbers") {
      options.includeNumbers = true;
    } else if (arg === "-c" || arg === "--capitals") {
      options.includeCapitals = true;
    } else if (arg === "-s" || arg === "--symbols") {
      options.includeSymbols = true;
    } else if (arg === "-h" || arg === "--help") {
      options.help = true;
    } else if (arg.startsWith("-")) {
      throw new Error(`Unknown option: ${arg}`);
    } else {
      // If we encounter a non-flag argument (like a number without a preceding -l),
      // assume it's meant to be the length
      const length = parseInt(arg);
      if (!isNaN(length) && length > 0) {
        options.length = length;
      } else {
        throw new Error(`Invalid argument: ${arg}`);
      }
    }
  }
  return options;
}

// Generate password function. It takes parameters in the main function from the parse function to make sense of it all.
function generatePassword(
  length,
  includeNumbers,
  includeCapitals,
  includeSymbols
) {
  // Define the characters we can use in different sets to keep things separate
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+";

  // Start with lowercase letters
  let chars = lowerChars;
  // Add other characters if the user wants them
  if (includeNumbers) chars += numbers;
  if (includeCapitals) chars += upperChars;
  if (includeSymbols) chars += symbols;

  // Make the actual password!
  let password = "";
  for (let i = 0; i < length; i++) {
    // Pick a random character and add it to the password
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
}

async function main() {
  try {
    const allArgs = process.argv;
    const scriptIndex = allArgs.findIndex((arg) => arg.endsWith("generate-pw"));
    const userArguments = allArgs.slice(scriptIndex + 1);

    const options = parseArguments(userArguments);

    if (options.help) {
      printHelpMessage();
      return;
    }

    console.clear();

    // Check if user didn't use any flags
    if (
      !options.includeNumbers &&
      !options.includeCapitals &&
      !options.includeSymbols &&
      options.length === 8
    ) {
      console.log(
        pc.yellow(
          `${pc.bold("TIP:")} You can use flags to customize your password!`
        )
      );
      console.log(
        pc.yellow("Try using 'generate-pw -h' to see all available options.")
      );
      console.log();
    }

    const s = p.spinner();
    s.start("Generating Password...");
    await setTimeout(2000);
    const generatedPassword = generatePassword(
      options.length,
      options.includeNumbers,
      options.includeCapitals,
      options.includeSymbols
    );
    s.stop(`${pc.bgGreen(" Password Generated Successfully! ")}`);

    console.log(`\nYour password is: ${pc.green(generatedPassword)}\n`);

    // Added this line for debugging - commented out for submission :)
    // console.log(
    //   `Debugging Log - Length: ${options.length}, Include Numbers: ${options.includeNumbers}, Include Capitals: ${options.includeCapitals} Symbols: ${options.includeSymbols}`
    // );
  } catch (error) {
    console.error(pc.red(`Error: ${error.message}`));
    printHelpMessage();
  }
}

main();
