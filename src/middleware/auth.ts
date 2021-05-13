import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/User';

import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

const env_salt = process.env.SALT;

@Injectable()
export class Auth {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {}
  env_salt = this.configService.get<string>('SALT');

  createToken(encoded: string): string {
    const token = jwt.sign(
      {
        token: encoded,
      },
      env_salt,
      {
        expiresIn: Math.floor(1000 * 60 * 60 * 24 * 60),
      },
    );
    return token;
  }

  validateToken(encoded: string, user: string): any {
    try {
      const decoded = jwt.verify(encoded, env_salt);
      if (decoded) {
        const decriptedToken = JSON.parse(this.decrypt(decoded.token, user));

        if (decriptedToken._id !== user) {
          throw Error();
        }
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  encodePassword(plainText: string): string {
    const salt = Buffer.from(env_salt, 'base64');
    return crypto
      .pbkdf2Sync(plainText, salt, 1000, 64, 'sha512')
      .toString('hex');
  }

  validatePassword(plainText: string, hashedPassword: string): boolean {
    const salt = Buffer.from(env_salt, 'base64');
    return (
      crypto.pbkdf2Sync(plainText, salt, 1000, 64, 'sha512').toString('hex') ===
      hashedPassword
    );
  }

  encrypt(text: string, id: string): string {
    const iv = crypto.randomBytes(16);
    const key = crypto
      .createHash('sha256')
      .update(String(id))
      .digest('base64')
      .substr(0, 32);
    const cipher = crypto.createCipheriv('aes-256-cbc', key.toString(), iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  decrypt(text: string, id: string): string {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const key = crypto
      .createHash('sha256')
      .update(String(id))
      .digest('base64')
      .substr(0, 32);
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key.toString(), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }
}
