import {IAccount} from './account.model';
import {DomainEntityPropertyTypeName} from './domain-entity-type-name.types';
import {populate} from './populate.method';
import {IMutationEventDocument} from './mutation-event-document.type';
import {OmitMethodKeys} from "./utility.methods";


/** Data Transfer Object of `EntityActivity`
 *  Methods removed & properties marked optional to create accurate GraphQL DTO of Domain Entity
 */
export interface IEntityActivity extends Partial<OmitMethodKeys<EntityActivity>> {
}

export class EntityActivity {
	public description: string;
	public typeName: string;
	public dateTime: Date;
	public account: IAccount;
	public readonly __typename: DomainEntityPropertyTypeName.EntityActivity = DomainEntityPropertyTypeName.EntityActivity;

	public constructor(mutationEventDocument: IMutationEventDocument) {
		populate<IEntityActivity>(this, mutationEventDocument);
	}
}
