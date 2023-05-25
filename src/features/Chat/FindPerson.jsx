import React from "react";

export const FindPerson = () => {
  
  return (
    <div>
      <form >        
        <div style={{justifyContent:'center', marginTop:'20px'}} className="d-flex input-group">
          <input style={{width: 'auto', margin:'0px'}} type="text" />
          <input
          style={{width: '22px', margin:'0px'}}
            type="checkbox"
            
          />
        </div>

        <button type="submit">Tìm</button>
      </form>
    </div>
  );
};
