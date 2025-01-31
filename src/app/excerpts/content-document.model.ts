import { Index, Prop } from '@typegoose/typegoose';

import { ProcedureStepDocument } from './procedure-step-document.model';
import {CollectionEntityBase} from './collection-entity-base.model';
import {IContentDocument} from './content-document.type';
import {ContentType} from './content-type.type';
import {ManualDocument} from './manual-document.model';
import {ProcedureDocument} from './procedure-document.model';


class ProcedureAndStepId {
	@Prop({ref: () => ProcedureDocument}) public procedureId: string;
	@Prop({ref: () => ProcedureStepDocument}) public procedureStepId: string;
}

@Index({'procedureAndStepIdList.procedureId': 1, 'procedureAndStepIdList.procedureStepId': 1})
export class ContentDocument extends CollectionEntityBase implements IContentDocument {
	@Prop({index: true, ref: () => ManualDocument}) public manualId: string;
	@Prop({type: () => [ProcedureAndStepId], _id: false}) public procedureAndStepIdList: ProcedureAndStepId[] = [];
	@Prop({enum: ContentType, type: String}) public type: ContentType;
	@Prop() public mediaType: string;
	@Prop() public name: string;
	@Prop() public description: string;
	@Prop() public preview: string;
	@Prop() public payload: string;
}
