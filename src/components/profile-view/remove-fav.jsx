import React, { useState, useEffect } from "react";

import { Button, Row } from "react-bootstrap";
import PropTypes from "prop-types";

export const RemoveFavoriteMovies = ({ movieId,isFav, onRemove, onAdd }) => {
  const handleRemove = () => {
    onRemove(movieId); // Call the passed-in function to remove the movie
  };

  const handleAdd = () => {
    onAdd(movieId); // Call the passed-in function to remove the movie
  };

  return (
   
    <Button onClick={handleRemove} variant="danger">
      Remove
    </Button>
  
  );
};

RemoveFavoriteMovies.propTypes = {
  movieId: PropTypes.string.isRequired, // Movie ID to remove
  onRemove: PropTypes.func.isRequired, // Function to remove the movie
};


// Deregister
const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        fetch(`https://myflix-client-oj-3c90e41c0141.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        }).then(response => {
            if (response.ok) {
                alert("Deleted the User");
                onDeleteUser(user.id);
            } else {
                alert("An error occurred while trying to delete the user.");
            }
        });
    }
};