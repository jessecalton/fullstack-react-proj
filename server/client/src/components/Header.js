import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  renderAThing() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href='/auth/google'>Login with Googs</a>
          </li>
        );
      default:
        // hard-coding the key values is fine since it won't be changing
        return [
          <li key='1'>
            <Payments />
          </li>,
          <li key='2'>
            <a href='/api/logout'>Logout</a>
          </li>,
        ];
    }
  }
  render() {
    return (
      <nav>
        <div className='nav-wrapper'>
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className='left brand-logo'
          >
            Emaily
          </Link>
          <ul className='right'>{this.renderAThing()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
