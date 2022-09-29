import { Injectable, Provider, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer, isPlatformWorkerApp } from '@angular/common'

interface IStorage {
  setItem<T>(key: string, item: T): T,
  getItem<T>(key: string): T | null
}

// a dummy class to be able to use it as an annotation in the provider
// can also be an abstract class with abstract methods
// alternative: a custom injection token
export class StorageService implements IStorage{
  setItem<T>(key: string, item: T): T {
    return item;
  }
  
  getItem<T>(key: string): T | null {
    return null;
  }
}

export function storageFactory(platformId: string): any {
  if (isPlatformBrowser(platformId)) {
    return new BrowserStorage();
  }
  if (isPlatformServer(platformId)) {
    return new ServerStorage();
  }
  throw new Error('No implementation for this platform: ' + platformId);

  // if the two classes have dependencies, the factory function should take care 
  // of them by havin them as input params and passing them to the class constructors
  // the dependencies should then be listed in the deps property in the provider
}

export const storageServiceProvider: Provider = {
  provide: StorageService,
  useFactory: storageFactory, // at startup time - when angular is bootstrapped
  deps: [PLATFORM_ID] // deps of the factory function (injectors)
}

export class BrowserStorage {
  localStorage: Storage = localStorage;

  setItem<T>(key: string, item: T): T {
    const str = typeof item === 'string' ? item : JSON.stringify(item);
    this.localStorage.setItem(key, str);
    return item;
  }

  getItem<T>(key: string): T | null {
    let item;
    const tmp = this.localStorage.getItem(key);
    if (!tmp) { return null; }
    try {
      item = JSON.parse(tmp!)
    } catch {
      item = tmp;
    }

    return item;
  }
}

export class ServerStorage {
  localStorage = {
    data: {},
    setItem<T>(key: string, item: T): void {
      //this.data[key] = item;
    },
    getItem<T>(key: string): void { // must return T
      //return this.data[key]; 
    }
  };

  setItem<T>(key: string, item: T): T {
    this.localStorage.setItem(key, JSON.stringify(item));
    return item;
  }

  getItem<T>(key: string): T | null {
    let item;
    const tmp = this.localStorage.getItem(key) as any;
    if (!tmp) { return null; }
    try {
      item = JSON.parse(tmp)
    } catch {
      item = tmp;
    }

    return item;
  }
}
