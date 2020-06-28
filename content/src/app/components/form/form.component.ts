import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormsModule, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  @Input() deviceXs: boolean;
  submitted = false;

  regiForm: FormGroup;
  FirstName: string = '';
  LastName: string = '';
  Address: string = '';
  DOB: Date = null;
  Gender: string = '';
  Blog: string = '';
  Email: string = '';
  IsAccepted: number = 0;

  constructor(private fb: FormBuilder) {
    // To initialize FormGroup  
    this.regiForm = fb.group({
      'FirstName': [null, Validators.required],
      'LastName': [null, Validators.required],
      'Address': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(500)])],
      'DOB': [null, Validators.required],
      'Gender': [null, Validators.required],
      'Blog': [null, Validators.required],
      'Email': [null, Validators.compose([Validators.required, Validators.email])],
      'IsAccepted': [null]
    });
  }


  // convenience getter for easy access to form fields
  get f() { return this.regiForm.controls; }

  // On Change event of Toggle Button  
  onChange(event: any) {
    if (event.checked == true) {
      this.IsAccepted = 1;
    } else {
      this.IsAccepted = 0;
    }
  }

  // Executed When Form Is Submitted  
  onFormSubmit(form: NgForm) {

    // stop here if form is invalid
    if (this.regiForm.invalid) {
        return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.regiForm.value))

    console.log(form);
    this.regiForm.reset();
    this.formDirective.resetForm();
  }

  ngOnInit(): void {
  }

}
