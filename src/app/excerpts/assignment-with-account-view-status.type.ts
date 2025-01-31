import { IAssignment } from './assignment.type';
import { AccountViewStatus } from './account-view-status.type';
import { DomainEntityPropertyTypeName } from './domain-entity-type-name.types';

export interface IAssignmentWithAccountViewStatus {
	/** Only needed for automatic Apollo cache updates so linked to `assignment._id` */
	_id?: string;
	/** Managed by external resolver */
	assignment?: IAssignment;
	viewStatus?: AccountViewStatus;
	unreadChildIdList?: string[];
	__typename?: DomainEntityPropertyTypeName.AssignmentWithAccountViewStatus;
}
