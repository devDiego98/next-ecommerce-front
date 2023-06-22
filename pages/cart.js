import React from "react";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";
import styled from "styled-components";
import NextImage from "./components/NextImage";
import Counter from "./components/Counter";
import EmptyCart from "./components/EmptyCart";
const CartWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemWrapper = styled.div`
  display: flex;
  padding: 16px 0;
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
`;

export default function Cart() {
  const cart = useSelector((state) => state.userData.cart);
  return (
    <Layout>
      {cart.items.length > 0 ? (
        <CartWrapper>
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
                              <span className="property-value">{value}</span>
                              {!isLastProperty && <span>, </span>}
                            </span>
                          );
                        }
                      )}
                    </div>
                  )}
                  <Counter item={item} cartCounter={true} />
                </div>
              </ItemWrapper>
            );
          })}
          <div>${cart.total}</div>
        </CartWrapper>
      ) : (
        <EmptyCart />
      )}
    </Layout>
  );
}
