import { slideInAnimation } from './animations';
import { ThemesService } from './services/themes.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit {
  title = 'angular-project';

  constructor(public themesService: ThemesService) {}

  private clientsTheme = localStorage.getItem('theme') || "light-mode"

  ngOnInit(): void {
    this.themesService.loadStyle(this.clientsTheme)
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

}
