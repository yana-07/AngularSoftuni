import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, debounceTime, filter, startWith, switchMap, tap } from 'rxjs';
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

  private pageChanged$ = new BehaviorSubject(undefined);

  themeList: ITheme[] = [];

  readonly pageSize = 4;
  currentPage: number = 0;
  totalResults: number = 0;

  searchControl = new FormControl(''); // { updateOn: 'blur' }

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    combineLatest([
      this.searchControl.valueChanges.pipe(
        debounceTime(300), // e.g. starting with string 'a' it waits 300 ms and in case of no new input, emits 'a', otherwise it waits for another 300 ms, during the time 'n' is typed, so it waits for another 300 ms and in case of no new input, it emits 'an'
        //filter(searchTerm => searchTerm!.length >= 3),
        startWith(''),
        //tap(() => this.currentPage = 0)
      ),
      this.pageChanged$
    ])
      .pipe( // a new request will be made each time the search term or the page changes
        switchMap(([searchTerm]) => this.themeService
          .loadThemePaginatedList$(searchTerm as any, this.currentPage * this.pageSize, this.pageSize))
      )
      .subscribe(themeList => {
        this.totalResults = themeList.totalResults;
        this.themeList = themeList.results;
      });
  }

  ngAfterViewInit(): void {
    console.log('View was initialized');
  }

  goOnePageBack(): void {
    this.currentPage--;
    this.pageChanged$.next(undefined);
  }

  goOnePageForward(): void {
    this.currentPage++;
    this.pageChanged$.next(undefined);
  }

}
