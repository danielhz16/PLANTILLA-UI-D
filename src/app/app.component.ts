import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '@core/theme/theme.service';
import { AuthStore } from '@core/auth/auth.store';
import { MenuService } from '@routes/menu.service';
import { MENU_ROUTES } from '@routes/menu-config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(theme: ThemeService, auth: AuthStore, menu: MenuService) {
    auth.loadLocal();
    menu.setRoutes(MENU_ROUTES);
  }
}