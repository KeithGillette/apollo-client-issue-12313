import { Prop } from '@typegoose/typegoose';

import { newEntityId } from './entity-id.methods';


export interface ICollectionEntity {
	_id?: string;
}

/**
 * abstract base class for all persistence entities
 */
export abstract class CollectionEntityBase implements ICollectionEntity {
	@Prop() public _id: string = newEntityId();
	public dateTimeCreated?: Date;
	public dateTimeUpdated?: Date;
}
