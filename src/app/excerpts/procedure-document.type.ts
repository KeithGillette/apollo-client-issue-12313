import { ProcedureStatus } from './procedure-status.type';
import {IProcedureStepDocument} from './procedure-step-document.type';

export interface IProcedureDocument {
	_id: string;
	manualId: string;
	description: string;
	imageLocator: string;
	dateTimeCreated?: Date;
	dateTimeRevised: Date;
	status: ProcedureStatus;
	isCopyProtected: boolean;
	keywordList: string[];
	functionList: string[];
	sectorList: string[];
	procedureStepDocumentList: IProcedureStepDocument[];
	defaultAssigneeAccountId: string;
}
