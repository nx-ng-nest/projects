import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { map } from 'rxjs';

import {
  CATEGORY_PLURAL_NAME,
  ProductService,
} from '@projects/client-service';
import { ICategory } from '@projects/interface';
import {
  FormFieldSelectOption,
  FormOptions,
} from '@projects/ui';

const initControls = (cs: ProductService) => {
  return {
    uuid: new FormControl(
      '',
      [Validators.required, Validators.minLength(10)],
      [
        async (control: AbstractControl) => {
          return cs.isFieldUnique('uuid', control.value);
        },
      ]
    ),
    name: new FormControl('', [Validators.required], [
      async (control: AbstractControl) => {
        return cs.isFieldUnique('name', control.value);
      },
    ]),
    description: new FormControl('', [Validators.required]),
    categories: new FormControl('', []),
  };
};

export const initFormOptions = (cs: ProductService): FormOptions => {
  const controls = initControls(cs);
  const formGroup = new FormGroup(controls);
  return {
    name: 'product',
    submitLabel: 'Save Product',
    formGroup: formGroup,
    formFields: [
      {
        icon: 'qr_code',
        label: 'Barcode',
        hint: 'Type a barcode.',
        attributes: {
          name: 'uuid',
          required: true,
          autocomplete: 'off',
          unique: true,
        },
        control: controls.uuid,
      },
      {
        icon: 'title',
        label: 'Product Name',
        hint: 'Type a descriptive product name.',
        attributes: {
          name: 'name',
          required: true,
          autocomplete: 'off',
          unique: true,
        },
        control: controls.name,
      },
      {
        icon: 'description',
        label: 'Product Description',
        hint: 'Type a product description.',
        attributes: {
          name: 'description',
          required: true,
          autocomplete: 'off',
        },
        control: controls.description,
      },
      {
        icon: 'category',
        label: 'Categories',
        hint: 'Select Categories.',
        attributes: {
          name: 'categories',
          type: 'select',
          multiple: true,
        },
        control: controls.categories,
        selectOptions: cs
          .subService<ICategory>(CATEGORY_PLURAL_NAME)
          .entities$.pipe<FormFieldSelectOption[]>(
            map((data) => {
              return data.map<FormFieldSelectOption>((category: ICategory) => {
                return {
                  value: category.id,
                  label: category.name,
                };
              });
            })
          ),
      },
    ],
  };
};
