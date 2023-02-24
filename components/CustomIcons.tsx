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

export const EyeIcon: React.FC<CustomTabBarIconProps> = (props) => {
	const { color } = props;
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
			<Path
				d="M12 15.7498C13.1833 15.7498 14.1875 15.3373 15.0125 14.5123C15.8375 13.6873 16.25 12.6831 16.25 11.4998C16.25 10.3165 15.8375 9.3123 15.0125 8.4873C14.1875 7.6623 13.1833 7.2498 12 7.2498C10.8167 7.2498 9.81249 7.6623 8.98749 8.4873C8.16249 9.3123 7.74999 10.3165 7.74999 11.4998C7.74999 12.6831 8.16249 13.6873 8.98749 14.5123C9.81249 15.3373 10.8167 15.7498 12 15.7498ZM12 14.0748C11.2833 14.0748 10.675 13.8248 10.175 13.3248C9.67499 12.8248 9.42499 12.2165 9.42499 11.4998C9.42499 10.7831 9.67499 10.1748 10.175 9.6748C10.675 9.1748 11.2833 8.9248 12 8.9248C12.7167 8.9248 13.325 9.1748 13.825 9.6748C14.325 10.1748 14.575 10.7831 14.575 11.4998C14.575 12.2165 14.325 12.8248 13.825 13.3248C13.325 13.8248 12.7167 14.0748 12 14.0748ZM12 19.3248C9.48332 19.3248 7.21665 18.5998 5.19999 17.1498C3.18332 15.6998 1.67499 13.8165 0.674988 11.4998C1.67499 9.18314 3.18332 7.2998 5.19999 5.8498C7.21665 4.3998 9.48332 3.6748 12 3.6748C14.5167 3.6748 16.7833 4.3998 18.8 5.8498C20.8167 7.2998 22.325 9.18314 23.325 11.4998C22.325 13.8165 20.8167 15.6998 18.8 17.1498C16.7833 18.5998 14.5167 19.3248 12 19.3248ZM12 17.4998C14.0167 17.4998 15.8667 16.954 17.55 15.8623C19.2333 14.7706 20.5167 13.3165 21.4 11.4998C20.5167 9.68314 19.2333 8.22897 17.55 7.1373C15.8667 6.04564 14.0167 5.4998 12 5.4998C9.98332 5.4998 8.13332 6.04564 6.44999 7.1373C4.76665 8.22897 3.47499 9.68314 2.57499 11.4998C3.47499 13.3165 4.76665 14.7706 6.44999 15.8623C8.13332 16.954 9.98332 17.4998 12 17.4998Z"
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
		<Svg width={18} height={18} fill={color}>
			<Path
				d="m3.787 15.254-1.041-1.041 9.157-9.158H6.645V3.57h7.785v7.785h-1.485V6.097l-9.158 9.157Z"
				fill="#EF672A"
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

export const SearchIcon: React.FC<CustomTabBarIconProps> = (props) => {
	const { color } = props;
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M14.76 13.27L20.49 19L19 20.49L13.27 14.76C12.2 15.53 10.91 16 9.5 16C5.91 16 3 13.09 3 9.5C3 5.91 5.91 3 9.5 3C13.09 3 16 5.91 16 9.5C16 10.91 15.53 12.2 14.76 13.27ZM9.5 5C7.01 5 5 7.01 5 9.5C5 11.99 7.01 14 9.5 14C11.99 14 14 11.99 14 9.5C14 7.01 11.99 5 9.5 5Z"
				fill={color}
			/>
		</Svg>
	);
};

