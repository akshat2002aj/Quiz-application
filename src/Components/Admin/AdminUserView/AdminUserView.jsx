import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import { toast } from "react-hot-toast";
import Store from "../../../Redux/Store";
import { deleteUser } from "../../../Redux/Actions/user";

const AdminUserView = ({ users }) => {
  // const navigate = useNavigate();

  const handleDeleteRow = async (id) => {
    Store.dispatch(deleteUser(id));
  };

  const columns = [
    { id: "sno", label: "S.no", minwidth: 50 },
    { id: "name", label: "Name", minWidth: 100 },
    {
      id: "email",
      label: "Email-id",
      minWidth: 170,
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 100,
      align: "center",
    },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="flex items-center justify-center mt-2 w-full">
      {users.length > 0 ? (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((users, index) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      // key={row._id}
                    >
                      {columns.map((column) => {
                        if (column.id === "sno") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {index + 1}
                            </TableCell>
                          );
                        } else if (column.id === "actions") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button
                                variant="contained"
                                className="bg-indigo-600"
                                onClick={() => handleDeleteRow(users._id)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          );
                        } else {
                          const value = users[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <>
          <div className="flex flex-col  bg-slate-50  border border-gray-200 shadow-lg mx-0  py-8 px-4 md:p-8 rounded-3xl  mt-4 w-full md:mx-0 md:w-[80%] ">
            <p className="text-[crimson] font-medium text-3xl text-center">
              No User Registered!
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminUserView;
