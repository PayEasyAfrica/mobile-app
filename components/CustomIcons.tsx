import { Svg, Path } from 'react-native-svg';

export interface CustomTabBarIconProps {
	color: string;
}

export const HomeTabBarIcon: React.FC<CustomTabBarIconProps> = (props) => {
	const { color } = props;
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
			<Path d="M4 21V9L12 3L20 9V21H14V14H10V21H4Z" fill={color} />
		</Svg>
	);
};

export const ReferralTabBarIcon: React.FC<CustomTabBarIconProps> = (props) => {
	const { color } = props;
	return (
		<Svg width={25} height={24} viewBox="0 0 25 24" {...props}>
			<Path
				d="M11.775 15.8H13.25V10.95L15.225 12.975L16.3 11.9L12.475 8.1L8.675 11.9L9.75 12.975L11.775 10.95V15.8ZM4 20C3.6 20 3.25 19.85 2.95 19.55C2.65 19.25 2.5 18.9 2.5 18.5V5.5C2.5 5.1 2.65 4.75 2.95 4.45C3.25 4.15 3.6 4 4 4H21C21.4 4 21.75 4.15 22.05 4.45C22.35 4.75 22.5 5.1 22.5 5.5V18.5C22.5 18.9 22.35 19.25 22.05 19.55C21.75 19.85 21.4 20 21 20H4Z"
				fill={color}
			/>
		</Svg>
	);
};

export const PlusIcon: React.FC<CustomTabBarIconProps> = (props) => {
	const { color } = props;
	return (
		<Svg width={18} height={18} viewBox="0 0 18 18" {...props}>
			<Path
				d="M15 9.75H9.75V15H8.25V9.75H3V8.25H8.25V3H9.75V8.25H15V9.75Z"
				fill={color}
			/>
		</Svg>
	);
};

export const RecieveIcon: React.FC<CustomTabBarIconProps> = (props) => {
	const { color } = props;
	return (
		<Svg width={19} height={18} viewBox="0 0 19 18" {...props}>
			<Path
				d="M3.98755 14.5125V6.7125H5.48755V11.9625L14.6375 2.8125L15.6875 3.88125L6.5563 13.0125H11.7875V14.5125H3.98755Z"
				fill={color}
			/>
		</Svg>
	);
};

export const SendIcon: React.FC<CustomTabBarIconProps> = (props) => {
	const { color } = props;
	return (
		<Svg width={18} height={18} viewBox="0 0 18 18" {...props}>
			<Path
				d="M2.00623 15.2623V2.7373L16.8187 8.9998L2.00623 15.2623ZM3.37498 13.1436L13.275 8.9998L3.37498 4.7998V7.7248L8.02498 8.9998L3.37498 10.2373V13.1436ZM3.37498 13.1436V4.7998V10.2373V13.1436Z"
				fill={color}
			/>
		</Svg>
	);
};

export const WithdrawIcon: React.FC<CustomTabBarIconProps> = (props) => {
	const { color } = props;
	return (
		<Svg width={18} height={18} viewBox="0 0 18 18" {...props}>
			<Path
				d="M6.15 12.8625L6.9375 12.075L8.45625 13.6125V9H9.58125V13.6125L11.1 12.075L11.8875 12.8625L9.01875 15.7313L6.15 12.8625ZM0.75 4.875C0.75 4.5625 0.859375 4.29688 1.07812 4.07813C1.29688 3.85938 1.5625 3.75 1.875 3.75L16.125 3.75C16.4375 3.75 16.7031 3.85938 16.9219 4.07813C17.1406 4.29688 17.25 4.5625 17.25 4.875V13.125C17.25 13.4375 17.1406 13.7031 16.9219 13.9219C16.7031 14.1406 16.4375 14.25 16.125 14.25H13.3875V13.125H14.4375V4.875L3.5625 4.875V13.125H4.6125V14.25L1.875 14.25C1.5625 14.25 1.29688 14.1406 1.07812 13.9219C0.859375 13.7031 0.75 13.4375 0.75 13.125V4.875ZM2.4375 4.875H1.875V13.125H2.4375V4.875ZM15.5625 4.875V13.125H16.125V4.875H15.5625Z"
				fill={color}
			/>
		</Svg>
	);
};
