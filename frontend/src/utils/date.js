const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    // Add suffix to the day (e.g., 1st, 2nd, 3rd)
    const daySuffix = (day) => {
        if (day % 10 === 1 && day !== 11) return `${day}st`;
        if (day % 10 === 2 && day !== 12) return `${day}nd`;
        if (day % 10 === 3 && day !== 13) return `${day}rd`;
        return `${day}th`;
    };

    return `${daySuffix(day)} ${month} ${year}`;
};

export default formatDate;