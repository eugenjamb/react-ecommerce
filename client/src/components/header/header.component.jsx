import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'

import { signOutStart } from '../../redux/user/user.actions'

import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-drowpdown.component'

import './header.styles.scss'
import { ReactComponent as Logo } from '../../images/crown.svg'

const Header = ({ currentUser, hidden, signOutStart }) => (
    <div className='header'>
      <Link className='logo-container' to='/'>
        <Logo className='logo' />
      </Link>
      <div className='options'>
        <Link className='option' to='/shop'>
          SHOP
        </Link>
        <Link className='option' to='/shop'>
          CONTACT
        </Link>
        {currentUser ? (
          <div className='option' onClick={signOutStart}>
            SIGN OUT
          </div>
        ) : (
          <Link className='option' to='/sign'>
            SIGN IN
          </Link>
        )}
        <CartIcon />
      </div>
      {
        hidden ? null : (<CartDropdown />)
      }
    </div>
  );
  

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)