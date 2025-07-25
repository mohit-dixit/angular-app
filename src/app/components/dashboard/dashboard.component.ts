import { Component } from '@angular/core';
import { TokenManagerService } from '../../services/tokenmanager/token-manager.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  username : any;

  constructor(private _tokenService : TokenManagerService) { 
     this.username = _tokenService.getLoginUserName();
  }

  ngOnInit() {
    
  }

}
