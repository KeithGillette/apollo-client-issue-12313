import { modelOptions, Prop, Severity } from '@typegoose/typegoose';

import { ManualDocument } from './manual-document.model';
import { AccountDocument } from './account-document.model';
import {CollectionEntityBase} from './collection-entity-base.model';
import {IProcedureDocument} from './procedure-document.type';
import {ProcedureStatus} from './procedure-status.type';
import {populate} from './populate.method';
import {StaticId} from './static-id.enum';
import {IProcedureStepDocument} from './procedure-step-document.type';
import {ProcedureStepDocument} from './procedure-step-document.model';


@modelOptions({options: {allowMixed: Severity.ALLOW}}) // Typing `procedureStepDocumentList` leads to return of Mongoose model instead of subdocument
export class ProcedureDocument extends CollectionEntityBase implements IProcedureDocument {
	@Prop({index: true, ref: () => ManualDocument}) public manualId: string;
	@Prop() public description: string;
	@Prop() public imageLocator: string;
	@Prop() public dateTimeRevised: Date = new Date();
	@Prop({enum: ProcedureStatus, type: String}) public status: ProcedureStatus;
	@Prop() public isCopyProtected: boolean;
	@Prop({type: String}) public keywordList: string[] = [];
	@Prop({type: String}) public functionList: string[] = [];
	@Prop({type: String}) public sectorList: string[] = [];
	@Prop() public procedureStepDocumentList: ProcedureStepDocument[] = [];
	@Prop({ref: () => AccountDocument}) public defaultAssigneeAccountId: string;

	public constructor(initialValues?: IProcedureDocument) {
		super();
		if (initialValues) {
			populate<IProcedureDocument>(this, initialValues);
			this.procedureStepDocumentList = this.createProcedureStepDocumentList(initialValues.procedureStepDocumentList);
		} else {
			const defaultProcedureStep = new ProcedureStepDocument();
			defaultProcedureStep._id = StaticId.DefaultChild;
			this.procedureStepDocumentList = [defaultProcedureStep];
		}
	}

	public defaultProcedureStepDocument(): IProcedureStepDocument {
		return this.procedureStepDocumentList.find((childDocument: IProcedureStepDocument) => {
			return childDocument._id === StaticId.DefaultChild;
		});
	}

	private createProcedureStepDocumentList(childDocumentList: IProcedureStepDocument[]): ProcedureStepDocument[] {
		return childDocumentList.map((childDocument) => {
			return new ProcedureStepDocument(childDocument);
		});
	}
}
