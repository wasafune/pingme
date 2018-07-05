import React from 'react'
import PropTypes from 'prop-types'
import { withFormik } from 'formik'

const UpdateUserForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleSubmit,
  handleBlur,
  isSubmitting,
  requestMessage,
  email,
  displayName,
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
        placeholder={email}
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
        placeholder={displayName}
        value={values.displayName}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <p>
        New Password:
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
        Re-enter New Password:
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
          Save Changes
        </button>
        {requestMessage &&
          (
            <p className={requestMessage.slice(-1)[0] === '!' ? 'success-msg' : 'error-msg'}>
              {requestMessage}
            </p>
          )
        }
      </div>
    </form>
  )
}

UpdateUserForm.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleBlur: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  requestMessage: PropTypes.bool.isRequired,
  email: PropTypes.string,
  displayName: PropTypes.string,
}

UpdateUserForm.defaultProps = {
  email: '',
  displayName: '',
}

const FormikSignupForm = withFormik({
  mapPropsToValues: (props) => ({
    email: '',
    displayName: '',
    password: '',
    rePassword: '',
  }),
  validate: (values, props) => {
    const errors = {}
    // email validation logic
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) && values.email.length) {
      errors.email = 'Invalid email address!'
    } else if (values.email.toLowerCase() === props.email) {
      errors.email = 'Cannot input same email!'
    }
    // other values
    if (values.displayName.length > 24) errors.displayName = 'Display name too long!'
    else if (values.displayName === props.displayName) errors.displayName = 'Same display name.'
    if (values.password !== values.rePassword && values.rePassword.length >= values.password.length) errors.password = 'Passwords do not match.'
    return errors
  },

  handleSubmit: (values, { setSubmitting, resetForm, props }) => {
    setTimeout(() => {
      props.handleUpdateForm(values)
      setSubmitting(false)
      resetForm()
    }, 1000)
  },
  displayName: 'BasicForm',
})(UpdateUserForm)

export default FormikSignupForm
