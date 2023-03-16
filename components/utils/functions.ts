import * as SecureStore from 'expo-secure-store';

export const secureSave = async (key: string, value: string) => {
	await SecureStore.setItemAsync(key, value);
};

export const getSecureSaveValue = async (key: string) => {
	let result = await SecureStore.getItemAsync(key);
	return result;
	// if (result) {
	// 	alert("🔐 Here's your value 🔐 \n" + result);
	// } else {
	// 	alert('No values stored under that key.');
	// }
};

export const deleteSecureSaveItem = async (key: string) => {
	await SecureStore.deleteItemAsync(key);
};

export const formattedCurrency = (amount: number) => {
	return amount === null ? amount : '₦' + amount.toLocaleString();
};

export const formattedDateTime = (createdAt: string) => {
	const date = new Date(createdAt);

	const formattedDate = date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});

	const formattedTime = date.toLocaleTimeString('en-US', {
		hour12: true,
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	});

	return { formattedDate, formattedTime };
};

export const debounce = <T extends (...args: any[]) => void>(
	func: T,
	delay: number
): ((...args: Parameters<T>) => void) => {
	let timerId: ReturnType<typeof setTimeout>;

	return function debouncedFunction(this: any, ...args: Parameters<T>) {
		const context = this;

		clearTimeout(timerId);
		timerId = setTimeout(() => {
			func.apply(context, args);
		}, delay);
	};
};
