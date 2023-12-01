import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { UserDetail } from 'src/app/model/user-details';
import { AppResponse } from 'src/app/model/appResponse';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit{
  error: string = "";
  userDetails: UserDetail[] = [];
  userDetail: UserDetail = {
    id: 0,
    username: "",
    name: "",
    roles: "",
    createdAt: "",
    addressList: [],
  };

  constructor(private userService:UserService){}
 
  ngOnInit(): void {
    this.userService.getuserdetails().subscribe({
      next: (response: AppResponse) => {
       
        this.userDetails=response.data;
      },
      error:(err)=>{
        let message:string=err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });
  }
  setSelectedUser(userDetail: UserDetail): void {
    this.userDetail = userDetail;
  }
 

}
