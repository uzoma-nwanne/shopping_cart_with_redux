import ShoppingCart from "./ShoppingCart";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { Provider } from "react-redux";

describe("ShoppingCart", () => {
  beforeEach(() => {
    // BONUS: how might you abstract this common scenario to be a helper function that other tests could use?
    const fakeStore = {
      dispatch: () => jest.fn(),
      subscribe: () => jest.fn(),
      getState: () => ({
        cart: {
          isOpen: true,
          items: [
            {
              id: 1,
              title: "Pants",
              price: 12,
              quantity: 1,
              image: "https://www.image1.com",
            },
            {
              id: 2,
              title: "Shorts",
              price: 11,
              quantity: 1,
              image: "https://www.image2.com",
            },
          ],
        },
      }),
    };

    render(
      <Provider store={fakeStore}>
        <ShoppingCart />
      </Provider>
    );
  });
  it("displays the total price of multiple items", () => {
    // this component relies on the redux store being present with certain properties
    // we set the environment (scene) and can then test what we would expect in a 'real' scenario

    expect(screen.getByText("Total: $23.00")).toBeInTheDocument();
  });

  // hmmm... how would you test this? The disappearance of an item
  // OR that an action was called... like the `removeFromCart` action perhaps
  it("removes an item from the cart", () => {
     expect(screen.getAllByRole('button')).toHaveLength(2)
     const comp = screen.getByTestId(1);
     const button = within(comp).getByRole('button')
     fireEvent.click(button)
     expect(screen.getByText("Total: $23.00")).not.toBeInTheDocument();
  });
});
