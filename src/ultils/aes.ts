import { REACT_APP_KEY, REACT_APP_SALT } from '.';
import Aes from 'react-native-aes-crypto';
class AESService {
  private key: string = '';
  constructor() {
    this.key = REACT_APP_KEY;
  }

  generateIv = async () => {
    const iv = await Aes.randomKey(16);
    return iv;
  };

  encryptData = async (text: string, iv: string) => {
    try {
      const encryptedData = await Aes.encrypt(
        text,
        this.key,
        iv,
        'aes-256-cbc',
      );
      return encryptedData;
    } catch (error) {
      console.log('error when encrypt data', error);
      return '';
    }
  };

  decryptData = async (text: string, iv: string) => {
    try {
      const decryptedData = await Aes.decrypt(
        text,
        this.key,
        iv,
        'aes-256-cbc',
      );
      return decryptedData;
    } catch (error) {
      console.log('error when decrypt data', error);
      return '';
    }
  };
  hashSHA512 = async (text: string) => {
    const salt = REACT_APP_SALT;
    const value = await Aes.pbkdf2(text, salt, 5000, 256, 'sha256');
    return value;
  };
}

export const aesService = new AESService();
