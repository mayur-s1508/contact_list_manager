import React, { useState, useEffect } from "react";
import Card from "./ContactCard";
import ReactPaginate from "react-paginate";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./pageNavigation.css";
import { getContacts } from "../../services/user";
import { fetchContacts } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";

function Card1({ searchTearm }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 12;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(state.contacts.length / usersPerPage);
  const totalContacts = state.contacts.length;
  useEffect(() => {
    getContacts().then((contacts) => {
      dispatch(fetchContacts(contacts));
    });
  }, [dispatch]);
  const displayUsers = state.contacts
    .filter((val) => {
      if (searchTearm == "") {
        return val;
      } else if (
        val.userName.firstName.toLowerCase().includes(searchTearm.toLowerCase())
      ) {
        return val;
      } else if (
        val.userName.lastName.toLowerCase().includes(searchTearm.toLowerCase())
      ) {
        return val;
      } else if (val.phoneNumber.toString().includes(searchTearm.toString())) {
        return val;
      }
    })
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((contact) => {
      return (
        <Card
          key={contact.imageUrl}
          firstName={contact.userName.firstName}
          lastName={contact.userName.lastName}
          phoneNumber={contact.phoneNumber}
          imageUrl={contact.imageUrl}
        />
      );
    });
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      {displayUsers}
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        activeClassName={"paginationActive"}
      />
      <span
        style={{
          position: "fixed",
          top: "96%",
          left: "10px",
          fontWeight: "bolder",
          color: "#3f51b5",
        }}
      >
        Total= {totalContacts}{" "}
      </span>
    </>
  );
}
export default Card1;
