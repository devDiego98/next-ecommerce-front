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
  const DeleteItemButton = styled.button`
    background: transparent;
    border: none;
    svg {
      stroke: red;
      width: 24px;
      height: 24px;
      &:hover {
        fill: #ff00003b;
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
        <DeleteItemButton
          type="button"
          onClick={() => setDeleteDialogOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </DeleteItemButton>
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
