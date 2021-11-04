import * as sha256 from 'crypto-js/sha256';
import * as jwt from 'jsonwebtoken';

class dblessAuth {
  constructor(
    url: String,
    rule: String[],
    privateKey: string,
    publicKey: string
  ) {
    this.url = url;
    this.rule = rule;
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }
  private rule: String[];
  private url: String;
  private privateKey: string;
  private publicKey: string;

  register = (mail: String, password: String) => {
    for (let nonce = 0; nonce < 1000000; nonce++) {
      const obj = {
        url: this.url,
        mail,
        password,
        nonce,
      };
      const jsonsheet = JSON.stringify(obj);
      const crypted = sha256(jsonsheet).toString();
      if (this.verifyToken(crypted)) {
        return nonce;
      }
    }
  };

  verifyToken = (crypted: String) => {
    if (
      crypted[this.rule[0].split(':')[0]] == this.rule[0].split(':')[1] &&
      crypted[this.rule[1].split(':')[0]] == this.rule[1].split(':')[1] &&
      crypted[this.rule[2].split(':')[0]] == this.rule[2].split(':')[1]
    ) {
      return true;
    } else {
      return false;
    }
  };

  login = (mail: String, password: String, pin: Number) => {
    const obj = {
      url: this.url,
      mail,
      password,
      nonce: pin,
    };
    const jsonsheet = JSON.stringify(obj);
    const crypted = sha256(jsonsheet).toString();
    if (this.verifyToken(crypted)) {
      var token = jwt.sign(crypted, this.privateKey, { algorithm: 'RS256' });
      return token;
    } else {
      return false;
    }
  };

  isAuth = (token: string) => {
    try {
      var decoded = jwt.verify(token, this.publicKey);
      if (this.verifyToken(decoded.toString())) {
        return true;
      }
    } catch (error) {
      return false;
    }
  };
}

export default dblessAuth;
