import { ManualStatus, ManualType } from './manual.types';

export interface IManualDocument {
	_id: string;
	name: string;
	description: string;
	status: ManualStatus;
	type: ManualType;
	keywordList: string[];
	functionList: string[];
	sectorList: string[];
	procedureIdList: string[];
	dateTimeCreated?: Date;
	organizationId: string;
}
