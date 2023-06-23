import React from "react";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";
import styled from "styled-components";
import NextImage from "./components/NextImage";
import Counter from "./components/Counter";
import EmptyCart from "./components/EmptyCart";
import { loadStripe } from "@stripe/stripe-js";
const CartWrapper = styled.div`
  display: flex;
`;
const ItemsColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`;
const FinishPurchaseContainer = styled.div`
  flex: 1;
  padding-left: 48px;
  border-left: 1px solid gray;
`;

const ItemWrapper = styled.div`
  display: flex;
  padding: 16px 0 16px 16px;
  gap: 16px;
  border-top: 1px solid gray;

  &:last-child {
    border-bottom: 1px solid gray;
  }
  .title {
    font-weight: 600;
    font-size: 16px;
    color: #1a1a1a;
  }
  .itemContainer {
    width: 100px;
    height: 100px;
    position: relative;
  }
  .property {
    color: grey;
    font-size: 14px;
    font-weight: 400;
  }
  .item-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .info {
    flex: 1;
  }
`;

export default function Cart() {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
  const cart = useSelector((state) => state.userData.cart);
  return (
    <Layout>
      {cart.items.length > 0 ? (
        <CartWrapper>
          {" "}
          <ItemsColumn>
            {cart.items.map((item) => {
              return (
                <ItemWrapper>
                  <div className="itemContainer">
                    <NextImage
                      src={item.images[0]}
                      alt={item.name}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <div className="item-info">
                    <div className="info">
                      <div className="title">{item.name}</div>
                      {item.properties && (
                        <div>
                          {Object.entries(item.properties).map(
                            ([key, value], index, propertiesArr) => {
                              const isLastProperty =
                                index === propertiesArr.length - 1;
                              return (
                                <span key={key} className="property">
                                  <span className="property-key">{key}</span>
                                  <span>: </span>
                                  <span className="property-value">
                                    {value}
                                  </span>
                                  {!isLastProperty && <span>, </span>}
                                </span>
                              );
                            }
                          )}
                        </div>
                      )}
                    </div>

                    <Counter item={item} cartCounter={true} />
                  </div>
                </ItemWrapper>
              );
            })}
          </ItemsColumn>
          <FinishPurchaseContainer>
            <h2>Finalize Purchase</h2>
            <div>Total: ${cart.total}</div>
            <form action="/api/checkout_sessions" method="POST">
              <button>Checkout</button>
            </form>
          </FinishPurchaseContainer>
        </CartWrapper>
      ) : (
        <EmptyCart />
      )}
    </Layout>
  );
}
