const useSearchCache = () => {
    const cache = JSON.parse(window.sessionStorage.getItem("searchCache")) || {};
    
    const setCache = (currentQuery) => {
        if (currentQuery !== null) window.sessionStorage.setItem("searchCache", JSON.stringify(currentQuery));
    };
    
    return [cache, setCache];
};

export default useSearchCache;