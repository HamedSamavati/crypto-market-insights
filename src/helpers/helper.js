import CryptoJS from "crypto-js";

const passphrase = "B@c0n&Ch33s3R@cks!2025#";
const Enc_K =
  "U2FsdGVkX19Nld6H7iXXhaxWWg+BPoS37XWW5l+SwLhy/0HbRYhmwa8+fx3ztA2f";

function apKey() {
  return CryptoJS.AES.decrypt(Enc_K, passphrase).toString(CryptoJS.enc.Utf8);
}

export default apKey;
