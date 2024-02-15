import DevicesJson from '../Data/devices.json';
import UsersJson from '../Data/users.json';
import { GlobalConstants } from '../GlobalConstants.helper';
import { BookingFormModel } from '../Models/BookingForm.medel';
import { Device } from '../Models/Devices.model';
import { User } from '../Models/Users.model';
import { DeviceStatusType } from './Enum/DeviceStatusType.enum';

class LandingPageService {
  constructor() {}
  private users: User[] = [];
  private devices: Device[] = [];

  private deviceListeners: ((data: BookingFormModel) => void)[] = [];

  getUsers(): User[] {
    this.users = UsersJson;
    return this.users;
  }

  getDevices(): Device[] {
    return (this.devices = DevicesJson);
  }

  updateDeviceInfo(update: BookingFormModel | undefined): void {
    this.devices.forEach((device) => {
      if (update && update.selectedDevices && update.selectedDevices.length > GlobalConstants.ZERO) {
        update.selectedDevices.forEach((selectedDevice) => {
          if (selectedDevice === device.name) {
            device.bookedBy = update.userName;
            device.status = DeviceStatusType.NotAvailable;
            device.from = update.formattedFromDateTime;
            device.to = update.formattedToDateTime;
          }
        });
      } else {
        device.bookedBy = GlobalConstants.EMPTY;
        device.status = DeviceStatusType.Available;
        device.from = GlobalConstants.EMPTY;
        device.to = GlobalConstants.EMPTY;
      }
    });
  }

  // Method to update the data and notify listeners
  updateDeviceData(update: BookingFormModel) {
    // Update internal state
    this.updateDeviceInfo(update);
    // Notify listeners
    this.deviceListeners.forEach((listener) => listener(update));
  }

  // Method for components to subscribe
  subscribe(listener: (data: BookingFormModel) => void) {
    this.deviceListeners.push(listener);
  }

  // Method for components to unsubscribe
  unsubscribe(listener: (data: BookingFormModel) => void) {
    this.deviceListeners = this.deviceListeners.filter((l) => l !== listener);
  }
}

const landingPageService = new LandingPageService();

export default landingPageService;
