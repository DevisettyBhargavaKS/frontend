import { Component, OnInit } from '@angular/core';
import { Userproducts } from 'src/app/model/userproducts';
import { AuthService } from 'src/app/service/auth.service';
import { AppResponse } from 'src/app/model/appResponse';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendorhome.component.html',
})
export class VendorHomeComponent {
  error: string = '';
  file = '';
  categoryId:number=0;
  INITIAL_PRODUCTS: Userproducts = {
    id: 0,
    category_id: 0,
    title: '',
    description: '',
    price: 0,
  };
  emitterValue = false;
  title: string = '';
  id: number = 0;
  description: string = '';
  price: number = 0;
  editState: number = 0;
  buttontxt: string = 'Add';
  userproducts: Userproducts[] = [];
  products: Userproducts = {
    id: 0,
    category_id: 0,
    title: '',
    description: '',
    price: 0,
  };

  constructor(
    private authservice: AuthService,
    private vendorservice: VendorService
  ) {}
  logout(): void {
    this.authservice.logout();
  }
  ngOnInit(): void {
    this.vendorservice.getallProducts().subscribe({
      next: (response: AppResponse) => {
        this.userproducts = response.data;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  // onSubmit(form: any) {
  //   console.log(form.value);
  //   console.log(this.products);

  //   if (this.products.id === 0) {
  //     this.vendorservice
  //       .postProduct({
  //         category_id: 1,
  //         title: this.title,
  //         description: this.description,
  //         price: this.price,
  //       })
  //       .subscribe({
  //         next: (response: any) => {
  //           this.userproducts.push(response.data);
  //           this.products = this.INITIAL_PRODUCTS;
  //           this.ngOnInit();
  //         },
  //         error: (err) => {
  //           let message: string = err?.error?.error?.message;
  //           this.error = message.includes(',')
  //             ? message.split(',')[0]
  //             : message;
  //         },
  //       });
  //   } else {
  //     this.vendorservice
  //       .putProduct({
  //         id: this.id,
  //         category_id: 1,
  //         title: this.title,
  //         description: this.description,
  //         price: this.price,
  //       })
  //       .subscribe({
  //         next: (response: any) => {
  //           this.userproducts.push(response.data);
  //           this.title = '';
  //           this.products = this.INITIAL_PRODUCTS;
  //           this.ngOnInit();
  //         },
  //         error: (err) => {
  //           let message: string = err?.error?.error?.message;
  //           this.error =
  //             message != null && message.includes(',')
  //               ? message.split(',')[0]
  //               : message;
  //         },
  //       });
  //   }
  // }

  getCategory(category: Userproducts) {
    this.products = category;
  }

  onDelete(id: number | undefined) {
    console.log(id);
  
  if (id !== undefined) {
   this.vendorservice.deleteProduct(id).subscribe({
      next: (response: any) => {
        this.products= response.data;
        this.ngOnInit();
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error =
          message != null && message.includes(",")
            ? message.split(",")[0]
            : message;
      },
    });
  }
}

  onEdit(id: number): void {
    this.products = this.userproducts.find((at) => at.id === id)!;
    this.buttontxt = 'Edit';
    // this.Categores = this.category.find((cat) => cat.id === id)!;
    // this.buttontxt = 'Edit';
    // this.title=this.Categores.title;
    // this.editState = id;
    this.id = this.products.id!;
    this.title = this.products.title;
    this.description = this.products.description;
    this.price = this.products.price;
  }

  onSubmit(form:any){
    const formData = new FormData();
    formData.append('photo', this.file);
    formData.append('title',form.value.title);
    formData.append('description',form.value.description);
    formData.append('price',form.value.price);
    formData.append('categoryId',form.value.categoryId);

console.log(form.value.categoryId);
console.log(this.file);


    this.vendorservice.addvendor(formData).subscribe({
      next: (response: AppResponse) => {
        this.products=response.data;
        form.reset();
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
  onFileChange(event: any) {
    const fileInput = event.target;
    if (fileInput && fileInput.files.length > 0) {
      this.file = fileInput.files[0];

      // console.log('Selected file',this.file);
    }
  }

}
