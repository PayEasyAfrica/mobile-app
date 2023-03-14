export interface iUserData {
	avatar: string;
	createdAt: string;
	deleted: boolean;
	email: string;
	id: string;
	moneyTag: string;
	name: string;
	phoneNumber: string;
	refree: string;
	updatedAt: string;
}

export interface PaymentTransaction {
	amount: number;
	balance: number;
	category: string;
	createdAt: string;
	deleted: boolean;
	description: string;
	fee: number;
	id: string;
	kind: string;
	meta: object;
	reference: string;
	status: string;
	title: string;
	toFrom: string;
	type: string;
	updatedAt: string;
	user: string;
}

export interface TransactionGroup {
	createdAt: string;
	data: PaymentTransaction[];
}
