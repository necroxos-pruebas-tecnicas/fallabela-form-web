import { IFieldValue } from './field-value.interface';
import { IAnswer } from './answer.interface';
import { FieldType } from '../enums';

export interface IField {
  id?: string;
  formId: string;

  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  defaultValue?: string;

  values: IFieldValue[];
  answers: IAnswer[];
}
