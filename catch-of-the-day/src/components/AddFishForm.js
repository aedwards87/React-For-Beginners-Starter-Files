import React, { useRef } from 'react'

const AddFishForm = ({ addFish }) => {
  const nameRef = useRef()
  const priceRef = useRef()
  const statusRef = useRef()
  const descRef = useRef()
  const imageRef = useRef()

  const createFish = (e) => {
    e.preventDefault()
    const fish = {
      name: nameRef.current.value,
      price: parseFloat(priceRef.current.value),
      status: statusRef.current.value,
      desc: descRef.current.value,
      image: imageRef.current.value,
    }
    addFish(fish)
    // refresh form
    e.currentTarget.reset()
  }

  return (
    <form className="fish-edit" onSubmit={createFish}>
      <input name="name" ref={nameRef} type="text" placeholder="name" />
      <input name="price" ref={priceRef} type="text" placeholder="price" />
      <select name="status" ref={statusRef}>
        <option value="available" >Fresh!</option>
        <option value="unavailable" >Sold Out!</option>
      </select>
      <textarea name="desc" ref={descRef} placeholder="desc" />
      <input name="image" ref={imageRef} type="text" placeholder="image" />
      <button type="submit">+ Add Fish</button>
    </form>
  )
}

export default AddFishForm
