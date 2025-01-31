import { Ref } from '@typegoose/typegoose';

import {IAccountDocument} from './account-document.type';
import {IContentDocument} from './content-document.type';

export interface IProcedureStepDocument {
	_id: string;
	name: string;
	detail: string;
	dateTimeCreated: Date;
	defaultAssigneeAccountId: Ref<IAccountDocument>;
	contentIdList: Ref<IContentDocument>[];
	feedbackThreadId: string;
	procedureStepDocumentList: IProcedureStepDocument[];
}