export const MoreSearchIcon: React.FC<CustomTabBarIconProps> = (props) => {
	const { color } = props;
	return (
		<Svg width={19} height={18} viewBox="0 0 19 18" {...props}>
			<Path
				d="M11.57 9.9525L15.8675 14.25L14.75 15.3675L10.4525 11.07C9.65 11.6475 8.6825 12 7.625 12C4.9325 12 2.75 9.8175 2.75 7.125C2.75 4.4325 4.9325 2.25 7.625 2.25C10.3175 2.25 12.5 4.4325 12.5 7.125C12.5 8.1825 12.1475 9.15 11.57 9.9525ZM7.625 3.75C5.7575 3.75 4.25 5.2575 4.25 7.125C4.25 8.9925 5.7575 10.5 7.625 10.5C9.4925 10.5 11 8.9925 11 7.125C11 5.2575 9.4925 3.75 7.625 3.75Z"
				fill={color}
			/>
		</Svg>
	);
};

export const CalenderIcon: React.FC<CustomTabBarIconProps> = (props) => {
	const { color } = props;
	return (
		<Svg width={30} height={30} viewBox="0 0 30 30" {...props}>
			<Path
				d="M5.78397 27.9414C5.10674 27.9414 4.52485 27.6981 4.03829 27.2115C3.5517 26.7249 3.30841 26.143 3.30841 25.4658V6.40875C3.30841 5.72666 3.5517 5.1406 4.03829 4.65056C4.52485 4.16054 5.10674 3.91553 5.78397 3.91553H7.65625V2.04053H9.98779V3.91553H20.0122V2.04053H22.3438V3.91553H24.216C24.8981 3.91553 25.4842 4.16054 25.9742 4.65056C26.4642 5.1406 26.7093 5.72666 26.7093 6.40875V25.4658C26.7093 26.143 26.4642 26.7249 25.9742 27.2115C25.4842 27.6981 24.8981 27.9414 24.216 27.9414H5.78397ZM5.78397 25.4658H24.216V12.1873H5.78397V25.4658ZM5.78397 10.3123H24.216V6.40875H5.78397V10.3123ZM15.0019 17.6057C14.6182 17.6057 14.296 17.476 14.0352 17.2165C13.7744 16.9569 13.644 16.6353 13.644 16.2517C13.644 15.868 13.7738 15.5457 14.0333 15.285C14.2929 15.0242 14.6145 14.8938 14.9981 14.8938C15.3818 14.8938 15.704 15.0236 15.9648 15.2831C16.2256 15.5426 16.356 15.8642 16.356 16.2479C16.356 16.6316 16.2262 16.9538 15.9667 17.2146C15.7072 17.4754 15.3855 17.6057 15.0019 17.6057ZM10.0019 17.6057C9.61819 17.6057 9.29596 17.476 9.03519 17.2165C8.77442 16.9569 8.64404 16.6353 8.64404 16.2517C8.64404 15.868 8.7738 15.5457 9.03332 15.285C9.29286 15.0242 9.61446 14.8938 9.99813 14.8938C10.3818 14.8938 10.704 15.0236 10.9648 15.2831C11.2256 15.5426 11.356 15.8642 11.356 16.2479C11.356 16.6316 11.2262 16.9538 10.9667 17.2146C10.7071 17.4754 10.3855 17.6057 10.0019 17.6057ZM20.0019 17.6057C19.6347 17.6057 19.3166 17.476 19.0476 17.2165C18.7785 16.9569 18.644 16.6353 18.644 16.2517C18.644 15.868 18.7779 15.5457 19.0457 15.285C19.3135 15.0242 19.6339 14.8938 20.007 14.8938C20.38 14.8938 20.6981 15.0236 20.9613 15.2831C21.2244 15.5426 21.356 15.8642 21.356 16.2479C21.356 16.6316 21.2262 16.9538 20.9667 17.2146C20.7071 17.4754 20.3855 17.6057 20.0019 17.6057ZM15.0019 22.6057C14.6182 22.6057 14.296 22.4719 14.0352 22.2041C13.7744 21.9363 13.644 21.6159 13.644 21.2428C13.644 20.8697 13.7738 20.5516 14.0333 20.2885C14.2929 20.0254 14.6145 19.8938 14.9981 19.8938C15.3818 19.8938 15.704 20.0236 15.9648 20.2831C16.2256 20.5426 16.356 20.8642 16.356 21.2479C16.356 21.6151 16.2262 21.9332 15.9667 22.2022C15.7072 22.4712 15.3855 22.6057 15.0019 22.6057ZM10.0019 22.6057C9.61819 22.6057 9.29596 22.4719 9.03519 22.2041C8.77442 21.9363 8.64404 21.6159 8.64404 21.2428C8.64404 20.8697 8.7738 20.5516 9.03332 20.2885C9.29286 20.0254 9.61446 19.8938 9.99813 19.8938C10.3818 19.8938 10.704 20.0236 10.9648 20.2831C11.2256 20.5426 11.356 20.8642 11.356 21.2479C11.356 21.6151 11.2262 21.9332 10.9667 22.2022C10.7071 22.4712 10.3855 22.6057 10.0019 22.6057ZM20.0019 22.6057C19.6347 22.6057 19.3166 22.4719 19.0476 22.2041C18.7785 21.9363 18.644 21.6159 18.644 21.2428C18.644 20.8697 18.7779 20.5516 19.0457 20.2885C19.3135 20.0254 19.6339 19.8938 20.007 19.8938C20.38 19.8938 20.6981 20.0236 20.9613 20.2831C21.2244 20.5426 21.356 20.8642 21.356 21.2479C21.356 21.6151 21.2262 21.9332 20.9667 22.2022C20.7071 22.4712 20.3855 22.6057 20.0019 22.6057Z"
				fill={color}
			/>
		</Svg>
	);
};

