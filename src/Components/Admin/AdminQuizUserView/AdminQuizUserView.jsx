import React, { useEffect, useState } from "react";
import Header from "../../Layout/Header/Header";
import AdminSideBar from "../AdminSideBar/AdminSideBar";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Store from "../../../Redux/Store";
import { getAllRegisterUser } from "../../../Redux/Actions/quiz";
import { useSelector } from "react-redux";
import Loader from "../../Layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";

const AdminQuizUserView = ({users}) => {

  const navigate = useNavigate();
  const [sortedUsers, setSortedUsers] = useState([]);
  const columns = [
    { id: "sno", label: "S.no", minWidth: 100 },
    { id: "name", label: "Name", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 170 },
    {
      id: "totalMarks",
      label: "Total Marks",
      minWidth: 100,
      align: "center",
      },
    {
      id: "marksScored",
      label: "Marks Obtained",
      minWidth: 120,
      align: "center",
      format: (value) => Number(value).toLocaleString("en-US"),
    },
    {
      id: "testStatus",
      label: "Quiz Status",
      minWidth: 170,
      align: "center",
      format: (value) => (value ? <div className="text-green-400">True</div> : <div className="text-red-400">False</div>),
    },
    {
      id: "timeTaken",
      label: "Time Taken",
      minWidth: 120,
      format: (value) => {
        const milliseconds = value;
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        const hh = String(hours).padStart(2, "0");
        const mm = String(minutes % 60).padStart(2, "0");
        const ss = String(seconds % 60).padStart(2, "0");

        return `${hh}:${mm}:${ss}`;
      },
    },
    {
      id: "tabSwitch",
      label: "Tab Switch",
      minWidth: 100,
      align: "center",
      },
    {
      id: "actions",
      label: "Actions",
      minWidth: 100,
      align: "center",
    },
  ];

  useEffect(()=>{
      users.length > 0 && users.map((i)=>{

      })
  },[])

 

  const handleDeleteRow = async(id) => {

  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const TimeTaken = (users)=>{
    const timeRemaining = +new Date(users.endTime) - +new Date(users.startTime);
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }


  useEffect(() => {

    const sorted = users.slice().sort((a, b) => {
   
      if (a.marksScored === b.marksScored) {
        const aTimeTaken = +new Date(a.endTime) - +new Date(a.startTime)
        const bTimeTaken = +new Date(b.endTime) - +new Date(b.startTime)
        return aTimeTaken - bTimeTaken;
      }
      return b.marksScored - a.marksScored;
    });

    setSortedUsers(sorted);
  }, [users]);
  
  return (
    <div className="flex items-center justify-center mt-2 w-full">
      {sortedUsers.length >0 ? (
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
              {sortedUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((sortedUsers, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={sortedUsers.code}
                    >
                      {columns.map((column) => {
                        const value = sortedUsers[column.id];
                        if (column.id === "sno") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {index + 1}
                            </TableCell>
                          );
                        } else if (column.id === "testStatus") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {<div className={`font-bold ${value === 'Registered' ? 'text-pink-400': (value === "Processing" ? 'text-yellow-400' : 'text-green-400')}`}>{value}</div>}
                            </TableCell>
                          );
                        } else if (column.id === "tabSwitch") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {<div className={`font-bold text-xl ${value >= 3 ? 'text-red-400': null}`}>{value}</div>}
                            </TableCell>
                          );
                        }
                         else if(column.id === "timeTaken") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {
                                sortedUsers.endTime ? (
                                  TimeTaken(sortedUsers)
                                ) : (null)
                              }
                            </TableCell>
                          );
                        }
                        else if(column.id === "name") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                                {sortedUsers.user?.name}
                            </TableCell>
                          );
                        }
                        else if(column.id === "email") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                                {sortedUsers.user?.email}
                            </TableCell>
                          );
                        }
                        else if (column.id === "actions") {
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                            >
                              <Button
                                variant="contained"
                                className="bg-indigo-600"
                                onClick={()=>handleDeleteRow(sortedUsers.user._id)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          );
                        }
                        else {
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
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={sortedUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      ):(  <>
      <div className="flex flex-col  bg-slate-50  border border-gray-200 shadow-lg mx-0  py-8 px-4 md:p-8 rounded-3xl  mt-4 w-full md:mx-0 md:w-[80%] ">
        <p className="text-[crimson] font-medium text-3xl text-center">
          No User Registered!
        </p>
        </div>
      </>)}
    </div>
  );
};

export default AdminQuizUserView;
