import { PasswordGenerateOptions, PasswordStrength } from '../type/password';

export class PasswordUtils {
  private charset: String = '';

  constructor(option: PasswordGenerateOptions) {
    this.charset += '!@#$%^&*()';
    const { isUseLowerCase, isUseNumber, isUseUpperCase } = option;
    if (isUseNumber) {
      this.charset += '0123456789';
    }
    if (isUseLowerCase) {
      this.charset += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (isUseUpperCase) {
      this.charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
  }

  generatePassword = (passwordLength: number) => {
    let newPassword: string = '';
    for (let i = 0; i < passwordLength; i++) {
      newPassword += this.charset.charAt(
        Math.floor(Math.random() * this.charset.length),
      );
    }
    return newPassword;
  };

  evaluatePassword = (password: string) => {
    let score = 0;

    if (password.length >= 8) score += 2;
    if (password.length >= 12) score += 2;

    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 2;

    const commonPasswords = ['123456', 'password', '123456789'];
    if (commonPasswords.includes(password)) score -= 3;

    if (score <= 7) {
      return PasswordStrength.Average;
    } else {
      return PasswordStrength.Strong;
    }
  };

  evaluateScorePassword = (password: string) => {
    let score = 0;

    if (password.length >= 8) score += 2;
    if (password.length >= 12) score += 2;

    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 2;

    const commonPasswords = ['123456', 'password', '123456789'];
    if (commonPasswords.includes(password)) score -= 3;

    return score;
  };
}
