import React from "react";
import Button from "@mui/material/Button";
import "./categories.css";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { categories } from "./constant/data";
import {useHistory} from "react-router-dom"

function Categories() {
  const history=useHistory()
  return (
    <>
      <Button variant="contained" className="btn" onClick={()=>history.push("/create")}>
        Create Blog
      </Button>
      <Table className="tables">
        <TableHead>
          <TableRow>
            <TableCell>All Categories</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => {
            return (
              <TableRow>
                <TableCell>{category}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

export default Categories;
