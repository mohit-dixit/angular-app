import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectorService {
    isMobile(): boolean {      
       return (window.matchMedia('(max-width: 768px)').matches && window.navigator.maxTouchPoints > 0);
     }
}
