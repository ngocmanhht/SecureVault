class PasswordUtils {
  private charset: String = '';

  constructor() {
    this.charset += '!@#$%^&*()';
    // if (useNumbers)
    this.charset += '0123456789';
    // if (useLowerCase)
    this.charset += 'abcdefghijklmnopqrstuvwxyz';
    // if (useUpperCase)
    this.charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  generatePassword = (passwordLength: number) => {
    let newPassword: String = '';
    for (let i = 0; i < passwordLength; i++) {
      newPassword += this.charset.charAt(
        Math.floor(Math.random() * this.charset.length),
      );
    }
    return newPassword;
  };
}

export const passwordUtils = new PasswordUtils();
