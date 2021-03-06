import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule as AFormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FieldErrorsComponent } from './field-errors/field-errors.component';
import { FieldStatusComponent } from './field-status/field-status.component';
import { FormFieldComponent } from './form-field/form-field.component';
import {
  FormSelectFieldComponent,
} from './form-select-field/form-select-field.component';
import {
  FormTextFieldComponent,
} from './form-text-field/form-text-field.component';
import { FormComponent } from './form.component';
import { SetAttributeDirective } from './set-attributes.directive';

@NgModule({
  declarations: [
    FormComponent,
    FormFieldComponent,
    SetAttributeDirective,
    FieldErrorsComponent,
    FieldStatusComponent,
    FormTextFieldComponent,
    FormSelectFieldComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    AFormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  exports: [
    FormComponent,
    FormFieldComponent,
    SetAttributeDirective,
    FieldErrorsComponent,
    FieldStatusComponent,
    FormTextFieldComponent,
    FormSelectFieldComponent,
  ],
})
export class FormModule {}
