import { CommonModule } from '@angular/common';
import { Component, effect, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DeviceDetectorService } from '../../services/devicedetector/device-detector.service';
import { environment } from '../../environments/environment';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { TokenManagerService } from '../../services/tokenmanager/token-manager.service';
import { AppConfigService } from '../../services/app-config.service';
import { ModalTitle, ModalTypes } from '../../constants/globalconst';
import { CommonService } from '../../services/common/common.service';
@Component({
  selector: 'app-sidepanel',
  imports: [MatNavList,
    MatSidenav,
    MatListItem,
    MatIcon,
    MatSidenavContainer,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive],
  templateUrl: './sidepanel.component.html',
  styleUrl: './sidepanel.component.scss'
})
export class SidepanelComponent {

  @ViewChild('sidenav') sidenav!: MatSidenav;  
  private context: any;
  showNavigationMenu: boolean = true;
  showAdminSubmenu: boolean = true;

  constructor(private _router: Router,
    private _devicedetector: DeviceDetectorService,
    private _dialog: MatDialog,
    private _tokenService: TokenManagerService,
    private _configService: AppConfigService,
    private _commonService: CommonService
  ) {   
    this.context = this._configService.getConfig().context;
  }

  get isLoginPage(): boolean {
    return this._router.url === '/login';
  }

  logOut() {
    this.showLogOutModalPopup("Are you sure you want to log out?", false);
  }

  hamburgerClick() {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

  isLoggedIn() {
    return this._tokenService.isUserLoggedIn();
  }

  hideOnMobile() {
    const isMobile = this._devicedetector.isMobile();
    if (isMobile) {
      this.hamburgerClick();
    }
  }  

  

  showLogOutModalPopup(msg: string, toShowExtendButton: boolean): void {
    this._dialog.open(ModalComponent, {
      width: '750px',
      closeOnNavigation: true,
      disableClose: true,
      data: {
        message: msg,
        toShowExtendButton: toShowExtendButton,
        modaltitle: ModalTitle.CONFIRMATION,
        modaltype: ModalTypes.CONFIRM
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.onLogoutConfirm();
      }
    });
  }

  onLogoutConfirm() {
    this.hamburgerClick();
    this._router.navigate(['login']);
  }

  swagger() {
    window.open(this.context + environment.apis.swagger, '_blank');
  }  

  private hamburgerClickEffect = effect(() => {
    const value = this._commonService.triggerhamburgerClickSignal();
    if (value !== null) {
      this.hamburgerClick();
    }
  });

  private hideOnMobileClickEffect = effect(() => {
    const value = this._commonService.triggerhideOnMobileClickSignal();
    if (value !== null) {
      this.hideOnMobile();
    }
  });

  private logOutClickEffect = effect(() => {
    const value = this._commonService.triggerlogOutClickSignal();
    if (value > 0) {
      this.logOut();
    }
  });
  
  ngOnDestroy(): void {
    this.hamburgerClickEffect.destroy();
    this.hideOnMobileClickEffect.destroy();
    this.logOutClickEffect.destroy();
  }

  clickNavigationParent(){
    this.showNavigationMenu = !this.showNavigationMenu
    const submenu = document.getElementById('navigationsubmenu');
    let style = !this.showNavigationMenu ? 'none' : 'block';  
    this.changeStyleOfSubmenu(submenu, style);
  }

  clickAdminNavigationParent(){
    this.showAdminSubmenu = !this.showAdminSubmenu
    const submenu = document.getElementById('adminnavigationsubmenu');
    let style = !this.showAdminSubmenu ? 'none' : 'block';  
    this.changeStyleOfSubmenu(submenu, style);
  }

  changeStyleOfSubmenu(submenu: HTMLElement | null, style: string) {
    if (submenu) {
      if (style === 'none') {
        setTimeout(() => {
          submenu.style.display = style;
        }, 300);
      }
      else {
        submenu.style.display = style;
      }
    }
  }
}
