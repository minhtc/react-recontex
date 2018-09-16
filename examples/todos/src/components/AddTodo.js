import React from 'react'
import { actions } from '../recontext/store'

const AddTodo = () => {
  let input

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          actions.addTodo({ newTodoContent: input.value})
          input.value = ''
        }}
      >
        <input ref={node => input = node} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}

export default AddTodo