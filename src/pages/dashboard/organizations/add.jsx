// Import
import { ToastContainer, toast } from 'react-toastify';
import { errorToaster } from '@/components/toasters';
import PageTitle from "@/components/pageTitle";
import Sidebar from "@/components/sidebar";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

// Function to define the Add organization page
export default function Add() {
    // Get router
    const router = useRouter();

    // Create organization function
    const createOrg = async () => {

        // Try
        try {

            // API Call
            const res = await fetch(
                'http://127.0.0.1:8000/api/v1/group/create/',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('access')}`
                    },
                    body: JSON.stringify(
                        {
                            "name": document.getElementById('createName').value,
                            "description": document.getElementById('createDescription').value
                        }
                    )
                }
            );

            // Turn API request result into JSON
            const data = await res.json();
            

            // Check if the response is not OK
            if (!res.ok) {
                // Check if the email has any issues
                if (Array.isArray(data["name"])) {
                    // Print email's issue
                    errorToaster("Organization Name: " + data["name"][0]);
                }

                // Check if the password has any issues
                if (Array.isArray(data["description"])) {
                    // Print password's issue
                    errorToaster("Description: " + data["description"][0]);
                }
                
                // Check if details appear in the response
                if ("detail" in data) {
                    // Check if the 
                    errorToaster(data["detail"]);
                }
            }

            // On successful call, move back to organizations page and
            // set a cookie to make a toaster appear
            else {

                // Set cookie for the successful toaster popout
                Cookies.set('success', `${data["name"]}: organization successfully created`);

                // Move to the organizations page
                router.push('/dashboard/organizations');

            }

        // Catch
        } catch (err) {

            // Do nothing

        }

    }

    // Create organization function
    const joinOrg = async () => {

        // Try
        try {

            // API Call
            const res = await fetch(
                'http://127.0.0.1:8000/api/v1/group/join/',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('access')}`
                    },
                    body: JSON.stringify(
                        {
                            "name": document.getElementById('joinName').value,
                        }
                    )
                }
            );

            // Turn API request result into JSON
            const data = await res.json();
            
            console.log(data)

            // Check if the response is not OK
            if (!res.ok) {
                // Check if the email has any issues
                if (Array.isArray(data["name"])) {
                    // Print email's issue
                    errorToaster("Organization Name: " + data["name"][0]);
                }

                // Check if the password has any issues
                if (Array.isArray(data["description"])) {
                    // Print password's issue
                    errorToaster("Description: " + data["description"][0]);
                }
                
                // Check if details appear in the response
                if ("status" in data) {
                    // Check if the 
                    errorToaster(data["status"]);
                }
            }

            // On successful call, move back to organizations page and
            // set a cookie to make a toaster appear
            else {

                // Set cookie for the successful toaster popout
                Cookies.set('success', `${document.getElementById('joinName').value}: organization successfully joined`);

                // Move to the organizations page
                router.push('/dashboard/organizations');

            }

        // Catch
        } catch (err) {

            // Do nothing
            
        }

    }

    // Return the final page
    return (
        <div className="relative flex h-full flex-row">
            <Sidebar></Sidebar>
            <div className="m-10 w-full">
                <div className="flex-col justify-between">
                    <div className="flex justify-between ">
                        <div className="font-boldVazir text-3.5xl mb-16">
                            {PageTitle()}
                        </div>
                        <div className="flex items-start">
                            <button className="drop-shadow-lg rounded-md bg-venetian-red text-white-p text-2xl px-3 py-2" onClick={() => router.push(`/dashboard/organizations`)}>Cancel</button>
                        </div>
                    </div>
                    <div className="flex flex-col justify-evenly">
                        <div className="flex justify-evenly">
                            <div className="flex flex-col justify-between bg-white-p rounded-xl drop-shadow-lg items-center m-16 p-6">
                                <div className="font-boldVazir text-2xl m-2">
                                    Join Organization
                                </div>
                                <div className="m-4 w-full">
                                    <div className="text-sm mb-1">Organization Name</div>
                                    <input className="drop-shadow-md border border-silver rounded-md w-full p-1" id="joinName" style={{ fontSize: '12px' }}/>
                                </div>
                                <button className="drop-shadow-lg rounded-md bg-sky text-white-p text-xl py-1 px-2 m-4" onClick={joinOrg}>Join</button>
                            </div>
                            <div className="flex flex-col justify-evenly font-boldVazir text-2xl m-4">
                                OR
                            </div>
                            <div className="flex flex-col justify-between bg-white-p rounded-xl drop-shadow-lg items-center m-16 p-6">
                                <div className="font-boldVazir text-2xl m-2"> 
                                    Create Organization
                                </div>
                                <div className="m-4 w-full">
                                    <div className="text-sm mb-1">Organization Name</div>
                                    <input className="drop-shadow-md border border-silver rounded-md w-full p-1" id="createName" style={{ fontSize: '12px' }}/>
                                </div>
                                <div className="m-4 w-full">
                                    <div className="text-sm mb-1">Description</div>
                                    <textarea className="drop-shadow-md border border-silver rounded-md w-full" id="createDescription" style={{ fontSize: '12px' }}/>
                                </div>
                                <button className="drop-shadow-lg rounded-md bg-sky text-white-p text-xl py-1 px-2 m-4" onClick={createOrg}>Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );

}