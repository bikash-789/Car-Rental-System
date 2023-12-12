import React from "react";
import { Link } from "react-router-dom";
function Cards(props) {
  return (
    <Link to={props.linkTo} className="h-0">
      <div
        className="flex  flex-col text-center items-center justify-start w-60 h-48 p-2 rounded-2xl hover:shadow-lg"
        style={props.bg}
      >
        <h1 className="text-4xl">{props.title}</h1>
        <br />
        <h2 className="text-2xl">{props.counts}</h2>
        {props.counts == null && props.icon}
        <br />
        <p className="text-xl">{props.desc}</p>
      </div>
    </Link>
  );
}

export default Cards;
