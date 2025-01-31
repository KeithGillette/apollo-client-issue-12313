import { OrganizationRole } from './organization-role.type';
import { IAccountInboxEntityStatus } from './account-inbox-entity-status.type';

export interface IAccountDocument {
	_id: string;
	userId: string;
	organizationId: string;
	organizationRole: OrganizationRole;
	displayName: string;
	emailAddress: string;
	dateTimeCreated?: Date;
	inboxAssignmentStatusList: IAccountInboxEntityStatus[];
	inboxCommentStatusList: IAccountInboxEntityStatus[];
	inboxFeedbackStatusList: IAccountInboxEntityStatus[];
	isVerified: boolean;
	isInactive: boolean;
}
