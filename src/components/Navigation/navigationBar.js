import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

  class Example extends Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
    toggle() {
      this.props.onToggle();
    }
    render() {
      var arr = [];
      for (var key in this.props.user) {
           arr.push(this.props.user[key]);
      }
          let usrName = null;
      if ( arr ) {
        usrName = arr[3]}
         // console.log(' inside navigationBar ', usrName);
      return (
        <div>
          <Navbar  color="dark"  dark expand="md">
            <NavbarBrand href="/">Mathmind </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.props.open} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink  href="/rules">Rules</NavLink>
                </NavItem>
                <br />
                <NavItem>
                  <NavLink href="/friendsroom">Friends room</NavLink>
                </NavItem>
                <br />
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                  {this.props.isAuth ? usrName : "Authentication"}
                  </DropdownToggle>
                  <DropdownMenu right>
                    {this.props.isAuth ? <DropdownItem tag={Link} to="/usersettings"> User Settings </DropdownItem>
                    :<DropdownItem tag={Link} to="/register"> Registration </DropdownItem>}
                    <DropdownItem divider />
                    {this.props.isAuth ? <DropdownItem tag={Link} to="/logout" > LogOut </DropdownItem> : <DropdownItem tag={Link} to="/login"> Login  </DropdownItem>}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }


  const mapStateToProps = state => {
    return {
        user: state.game.user,
        open: state.game.isOpen
    };
}

const mapDispatchToProps = dispatch => {
  return {
    onToggle: () => dispatch(actions.toggle())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Example);