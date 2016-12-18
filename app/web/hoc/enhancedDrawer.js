
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

  	getWidth(width) {

  		const calculatedWidth = this.state.windowWidth * (parseInt(width)/100);
  		return this.props.browser.is.extraSmall ? this.state.windowWidth : calculatedWidth;
  	}

  	getDrawerOptions({width, ...rest}) {
  		
  		const options = {
			customBurgerIcon: false,
		    customCrossIcon: false,
		    pageWrapId: 'page-wrap',
		    outerContainerId: 'outer-container',
		    width: this.getWidth(width),
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