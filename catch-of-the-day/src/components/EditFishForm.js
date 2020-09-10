import React from 'react'
import PropTypes from "prop-types";

const EditFishForm = ({ index, fish, updateFish, deleteFish }) => {
  const handleChange = (e) => {
    const updatedFish = {
      ...fish,
      [e.currentTarget.name]: e.currentTarget.value
    }
    updateFish(index, updatedFish)
  }
  return (
    <div className="fish-edit">
      <input name="name" type="text" value={fish.name} onChange={handleChange} />
      <input name="price" type="text" value={fish.price} onChange={handleChange} />
      <select name="status" value={fish.status} onChange={handleChange} >
        <option value="available" >Fresh!</option>
        <option value="unavailable" >Sold Out!</option>
      </select>
      <textarea name="desc" value={fish.desc} onChange={handleChange} />
      <input name="image" type="text" value={fish.image} onChange={handleChange} />
      <button onClick={() => deleteFish(index)}>Remove Fish</button>
    </div>
  )
}

EditFishForm.propTypes = {
  index: PropTypes.string,
  updateFish: PropTypes.func,
  deleteFish: PropTypes.func,
  fish: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    desc: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number,
  }),
}

export default EditFishForm
