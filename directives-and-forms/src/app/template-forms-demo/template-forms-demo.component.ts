import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-template-forms-demo',
  templateUrl: './template-forms-demo.component.html',
  styleUrls: ['./template-forms-demo.component.css']
})
export class TemplateFormsDemoComponent implements OnInit, AfterViewInit {
  operatingSystems = [
    'Windows 10',
    'Linux',
    'Mac OS'
  ]

  @ViewChild('laptopForm') laptopForm!: NgForm;
  @ViewChild('processor') processor!: NgModel;

  // get time() {
  //   return Date.now();
  // }

  constructor() { }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.laptopForm.value);
  }

  clearForm(): void {
    // this.laptopForm.setValue({ // patchValue to partially set values
    //   processor: '',
    //   ram: '',
    //   hardDisk: 0,
    //   os: ''
    // });

    // this.laptopForm.form.markAsUntouched();

    this.laptopForm.form.reset();
  }

}
