import React from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs";

function MessageStatus({messageStatus}) {
  return <>
    {messageStatus === "sent" && <span ><BsCheck style={{size:"1.1rem"}} /></span>}
    {messageStatus === "delivered" && <span ><BsCheckAll style={{size:"1.1rem"}}/></span>}
    {messageStatus === "read" && <span ><BsCheckAll style={{color:"blue", fontSize:"1.1rem"}}/></span>}
  </>;
}

const styles = {

}

export default MessageStatus;
