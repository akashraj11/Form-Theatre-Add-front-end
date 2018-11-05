import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomValidators } from './services/custom_validators';
import { FormService } from './services/form';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MaterialModule } from './material';
import { TheatreRegistrationFormComponent } from './theatre-registration-form/theatre-registration-form.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    TheatreRegistrationFormComponent
  ],
  imports: [ BrowserModule, BrowserAnimationsModule, ReactiveFormsModule,HttpClientModule,
    FormsModule,MatCardModule, MatInputModule, MatButtonModule, MatSnackBarModule ],
  providers: [ CustomValidators, FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
