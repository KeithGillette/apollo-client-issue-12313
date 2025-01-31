import {DomainEntityPropertyTypeName} from './domain-entity-type-name.types';
import {OmitMethodKeys} from "./utility.methods";


export interface IAssignmentSummary extends Partial<OmitMethodKeys<AssignmentSummary>> {
}

export class AssignmentSummary {
	public dateTimeBegin: Date;
	public dateTimeEnd: Date;
	public closedCount: number;
	public openCount: number;
	public newCount: number;
	public meanHoursToClose: number;
	public readonly __typename: DomainEntityPropertyTypeName.AssignmentSummary = DomainEntityPropertyTypeName.AssignmentSummary;
}
