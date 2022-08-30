import { useEffect, useParams } from "react-router-dom";

export default function GroupDetailPage() {
	const { groupId } = useParams();

	useEffect(() => {
		axios.get(`/groups/${groupId}`).then((response) => {
			console.log(response.data);
		});
	}, []);
	// 35164354
	return <div>groupdetails: {groupId}</div>;
}
