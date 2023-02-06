import React from "react";
import Typography from "@mui/material/Typography";

const IconCardButton = (props) => {
  const { icon, text, subtext, onClick } = props;
  return (
    <div
      onClick={onClick}
      className="text-center mr-5 my-5 flex w-[250px] cursor-pointer items-center justify-center rounded-md bg-[#1a73e8] p-[10px]"
    >
      <div className="text-center flex items-center justify-between">
        <span className="mx-auto text-white pr-2">{icon}</span>
        <Typography className="font-sans text-lg  text-white">
          {text}
        </Typography>
        <Typography className="text-md font-sans font-bold text-sky-300 text-white">
          {subtext}
        </Typography>
      </div>
    </div>
  );
};

export default IconCardButton;
