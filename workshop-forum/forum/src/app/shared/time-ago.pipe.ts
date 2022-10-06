import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  private now = new Date();

  transform(value: string): string {
    const then = new Date(value);
    const timePassed = this.now.getTime() - then.getTime();
    // time in ms
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = month * 12;

    if (timePassed < second) {
      return 'now';
    }

    if (timePassed < minute) {           
      return `${Math.floor(timePassed / second)} seconds ago`;
    }

    if (timePassed < hour) {           
      return `${Math.floor(timePassed / minute)} minutes ago`;
    }

    if (timePassed < day) {         
      return `${Math.floor(timePassed / hour)} hours ago`;
    }

    if (timePassed < week) {           
      return `${Math.floor(timePassed / day)} days ago`;
    }

    if (timePassed < month) {           
      return `${Math.floor(timePassed / week)} weeks ago`;
    }

    if (timePassed < year) {           
      return `${Math.floor(timePassed / month)} months ago`;
    }

    return `${Math.floor(timePassed / year)} years ago`;
  }

}
