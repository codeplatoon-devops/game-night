import Calendar from '../components/Calendar/Calendar'


export default function CalendarPage({data}) {

	return (
		<div>
			<h1>Calendar Page</h1>
			<Calendar data={data}/>
		</div>
	)
}
