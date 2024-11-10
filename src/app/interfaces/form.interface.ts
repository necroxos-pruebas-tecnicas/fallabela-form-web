import { IField } from './field.interface';

export interface IForm {
  id?: string;

  name: string;
  description: string;
  enabled: boolean;

  fields: IField[];
}
