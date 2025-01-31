import { GraphQLObjectTypeName } from './domain-entity-type-name.types';


export interface IDomainEntity {
	_id?: string;
	__typename?: GraphQLObjectTypeName;
}

/** abstract base class for all domain entities */
export abstract class DomainEntityBase implements IDomainEntity {
	public _id: string;
	public readonly __typename: GraphQLObjectTypeName;
}
