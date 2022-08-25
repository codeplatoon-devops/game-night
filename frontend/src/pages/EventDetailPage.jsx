import { useEffect } from "react"


export default function EventDetailPage({data}) {
	useEffect(()=>{
		console.log(data)
	},[])


	return (

		<div>
			<ul>
				{data && <li>{data.fields.code}</li>}
			</ul>
		</div>


	) 
}
