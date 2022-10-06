import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-themes-page',
  templateUrl: './themes-page.component.html',
  styleUrls: ['./themes-page.component.css']
})
export class ThemesPageComponent implements OnInit {

  isLoggedIn$: Observable<boolean> = this.authservice.isLoggedIn$;

  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
  }

}
