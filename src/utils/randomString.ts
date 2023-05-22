import crypto from 'crypto';

export default function generateRandomString(length: number) {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_-+=';
  const randomBytes = crypto.randomBytes(length);
  const result = [];

  for (let i = 0; i < randomBytes.length; i++) {
    const index = randomBytes[i] % characters.length;
    result.push(characters[index]);
  }

  return result.join('');
}
