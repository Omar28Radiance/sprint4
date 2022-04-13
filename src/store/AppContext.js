import { useState, createContext } from "react";

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [data, setData] = useState([]);
    const [favs, setFavs] = useState([]);
    const [view, setView] = useState("feed");
    const [isSearch, setIsSearch] = useState(false);
    const [user, setUser] = useState(null);

    return (
        <AppContext.Provider
            value={{
                data,
                favs,
                view,
                isSearch,
                user,
                setData,
                setFavs,
                setView,
                setIsSearch,
                setUser
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};