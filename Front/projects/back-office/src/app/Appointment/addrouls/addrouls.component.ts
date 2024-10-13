import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl  } from '@angular/forms';

@Component({
  selector: 'app-addrouls',
  templateUrl: './addrouls.component.html',
  styleUrls: ['./addrouls.component.css']
})
export class AddroulsComponent {
  rules: FormGroup;
  triggerCounter = 1;
  lisRules: any;
  na:any;
  controls: string[] = [];
  inputValues: { [key: string]: string } = {};
  
  @ViewChild('inputContainer', { static: true }) inputContainer: ElementRef;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.rules = this.fb.group({
      tag: [''],
      trigger0: [''],
      responses: [''],
      responseType: ['message'] // Defaulting to "message"
    });
  }

  add() {
    const inputElements = this.inputContainer.nativeElement.querySelectorAll('input');
    const inputValues = Array.prototype.map.call(inputElements, (element: HTMLInputElement) => element.value);
    this.lisRules=inputValues
    console.log(inputValues,this.lisRules);
    const ruleData = this.rules.value;
    const requestBody = {
      tag: ruleData.tag,
      //trigger: ruleData.trigger.split(',').map((trigger:string) => trigger.trim()), // Splitting triggers by comma
      trigger: this.lisRules,
      responses: ruleData.responses.split(',').map((response:string) => response.trim()), // Splitting responses by comma
      responseType: ruleData.responseType
    };
    
    this.http.post('http://localhost:5000/addRule', requestBody)
      .subscribe((response) => {
        console.log('Rule added successfully:', response);
        // Additional handling if needed
      }, (error) => {
        console.error('Error adding rule:', error);
        // Additional error handling if needed
      });
      console.log(requestBody)
  }
/*
  addTriggerInput() {
    if(this.triggerCounter>=1){
      const controlName = `trigger${this.triggerCounter++}`;
    this.rules.addControl(controlName, new FormControl(''));
    //console.log(this.rules.value(`trigger${this.triggerCounter-1}`))
    console.log(JSON.stringify(this.rules.value))
    //this.lisRules.push(this.rules.get);
    this.na=`trigger${this.triggerCounter-2}`;
    console.log(this.na,'NAN')
    console.log(this.rules.value.trigger0)
    console.log(this.rules.value.na,"FFFF")
    const control = this.rules.get(`trigger${this.triggerCounter}`);
    this.lisRules.push(control.value);
    console.log(control)
    }
    
  }

  getInputValue(value: string) {
    console.log(value);
  }*/

  addInput() {
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.className = 'form-control';

    this.inputContainer.nativeElement.appendChild(inputElement);
  }

  getInputValues() {
    const inputElements = this.inputContainer.nativeElement.querySelectorAll('input');
    const inputValues = Array.prototype.map.call(inputElements, (element: HTMLInputElement) => element.value);
    this.lisRules.push=inputValues
    console.log(inputValues);
  }


}
