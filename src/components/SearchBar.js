import React from 'react';

import styles from '../style.module.css';

const SearchBar = (props) => {
    return (
        <div className={styles.searchBar}>
            <form onSubmit={props.onSubmit}>
                <input 
                type="text"
                placeholder="Enter a City" 
                value={props.value || ''} 
                onChange={props.onChange} 
                className={styles.searchInput}   />
                {/* <i className="search link icon" /> */}
                <button onClick={props.onSubmit}>Search</button>
            </form>
            
        </div>
        );

}
    
    


export default SearchBar;
