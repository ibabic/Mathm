import { connect } from 'react-redux';
import AddMessageComponent from '../../../components/Chat/AddMessage/AddMessage';
import * as actions from '../../../store/actions/index';

const mapDispatchToProps = dispatch => ({
  dispatch: (message, author) => {
    dispatch(actions.addMessage(message, author))
  }
})

export const AddMessage = connect(() => ({}), mapDispatchToProps)(AddMessageComponent)
