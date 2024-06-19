import React from "react";

function Input({name, state, setState, label = false}) {
  return (
    <div>
      { label && (
          <label htmlFor="name">
            {name}
          </label>
        )}
      
      <div>
        <input 
          type="text"
          name={name}
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Input;
