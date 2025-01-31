import { IUserEvent } from './user-event.types';


export interface IUserServicesPasswordResetTokenEntry {
	token: string;
	address: string;
	when: number;
	reason: 'enroll' | 'reset';
}

export interface IUserServicesEmailVerificationTokenEntry {
	token: string;
	address: string;
	when: number;
}

export interface IUserServices {
	password: {
		bcrypt?: string;
		reset?: IUserServicesPasswordResetTokenEntry[];
	};
	resume: {
		loginTokens: { when: Date; hashedToken: string }[];
	};
	email?: {
		verificationTokens: IUserServicesEmailVerificationTokenEntry[];
	};
}

export interface IUserDocument {
	_id: string;
	id: string;
	username?: string | undefined;
	emails?: {
		address: string;
		verified: boolean;
	}[] | undefined;
	createdAt?: number;
	updatedAt?: number;
	services?: IUserServices | Record<string, any>; // The former is correct but the latter matches AccountsJS typings
	deactivated: boolean;
	profile?: { // TaskTrain extension to AccountsJS User model
		nameFirst: string;
		nameLast: string;
		referralCode?: string;
		visitorId?: string;
		eventList?: IUserEvent[];
	};
}
