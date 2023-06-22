import React, { useState } from "react";
import Layout from "./components/Layout";
import styled from "styled-components";
import CardRow from "./components/CardRow";
import Filter from "./components/Filter";
const FilterRow = styled.div`
  display: flex;
  padding: 8px 16px;
  justify-content: flex-end;
  gap: 10px;
  height: 60px;
  button {
    background: transparent;
    border: none;
    cursor: pointer;
    width: 30px;
    height: 30px;
    &:hover {
      transition: 0.5s;
      width: 35px;
      height: 35px;
      svg {
        filter: drop-shadow(4px 2px 10px black);
      }
    }
  }
  svg {
    transition: 0.5s;
    width: 100%;
  }
`;
const Products = () => {
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  return (
    <Layout>
      <FilterRow>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
        <button onClick={() => setShowFilterDrawer(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            />
          </svg>
        </button>
      </FilterRow>
      <CardRow itemsperrow={6} />
      <Filter
        setShowFilterDrawer={setShowFilterDrawer}
        showFilterDrawer={showFilterDrawer}
      />
    </Layout>
  );
};

export default Products;
