const orangeColorLight = '#EF672A';
const orangeColorDark = '#EF672A';

const inactiveTintColorLight = '#FFB599';
const inactiveTintColorDark = '#805B4D';

const grayLight = '#7F7572';
const grayDark = '#808A8D';

const Colors: { light: ColorScheme; dark: ColorScheme } = {
	light: {
		text: '#000',
		background: '#FFFBFF',
		lightBackground: '#fff',
		orange: orangeColorLight,
		gray: grayLight,
		tabIconDefault: '#ccc',
		tabIconActive: orangeColorLight,
		tabIconInactive: inactiveTintColorLight,
		iconBackground: '#FFEDE7'
	},
	dark: {
		text: '#fff',
		background: '#0F0F0F',
		darkBackground: '#131313',
		orange: orangeColorDark,
		gray: grayDark,
		tabIconDefault: '#ccc',
		tabIconActive: orangeColorDark,
		tabIconInactive: inactiveTintColorDark,
		iconBackground: '#191919'
	}
};

interface ColorScheme {
	[key: string]: string;
}

export default Colors;
