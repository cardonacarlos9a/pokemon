import "./searchBar.css"
import searchIcon from '../Search.png';
import homeIcon from '../Home.png'
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const SearchBarOwned = ({ searchPokemon, searchFlag, displayFilterModal }) => {

    const [searchText, setSearchText] = useState()

    const showFilterOptions = () => {
        displayFilterModal()
    }

    const executeSearch = () => {
        searchPokemon(searchText)
        searchFlag()
        console.log("Search Executed")
    }

    const searchBox = searchBoxData => {
        setSearchText(searchBoxData)
    }

    return (
        <div className="searchBar">
            <button className="searchBar__button searchBar__filter"
                onClick={showFilterOptions}></button>
            <button className="searchBar__button" onClick={executeSearch}>
                <img src={searchIcon} className="searchBar__search"></img>
            </button>
            <input className="searchBar__box"
                type="text" placeholder="PokeSearch"
                onChange={(e) => searchBox(e.target.value)}>
            </input>
            <button className="searchBar__button">
                <NavLink to="/">
                    <img className="searchBar__home" src={homeIcon}></img>
                </NavLink>
            </button>
        </div>
    );
}

export default SearchBarOwned;