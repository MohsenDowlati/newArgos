import { useState } from 'react';
import DatePicker from 'react-datepicker';
import Navbar from '@/components/Navbar/Navbar';
import 'react-datepicker/dist/react-datepicker.css';

const CameraConfirmation = () => {
    const [date, setDate] = useState(new Date());
    const [cameraName, setCameraName] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');

    const handleSubmit = async () => {
        const payload = {
            date: date.toISOString().slice(0, 19),
            camera_name: cameraName
        };
        
        // Replace this with your Django API endpoint
        const response = await fetch('/your-django-api-endpoint/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        // Assuming the Django API returns a message field
        setConfirmationMessage(data.message);
    };

    return (
        <div className="w-full bg-[#212326]">
            <Navbar />
            <div className="flex flex-col items-center justify-center h-screen">
                <DatePicker
                    selected={date}
                    dateFormat={'yyyy-MM-dd'}
                    onChange={(selectedDate) => setDate(selectedDate)}
                />
                <input
                    type="text"
                    placeholder="Enter camera name"
                    value={cameraName}
                    onChange={(e) => setCameraName(e.target.value)}
                />
                <button onClick={handleSubmit}>
                    Submit
                </button>
                <p>{confirmationMessage}</p>
            </div>
        </div>
    );
};

export default CameraConfirmation;
