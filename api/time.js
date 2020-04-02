const gettime = (req, res) => {
    let datetime = new Date().toLocaleString("sv", { timeZoneName: "short" });
    res.json({ "time": datetime });
}

module.exports = { gettime };