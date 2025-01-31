import {DomainEntityBase} from './domain-entity-base.model';
import {IProcedure} from './procedure.model';
import {DomainEntityTypeName} from './domain-entity-type-name.types';
import {IOrganization} from './organization.model';
import {IManual} from './manual.model';
import {ICommentThreadWithAccountViewStatus} from './comment-thread-with-account-view-status.type';
import {IAssignmentSummary} from './assignment-summary.model';
import {EmailNotificationType} from './email-notification-type';
import {IAccountDocument} from './account-document.type';
import {populate} from './populate.method';
import {OrganizationRole} from './organization-role.type';
import {IAssignmentWithAccountViewStatus} from './assignment-with-account-view-status.type';
import {OmitMethodKeys} from "./utility.methods";

/** Data Transfer Object of `Account`
 *  Methods removed & properties marked optional to create accurate GraphQL DTO of Domain Entity
 */
export interface IAccount extends Partial<OmitMethodKeys<Account>> {
}

/** domain model class: An entity linking User and Organization applying Organization Role permissions controlling access to features, prominently billing plan & creating Manuals. */
export class Account extends DomainEntityBase {
	public isInactive: boolean;
	public displayName: string;
	public emailAddress: string;
	public organization: IOrganization;
	public organizationRole: OrganizationRole;
	public isVerified: boolean;
	public manualList: IManual[] = [];
	public procedureList: IProcedure[] = [];
	public assignmentSummaryList: IAssignmentSummary[] = []; // Managed by external resolver
	public assignmentWithViewStatusList: IAssignmentWithAccountViewStatus[] = []; // Managed by external resolver
	public commentThreadWithViewStatusList: ICommentThreadWithAccountViewStatus[] = []; // Managed by external resolver
	public emailNotificationTypeList: EmailNotificationType[] = [
		EmailNotificationType.AssignmentAnnouncement,
		EmailNotificationType.AssignmentReminder,
		EmailNotificationType.AssignmentCompletion,
		EmailNotificationType.CommentAnnouncement,
	];
	public override readonly __typename: DomainEntityTypeName.Account = DomainEntityTypeName.Account;

	public constructor(accountDocument?: IAccountDocument) {
		super();
		if (accountDocument) {
			populate<IAccount>(this, accountDocument);
			this.organization = { _id: accountDocument.organizationId };
		}
	}
}
