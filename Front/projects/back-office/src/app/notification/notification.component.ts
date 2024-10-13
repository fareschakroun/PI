import { Component, OnInit } from '@angular/core';
import { ServicebackService } from '../services/serviceback.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];
  getType(type: String){
    if (type === 'isProduct')
    {
      return 'Product'
    }else if (type ==='isService'){
      return 'Service'
    }else if (type === 'isProductAndService'){ return ('Product and Service')}
    else{ return type }
   
  }
  constructor(private supplierRequestService :ServicebackService) {
    
  }
  ngOnInit(): void {
 
    this.supplierRequestService.getsupplier().subscribe(notification => {
      this.notifications=notification ;
      console.log("notifications :",this.notifications)
      this.updateNotificationCount();
    })

  }
  notificationcount : number ;
  updateNotificationCount() {
    const notificationCount = this.notifications.filter((item) => item.status === 'Pending').length;
    this.notificationcount = notificationCount ;
    const badgeElement = document.querySelector('.badge-number');
    if (badgeElement) {
      badgeElement.textContent = notificationCount.toString();
    }
  }
  openNotificationBell() {
    // Reset notification count to 0 only if it's clicked
    if (this.notificationcount > 0) {
        this.notificationcount = 0;

        // Update the badge element to show 0 notifications
        const badgeElement = document.querySelector('.badge-number');
        if (badgeElement) {
            badgeElement.textContent = "0";
        }
    }
  }
  getNotificationIcon(type: string): string {
    switch (type) {
      case 'Pending':
        return 'bi bi-exclamation-circle text-warning';
      case 'NotApproved':
        return 'bi bi-x-circle text-danger';
      case 'Approved':
        return 'bi bi-check-circle text-success';
      case 'info':
        return 'bi bi-info-circle text-primary';
      default:
        return 'bi bi-bell';
    }
  }
}
