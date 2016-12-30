import React from 'react';
const Square = (props) => {
  return(
    <div>
      <div className={props.class} id={props.id} onClick={props.onClick}/>
    </div>
  )
}
export default Square;
