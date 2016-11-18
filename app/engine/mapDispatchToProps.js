import {bindActionCreators} from 'redux';
import {ActionCreators} from './actions';

export default function mapDispatchToProps(dispatch) {
	return bindActionCreators(ActionCreators, dispatch);
}