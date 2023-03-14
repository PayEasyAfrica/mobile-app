/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
	CompositeScreenProps,
	NavigatorScreenParams
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export type RootStackParamList = {
	Root: NavigatorScreenParams<RootTabParamList> | undefined;
	Transactions: undefined;
	NotFound: undefined;
	Passcode: undefined;
	SetPasscode: undefined;
	VerifyPasscode: undefined;
	PhoneVerification: undefined;
	OTPVerification: undefined;
	Signup: undefined;
	Modal: undefined;
	Loading: undefined;
};

export type HomeStackParamList = {
	Home: undefined;
	Transactions: undefined;
	Receive: undefined;
	Send: undefined;
	Scanner: undefined;
	Authorize: undefined;
	DebitSummary: undefined;
	Withdraw: undefined;
};

export type SettingStackParamList = {
	Settings: undefined;
	Profile: undefined;
	Notifications: undefined;
	ResetPIN: undefined;
	ConfirmPIN: undefined;
};

export type RootTabParamList = {
	TabOne: undefined;
	TabTwo: undefined;
	TabThree: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
	NativeStackScreenProps<RootStackParamList, Screen>;

export type HomeStackScreenProps<Screen extends keyof HomeStackParamList> =
	NativeStackScreenProps<HomeStackParamList, Screen>;

export type SettingsStackScreenProps<
	Screen extends keyof SettingStackParamList
> = NativeStackScreenProps<SettingStackParamList, Screen>;

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<RootTabParamList, Screen>,
		NativeStackScreenProps<RootStackParamList>
	>;

export type HandlePressFunc = (number: number | string) => void;

export type PinPadProps = {
	onPinEntered: (pin: string, handleResetPin?: () => void) => void;
	handleBiometricLogin?: () => void;
	showBiometricAuth?: boolean;
};
