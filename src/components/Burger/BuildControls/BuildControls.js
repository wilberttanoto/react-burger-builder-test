import React from "react";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Bacon", type: "bacon" },
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>Current Price : Rp {props.price}</p>
    {controls.map(ctr => (
      <BuildControl
        disabled={props.disabled[ctr.type]}
        key={ctr.type}
        label={ctr.label}
        added={() => props.ingredientAdded(ctr.type)}
        remove={() => props.ingredientRemove(ctr.type)}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchaseable}
      onClick={props.purchasingClicked}
    >
      ORDER NOW
    </button>
  </div>
);

export default buildControls;
