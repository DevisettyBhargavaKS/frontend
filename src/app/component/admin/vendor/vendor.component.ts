import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Vendor } from 'src/app/model/vendor';
import { AppResponse } from 'src/app/model/appResponse';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
})
export class VendorComponent {
  error: string = '';
  INITIAL_CATEGORY: Vendor = { id: 0, username: '' };
  emitterValue = false;
  id: number = 0;
  username:string='';
  buttontxt: string = 'Add';
  vendor: Vendor[] = [];
  vendores: Vendor = {
    id: 0,
    username: '',
  };
  constructor(private vendorservice: VendorService) {}
  ngOnInit(): void {
    this.vendorservice.getallvendors().subscribe({
      next: (response: AppResponse) => {
        this.vendor = response.data;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  

  onSubmit(form: any) {
    console.log(form.value);
    console.log(this.vendores);

    if (this.vendores.id === 0) {
      this.vendorservice
        .postVendor({ username: form.value.username })
        .subscribe({
          next: (response: any) => {
            this.vendor = response.data;
            this.vendores = this.INITIAL_CATEGORY;
          },
          error: (err) => {
            let message: string = err?.error?.error?.message;
            this.error = message.includes(',')
              ? message.split(',')[0]
              : message;
          },
        });
    } 
  }
  getCategory(category: Vendor) {
    this.vendores = category;
  }

  
}
