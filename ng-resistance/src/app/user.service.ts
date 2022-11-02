import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from './local-storage';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(@Inject(BROWSER_STORAGE) private storage: Storage) {}

  getUserId() {
    let uuid = this.storage.getItem('uuid');
    if (!uuid) {
      uuid = this.generateUUID();
      this.storage.setItem('uuid', uuid);
    }
    return uuid;
  }

  private generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  }
}
