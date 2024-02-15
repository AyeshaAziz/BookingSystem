import './LandingPage.css';

import { Device } from '../Models/Devices.model';
import BookingForm from './BookingForm/BookingForm';
import DeviceStatus from './DeviceStatus/DeviceStatus';
import { User } from '../Models/Users.model';
import { useEffect, useState } from 'react';
import { BookingFormModel } from '../Models/BookingForm.medel';
import landingPageService from './LandingPage.service';
import { GlobalConstants } from '../GlobalConstants.helper';

const LandingPage = () => {
  const devices: Device[] = landingPageService.getDevices();
  const users: User[] = landingPageService.getUsers();
  const initialState = {
    selectedDevices: [],
    userName: GlobalConstants.EMPTY,
    formattedFromDateTime: GlobalConstants.EMPTY,
    formattedToDateTime: GlobalConstants.EMPTY,
  } as BookingFormModel;
  const [serviceData, setServiceData] = useState<BookingFormModel>(initialState);

  useEffect(() => {
    const handleServiceChange = (update: BookingFormModel) => {
      // Update the component or trigger any necessary actions
      setServiceData(update);
    };

    // Subscribe to service changes
    landingPageService.subscribe(handleServiceChange);

    // Cleanup when unmounting
    return () => {
      // Unsubscribe when the component is unmounted
      landingPageService.unsubscribe(handleServiceChange);
    };
  });
  return (
    <div className="container">
      <BookingForm users={users} devices={devices} />
      {serviceData && <DeviceStatus devices={devices} />}
    </div>
  );
};

export default LandingPage;
