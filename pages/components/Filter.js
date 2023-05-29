import React, { useState, useEffect } from "react";
import { Button, Drawer } from "@mui/material";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { setAllProducts } from "@/slices/productsSlice";
const FiltersDrawer = styled.div`
  min-width: 40vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 24px 0 24px;
`;
const StyledSelectTag = styled(Select)`
  min-width: 200px;
  margin-bottom: 16px;
`;

const Filter = ({ showFilterDrawer, setShowFilterDrawer }) => {
  const [allCategories, setAllCategories] = useState([]);
  const categories = useSelector((state) => state.categories.categories);
  const subCategories = useSelector((state) => state.categories.subCategories);
  const [searchCategories, setSearchCategories] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    setAllCategories([[...categories]]);
  }, [categories]);

  const handleChange = (category, index) => {
    if (category.value !== "") {
      let { value: cat } = category;
      cat = JSON.parse(cat);

      let newSearchCategories = [...searchCategories];
      newSearchCategories = newSearchCategories.slice(0, index + 1);
      newSearchCategories[index] = cat;
      setSearchCategories(newSearchCategories);

      let newArr = [...allCategories];
      newArr = newArr.slice(0, index + 1);
      let newSubCategories = setNewSubCategories(cat._id);
      newSubCategories.length > 0 && newArr.push(newSubCategories);
      setAllCategories(newArr);
    } else {
      let newArr = [...allCategories];
      newArr = newArr.slice(0, index + 1);
      setAllCategories(newArr);

      let newSearchCategories = [...searchCategories];
      newSearchCategories = newSearchCategories.slice(0, index);
      setSearchCategories(newSearchCategories);
    }
  };

  const setNewSubCategories = (id) => {
    let newSubCategories = [...subCategories];
    newSubCategories = subCategories.filter(
      (cat) => cat.parentCategory._id === id
    );
    return newSubCategories;
  };

  async function filterProducts() {
    let ids = searchCategories.map((cat) => cat._id);
    try {
      const response = await fetch(
        "/api/products?categoryIds=" + ids[ids.length - 1]
      );
      const data = await response.json();
      dispatch(setAllProducts(data));
      console.log(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  return (
    <Drawer
      anchor={"right"}
      open={showFilterDrawer}
      onClose={() => setShowFilterDrawer(false)}
    >
      <FiltersDrawer>
        {allCategories.map((categoriesSelect, index) => {
          return (
            <FormControl
              fullWidth
              key={index}
              style={{
                alignSelf: "flex-end",
                width: `calc(100% - ${index * 3}%)`,
              }}
            >
              <InputLabel>Select Category</InputLabel>
              <StyledSelectTag
                onChange={(res) => handleChange(res.target, index)}
                label={categoriesSelect.name}
                labelId={categoriesSelect.name}
              >
                <MenuItem value="">-Select-</MenuItem>
                {categoriesSelect?.map((option, optionIndex) => {
                  return (
                    <MenuItem key={option._id} value={JSON.stringify(option)}>
                      {option.name}
                    </MenuItem>
                  );
                })}
              </StyledSelectTag>
            </FormControl>
          );
        })}
        <Button onClick={filterProducts}>Filter Products</Button>
      </FiltersDrawer>
    </Drawer>
  );
};

export default Filter;
