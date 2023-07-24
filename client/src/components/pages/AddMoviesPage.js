import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddMovieItem from "../items/AddMovieItem";

const AddMoviesPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currUser = JSON.parse(localStorage.getItem("currentUser"));
    axios.get(`/user/perm/${currUser.email}`).then((response) => {
      if (response.data.Items[0].role !== "admin") {
        navigate("/");
      }
    });
  });

  return (
    <>
      <AddMovieItem />
    </>
  );
};

export default AddMoviesPage;
