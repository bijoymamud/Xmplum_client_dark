// import { createContext, useEffect, useState } from "react";
// export const ThemeContext = createContext();
// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", theme === "dark");
//     localStorage.setItem("theme", theme);
//   }, [theme]);
//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "light" ? "dark" : "light"));
//   };
//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };


import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext('light');

export const ThemeProvider = ({children}) =>{
    const [darkMode , setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );
    useEffect(()=>{
        if(darkMode){
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme","dark");
        }else{
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme","light")
        }
    },[darkMode])
    return(
        <ThemeContext.Provider value={{darkMode,setDarkMode}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useDarkMood = () => useContext(ThemeContext)