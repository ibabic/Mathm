import React from 'react';
import PropTypes from 'prop-types';
import classes from './AddMessage.css';

const AddMessage = (props) => {
  let input

  return (
    <section className={classes.new}>
      <input className={classes.message__input}
        placeholder="type here..."
        onKeyPress={(e) => {
        if (e.key === 'Enter') {
          props.dispatch(input.value, 'Me')
          input.value = ''
        }
      }}
        type="text"
        ref={(node) => {
        input = node
      }}
      />
    </section>
  )
}

AddMessage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default AddMessage;
