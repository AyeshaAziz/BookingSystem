import { Device } from '../../Models/Devices.model';

export interface MultiSelectProps {
  selectedOptions: string[];
  label: string;
  options: Device[];
  formStyle: object;
  emitToParent: (values:string[]) => void;
}
