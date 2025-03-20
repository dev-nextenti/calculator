import React from "react";

function Button({ handleClick, name, className }) {
  return (
    <>
      <button className={className} onClick={handleClick} name={name}>
        {name}
      </button>
    </>
  );
}

export default Button;
