
import renderable from '../hoc/renderable';

function DrawerEnhancer(WrappedComponent) {
  class Enhancer extends WrappedComponent {

  	constructor() {
  		super();

  		const childState = this.state || {};

  		this.state = Object.assign(childState, {
  			windowWidth: 0,
  		})

  	}

  	componentDidMount() {
  		if (window) {
  			this.setState({
	  			windowWidth: window.innerWidth
	  		});
  		}
  	}

  	getWidth(isFullScreen) {
  		const calculatedWidth = this.state.windowWidth * .30;
  		return this.props.browser.is.extraSmall || isFullScreen ? this.state.windowWidth : calculatedWidth;
  	}

  	getDrawerOptions({width, fullScreen = true, ...rest}) {
  		
  		const options = {
  			  customBurgerIcon: false,
  		    customCrossIcon: false,
  		    pageWrapId: 'page-wrap',
  		    outerContainerId: 'outer-container',
  		    width: this.getWidth(fullScreen),
  			...rest
  		};

  		return options;
  	}

    render() {
      return super.render()
    }

  }

  return renderable(Enhancer);
}

export default DrawerEnhancer;