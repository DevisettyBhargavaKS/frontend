import { Component, OnInit } from '@angular/core';
import { Cartresp } from 'src/app/model/cartresp';
import { AppResponse } from 'src/app/model/appResponse';
import { CartService } from 'src/app/service/cart.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserproductService } from 'src/app/service/userproduct.service';
import { Cart } from 'src/app/model/cart';
import { Userproducts } from 'src/app/model/userproducts';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  UserCart: Cartresp[] = [];
  cart: any[] = [];
  constructor(
    private cartService: CartService,
    private userproductservice: UserproductService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.cartService.getAllCart().subscribe((response: AppResponse) => {
      this.cart = response.data;
      console.log(this.cart, 'cartshowing');
    });
  
  // (err) => {
  //   console.error('An error occurred:', err);
  // }
}
  getCartItemCount(id: number): number {
    let count: number = this.UserCart.find(
      (cartItem) => cartItem.item.id === id
    )?.count!;
    return count;
  }

  addToCart(id: number): void {
    console.log(id);
   
    let isPresent: Userproducts = this.UserCart.find((item) => item.id === id)
      ?.item!;
    console.log(isPresent.title);
    console.log(
      this.UserCart.find((cartItem) => cartItem.item.id === id)?.count
    );

    let Cart: Cart = {
      userId: this.storageService.getLoggedInUser().id,
      productId: id,
      count:
        this.UserCart.find((cartItem) => cartItem.item.id === id)?.count! + 1,
    };
    this.userproductservice.addToCart(Cart).subscribe({
      next: (resp: any) => {
        this.UserCart = resp.data;
        console.log(this.UserCart);
      },
    });
  }

  removeFromCart(id: number): void {
    if (this.getCartItemCount(id) - 1 === 0) {
      let cartId: number = this.UserCart.find(
        (cartItem) => cartItem.item.id === id
      )?.id!;
      this.userproductservice
        .removeFromCart(this.storageService.getLoggedInUser().id, cartId)
        .subscribe({
          next: (resp: any) => {
            this.UserCart = resp.data;
            console.log(this.UserCart);
          },
        });
    } else {
      console.log('remove');

      let Cart: Cart = {
        userId: this.storageService.getLoggedInUser().id,
        productId: id,
        count:
          this.UserCart.find((cartItem) => cartItem.item.id === id)?.count! - 1,
      };
      this.userproductservice.addToCart(Cart).subscribe({
        next: (resp: any) => {
          this.UserCart = resp.data;
          console.log(this.UserCart);
        },
      });
    }
  }
  checkout(): void{
    let checkOutData:any = {
      userId: this.storageService.getLoggedInUser().id,
      addressId:1,
      productId:9
    }
    this.cartService.checkout(checkOutData).subscribe({
      next: (resp:any)=> console.log(resp)
    })
  }
}
