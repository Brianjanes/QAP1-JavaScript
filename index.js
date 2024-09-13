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
  )} ${pc.yellow("-n")}        ${pc.dim(
    "# Generates a 10-character password with numbers"
  )}
  `);
}

function parseArguments(args) {
  const options = { length: 8, includeNumbers: false };

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

function generatePassword(length, includeNumbers) {
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const chars = includeNumbers ? lowerChars + numbers : lowerChars;
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

async function main() {
  try {
    // Get all arguments passed to the script
    const allArgs = process.argv;

    // Find the index of our script name
    const scriptIndex = allArgs.findIndex((arg) => arg.endsWith("generate-pw"));

    // Get only the arguments after our script name
    const userArguments = allArgs.slice(scriptIndex + 1);

    const options = parseArguments(userArguments);

    if (options.help) {
      printHelpMessage();
      return;
    }

    console.clear();

    const s = p.spinner();
    s.start("Generating Password...");
    await setTimeout(1000);
    const generatedPassword = generatePassword(
      options.length,
      options.includeNumbers
    );
    s.stop("Password Generated!");

    console.log(`\nYour password is: ${pc.green(generatedPassword)}\n`);

    // Add this line for debugging
    console.log(
      `Debug - Length: ${options.length}, Include Numbers: ${options.includeNumbers}`
    );
  } catch (error) {
    console.error(pc.red(`Error: ${error.message}`));
    printHelpMessage();
  }
}

main();
