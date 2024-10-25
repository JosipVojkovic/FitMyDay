const crypto = require("crypto");

function generateRandomString(length) {
  return crypto.randomBytes(length).toString("hex");
}

const tokenKey = generateRandomString(32); // Generate a 32-byte (256-bit) random string
console.log(tokenKey);
