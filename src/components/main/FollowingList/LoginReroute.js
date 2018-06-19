/* eslint max-len: ["error", { "code": 200 }] */

import React from 'react'
import { Link } from 'react-router-dom'

const LoginReroute = () => {
  return (
    <div className="following-reroute-container fade-in-element">
      <h1 className="following-reroute-title">Welcome to PingMe!</h1>
      <div className="landing-container">
        <h2>What is PingMe?</h2>
        <p>
          PingMe is an application that notifies you when your favorite anime or manga titles are updated!
        </p>
        <hr />
        <h2>Getting Started</h2>
        <ul>
          <li>
            1)&nbsp;
            <Link href="/auth/signup" to="/auth/signup">Sign up</Link>
            &nbsp;or&nbsp;
            <Link href="/auth/login" to="/auth/login">login</Link>
            &nbsp;using your email address.
          </li>
          <li>
            2) Search for your favorite titles using the searchbar on the top right.
          </li>
          <li>
            3) Subscribe or follow to add to your list!
          </li>
        </ul>
        <hr />
        <h2>FAQs</h2>
        <ul>
          <li>
            <ul>
              <li>
                <span>Q:</span> What's the difference between subscribing and following?
              </li>
              <li>
                <span>A:</span> You will only receive notifications for titles you've subscribed to.
              </li>
            </ul>
          </li>
          <hr />
          <li>
            <ul>
              <li>
                <span>Q:</span> Can I turn off notifications?
              </li>
              <li>
                <span>A:</span> Yes. You can turn off notifications in the account settings. There is also a link provided in the emails to disable notifications.
              </li>
            </ul>
          </li>
          <hr />
          <li>
            <ul>
              <li>
                <span>Q:</span> Will I be able to get mobile notifications?
              </li>
              <li>
                <span>A:</span> Yes! We're working to get a mobile version up and running!
                <br />
                <br />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default LoginReroute
