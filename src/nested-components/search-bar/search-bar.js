import "./search-bar.css"
import { Link, useNa } from "react-router-dom";
import magnifying__glass from './Search.png';
import homeIcon from './Home.png';
import { useState } from "react";

const SearchBar = ({ filterPokemon, searchFlag }) => {

    const [searchText, setSearchText] = useState()

    const searchBox = searchBoxData => {
        setSearchText(searchBoxData)
        //Set Search flag to false when search text is empty
        searchFlag(false, searchBoxData)

        if (!searchBoxData) {
            console.log("empty")
        }
    }

    const submitSearch = () => {
        filterPokemon(searchText)
    }

    return (
        <div className="searchBarParent">

            <div className="searchBarParent__inputBox">
                <input type="text" placeholder="Poke Search"
                    className="searchBarParent__inputBox_text"
                    onChange={(e) => searchBox(e.target.value)
                    }
                >
                </input>
                <button disabled={!searchText} className="searchBarParent__inputBox_glass"
                    onClick={submitSearch}>
                </button>
            </div>
            <button className="searchBarParent__homeButton"

            >
                <Link to="/owned"><div className="div-style"></div></Link>
            </button>


        </div>
    );
}

export default SearchBar;