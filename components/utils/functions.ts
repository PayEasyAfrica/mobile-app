import * as SecureStore from 'expo-secure-store';

export async function secureSave(key: string, value: string) {
	await SecureStore.setItemAsync(key, value);
}

export async function getSecureSaveValue(key: string) {
	let result = await SecureStore.getItemAsync(key);
	return result;
	// if (result) {
	// 	alert("🔐 Here's your value 🔐 \n" + result);
	// } else {
	// 	alert('No values stored under that key.');
	// }
}

export async function deleteSecureSaveItem(key: string) {
	await SecureStore.deleteItemAsync(key);
}
