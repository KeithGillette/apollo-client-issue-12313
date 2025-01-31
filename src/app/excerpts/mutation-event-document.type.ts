export interface IMutationEventDocument {
	_id: string;
	typeName: string;
	dateTime: Date;
	operation: Record<string | symbol, any>;
	resultData: unknown;
}
