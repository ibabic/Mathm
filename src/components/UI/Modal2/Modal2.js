import React from 'react';
import {  Modal, ModalBody, Form } from 'reactstrap';
import { withRouter  } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';


class Modal2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      backdrop: true
    };

    this.toggle = this.toggle.bind(this);
  }

  
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    this.props.modalOff(!this.state.modal);
  }
  goBack = (props) => {
    this.props.history.goBack();
  }

  render() {

    let modal = ( <Modal isOpen={this.state.modal}  toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
      <ModalBody>
            {this.props.children}
      </ModalBody>
    </Modal>);
    if(!this.state.modal){
      modal = this.goBack();
    }

    return (
      <div>
        <Form inline onSubmit={(e) => e.preventDefault()}>
         
         </Form>
         {modal}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      modalOff: (modal) => dispatch(actions.modalOff(modal))
  }
};

export default withRouter(connect(null, mapDispatchToProps)(Modal2));