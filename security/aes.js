'use strict';
require("dotenv").config()
const CryptoJS = require("crypto-js")

function encryption(message) {
  return CryptoJS.AES.encrypt(message, process.env.CIPHER_KEY).toString()
}

function decryption(ciphertext) {
  const decrypt = CryptoJS.AES.decrypt(ciphertext, process.env.CIPHER_KEY)
  return decrypt.toString(CryptoJS.enc.Utf8);
};

module.exports = {
  encryption,
  decryption
}