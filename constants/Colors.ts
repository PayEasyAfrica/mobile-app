const orangeColorLight = '#EF672A';
const orangeColorDark = '#EF672A';

const inactiveTintColorLight = '#FFB599';
const inactiveTintColorDark = '#805B4D';

const grayLight = '#7F7572';
const grayDark = '#808A8D';

const TextIputLight = '#808A8D';
const TextIputDark = '#FFFFFF';

const Colors: { light: ColorScheme; dark: ColorScheme } = {
	light: {
		text: '#000',
		textInput: TextIputLight,
		disabledInput: '#f6f6f6',
		background: '#FFFBFF',
		border: 'rgba(167, 58, 0, 0.05)',
		lightBackground: '#fff',
		green: '#04D400',
		orange: orangeColorLight,
		mask: 'rgba(33, 0, 93, 0.16);',
		gray: grayLight,
		tabIconDefault: '#ccc',
		tabIconActive: orangeColorLight,
		tabIconInactive: inactiveTintColorLight,
		iconBackground: '#FFEDE7'
	},
	dark: {
		text: '#fff',
		textInput: TextIputDark,
		disabledInput: '#232323',
		background: '#0F0F0F',
		border: 'rgba(255, 197, 168, 0.1)',
		darkBackground: '#131313',
		green: '#04D400',
		orange: orangeColorDark,
		mask: 'rgba(195, 162, 255, 0.16);',
		gray: grayDark,
		tabIconDefault: '#ccc',
		tabIconActive: orangeColorDark,
		tabIconInactive: inactiveTintColorDark,
		iconBackground: 'rgba(208, 188, 255, 0.08)'
	}
};

interface ColorScheme {
	[key: string]: string;
}

export default Colors;
