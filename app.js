const express = require("express");
const fs = require("fs");
const path = require('path');
const bodyParser = require('body-parser');
const prductRouter = express.Router();
const jsonParser = express.json();
 
const app = express();
const publicDirectoryPath = path.join(__dirname, './public');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(publicDirectoryPath));

app.use(function(request, response, next){
    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
    fs.appendFile("server.log", data + "\n", function(){});
    next();
});

// use Router
prductRouter.use('/create', (req, resp) => {
    resp.send('Add a product');
})

prductRouter.use('/:id', (req, resp) => {
    resp.send(`Product - ${req.params.id}`);
})

prductRouter.use('/', (req, resp) => {
    resp.send('List of products');
});

app.use('/products', prductRouter);

// 
app.post('/user', jsonParser, (req, resp) => {
    console.log(req.body);

    if (!req.body) return resp.sendStatus(400);

    resp.json(req.body);
});
//


app.get('/register', urlencodedParser, (req, resp) => {
    resp.sendFile(__dirname + '/public/register.html');
});

// app.post('/register', urlencodedParser, (req, resp) => {
//     if (!req.body) return resp.sendStatus(400);

//     console.log(req.body)

//     resp.send(`${req.body.userName} ${req.body.userAge}`)
//     resp.send({
//         success: 'success',
//     })
// });

app.get("/categories/:categoryId/products/:productId", (request, response) => {
    const catId = request.params["categoryId"];
    const prodId = request.params["productId"];
    response.send(`Категория: ${catId}  Товар: ${prodId}`);
});

app.get("/", function(request, response){
    response.send("<h2>Hello Express fff</h2>");
});

app.listen(3000)