export const FingerprintIcon: React.FC<CustomTabBarIconProps> = (props) => {
	const { color } = props;
	return (
		<Svg width={40} height={40} {...props}>
			<Path
				d="M5.22 15.902a.45.45 0 0 1-.273-.377.821.821 0 0 1 .071-.483 17.379 17.379 0 0 1 6.542-5.683c2.654-1.337 5.497-2.006 8.529-2.006 2.984 0 5.799.643 8.444 1.929a17.322 17.322 0 0 1 6.568 5.535c.13.202.181.38.152.534a.707.707 0 0 1-.24.403.636.636 0 0 1-.466.16c-.18-.008-.333-.113-.46-.314a15.87 15.87 0 0 0-6.106-5.144 18.139 18.139 0 0 0-7.892-1.822c-2.799 0-5.42.602-7.865 1.807-2.445 1.205-4.462 2.932-6.05 5.182-.158.202-.321.32-.49.356a.616.616 0 0 1-.465-.077Zm20.039 21.053c-3.08-.691-5.545-2.141-7.392-4.35-1.847-2.21-2.771-4.866-2.771-7.97 0-1.368.487-2.527 1.461-3.48.974-.95 2.151-1.427 3.532-1.427 1.38 0 2.561.464 3.543 1.392.982.929 1.473 2.069 1.473 3.422 0 1.008.37 1.858 1.111 2.549a3.743 3.743 0 0 0 2.643 1.036c.992 0 1.85-.346 2.57-1.036.721-.691 1.082-1.54 1.082-2.55 0-3.322-1.22-6.108-3.66-8.359-2.44-2.25-5.368-3.376-8.786-3.376-3.418 0-6.339 1.141-8.763 3.423-2.423 2.282-3.635 5.092-3.635 8.43 0 .871.076 1.822.229 2.852.153 1.03.44 2.108.861 3.234.071.217.075.388.012.512a.663.663 0 0 1-.314.294.844.844 0 0 1-.531.041c-.18-.043-.314-.181-.4-.415a21.63 21.63 0 0 1-.784-3.04 19 19 0 0 1-.312-3.501c0-3.615 1.349-6.724 4.048-9.329 2.698-2.604 5.903-3.907 9.613-3.907 3.777 0 7.009 1.27 9.694 3.81 2.684 2.538 4.027 5.65 4.027 9.332 0 1.34-.48 2.486-1.44 3.438s-2.13 1.428-3.511 1.428c-1.409 0-2.607-.465-3.595-1.393-.988-.928-1.482-2.054-1.482-3.38 0-1.02-.36-1.883-1.081-2.59-.721-.706-1.592-1.06-2.612-1.06-1.005 0-1.875.354-2.61 1.06-.735.707-1.102 1.57-1.102 2.59 0 2.858.835 5.256 2.507 7.195 1.671 1.938 3.907 3.257 6.706 3.956.214.04.354.13.419.267a.724.724 0 0 1 .056.445c-.043.186-.126.323-.249.41-.122.087-.308.102-.557.047Zm-14.92-30.07c-.218.102-.392.128-.525.079a.678.678 0 0 1-.329-.27c-.07-.087-.099-.23-.083-.427.016-.197.097-.332.243-.403a19.718 19.718 0 0 1 5.073-2.017 22.507 22.507 0 0 1 5.37-.655c1.822 0 3.608.218 5.36.655a22.57 22.57 0 0 1 5.027 1.91c.201.087.317.218.346.392a.687.687 0 0 1-.062.456.944.944 0 0 1-.359.314c-.152.08-.32.068-.507-.035a24.022 24.022 0 0 0-4.756-1.759 20.366 20.366 0 0 0-5.048-.634c-1.723 0-3.403.197-5.042.592a19.638 19.638 0 0 0-4.708 1.801Zm5.395 29.47c-1.611-1.65-2.84-3.42-3.689-5.309-.848-1.888-1.271-4.025-1.271-6.41 0-2.52.905-4.658 2.717-6.415 1.812-1.757 4.01-2.636 6.598-2.636 2.571 0 4.78.867 6.628 2.6 1.847 1.734 2.77 3.853 2.77 6.357 0 .217-.05.392-.151.524-.1.132-.26.199-.477.199-.233 0-.407-.067-.522-.199-.115-.132-.172-.307-.172-.524 0-2.172-.793-3.998-2.38-5.479-1.586-1.48-3.485-2.22-5.696-2.22-2.212 0-4.1.755-5.667 2.267-1.566 1.513-2.35 3.354-2.35 5.526 0 2.283.375 4.253 1.124 5.912.748 1.659 1.92 3.314 3.516 4.965.158.158.234.313.228.465a.634.634 0 0 1-.157.4c-.103.135-.264.21-.483.229-.22.018-.408-.066-.566-.252Zm13.126-2.924c-2.585 0-4.802-.797-6.648-2.39-1.847-1.594-2.77-3.752-2.77-6.476 0-.202.054-.368.163-.498.109-.13.264-.196.466-.196.201 0 .356.066.465.196.109.13.163.296.163.498 0 2.36.81 4.218 2.432 5.575 1.622 1.356 3.531 2.034 5.73 2.034.253 0 .548-.022.885-.065.337-.044.67-.078 1-.102a.609.609 0 0 1 .463.145c.123.109.182.228.179.359a.65.65 0 0 1-.092.421.588.588 0 0 1-.341.226 5.04 5.04 0 0 1-1.242.24c-.39.022-.675.033-.853.033Z"
				fill={color}
			/>
		</Svg>
	);
};

export const CancelPinIcon: React.FC<CustomTabBarIconProps> = (props) => {
	const { color } = props;
	return (
		<Svg width="30" height="30" viewBox="0 0 30 30" {...props}>
			<Path
				d="M23.75 8.0125L21.9875 6.25L15 13.2375L8.0125 6.25L6.25 8.0125L13.2375 15L6.25 21.9875L8.0125 23.75L15 16.7625L21.9875 23.75L23.75 21.9875L16.7625 15L23.75 8.0125Z"
				fill={color}
			/>
		</Svg>
	);
};
