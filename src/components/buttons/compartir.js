import { FacebookShareButton, TwitterShareButton, EmailShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, EmailIcon } from "react-share";
import React from "react";

function Compartir (){
  return (
<FacebookShareButton
        url={"https://www.pinterest.es/"}
        quote={"no sé que es quote"}
        hashtag={"#generadorqrpatrimonio"}
        description={'dataUrl'}
        className="Demo__some-network__share-button"
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>)
      }

export default Compartir;