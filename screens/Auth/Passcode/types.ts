export type HandlePressFunc = (number: number | string) => void;

export type PinPadProps = {
	onPinEntered: (pin: string, handleResetPin?: () => void) => void;
	handleBiometricLogin?: () => void;
};
