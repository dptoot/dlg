var LightenColor = function(color, percent) {
  	var num = parseInt(color.replace('#', ''),16),
		amt = Math.round(2.55 * percent),
		R = (num >> 16) + amt,
		B = (num >> 8 & 0x00FF) + amt,
		G = (num & 0x0000FF) + amt;

		return '#' + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
};

const grayBase = '#221e1f';

const theme = {
	colors: {
		dark: grayBase,
		light: '#fff',
		
		grayDarker: LightenColor(grayBase, 7),
		grayDark: LightenColor(grayBase, 14),
		gray: LightenColor(grayBase, 35),
		grayLight: LightenColor(grayBase, 42),
		grayLighter: LightenColor(grayBase, 56),
		grayLightest: LightenColor(grayBase, 70),
		primary: '#EF1748',
		underlay: 'rgba(239, 23, 72, .5)',
		link: '#0879A2',
	}, 

	border: {
		radius: 5,
	},

	margin: {
		collapsed: 0, 
		sm: 10,
		md: 20, 
		lg: 30,
	},

	padding: {
		collapsed: 0,
		sm: 10,
		md: 20, 
		lg: 30, 
	},

	text: {
		xs: 10,
	    sm: 12,
	    md: 14,
	    lg: 16,
	    xlg: 20,
	},

	shadow: {
		shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 1,
        }
	}
	
}

export default theme