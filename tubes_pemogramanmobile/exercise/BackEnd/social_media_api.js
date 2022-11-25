const express = require('express');
const app = express();
const mysql = require('mysql');
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//koneksi db
const db = mysql.createConnection({
    host : 'localhost' , 
    user: 'root' ,
    password: '' ,
    database: 'media_social'
});

//menjalankan db table posts//
//create
app.post('/post', (req, res) => {
    let sql = "INSERT INTO posts SET post_date=NOW()"
            +", username= '"+req.body.username
            +"', post= '"+req.body.post+"'";
    
    db.query(sql,(err,result) => {
        if(err) throw err;
        res.json({ "status" : 200 ,
                  "message" : "Berhasil" ,
                  "data" : null });
    });
});

//retriave
app.get('/post', (req, res) => {
    let sql = "SELECT post_id, username, post, DATE_FORMAT (post_date, '%W %D %M %Y %H:%i') as post_date FROM posts"

    db.query(sql, (err, results) => {
        if(err) throw err;
        res.json({"status": 200,
                  "message": "data berhasil diambil",
                  "data":results});
    });
});

//retriave by id
app.get('/post/id/:id', (req, res) => {
    let sql = "SELECT post_id, username, post, DATE_FORMAT (post_date, '%W %D %M %Y %H:%i') as post_date FROM posts WHERE post_id='"+req.params.id+"'";
    

    db.query(sql, (err, results) => {
        if(err) throw err;
        res.json({"status": 200,
                  "message": "data berhasil diambil",
                  "data":results});
    });
});

//retriave by records username
app.get('/post/username/:username', (req, res) => {
    let sql = "SELECT post_id, username, post, DATE_FORMAT (post_date, '%W %D %M %Y %H:%i') as post_date FROM posts WHERE username='"+req.params.username+"'";
    

    db.query(sql, (err, results) => {
        if(err) throw err;
        res.json({"status": 200,
                  "message": "data berhasil diambil",
                  "data":results});
    });
}); 

//update

app.put('/post/id/:id',(req, res) => {
    let sql = "UPDATE posts SET post='"+req.body.post+"' "
              +"WHERE post_id='"+req.params.id+"'";
    db.query(sql, (err, results) => {
        if(err) throw err;
        res.json({"status": 200,
                  "message": "data berhasil diupdate",
                  "data":null});
    });
});

//delete

app.delete('/posts/id/:id', (req, res) => {
    let sql = "DELETE FROM posts WHERE post_id='"+req.params.id+"'";
    db.query(sql, (err, results) => {
        if(err) throw err;
        res.json({"status": 200,
                  "message": "data berhasil dihapus",
                  "data":null});
    });
});

app.use('/images',express.static('images'));

app.listen(port,() => {
    console.log(`cli-nodejs-api listening at http://localhost:${port}`)
});