import { Component, OnInit } from '@angular/core';
import { Aorders } from 'src/app/model/aorders';
import { Order } from 'src/app/model/order';
import { AppResponse } from 'src/app/model/appResponse';
import { Orderstatus } from 'src/app/model/orderstatus';
import { AorderService } from 'src/app/service/aorder.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-aorders',
  templateUrl: './aorders.component.html',
  
})
export class AordersComponent implements OnInit {
  error: string = "";
  OrderDetails:Order[]=[]
  orderstatus:Orderstatus[]=[]
  aorders: Aorders[] = [];
  aorder:Aorders={
    id:0,
    username: "",
    orderstatus: "",
    productList:[],

  }
  constructor(private aorderservice:AorderService){}
  ngOnInit(): void {
    this.aorderservice.getorderdetails().subscribe({
      next: (response: AppResponse) => {
        this.aorders=response.data;

      },
      error:(err)=>{
        let message:string=err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });
  }
  setSelectedorder(aorder: Aorders): void {
    this.aorder = aorder;
  }
  getorderstatus(){
    this.aorderservice.getorderdetails().subscribe({
      next:(responce:AppResponse)=>{
        this.orderstatus=responce.data
      }
    })
  }
  updateOrder(order:Order){
    const orderstauts:{[key:string]:number}={
      'Pending':1,
      'confirmed':2,
      'OutforDelievey':3,
      'delievered':4
 
    }
    const Orderstatus=order.orderStatus
    // const  statusId=orderstauts[Orderstatus]
    const Orderstatusinfo:Orderstatus={
            orderId:order.id,
            statusId:order.statusID
    }
    this.aorderservice.updateorder(Orderstatusinfo).subscribe({
      next:(response)=>{
        if(response.error){
          console.log("invalid Api call");
         
        }
 
      }
    })
  }
  editOrderstatus(Order:Order){
    this.updateOrder(Order)
 
  }

  updateStatus(event:any, order:Aorders){


    let updatedOrder:Orderstatus = {
      orderId: order.id,
      statusId: event.target.value
    }

    this.aorderservice.updateorder(updatedOrder).subscribe({
      next: (response:AppResponse) => {
        console.log(response.data);
        
      }
    });
    
  }

}
