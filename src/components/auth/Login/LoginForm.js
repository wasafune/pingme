import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withFormik } from 'formik'

const LoginForm = ({
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
              (Invalid email address!)
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
      <p>Password:</p>
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
        >
          Login
        </button>
        {requestMessage && (<p className="error-msg">{requestMessage}</p>)}
      </div>
      <Link href="/auth/signup" to="/auth/signup">New User?</Link>
    </form>
  )
}

LoginForm.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleBlur: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  requestMessage: PropTypes.bool.isRequired,
}

const FormikLoginForm = withFormik({
  mapPropsToValues: () => ({
    email: '',
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
})(LoginForm)

export default FormikLoginForm
