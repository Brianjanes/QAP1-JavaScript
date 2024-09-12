#!/usr/bin/env node

import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import pc from "picocolors";
import process from "node:process";

function printHelpMessage() {
  console.log(`
    Usage: generate-password [options]
    
    Options:
        -l, --length <number>    Length of the password to generate (default: 8)
        -h, --help               Display this help message
    `);
}

function parseArguments(args) {
  const options = { length: 8 };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "-l":
      case "--length":
        const length = parseInt(args[i + 1]);
        if (isNaN(length) || length <= 0) {
          throw new Error("Invalid length. Please provide a positive number.");
        }
        options.length = length;
        i++; // Skip the next argument as we've used it
        break;
      case "-h":
      case "--help":
        options.help = true;
        break;
      default:
        throw new Error(`Unknown option: ${args[i]}`);
    }
  }

  return options;
}

function generatePassword(length) {
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += lowerChars.charAt(
      Math.floor(Math.random() * lowerChars.length)
    );
  }
  return password;
}

async function main() {
  try {
    const userArguments = process.argv.slice(2);
    const options = parseArguments(userArguments);

    if (options.help) {
      printHelpMessage();
      return;
    }

    console.clear();

    const s = p.spinner();
    s.start("Generating Password...");
    await setTimeout(1000);
    const generatedPassword = generatePassword(options.length);
    s.stop("Password Generated!");

    console.log(`\nYour password is: ${pc.green(generatedPassword)}\n`);
  } catch (error) {
    console.error(pc.red(`Error: ${error.message}`));
    printHelpMessage();
  }
}

main();
