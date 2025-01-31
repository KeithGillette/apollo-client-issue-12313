import { Index, Prop } from '@typegoose/typegoose';

import {UserDocument} from './user-document.model';
import {OrganizationDocument} from './organization-document.model';
import {IAccountInboxEntityStatus} from './account-inbox-entity-status.type';
import {AccountViewStatus} from './account-view-status.type';
import {AccessTokenServiceProvider} from './access-token-service-providers.type';
import {CollectionEntityBase} from './collection-entity-base.model';
import {IAccountDocument} from './account-document.type';
import {OrganizationRole} from './organization-role.type';
import {EmailNotificationType} from './email-notification-type';
import {populate} from './populate.method';


class AccountInboxEntityStatus implements IAccountInboxEntityStatus {
	@Prop() public parentId: string;
	@Prop({enum: AccountViewStatus, type: String}) public viewStatus: AccountViewStatus;
	@Prop({type: String}) public unreadChildIdList: string[];
}

class OAuthCredential {
	@Prop() public accessToken: string;
	@Prop() public refreshToken: string;
	@Prop() public expirationDateTime: Date;
	@Prop({ enum: AccessTokenServiceProvider, type: String }) public serviceProvider: AccessTokenServiceProvider;
}

@Index({organizationId: 1, userId: 1, isInactive: 1})
@Index({userId: 1, isInactive: 1})
@Index({'inboxAssignmentStatusList.parentId': 1})
@Index({'inboxCommentStatusList.parentId': 1})
export class AccountDocument extends CollectionEntityBase implements IAccountDocument {
	@Prop({ref: () => UserDocument}) public userId: string;
	@Prop({ref: () => OrganizationDocument}) public organizationId: string;
	@Prop({enum: OrganizationRole, type: String}) public organizationRole: OrganizationRole;
	@Prop() public displayName: string;
	@Prop({index: true}) public emailAddress: string;
	@Prop({type: () => [AccountInboxEntityStatus], _id: false}) public inboxAssignmentStatusList: IAccountInboxEntityStatus[] = [];
	@Prop({type: () => [AccountInboxEntityStatus], _id: false}) public inboxCommentStatusList: IAccountInboxEntityStatus[] = [];
	@Prop({type: () => [AccountInboxEntityStatus], _id: false}) public inboxFeedbackStatusList: IAccountInboxEntityStatus[] = [];
	@Prop() public isVerified: boolean = false;
	@Prop() public isInactive: boolean = false;
	@Prop({enum: EmailNotificationType, type: String}) public emailNotificationTypeList: EmailNotificationType[] = [
		EmailNotificationType.AssignmentAnnouncement,
		EmailNotificationType.AssignmentReminder,
		EmailNotificationType.AssignmentCompletion,
		EmailNotificationType.CommentAnnouncement,
	];
	@Prop({ type: () => OAuthCredential, _id: false }) public oauthCredential?: OAuthCredential;

	public constructor(initialValues?: Partial<AccountDocument>) {
		super();
		populate(this, initialValues);
	}
}
