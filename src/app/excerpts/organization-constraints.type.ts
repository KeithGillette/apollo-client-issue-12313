/** Constraints on user actions based on Organization billing plan & billing status */
export interface IOrganizationConstraints {
	manualPrivacyAllowed: boolean;
	discussionAttachmentSizeMax: number;
	openAssignmentCountMax: number;
	openAssignmentCountCurrent: number;
}
