import React, { useState } from 'react'

const AddItems = () => {

  const [queryTerm, setQueryTerm] = useState('')

  const onHandleChange = (e) => {
    setQueryTerm(e.target.value)
  }

  return (
    <React-fragment>
      <div className="display-4 text-center text-primary">Add items</div>
      <form>
        <div className="input-group">
          <input
            className="form-control"
            type="text" value="queryTerm"
            placeholder="Search for item..."
            value={queryTerm}
            onChange={onHandleChange}
            aria-label="enter item">
          </input>
        </div>
      </form>
    </React-fragment>
  )
}

export default AddItems;