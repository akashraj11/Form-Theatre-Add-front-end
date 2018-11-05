import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from '../services/custom_validators';
import { FormService } from '../services/form';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Theatre } from '../domain/theatre';
import { ProducerService } from '../services/producer-service';
import { ScreenLayout } from '../domain/screenLayout';


@Component({
  selector: 'app-theatre-registration-form',
  templateUrl: './theatre-registration-form.component.html',
  styleUrls: ['./theatre-registration-form.component.css']
})
export class TheatreRegistrationFormComponent implements OnInit {
  email = "akashraj12@gmail.com";
  noOfColumns1: 0;
  noOfRows1: 0;
  noOfColumns2: 0;
  noOfRows2: 0;
  id  = 1;
  public theatre:Theatre = {
    theatreId: this.id ,
    theatreName: '',
    theatreCity: '',
    theatreAddress: '',
    "screenLayout":
    {      
       "category":[
             {
            "type":"gold",
            "noOfColumns":3,
            "noOfRows":3,
            "seatLayout":[
                     {
                    "seatNumber":3
                     }
                   ]
            },
            {
              "type":"silver",
              "noOfColumns":3,
              "noOfRows":3,
              "seatLayout":[]
              }
       ]
     }
  };



  public signUpForm: FormGroup;
  public formErrors = {

  };

  constructor(
    public form: FormBuilder,
    public FormService: FormService,
    public snackbar: MatSnackBar,
    private producerService: ProducerService
  ) {}

  // initiate component
  public ngOnInit() {
    this.buildForm();
  }
  
  public submit() {
    this.id += 1;
    // mark all fields as touched
    this.FormService.markFormGroupTouched(this.signUpForm);

    this.theatre.theatreId = this.id;
    this.theatre.screenLayout.category[0].noOfColumns = this.noOfColumns1  ;
    this.theatre.screenLayout.category[0].noOfRows = this.noOfRows1  ;
    this.theatre.screenLayout.category[0].noOfColumns = this.noOfColumns2  ;
    this.theatre.screenLayout.category[0].noOfRows = this.noOfRows2  ;
    this.theatre.screenLayout.category[0].type = "Gold Class";
    this.theatre.screenLayout.category[1].type = "Silver Class";
    console.log(this.noOfColumns1 );
    console.log(this.theatre.screenLayout.category[0].noOfColumns );
    this.producerService.addTheatre(this.email,this.theatre);
    

    // right before we submit our form to the server we check if the form is valid
    // if not, we pass the form to the validateform function again. Now with check dirty false
    // this means we check every form field independent of wether it's touched 
    if (this.signUpForm.valid) {
      this.snackbar.open('Succesfully submitted a valid form. yay!', 'Close', {
        duration: 3000,
      });
      this.signUpForm.reset();
    } else {
      this.formErrors = this.FormService.validateForm(this.signUpForm, this.formErrors, false)
    }
  }
  
  // build the user edit form
  public buildForm() {
    this.signUpForm = this.form.group({
      theatreId: ['', [Validators.required, CustomValidators.validateCharacters]],
      theatreName: ['', [Validators.required, CustomValidators.validateCharacters]],
      theatreCity: ['', [Validators.required, CustomValidators.validateCharacters]],
      theatreAddress: ['', [Validators.required, CustomValidators.validateCharacters]],
      noOfColumns1: ['', [Validators.required, CustomValidators.validateNumber]],
      noOfRows1:['', [Validators.required, CustomValidators.validateNumber]],
      noOfColumns2:['', [Validators.required, CustomValidators.validateNumber]],
      noOfRows2:['', [Validators.required, CustomValidators.validateNumber]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // on each value change we call the validateForm function
    // We only validate form controls that are dirty, meaning they are touched
    // the result is passed to the formErrors object
    this.signUpForm.valueChanges.subscribe((data) => {
      this.formErrors = this.FormService.validateForm(this.signUpForm, this.formErrors, true)
    });
  }
}
