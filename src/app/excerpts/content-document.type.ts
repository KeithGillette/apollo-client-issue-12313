import { ContentType } from './content-type.type';

export interface IContentDocument {
	_id: string;
	manualId: string;
	procedureAndStepIdList: { procedureId: string; procedureStepId: string }[];
	dateTimeCreated?: Date;
	type: ContentType;
	mediaType: string;
	name: string;
	description: string;
	preview: string;
	payload: string;
}
