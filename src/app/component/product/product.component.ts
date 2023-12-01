import { Component } from '@angular/core';
import { AppUser } from 'src/app/model/appUser';
import { Cart } from 'src/app/model/cart';
import { Cartresp } from 'src/app/model/cartresp';
import { Userproducts } from 'src/app/model/userproducts';
import { StorageService } from 'src/app/service/storage.service';
import { UserproductService } from 'src/app/service/userproduct.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent {
  error: string = '';
  userproducts: Userproducts[] = [];
  UserCart: Cart[] = [];
  products: Userproducts = {
    id: 0,
    title: '',
    description: '',
    price: 0,
  };
  constructor(
    private userproductservice: UserproductService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.userproductservice.getAlluserproducts().subscribe({
      next: (response: any) => {
        this.userproducts = response.data;

        localStorage.setItem('cart', JSON.stringify(this.userproducts));
      },
      // error: (err) => {
      //   console.log(err?.error?.error?.message);
      // },
    });

    this.userproductservice
      .getUserCart(this.storageService.getLoggedInUser().id)
      .subscribe({
        next: (resp: any) => {
          this.UserCart = resp.data;
          console.log(this.UserCart);
        },
      });
  }

  addToCart(id: number): void {
    let isPresent: boolean = false;
    let cart = JSON.parse(localStorage.getItem('cart') || '{}');

    if (!isPresent) {
      let app: AppUser = this.storageService.getLoggedInUser();
      // let exitcart: Cart = localStorage.getItem
      let cart: Cart = {
        userId: app.id,
        productId: id,
        count: 1,
      };
      this.userproductservice.addToCart(cart).subscribe({
        next: (resp: any) => {
          this.UserCart = resp.data;
        },
      });
    } else {
      console
        .log
        // this.UserCart.find((cartItem) => cartItem.item.id === id)?.count
        ();

      let user: AppUser = this.storageService.getLoggedInUser();
      let Cart: Cart = {
        userId: user.id,
        productId: id,
        count: 1,
      };
      this.userproductservice.addToCart(Cart).subscribe({
        next: (resp: any) => {
          this.UserCart = resp.data;
          console.log(this.UserCart);
        },
      });
    }
  }
}
