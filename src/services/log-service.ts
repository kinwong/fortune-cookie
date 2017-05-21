import { Injectable } from '@angular/core';

@Injectable()
export class LogService {
    constructor() {
    }
    public info(message: string) {
      // tslint:disable-next-line:no-console
      console.info(message);
    }
    public warn(message: string) {
      console.warn(message);
    }
    public error(message: string) {
      console.error(message);
    }
    public debug(message: string) {
      // tslint:disable-next-line:no-console
      console.debug(message);
    }
}
