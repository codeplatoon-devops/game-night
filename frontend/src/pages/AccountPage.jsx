import { PendingInvitesEvents } from "../components/Tables/PendingInvitesEvents/PendingInvitesEvents";
import { PendingInvitesGroups } from "../components/Tables/PendingInvitesGroups/PendingInvitesGroups";

export default function AccountPage() {
	return (
		<div>
			<PendingInvitesEvents />
			<PendingInvitesGroups />
		</div>
	);
}
