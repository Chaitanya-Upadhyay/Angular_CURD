import { Component, OnInit ,Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnessList = ["Brand New", "Second Hand", "Refburished"]
  productForm !: FormGroup;
  actionBtn : string ="Save"
  constructor(private formBuilder: FormBuilder,
     private api : ApiService ,
     @Inject(MAT_DIALOG_DATA) public editData : any,
      private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required,],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
       Comment: ['', Validators.required],
      
    })
    if(this.editData){
      this.actionBtn ="Update"
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls[ 'Comment'].setValue(this.editData.Comment);
    }
  }

  addProduct() {
    if(!this.editData){
      if(this.productForm.valid) {
        this.api.postProduct(this.productForm.value)
          .subscribe({
            next:(res)=> {
              alert("Product added Successfully")
              this.productForm.reset();
              this.dialogRef.close('save');
            },
            error:()=> {
              alert("Error while adding the product")
            }
          })
      }
      
    }
    else{
      this.updateProduct()
    }
  }
updateProduct(){
  this.api.putProduct(this.productForm.value,this.editData.id)
  .subscribe({
    next:(res)=>{
      alert("Product Updated Successfully");
      this.productForm.reset();
      this.dialogRef.close('update');
    },
    error:()=>{
      alert("Error while getting the record");
    }
  })
}
}
