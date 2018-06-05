/* eslint max-len: ["error", { "code": 200 }] */

import React from 'react'
import { Link } from 'react-router-dom'

const LoginReroute = () => {
  // return (
  //   <div className="following-reroute-container fade-in-element">
  //     <p className="following-reroute-title">Login to see your list!</p>
  //     <div>
  //       <Link href="/auth/login" to="/auth/login">Login</Link>
  //       <p>|</p>
  //       <Link href="/auth/signup" to="/auth/signup">Signup</Link>
  //     </div>
  //   </div>
  // )
  return (
    <div className="following-reroute-container fade-in-element">
      <h1>Welcome to PingMe!</h1>
      <div className="landing-container">
        <h3>What is PingMe?</h3>
        <p>
          PingMe is an application that notifies you when your favorite anime or manga titles are updated!
        </p>
        <h3>Getting Started</h3>
        <ol>
          <li>
            <Link href="/auth/signup" to="/auth/signup">Sign up &nbsp;</Link>
            or
            <Link href="/auth/login" to="/auth/login">login &nbsp;</Link>
            using your email address.
          </li>
          <li>
            Search for your favorite titles using the searchbar on the top right.
          </li>
          <li>
            Subscribe or follow to add to your list!
          </li>
        </ol>
        <h3>FAQs</h3>
        <ul>
          <li>
            <ul>
              <li>
                <span>q:</span> What's the difference between subscribing and following?
              </li>
              <li>
                <span>a:</span> You will only receive notifications for titles you've subscribed to.
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li>
                <span>q:</span> Can I turn off notifications?
              </li>
              <li>
                <span>a:</span> Yes. You can turn off notifications in the account settings.
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li>
                <span>q:</span> Will I be able to get mobile notifications?
              </li>
              <li>
                <span>a:</span> Yes! We're working to get a mobile version up and running!
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default LoginReroute
