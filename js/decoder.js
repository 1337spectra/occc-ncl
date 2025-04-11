function convertFromHex(hex) {
  return hex.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
}
function convertToHex(str) {
  return Array.from(str).map(char => char.charCodeAt(0).toString(16)).join('');
}
function onHexEncode() {
  document.getElementById('hexEncodeOut').value = convertToHex(document.getElementById('hexEncodeIn').value);
}
function onHexDecode() {
  document.getElementById('hexDecodeOut').value = convertFromHex(document.getElementById('hexDecodeIn').value);
}
function onBase64Encode() {
  document.getElementById('base64EncodeOut').value = btoa(document.getElementById('base64EncodeIn').value);
}
function onBase64Decode() {
  document.getElementById('base64DecodeOut').value = atob(document.getElementById('base64DecodeIn').value);
}
function onUrlEncode() {
  document.getElementById('UrlEncodeOut').value = encodeURIComponent(document.getElementById('UrlEncodeIn').value);
}
function onUrlDecode() {
  document.getElementById('UrlDecodeOut').value = decodeURIComponent(document.getElementById('UrlDecodeIn').value);
}
function rot13(str) {
  return str.replace(/[a-zA-Z]/g, char => {
    const code = char.charCodeAt(0);
    return String.fromCharCode((code >= 65 && code <= 90) ? ((code - 65 + 13) % 26) + 65 : ((code - 97 + 13) % 26) + 97);
  });
}
function onRot13Encode() {
  document.getElementById('Rot13EncodeOut').value = rot13(document.getElementById('Rot13EncodeIn').value);
}
function onRot13Decode() {
  document.getElementById('Rot13DecodeOut').value = rot13(document.getElementById('Rot13DecodeIn').value);
}
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const fullAlphabet = alphabet + alphabet + alphabet;
function CaesarEncode(cipherText, cipherOffset) {
  cipherOffset = (cipherOffset % alphabet.length);
  return Array.from(cipherText).map(letter => {
    const upper = letter === letter.toUpperCase();
    letter = letter.toLowerCase();
    const index = alphabet.indexOf(letter);
    if (index === -1) return letter;
    const nextLetter = fullAlphabet[index + cipherOffset + alphabet.length];
    return upper ? nextLetter.toUpperCase() : nextLetter;
  }).join('');
}
function onCaesarEncode() {
  document.getElementById('CaesarEncodeOut').value = CaesarEncode(document.getElementById('CaesarEncodeIn').value, document.getElementById('CaesarShift').value);
}
function onCaesarDecode() {
  document.getElementById('CaesarDecodeOut').value = CaesarEncode(document.getElementById('CaesarDecodeIn').value, -document.getElementById('CaesarShift').value);
}
const alphabet_morse = {
  'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.', 'g': '--.', 'h': '....',
  'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..', 'm': '--', 'n': '-.', 'o': '---', 'p': '.--.',
  'q': '--.-', 'r': '.-.', 's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-',
  'y': '-.--', 'z': '--..', ' ': '/', '_': '..--.-', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
};
function stringToMorse(txt) {
  return txt.split('').map(e => alphabet_morse[e.toLowerCase()] || '').join(' ');
}
function onMorseEncode() {
  document.getElementById('MorseEncodeOut').value = stringToMorse(document.getElementById('MorseEncodeIn').value);
}
const MORSE_CODE = {
  '.-': 'a', '-...': 'b', '-.-.': 'c', '-..': 'd', '.': 'e', '..-.': 'f', '--.': 'g', '....': 'h',
  '..': 'i', '.---': 'j', '-.-': 'k', '.-..': 'l', '--': 'm', '-.': 'n', '---': 'o', '.--.': 'p',
  '--.-': 'q', '.-.': 'r', '...': 's', '-': 't', '..-': 'u', '...-': 'v', '.--': 'w', '-..-': 'x',
  '-.--': 'y', '--..': 'z', '.----': '1', '..---': '2', '...--': '3', '....-': '4', '.....': '5',
  '-....': '6', '--...': '7', '---..': '8', '----.': '9', '-----': '0', '|': ' ', '..--.-': '_'
};
function decodeMorse(morseCode) {
  return morseCode.split('  ').map(w => w.split(' ').map(letter => MORSE_CODE[letter] || '').join('')).join(' ');
}
function onMorseDecode() {
  document.getElementById('MorseDecodeOut').value = decodeMorse(document.getElementById('MorseDecodeIn').value);
}