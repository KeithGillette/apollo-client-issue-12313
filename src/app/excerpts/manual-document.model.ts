import { Index, Prop } from '@typegoose/typegoose';


import { ProcedureDocument } from './procedure-document.model';
import { OrganizationDocument } from './organization-document.model';
import {CollectionEntityBase} from './collection-entity-base.model';
import {IManualDocument} from './manual-document.type';
import {ManualStatus, ManualType} from './manual.types';

@Index({name: 'text', description: 'text'}, {name: 'TextSearch'})
export class ManualDocument extends CollectionEntityBase implements IManualDocument {
	@Prop() public name: string;
	@Prop() public description: string;
	@Prop() public detail: string;
	@Prop({enum: ManualStatus, type: String}) public status: ManualStatus = ManualStatus.Active;
	@Prop({enum: ManualType, type: String}) public type: ManualType = ManualType.Private;
	@Prop({type: String}) public keywordList: string[] = [];
	@Prop({type: String}) public functionList: string[] = [];
	@Prop({type: String}) public sectorList: string[] = [];
	@Prop({ref: () => ProcedureDocument, type: String}) public procedureIdList: string[] = [];
	@Prop({index: true, ref: () => OrganizationDocument}) public organizationId: string;
}
