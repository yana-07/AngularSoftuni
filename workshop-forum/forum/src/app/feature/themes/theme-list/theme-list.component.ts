import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, startWith, switchMap } from 'rxjs';
import { ITheme } from '../../../core/interfaces';
import { ThemeService } from '../../../core/theme.service';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css']
})
export class ThemeListComponent implements OnInit, AfterViewInit {
  l10n = {
    'en': {
      'no-themes-message': 'No themes!'
    },
    'bg': {
      'no-themes-message': 'Няма теми!'
    }
  }

  localize(key: string, l10n: {[key: string]: {[key: string]: string}}) {
    const local = 'bg';

    return l10n[local][key];
  }

  themeList: ITheme[] = [];

  searchControl = new FormControl(''); // { updateOn: 'blur' }

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300), // e.g. starting with string 'a' it waits 300 ms and in case of no new input, emits 'a', otherwise it waits for another 300 ms, during the time 'n' is typed, so it waits for another 300 ms and in case of no new input, it emits 'an'
      filter(searchTerm => searchTerm!.length >= 3),
      startWith(''),
      switchMap(searchTerm => this.themeService.loadThemeList$(searchTerm as any)))
      .subscribe(themeList => {
        this.themeList = themeList;
      });
  }

  ngAfterViewInit(): void {
    console.log('View was initialized');
  }

}
