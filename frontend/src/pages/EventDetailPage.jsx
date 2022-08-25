import { useEffect, useState } from "react"



export default function EventDetailPage({data}) {
	const [event, setEvent] = useState(data)
	useEffect(()=>{
		console.log('event detail data',data)
		if (data.length > 1) {
			let filterData = data.filter(event => event.fields.code === '81134530')
			setEvent(filterData)
		}
	},[])


	return (

		<div>
			<ul>
				{/* {event && <h2>{event.fields.name}</h2>} */}
				{/* {data && data.map(event => <li>{event.fields.code}</li>)} */}
				{/* {data && data.filter(event => event.fields.code === 81134530).map(info => <li>{info.fields.code}</li>)} */}
			</ul>
		</div>


	) 
}
