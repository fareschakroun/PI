import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicefrontService } from '../services/servicefront.service';
import { SupplierOffer } from '../models/SupplierOffer';

export interface DialogData {
  description: string;
  price: string;
}

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent {

   @Input() supplyrequestId : number;

  form: FormGroup;
  description: FormControl;
  price: FormControl;

  constructor(
    public dialogRef: MatDialogRef<DialogboxComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private serviceFront : ServicefrontService
  ) {
    this.description = new FormControl('', Validators.required);
    this.price = new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]);

    this.form = new FormGroup({
      description: this.description,
      price: this.price
    });
  }
  

  onSubmit() {
    if (this.form.valid) {
      const description = this.form.value.description;
      const price = this.form.value.price;
    
      const offer: DialogData = { description, price };
      this.dialogRef.close(offer);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}