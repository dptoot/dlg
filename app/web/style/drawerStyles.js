import theme from '../../engine/theme';

export const matchesDrawer = {
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
        background: theme.grayDark,
        padding: theme.paddingLarge,
        fontSize: '1em'
      },
      bmMorphShape: {
        fill: theme.grayDark,
      },
      bmItemList: {
        color: theme.light,
        padding: '1em'
      },
      bmOverlay: {
        zIndex: 1000,
        background: 'rgba(0, 0, 0, 0.7)'
      }
}