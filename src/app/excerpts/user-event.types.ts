/** A tracked event associated with User usually as a result of a User action */
export interface IUserEvent {
	name: UserEventName;
	dateTime: Date;
}

export type UserEventName = 'Tour-Welcome.Completed';
