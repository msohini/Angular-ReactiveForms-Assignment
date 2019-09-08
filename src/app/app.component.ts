
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Reactive-forms-assignment';

  ProjectForm: FormGroup;
  forbiddenProjectnames = ['Test'];
  ngOnInit() {
    this.ProjectForm = new FormGroup({
     
      'projectname': new FormControl(null, [Validators.required], this.forbiddenNameAsync),

        'email': new FormControl(null, [Validators.required, Validators.email]),
     
      'status': new FormControl(null, Validators.required),
     

    });
  
    this.ProjectForm.statusChanges.subscribe(
      (status) => {
        console.log(status);
      }
    );
   

  }
  onSubmit() {
    console.log(this.ProjectForm);
    this.ProjectForm.reset();
  }
 
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenProjectnames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true }

    }
    else {
      return null;
    }
  }


  forbiddenNameAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({ 'nameIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500);
    })
    return promise;
  }
}
