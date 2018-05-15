import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withFormik } from 'formik'

const SignupForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleSubmit,
  handleBlur,
  isSubmitting,
  requestMessage,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <p>
        Email:
        {
          errors.email && touched.email && (
            <span className="error-msg">
              ({errors.email})
            </span>
          )
        }
      </p>
      <input
        type="text"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <p>
        Display Name:
        {
          errors.displayName && touched.displayName && (
            <span className="error-msg">
              ({errors.displayName})
            </span>
          )
        }
      </p>
      <input
        type="text"
        name="displayName"
        value={values.displayName}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <p>
        Password:
        {
          errors.password && touched.rePassword && touched.password && (
            <span className="error-msg">
              ({errors.password})
            </span>
          )
        }
      </p>
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <p>
        Re-enter Password:
        {
          errors.rePassword && touched.rePassword && touched.password && (
            <span className="error-msg">
              ({errors.rePassword})
            </span>
          )
        }
      </p>
      <input
        type="password"
        name="rePassword"
        value={values.rePassword}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
        >
          Sign Up
        </button>
        {requestMessage && (<p className="error-msg">{requestMessage}</p>)}
      </div>
      <Link href="/auth/login" to="/auth/login">Already a user?</Link>
    </form>
  )
}

SignupForm.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleBlur: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  requestMessage: PropTypes.bool.isRequired,
}

const FormikSignupForm = withFormik({
  mapPropsToValues: () => ({
    email: '',
    displayName: '',
    password: '',
    rePassword: '',
  }),

  // Custom sync validation
  validate: (values) => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Required'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address!'
    }
    if (!values.displayName) errors.displayName = 'Required'
    if (values.password !== values.rePassword) errors.password = 'Passwords mismatch'
    if (!values.password) errors.password = 'Required'
    if (!values.rePassword) errors.rePassword = 'Required'
    return errors
  },

  handleSubmit: (values, { setSubmitting, props }) => {
    setTimeout(() => {
      props.handleActions(values)
      setSubmitting(false)
    }, 1000)
  },
  displayName: 'BasicForm',
})(SignupForm)

export default FormikSignupForm
