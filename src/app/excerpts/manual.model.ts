import {DomainEntityBase} from './domain-entity-base.model';
import {IProcedure} from './procedure.model';
import {IContent} from './content.model';
import {IOrganization} from './organization.model';
import {IAssignmentSummary} from './assignment-summary.model';
import {IAssignment} from './assignment.type';
import {newEntityId} from './entity-id.methods';
import {populate} from './populate.method';
import {IAccountWithManualRole} from './account-with-manual-role.type';
import {DomainEntityTypeName} from './domain-entity-type-name.types';
import {IManualDocument} from './manual-document.type';
import {ManualRole, ManualStatus, ManualType} from './manual.types';
import {OmitMethodKeys} from "./utility.methods";


/** Data Transfer Object of `Manual`
 *  Methods removed & properties marked optional to create accurate GraphQL DTO of Domain Entity
 */
export interface IManual extends OmitMethodKeys<Partial<Manual>> {
}

/** domain model class: A collection of 0 or more Procedures */
export class Manual extends DomainEntityBase {
	public name = '';
	public description = '';
	public detail = '';
	public status: ManualStatus = ManualStatus.Active;
	public type: ManualType = ManualType.Private;
	/** Provided by external resolver */
	public procedureList: IProcedure[] = [];
	public contentList: IContent[] = [];
	public sectorList: string[] = [];
	public keywordList: string[] = [];
	public functionList: string[] = [];
	/** Provided by external resolver */
	public organization: IOrganization;
	/** Provided by external resolver */
	public assignmentSummaryList: IAssignmentSummary[] = [];
	/** Provided by external resolver */
	public assignmentList: IAssignment[] = [];
	/** Provided by external resolver */
	public accountWithManualRoleList: IAccountWithManualRole[] = [];
	public currentUserRole: ManualRole;
	public override readonly __typename: DomainEntityTypeName.Manual = DomainEntityTypeName.Manual;

	public constructor(initialValues?: IManualDocument, currentUserRole?: ManualRole) {
		super();
		this._id = this._id || newEntityId();
		if (initialValues) {
			this.organization = { _id: initialValues.organizationId };
			populate<IManual>(this, initialValues);
		}
		this.currentUserRole = currentUserRole || this.currentUserRole;
	}
}
