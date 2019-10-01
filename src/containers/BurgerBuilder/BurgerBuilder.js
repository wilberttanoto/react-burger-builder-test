import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";

import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICE = {
  salad: 3000,
  bacon: 10000,
  cheese: 6000
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0
      },
      totalPrice: 13000, // In Rupiah ?
      purchaseable: false,
      purchasing: false
    };

    // To use this or not ? Check https://reactjs.org/docs/handling-events.html
    // this.addIngredientHandler = this.addIngredientHandler.bind(this);
    // this.removeIngredientHandler = this.removeIngredientHandler.bind(this);
  }

  addIngredientHandler = type => {
    let updatedState = { ...this.state }; // Create Dummy Object copying the existing state
    updatedState.ingredients[type] += 1;
    updatedState.totalPrice += INGREDIENT_PRICE[type];

    this.setState(updatedState);
    this.updatePurchaseState(updatedState.ingredients);
  };

  removeIngredientHandler = type => {
    let updatedState = { ...this.state }; // Create Dummy Object copying the existing state
    updatedState.ingredients[type] -= 1;
    updatedState.totalPrice -= INGREDIENT_PRICE[type];

    this.setState(updatedState);
    this.updatePurchaseState(updatedState.ingredients);
  };

  updatePurchaseState = ingredients => {
    const sum = Object.keys({ ...ingredients })
      .map(k => {
        return ingredients[k];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchaseable: sum > 0 });
  };

  // TODO still mutable ?
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert("continue");
  };

  render() {
    let disabledInfo = {
      ...this.state.ingredients
    };

    for (let k in disabledInfo) {
      disabledInfo[k] = disabledInfo[k] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            totalPrice={this.state.totalPrice}
          />
        </Modal>

        <Burger ingredients={this.state.ingredients} />

        <BurgerControls
          price={this.state.totalPrice}
          disabled={disabledInfo}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemove={this.removeIngredientHandler}
          purchaseable={this.state.purchaseable}
          purchasingClicked={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
