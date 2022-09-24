'use strict';
require("dotenv").config()
const CryptoJS = require("crypto-js")

function encryption(data) {
  const parsedKey = CryptoJS.enc.Utf8.parse(process.env.CIPHER_KEY)
  let iv = CryptoJS.enc.Utf8.parse(process.env.IV)
  const encrypted = CryptoJS.AES.encrypt(data, parsedKey, {
    iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })

  return encrypted.toString()
}

function decryption(data) {
  var keys = CryptoJS.enc.Utf8.parse(process.env.CIPHER_KEY);
  let base64 = CryptoJS.enc.Base64.parse(data);
  let src = CryptoJS.enc.Base64.stringify(base64);
  var decrypt = CryptoJS.AES.decrypt(src, keys, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  return decrypt.toString(CryptoJS.enc.Utf8);
};

module.exports = {
  encryption,
  decryption
}