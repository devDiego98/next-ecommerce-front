import React, { useState } from "react";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { addToCart, updateQuantity } from "@/slices/userDataSlice";
import { useEffect, useRef } from "react";
export default function Counter({ item, cartCounter }) {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(item?.quantity || 1);
  const incrementDebounceRef = useRef(null);
  const decrementDebounceRef = useRef(null);
  const StyledCounterContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;
    button {
      width: 32px;
      height: 28px;
      border-radius: 4px;
      border: 1px solid #00000052;
      background: white;
    }
    .quantity {
      display: flex;
      align-items: center;
    }
  `;
  const Wrapper = styled.div`
    display: flex;
    gap: 8px;
    .addToCart {
      padding: 8px 16px;
      background: #00d0ff61;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      color: white;
      font-weight: bold;
    }
  `;
  const debounceIncrement = () => {
    if (incrementDebounceRef.current) {
      incrementDebounceRef.current.cancel();
    }
    setCounter((prev) => {
      const newCounter = prev + 1;
      incrementDebounceRef.current = debounce(() => {
        updateProductQuantityDebounced(newCounter);
      }, 200);
      incrementDebounceRef.current();
      return newCounter;
    });
  };

  const debounceDecrement = () => {
    if (counter !== 1) {
      if (decrementDebounceRef.current) {
        decrementDebounceRef.current.cancel();
      }
      setCounter((prev) => {
        const newCounter = prev - 1;
        decrementDebounceRef.current = debounce(() => {
          updateProductQuantityDebounced(newCounter);
        }, 200);
        decrementDebounceRef.current();
        return newCounter;
      });
    }
  };
  const updateProductQuantityDebounced = debounce((newCounter) => {
    let cartItem = {
      ...item,
      quantity: newCounter,
    };
    console.log(cartItem);
    cartCounter
      ? dispatch(updateQuantity(cartItem))
      : dispatch(addToCart(cartItem));
  }, 300);

  const updateProductQuantity = () => {
    updateProductQuantityDebounced(counter);
  };

  return (
    <Wrapper>
      <StyledCounterContainer>
        <button
          onClick={() =>
            cartCounter ? debounceIncrement() : setCounter((prev) => prev + 1)
          }
        >
          +
        </button>
        <div className="quantity">{counter}</div>
        <button
          onClick={() =>
            cartCounter ? debounceDecrement() : setCounter((prev) => prev - 1)
          }
        >
          -
        </button>
      </StyledCounterContainer>
      {!cartCounter && (
        <button className="addToCart" onClick={updateProductQuantity}>
          Add To Cart
        </button>
      )}
    </Wrapper>
  );
}
