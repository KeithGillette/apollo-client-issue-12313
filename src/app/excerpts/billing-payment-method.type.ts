export interface IBillingPaymentMethod {
	lastDigits: string;
	expirationYear: number;
	expirationMonth: number;
	type: string;
	externalCardId: string;
}
