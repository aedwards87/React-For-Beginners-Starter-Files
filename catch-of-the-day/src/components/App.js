import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes"
import Fish from './Fish'
import firebaseDB from '../firebase'
import { useLocalStorage } from '../helpers'



const App = ({ match: { params: { storeId } }, match }) => {
  const [fishes, setFishes] = useState({})
  const [order, setOrder] = useLocalStorage(storeId, {})

  useEffect(() => {
    firebaseDB.ref(`${storeId}/fishes`).on('value', snapshot => {
      if (snapshot.val()) setFishes(snapshot.val())
    })
  }, [storeId]);

  useEffect(() => {
    firebaseDB.ref(`${storeId}/fishes`).update(fishes)
  }, [fishes, storeId])

  const deleteFish = (key) => {
    firebaseDB.ref(`${storeId}/fishes/${key}`).set(null)
  }

  const addFish = fish => {
    //1. Take a copy of the existing state
    const newFishes = { ...fishes }
    //2. Add our new fish to that fishes variable
    newFishes[`fish${Date.now()}`] = fish
    //3. Set the new fishes object to state
    // setFishes(newFishes)
    setFishes({ ...fishes, ...newFishes })
  }


  const updateFish = (key, updatedFish) => {
    //1. take a copy of the current state
    const newFishes = { ...fishes }
    //2. Update that state
    newFishes[key] = updatedFish
    //3. set that to state
    setFishes({ ...fishes, ...newFishes })
  }

  const loadSampleFishes = () => {
    setFishes(sampleFishes)
    // setMenuItems({ ...menuItems, ...sampleItems })
  }


  const addToOrder = key => {
    //1. take a copy of state
    //2. either add to the order, or update the number in our order: 
    //3. call setstate to update our state object
    setOrder(o => ({
      ...o,
      [key]: order[key] = order[key] + 1 || 1
    }))
  }

  const removeFromOrder = key => {
    //1. take a copy of state
    const newOrder = { ...order }
    //2. either remove a number from the order, or remove the order
    if (newOrder[key] >= 1) newOrder[key] = newOrder[key] - 1
    if (newOrder[key] === 0) delete newOrder[key]
    //3. update state
    setOrder({ ...newOrder })
  }

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" age={100} />
        <ul className="fishes">
          {Object.keys(fishes).map(key =>
            <Fish key={key} index={key} details={fishes[key]} addToOrder={addToOrder} />
          )}
        </ul>
      </div>
      <Order fishes={fishes} order={order} removeFromOrder={removeFromOrder} />
      <Inventory
        addFish={addFish}
        loadSampleFishes={loadSampleFishes}
        fishes={fishes}
        updateFish={updateFish}
        deleteFish={deleteFish}
        storeId={storeId}
        match={match}
      />
    </div>
  )
}

App.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      storeId: PropTypes.string,
    }),
  }),
}


export default App;
