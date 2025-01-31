import { ManualRole } from './manual.types';

export interface IManualPermissionDocument {
	_id: string;
	manualId: string;
	organizationId: string;
	userId: string;
	manualRole: ManualRole;
}
