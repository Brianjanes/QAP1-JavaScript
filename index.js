#!/usr/bin/env node

// const setTimeout = require("node:timers/promises");
// const p = require("@clack/prompts");
// const process = require("node:process");
// const color = require("picocolors");

import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import color from "picocolors";
import process from "node:process";

// isolating the arguments from the command line
// the first two arguments are the path to the node executable and the path to the script

// Checking for the user's input.
// this ends up creating an array [arg0, arg1, arg2, ...] and is narutally separated by spaces so I think some array methods could come up.

// Removed for submission.
// console.log(userArguments);

// async function generatePassword() {
//   // Setting the default values for the password generator
//   let pwLength = 8;
//   // initial password is empty
//   let password = "";

//   const lowerChars = "abcdefghijklmnopqrstuvwxyz";
//   const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//   const specialChars = "!@#$%^&*()_+";
//   const numbers = "0123456789";

//   console.log("Generating password...");
// }

async function main() {
  const userArguments = process.argv.slice(2);
  console.clear();

  p.intro(
    `${color.bgMagenta(
      color.white(
        " Welcome. Let us find out how much of a CLI expert you REALLY are. "
      )
    )}`
  );

  const s = p.spinner();
  s.start("Generating Password...");
  await setTimeout(5000);
  s.stop("Password Generated!");
}

main();
