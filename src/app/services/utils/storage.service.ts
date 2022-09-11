import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
export enum IStorageKeys {
  SEARCH = 'SEARCH',
}
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(key: string, value: any) {
    this._storage?.set(key, value);
  }
  public async get(key: string) {
    if(!this._storage)
      await this.init() ;
    return await this._storage?.get(key) ;
  }
}
