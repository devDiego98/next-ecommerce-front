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
    width: 25px;
    height: 25px;
    &:hover {
      transition: 0.5s;
      svg {
        filter: drop-shadow(4px 2px 10px white);
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
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
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
