module.exports = (app) => {
    app.get("/", (req,res)=> res.send("TEST GET REUEST"))
}