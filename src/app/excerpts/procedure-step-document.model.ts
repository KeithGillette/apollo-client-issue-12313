import { Prop } from '@typegoose/typegoose';

import {IProcedureStepDocument} from './procedure-step-document.type';
import {populate} from './populate.method';
import {AccountDocument} from './account-document.model';
import {ContentDocument} from './content-document.model';
import {IProcedureStepInput} from './procedure-step-input.type';
import {CollectionEntityBase} from './collection-entity-base.model';



export class ProcedureStepDocument extends CollectionEntityBase implements IProcedureStepDocument {
	@Prop() public name: string;
	@Prop() public detail: string;
	@Prop() public override dateTimeCreated: Date = new Date();
	@Prop({ref: () => AccountDocument, type: String}) public defaultAssigneeAccountId: string;
	@Prop({ref: () => ContentDocument, type: String}) public contentIdList: string[] = [];
	@Prop() public feedbackThreadId: string;
	@Prop() public procedureStepDocumentList: ProcedureStepDocument[] = [];

	public constructor(initialValues?: IProcedureStepDocument | IProcedureStepInput) {
		super();
		if (initialValues) {
			populate<any>(this, initialValues);
			this.procedureStepDocumentList = this.createProcedureStepDocumentList(initialValues.procedureStepDocumentList);
		}
	}

	private createProcedureStepDocumentList(childDocumentList: IProcedureStepDocument[] | IProcedureStepInput[]): ProcedureStepDocument[] {
		return childDocumentList.map((childDocument) => {
			return new ProcedureStepDocument(childDocument);
		});
	}
}
