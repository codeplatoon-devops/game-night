import './EventDetailList.css'
import "primeflex/primeflex.css";
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { StyleClass } from 'primereact/styleclass';

export default function EventDetailList({eventDetail, games, startTime, endTime}){


 return(
    <div className="surface-0">
    <div className="font-medium text-3xl text-900 mb-3 mt-3">Event Information</div>
    {/* <div className="text-500 mb-5">Find information on event below. Event Owners can edit their information here.</div> */}
    <ul className="list-none p-0 m-0">
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Event Name</div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{eventDetail.name}</div>
            <div className="w-6 md:w-2 flex justify-content-end">
                <Button label="Edit" icon="pi pi-pencil" className="p-button-text" />
            </div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Description</div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">{eventDetail.description}</div>
            <div className="w-6 md:w-2 flex justify-content-end">
                <Button label="Edit" icon="pi pi-pencil" className="p-button-text" />
            </div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Games</div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                {games.map((game) => (
                    <Chip label={game} className="mr-2" />
                ))}            
            </div>
            <div className="w-6 md:w-2 flex justify-content-end">
                <Button label="Edit" icon="pi pi-pencil" className="p-button-text" />
            </div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Owner</div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{eventDetail.username}</div>
            <div className="w-6 md:w-2 flex justify-content-end">
                <Button label="Edit" icon="pi pi-pencil" className="p-button-text" />
            </div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Location</div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
            {eventDetail.address_1 + " " + eventDetail.address_2 + " " + eventDetail.city + " " + eventDetail.state + ", " + eventDetail.zip_code}
            </div>
            <div className="w-6 md:w-2 flex justify-content-end">
                <Button label="Edit" icon="pi pi-pencil" className="p-button-text" />
            </div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Date/Time</div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
            {startTime + ' - ' + endTime}
            </div>
            <div className="w-6 md:w-2 flex justify-content-end">
                <Button label="Edit" icon="pi pi-pencil" className="p-button-text" />
            </div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Current Number of Attendees / Max Attendees</div>
            <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
            {eventDetail.peeps + ' / ' + eventDetail.max_attendees}
            </div>
            <div className="w-6 md:w-2 flex justify-content-end">
                <Button label="Edit" icon="pi pi-pencil" className="p-button-text" />
            </div>
        </li>
        <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-2 font-medium">Event Public Status</div>
            {eventDetail.private ? 
                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">Private</div>
            :
                <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">Public</div>
            }
            <div className="w-6 md:w-2 flex justify-content-end">
                <Button label="Edit" icon="pi pi-pencil" className="p-button-text" />
            </div>
        </li>
    </ul>
</div>
 )
}