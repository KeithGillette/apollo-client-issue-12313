import { DomainEntityPropertyTypeName } from './domain-entity-type-name.types';

export interface IAssignmentProgress extends Partial<{
	openCountTotal: number;
	closedCountTotal: number;
	openCountCurrentAccount: number;
	closedCountCurrentAccount: number;
	__typename: DomainEntityPropertyTypeName.AssignmentProgress;
}> {
}
