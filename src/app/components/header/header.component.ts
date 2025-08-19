import { Component } from '@angular/core';
import { TokenManagerService } from '../../services/tokenmanager/token-manager.service';
import { CommonService } from '../../services/common/common.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    MatIcon,
    CommonModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    private _tokenService: TokenManagerService,
    private _commonService: CommonService
  ) {}

  hamburgerClick() {
    this._commonService.hamburgerClick();
  }

  isLoggedIn() {
    return this._tokenService.isUserLoggedIn();
  }

  hideOnMobile() {
    this._commonService.hideOnMobileClick();
  }

  logOut() {
    this._commonService.logOutClick();
  }
}
