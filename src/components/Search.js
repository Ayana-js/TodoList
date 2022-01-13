import React from "react";

const Search = props => {
    return (
        <div className="ui main">
        <h2>Search Contact</h2>
        <input
        onChange={({ target: { value } }) => props.search(value)}
        type="text"
        placeholder="Search here..."
      />
        </div>
    )
}

export default Search