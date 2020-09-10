import React, { useState } from "react";
import { getFunName } from '../helpers'
import PropTypes from "prop-types";
import firebase from "firebase/app"
import 'firebase/auth'

const StorePicker = ({ history }) => {
  const [store, setStore] = useState(getFunName())
  const handleChange = (e) => setStore(e.currentTarget.value)
  const goToStore = (e) => {
    e.preventDefault()
    history.push(`/store/${store}`)
  }

  firebase.auth().signOut()

  return (
    <form className="store-selector" onSubmit={goToStore}>
      <h2>Please Enter A Store</h2>
      <input
        type="text"
        required
        placeholder="Store Name"
        onChange={handleChange}
        value={store}
      />
      <button type="submit">Visit Store →</button>
    </form>
  )
}

StorePicker.propTypes = {
  history: PropTypes.object,
}

export default StorePicker;
