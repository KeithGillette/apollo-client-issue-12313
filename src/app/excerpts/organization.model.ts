import { DomainEntityBase } from './domain-entity-base.model';
import { IOrganizationConstraints } from './organization-constraints.type';
import { DomainEntityTypeName } from './domain-entity-type-name.types';
import { newEntityId } from './entity-id.methods';
import { IAccount } from './account.model';
import { IOrganizationBillingInfo } from './organization-billing-info.type';
import { populate } from './populate.method';
import { IManual } from './manual.model';
import { IAssignmentSummary } from './assignment-summary.model';
import { IAssignment } from './assignment.type';
import { IOrganizationDocument } from './organization-document.type';

import {OmitMethodKeys} from "./utility.methods";


/** Data Transfer Object of `Organization`
 *  Methods removed & properties marked optional to create accurate GraphQL DTO of Domain Entity
 */
export interface IOrganization extends Partial<OmitMethodKeys<Organization>> {
}

/** domain model class: A collection of 1 or more User Accounts grouped for billing */
export class Organization extends DomainEntityBase {
	public name: string;
	public description: string = '';
	public sectorList: string[] = [];
	public constraints: IOrganizationConstraints = {
		manualPrivacyAllowed: undefined,
		discussionAttachmentSizeMax: undefined,
		openAssignmentCountMax: undefined,
		openAssignmentCountCurrent: undefined,
	};
	public billingInfo: IOrganizationBillingInfo;
	public accountList: IAccount[] = []; // Managed by external resolver
	public manualList: IManual[] = []; // Managed by external resolver
	public assignmentList: IAssignment[] = []; // Managed by external resolver
	public assignmentSummaryList: IAssignmentSummary[] = []; // Managed by external resolver
	public override readonly __typename: DomainEntityTypeName.Organization = DomainEntityTypeName.Organization;

	public constructor(initialValues?: IOrganizationDocument) {
		super();
		if (initialValues) {
			populate<IOrganization>(this, initialValues);
			this.billingInfo.plan = {
				_id: initialValues.billingInfo.planId, // Plan managed by external resolver
			};
		}
		this._id = this._id || newEntityId();
	}
}
