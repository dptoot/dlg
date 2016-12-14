import deepAssign from 'deep-assign';
import theme from '../../engine/theme';

export const standardDrawer = {
    bmBurgerButton: {
        display: 'none'
    },
    bmBurgerBars: {
        display: 'none',
    },
    bmCrossButton: {
        height: '24px',
        width: '24px',
        cursor: 'pointer',
    },
    bmCross: {
        background: theme.light,
    },
    bmMenuWrap: {
        zIndex: 1001,
    },
    bmMenu: {
        padding: 0,
        background: theme.grayDark,
        fontSize: '1em'
    },
    bmMorphShape: {
        fill: theme.grayDark,
    },
    bmItemList: {
        padding: 0,
        color: theme.light,
    },
    bmOverlay: {
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.7)'
    }
};

export const matchesDrawer = deepAssign(standardDrawer, {
    bmMenu: {
        width: '100%',
    }
});

export const userDrawer = deepAssign(standardDrawer, {
    
});

export const matchChatDrawer = deepAssign(standardDrawer, {
   bmMenu: {
        width: '100%',
    }
});

