import React, { Component } from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

// Could be a functional component
class Summary extends Component {
  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(
      igKey => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );

    return (
      <Aux>
        <h3>Thank you, here are you order summary:</h3>
        <ul>{ingredientsSummary}</ul>
        <p>Total Price : {this.props.totalPrice}</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinue}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default Summary;
