import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/model/category';
import { AppResponse } from 'src/app/model/appResponse';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent {
  error: string = '';
  INITIAL_CATEGORY: Category = { id: 0, title: '' };
  title:string=''
  id:number=0
  emitterValue = false;
  editState: number = 0;
  buttontxt: String = 'Add';
  category: Category[] = [];
  Categores: Category = {
    id: 0,
    title: '',
  };
  constructor(private categoryservice: CategoryService) {}
  ngOnInit(): void {
    this.categoryservice.getCategories().subscribe({
      next: (response: AppResponse) => {
        this.category = response.data;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }



  onSubmit(form: any) {
    // console.log(form.value);
    // console.log(this.Categores);

    if (this.Categores.id === 0) {
      this.categoryservice.postCategory({ title: form.value.title }).subscribe({
        next: (response: any) => {
          this.category = response.data;
          this.Categores = this.INITIAL_CATEGORY;
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error = message.includes(',') ? message.split(',')[0] : message;
        },
      });
    } else {    
      this.categoryservice.putCategory({id:this.id,title:this.title}).subscribe({
        next: (response: any) => {
          this.category.push(response.data);
          this.title='';
          this.Categores = this.INITIAL_CATEGORY;
          this.ngOnInit();
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error =
            message != null && message.includes(',')
              ? message.split(',')[0]
              : message;
        },
      });
    }
  }
  getCategory(category: Category) {
    this.Categores = category;
  }

  onDelete(id: number | undefined) {
    console.log(id);
    if (id !== undefined) {
      this.categoryservice.deleteCategory(id).subscribe({
        next: (response: any) => {
          this.Categores = response.data;
          this.ngOnInit();
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error =
            message != null && message.includes(',')
              ? message.split(',')[0]
              : message;
        },
      });
    }
  }
  change(): boolean {
    return (this.emitterValue = true);
  }
  onEdit(id:number):void{
    this.Categores = this.category.find((cat) => cat.id === id)!;
    this.buttontxt = 'Edit';
    this.title=this.Categores.title;
    this.id=this.Categores.id!;
  }
}
