import { isRefType } from '@typegoose/typegoose';

import {DomainEntityBase} from './domain-entity-base.model';
import {IProcedureStep, ProcedureStep} from './procedure-step.model';
import {Content, IContent} from './content.model';
import {IAccount} from './account.model';
import {IManual} from './manual.model';
import {IAssignmentSummary} from './assignment-summary.model';
import {IAssignment} from './assignment.type';
import {IEntityActivity} from './entity-activity.model';
import {DomainEntityTypeName} from './domain-entity-type-name.types';
import {populate} from './populate.method';
import {newEntityId} from './entity-id.methods';
import {IProcedureStepDocument} from './procedure-step-document.type';
import {IProcedureDocument} from './procedure-document.type';
import {StaticId} from './static-id.enum';
import {ProcedureStatus} from './procedure-status.type';
import {OmitMethodKeys} from "./utility.methods";


/** Data Transfer Object of `Procedure`
 *  Methods removed & properties marked optional to create accurate GraphQL DTO of Domain Entity
 */
export interface IProcedure extends OmitMethodKeys<Partial<Procedure>> {
	imagePreviewURL?: string; // client-only virtual property resolved by ApolloClient local resolver
}

/** domain model class: A named, ordered, hierarchically nested collection of 0 or more Procedure Steps providing a template for Assignments > Tasks */
export class Procedure extends DomainEntityBase {
	public name: string = '';
	public description: string = '';
	public detail: string = '';
	public status: ProcedureStatus = ProcedureStatus.Draft;
	public isCopyProtected: boolean = false;
	public dateTimeRevised: Date = new Date();
	public imageLocator: string = '';
	public sectorList: string[] = [];
	public functionList: string[] = [];
	public keywordList: string[] = [];
	public procedureStepList: IProcedureStep[] = [];
	public contentList: IContent[] = []; // Managed by external resolver
	public defaultAssigneeAccount: IAccount = null; // Managed by external resolver
	public manual: IManual; // Managed by external resolver
	public assignmentSummaryList: IAssignmentSummary[] = []; // Managed by external resolver
	public assignmentList: IAssignment[] = []; // Managed by external resolver
	public activityList: IEntityActivity[] = []; // Managed by external resolver
	public override readonly __typename: DomainEntityTypeName.Procedure = DomainEntityTypeName.Procedure;

	public constructor(initialValues?: IProcedureDocument) {
		super();
		if (initialValues) {
			populate<IProcedure>(this, initialValues);
			this.manual = { _id: initialValues.manualId };
			const childDocumentList = initialValues.procedureStepDocumentList.filter((childDocument: IProcedureStepDocument) => {
				if (childDocument._id === StaticId.DefaultChild) {
					this.name = childDocument.name;
					this.detail = childDocument.detail;
					this.defaultAssigneeAccount = isRefType(childDocument.defaultAssigneeAccountId, String) ? { _id: childDocument.defaultAssigneeAccountId } : undefined;
					this.contentList = childDocument.contentIdList.map((contentId) => {
						return isRefType(contentId, String) ? { _id: contentId } : new Content(contentId);
					});
				}
				return childDocument._id !== StaticId.DefaultChild;
			});
			this.procedureStepList = childDocumentList.map((childDocument: IProcedureStepDocument) => {
				return new ProcedureStep(this, childDocument);
			});
		}
		this._id = this._id || newEntityId();
	}
}

export const procedureStepListMaximumDepth = 4;
