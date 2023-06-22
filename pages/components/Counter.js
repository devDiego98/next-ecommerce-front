import React, { useState } from "react";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "@/slices/userDataSlice";
import { useEffect, useRef } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Snackbar,
} from "@mui/material";
export default function Counter({ item, cartCounter }) {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(item?.quantity || 1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
    align-items: center;
    gap: 8px;
    .addToCart {
      padding: 8px 16px;
      background: #00d0ff61;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      color: white;
      font-weight: bold;
      &:hover {
        background: #00d0ff9e;
      }
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
    } else {
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
    !snackbarOpen && setSnackbarOpen(true);
    updateProductQuantityDebounced(counter);
  };

  return (
    <Wrapper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Adjust the duration as needed
        onClose={() => setSnackbarOpen(false)}
        message="Product added successfully!"
      />
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
            cartCounter
              ? debounceDecrement()
              : setCounter((prev) => {
                  if (prev !== 1) {
                    return prev - 1;
                  } else return prev;
                })
          }
        >
          -
        </button>
      </StyledCounterContainer>
      {cartCounter && (
        <button type="button" onClick={() => setDeleteDialogOpen(true)}>
          Delete
        </button>
      )}
      {!cartCounter && (
        <button className="addToCart" onClick={updateProductQuantity}>
          Add To Cart
        </button>
      )}

      {cartCounter && (
        <div>
          <Dialog
            open={deleteDialogOpen}
            onClick={() => setDeleteDialogOpen(false)}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{`Are you sure you want to delete ${item.name}?`}</DialogTitle>

            <DialogActions>
              <Button onClick={() => setDeleteDialogOpen(false)}>Close</Button>
              <Button
                onClick={() => {
                  setDeleteDialogOpen(false);
                  dispatch(removeFromCart(item._id));
                }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </Wrapper>
  );
}
