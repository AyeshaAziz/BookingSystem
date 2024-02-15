import { User } from '../../Models/Users.model';

export interface SingleSelectProps {
  value: string;
  label: string;
  options: User[];
  formStyle: object;
  emitToParent: (value: string) => void;
}
