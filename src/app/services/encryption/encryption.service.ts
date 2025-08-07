// src/app/services/encryption.service.ts

import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private readonly secretKey = 'tyuytutuytuytuytuytuytuytuytutuytTUTUYTUYTUYTUYTUYTUYTUYUYTUYTUTYUUYUYTUYTUYTUYTUYTUYTUYTUYTUYTUYTUYTUYTU'; // You can make this more secure and environment-specific

  constructor() {}

  encrypt(data: string | number): string {
    return CryptoJS.AES.encrypt(data.toString(), this.secretKey).toString();
  }

  decrypt(cipherText: string): string {
    try {
      const bytes = CryptoJS.AES.decrypt(cipherText, this.secretKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      console.error('Decryption error:', e);
      return '';
    }
  }
}
