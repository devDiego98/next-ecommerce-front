import React, { useState, useEffect, useRef } from "react";
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
const StyledPropertyContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
  label {
    margin-left: 10px;
    display: flex;
    gap: 8px;
  }
`;

const Filter = ({ showFilterDrawer, setShowFilterDrawer }) => {
  const [propertyFilters, setPropertyFilters] = useState();
  const [allCategories, setAllCategories] = useState([]);
  const categories = useSelector((state) => state.categories.categories);
  const subCategories = useSelector((state) => state.categories.subCategories);

  const [searchCategories, setSearchCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);

  const selectFieldValues = useRef([]);
  const radioFieldValues = useRef([]);

  const dispatch = useDispatch();

  useEffect(() => {
    let startingCategories = categories.filter(
      (category) => category.parentCategory.length === 0
    );
    setParentCategories(startingCategories);
    setAllCategories([...[startingCategories]]);
  }, [categories]);

  const handleChange = (category, index) => {
    selectFieldValues.current[index] = category.value;
    if (category.value !== "") {
      let { value: cat } = category;
      cat = JSON.parse(cat);
      setNewSubCategories(cat._id, index);

      let newSearchCategories = [...searchCategories];
      newSearchCategories = newSearchCategories.slice(0, index + 1);
      newSearchCategories[index] = cat;
      setSearchCategories(newSearchCategories);
    } else {
      let newArr = [...allCategories];
      newArr = newArr.slice(0, index + 1);
      setAllCategories(newArr);

      let newSearchCategories = [...searchCategories];
      newSearchCategories = newSearchCategories.slice(0, index);
      setSearchCategories(newSearchCategories);
    }
  };
  const handleRadioChange = (key, value, index) => {
    radioFieldValues.current[index] = { [key]: value };
  };
  const setNewSubCategories = async (id, index) => {
    let newArr = [...allCategories];
    newArr = newArr.slice(0, index + 1);
    setPropertyFilters({});
    radioFieldValues.current = [];
    selectFieldValues.current = selectFieldValues.current.slice(0, index + 1);
    try {
      const response = await fetch(
        "/api/categories?fetchChildren=true&id=" + id
      );
      const data = await response.json();
      if (data.length > 0) {
        setAllCategories((prev) => [...newArr, data]);
      } else {
        setAllCategories(newArr);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  async function filterProducts() {
    let ids = searchCategories.map((cat) => cat._id);
    let url = "/api/products";
    if (ids[ids.length - 1]) {
      url += "?categoryId=" + ids[ids.length - 1];
    }
    if (radioFieldValues.current.length > 0) {
      radioFieldValues.current.map((property) => {
        let entries = [...Object.entries(property)];
        url += `&properties.${entries[0][0]}=${entries[0][1]}`;
      });
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      handlePropertyFilters(data);
      dispatch(setAllProducts(data));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  function handlePropertyFilters(products) {
    let properties = {};

    products?.forEach((product) => {
      if (product.properties) {
        Object.keys(product?.properties).forEach((key, index) => {
          if (!properties[key]) {
            properties[key] = [product.properties[key]];
          } else {
            if (!properties[key].includes(product.properties[key])) {
              properties[key].push(product.properties[key]);
            }
          }
        });
      }
    });
    setPropertyFilters(properties);
  }
  function clearFilters() {
    setAllCategories([parentCategories]);
    setSearchCategories([]);
    setPropertyFilters({});
    selectFieldValues.current = [];
    radioFieldValues.current = [];
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
                value={selectFieldValues.current[index] || ""}
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

        {propertyFilters &&
          Object?.entries(propertyFilters)?.map(
            ([objKey, values], propertyIndex) => (
              <StyledPropertyContainer key={objKey}>
                <h3>{objKey}:</h3>
                {values.map((value) => (
                  <label key={value}>
                    <input
                      type="radio"
                      value={value}
                      name={objKey}
                      defaultChecked={
                        radioFieldValues?.current[propertyIndex] &&
                        objKey in radioFieldValues?.current[propertyIndex] &&
                        radioFieldValues?.current[propertyIndex][objKey] ==
                          value
                      }
                      onChange={(ev) =>
                        handleRadioChange(
                          objKey,
                          ev.target.value,
                          propertyIndex
                        )
                      }
                    />
                    <span>{value}</span>
                  </label>
                ))}
              </StyledPropertyContainer>
            )
          )}
        <Button onClick={filterProducts}>Filter Products</Button>
        <Button onClick={clearFilters}>Clear Filters</Button>
      </FiltersDrawer>
    </Drawer>
  );
};

export default Filter;
