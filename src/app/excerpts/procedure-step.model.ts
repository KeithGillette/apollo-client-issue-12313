import { isRefType } from '@typegoose/typegoose';

import {DomainEntityBase} from './domain-entity-base.model';
import {Content, IContent} from './content.model';
import {IAccount} from './account.model';
import {IProcedure} from './procedure.model';
import {IEntityActivity} from './entity-activity.model';
import {DomainEntityTypeName} from './domain-entity-type-name.types';
import {populate} from './populate.method';
import {newEntityId} from './entity-id.methods';
import {IProcedureStepDocument} from './procedure-step-document.type';
import {OmitMethodKeys} from "./utility.methods";



/** Data Transfer Object of `ProcedureStep`
 *  Methods removed & properties marked optional to create accurate GraphQL DTO of Domain Entity
 */
export interface IProcedureStep extends Partial<OmitMethodKeys<ProcedureStep>> {
	siblingPrevious?: IProcedureStep; // Managed by `@client` resolver
	siblingNext?: IProcedureStep; // Managed by `@client` resolver
}

/** domain model class: An individual checklist item constituting the building block of a Procedure */
export class ProcedureStep extends DomainEntityBase {
	public name: string = '';
	public detail: string;
	public contentList: IContent[] = []; // Managed by external resolver
	public procedureStepList: IProcedureStep[] = [];
	public defaultAssigneeAccount: IAccount; // Managed by external resolver
	public parentProcedureStep: ProcedureStep;
	public procedure: IProcedure;
	public activityList: IEntityActivity[] = []; // Managed by external resolver
	public override readonly __typename: DomainEntityTypeName.ProcedureStep = DomainEntityTypeName.ProcedureStep;

	public constructor(procedure: IProcedure, initialValues?: IProcedureStepDocument, parentProcedureStep?: ProcedureStep) {
		super();
		this.procedure = procedure;
		if (initialValues) {
			populate<ProcedureStep>(this, initialValues);
			this.parentProcedureStep = parentProcedureStep;
			this.defaultAssigneeAccount = isRefType(initialValues.defaultAssigneeAccountId, String) ? { _id: initialValues.defaultAssigneeAccountId } : undefined;
			this.contentList = initialValues.contentIdList.map((contentId) => {
				return isRefType(contentId, String) ? { _id: contentId } : new Content(contentId);
			});
			this.procedureStepList = initialValues.procedureStepDocumentList.map((childDocument: IProcedureStepDocument) => {
				return new ProcedureStep(procedure, childDocument, this);
			});
		}
		this._id = this._id || newEntityId();
	}
}
