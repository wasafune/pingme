import React from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'

// Apis
import { createUser } from '../../../apis/auth'

const SignupForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleSubmit,
  handleBlur,
  isSubmitting,
}) => {
  // console.log('errors is', errors)
  // console.log('touched is', touched)
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <input
        type="text"
        name="userName"
        placeholder="Username"
        value={values.userName}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
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
    userName: '',
    password: '',
    age: 18,
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

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      createUser(values)
      setSubmitting(false)
    }, 1000)
  },
  displayName: 'BasicForm',
})(SignupForm)

export default FormikSignupForm
