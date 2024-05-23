import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableSortLabel
} from "@mui/material";
import axios from "axios";

const Tabledata = () => {
  const column = [
    { id: "Id", name: "Id" },
    { id: "ratings_average", name: "ratings_average" },
    { id: "author name", name: "author name" },
    { id: "title", name: "title" },
    { id: "first_publish_year", name: "first_publish_year" },
    { id: "subject", name: "subject" },
    { id: "author_birth_date", name: "author_birth_date" },
    { id: "author_top_work", name: "author_top_work" },
  ];
  const [bookData, setBookData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowperpage, setRowperpage] = useState(10);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/BookData");
      setBookData(response.data);
      setItems(response.data)
    } catch (error) {
      console.log("Error in getting book data ", error);
    }
  };
  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };
  const handleRowsPerPage = (e) => {
    setRowperpage(+e.target.value);
    setPage(0);
  };
  //---------- sort data -------------------
  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortDirection, setSortDirection] = useState("ratings_average");

  const handleSort = (prop) => {
    const isAsc = sortOrder === "asc";
    const sortedItems = [...items].sort((a, b) => {
      if (isAsc) {
        return a[prop] - b[prop];
      } else {
        return b[prop] - a[prop];
      }
    });
    setItems(sortedItems);
    setSortOrder(isAsc ? "desc" : "asc");
  };
  const handleChangeDirection = (e) => {
    const { value } = e.target;
    setSortOrder(value);
    handleSort(sortDirection);
  };
  const handlePropertyChange = (property) => {
    setSortDirection(property);
    handleSort(property);
  };

  // end sort data functions
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout>
      <div style={{ marginTop: "70px" }}>
        <Paper sx={{ width: "97%", marginLeft: "0%" }}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {column.map((item, key) => (
                    <TableCell
                      style={{ backgroundColor: "black", color: "white" }}
                      key={key}
                    >
                      {item.name}
                      <FormControl
                        variant="outlined"
                        style={{ height: "30px", minWidth: 120 }}
                      >
                        <InputLabel id="sort-order-label">
                          Sort Order
                        </InputLabel>
                        <Select
                          labelId="sort-order-label"
                          value={sortOrder}
                          onChange={handleChangeDirection}
                          label="Sort Order"
                          sx={{
                            maxHeight: "20px",
                            marginTop: "10px",
                            backgroundColor: "white",
                            color: "white",
                          }}
                        >
                          <MenuItem value="asc">Ascending</MenuItem>
                          <MenuItem value="desc">Descending</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {bookData &&
                  bookData
                    .slice(page * rowperpage, page * rowperpage + rowperpage)
                    .map((row, i) => {
                      return (
                        <TableRow key={i}>
                          {column &&
                            column.map((column, i) => {
                              let value = row[column.id];
                              return (
                                // <TableCell key={i}>{value}</TableCell>
                                <TableCell key={i}>
                                  <TableSortLabel
                                    active={sortDirection === "rating"}
                                    direction={sortOrder}
                                    onClick={() =>
                                      handlePropertyChange("rating")
                                    }
                                  >
                                    {value}
                                  </TableSortLabel>
                                </TableCell>
                              );
                            })}
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 50, 100]}
            rowsPerPage={rowperpage}
            page={page}
            count={bookData.length}
            component="div"
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPage}
          ></TablePagination>
        </Paper>
      </div>
    </Layout>
  );
};

export default Tabledata;
