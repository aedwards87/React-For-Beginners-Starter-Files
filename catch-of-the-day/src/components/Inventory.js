import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import firebase from "firebase/app"
import 'firebase/auth'
import firebaseDB, { firebaseApp } from '../firebase'
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";

const Logout = ({ logout }) => <button onClick={logout}>Logout</button>

const Inventory = ({ storeId, addFish, loadSampleFishes, fishes, updateFish, deleteFish }) => {
  const [UID, setUID] = useState('')
  const [owner, setOwner] = useState('')
  const fishesArray = Object.keys(fishes)

  // Checks to see if the user is already logged in, if so, display inventory
  // TODO: Display a loading screen whilst trying to figure out if logged in
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) authHandler({ user })
    })
  }, [])

  const authHandler = async (authData) => {
    //1. look up the current store in the firebase database
    let hub = ''
    await firebaseDB.ref(`${storeId}/owner`).on('value', snapshot => {
      hub = snapshot.val()
    })
    //2. claim it if there is no owner
    if (!hub) {
      // save it as our own
      await firebaseDB.ref(`${storeId}/owner`).set({ data: authData.user.uid })
    }
    //3. set the state of the inventory component to reflect the current user
    setUID(authData.user.uid) // key that comes back from login
    setOwner(hub.data)
  }

  const authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]()
    firebaseApp.auth().signInWithPopup(authProvider).then(authHandler)
  }

  const logout = async () => {
    await firebase.auth().signOut()
    setUID(null)
  }


  //1. Check if logged in
  if (!UID) return (<Login authenticate={authenticate} />)

  //2. Check if they are not the owner of the store
  if (UID !== owner) return (
    <div>
      <p>Sorry you are not the owner</p>
      <Logout logout={logout} />
    </div>
  )

  //3. Render inventory, they must be owner
  return (
    <div className="inventory">
      <h2>Inventory</h2>
      <Logout logout={logout} />
      {fishesArray.map(key =>
        <EditFishForm
          key={key}
          index={key}
          fish={fishes[key]}
          updateFish={updateFish}
          deleteFish={deleteFish}
        />
      )}
      <AddFishForm addFish={addFish} />
      <button onClick={loadSampleFishes}>Load sample fishes</button>
    </div>
  )
}

Inventory.propTypes = {
  addFish: PropTypes.func,
  updateFish: PropTypes.func,
  deleteFish: PropTypes.func,
  loadSampleFishes: PropTypes.func,
  fishes: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    desc: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number,
  }),
}

export default Inventory;
