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
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <p>Email:</p>
      <input
        type="text"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <p>Display Name:</p>
      <input
        type="text"
        name="displayName"
        value={values.displayName}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <p>Password:</p>
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {
        errors.email && touched.email && (
          <p>
            ERROR
          </p>
        )
      }

      <button
        type="submit"
        disabled={isSubmitting}
      >
        Sign Up
      </button>
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
}

const FormikSignupForm = withFormik({
  mapPropsToValues: () => ({
    email: '',
    displayName: '',
    password: '',
  }),

  // Custom sync validation
  validate: (values) => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Required'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid Email address'
    }
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
