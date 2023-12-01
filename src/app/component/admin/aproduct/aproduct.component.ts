import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Aproduct } from 'src/app/model/aproduct';
import { AppResponse } from 'src/app/model/appResponse';
import { AproductService } from 'src/app/service/aproduct.service';

@Component({
  selector: 'app-aproduct',
  templateUrl: './aproduct.component.html',
})
export class AproductComponent implements OnInit{
  error: string = "";
  aproduct:Aproduct[]=[];
  product:Aproduct={
    id:0,
    title:"",
    description:"",
    price:0,
  };
  constructor(private aproductservice:AproductService){}
  ngOnInit(): void {
    this.aproductservice.getaproducts().subscribe({
      next: (response: AppResponse) => {
       
        this.aproduct=response.data;
      },
      error:(err)=>{
        let message:string=err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });
  }
}
