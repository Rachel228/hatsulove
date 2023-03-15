const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const app = express();

// const route = require('./routes')

const db = mysql.createPool(config.mysql)

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/userCards", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const sqlSelect = "SELECT `users`.`user_id`, `users`.`name`, `users`.`description`, `photos`.`way` "+
    "FROM `users` join `main_photos` on `users`.`user_id` = `main_photos`.`user_id` "+
    "JOIN `photos` on `photos`.`photo_id` = `main_photos`.`photo_id` "+
    "ORDER BY `users`.`count_likes` DESC LIMIT 6";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
}) 

app.get("/api/userGallery", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const user_id = req.query.user_id
    const sqlSelect = "SELECT * FROM `photos` WHERE `user_id` = ?";
    db.query(sqlSelect, user_id, (err, result) => {
        res.send(result);
    });
})

app.get("/api/femaleUserCards", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const sqlSelect = "SELECT `users`.`user_id`, `users`.`name`, `users`.`description`, `photos`.`way` "+
    "FROM `users` join `main_photos` on `users`.`user_id` = `main_photos`.`user_id` "+
    "JOIN `photos` on `photos`.`photo_id` = `main_photos`.`photo_id` "+
    "WHERE `users`.`sex` = 'Жіноча' AND 2021 - YEAR(`users`.`birth_date`) >= '"+req.query.from+"' AND 2021 - YEAR(`users`.`birth_date`) <= '"+req.query.to+"'";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
})

app.get("/api/maleUserCards", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const sqlSelect = "SELECT `users`.`user_id`, `users`.`name`, `users`.`description`, `photos`.`way` "+
    "FROM `users` join `main_photos` on `users`.`user_id` = `main_photos`.`user_id` "+
    "JOIN `photos` on `photos`.`photo_id` = `main_photos`.`photo_id` "+
    "WHERE `users`.`sex` = 'Чоловіча' AND 2021 - YEAR(`users`.`birth_date`) >= '"+req.query.from+"' AND 2021 - YEAR(`users`.`birth_date`) <= '"+req.query.to+"'";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
})

app.get("/api/otherUserCards", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const sqlSelect = "SELECT `users`.`user_id`, `users`.`name`, `users`.`description`, `photos`.`way` "+
    "FROM `users` join `main_photos` on `users`.`user_id` = `main_photos`.`user_id` "+
    "JOIN `photos` on `photos`.`photo_id` = `main_photos`.`photo_id` AND 2021 - YEAR(`users`.`birth_date`) >= '"+req.query.from+"' AND 2021 - YEAR(`users`.`birth_date`) <= '"+req.query.to+"'";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
})

app.get("/api/user", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const sqlSelect = "SELECT `user_id`, `name`, `description` FROM `users` WHERE `users`.`user_id` = " + req.query.id;
    db.query(sqlSelect, (err, result) => {
        res.json(result);
    });
})

app.get("/api/getLoginedUser", (req,res)=>{
    res.setHeader("Acces-Control-Allow-Origin", "*")
    const sqlSelect = "SELECT `users`.`user_id`, `users`.`name`, `users`.`sex`, `users`.`height`, "+
    "`users`.`description`, `users`.`count_likes`, `users`.`birth_date`, `photos`.`way`, `wish`.`wish`, `wish`.`from`, "+
    "`wish`.`to` FROM `users` join `main_photos` on `users`.`user_id` = `main_photos`.`user_id` "+
    "JOIN `photos` on `photos`.`photo_id` = `main_photos`.`photo_id` JOIN `wish` on `users`.`user_id` "+
    "= `wish`.`user_id` WHERE `users`.`user_id`="+ req.query.id
    db.query(sqlSelect, (err, result) => {
        res.json(result)
    })
})

app.get("/api/getAllUsers", (req,res)=>{
    res.setHeader("Acces-Control-Allow-Origin", "*")
    const sqlSelect = "SELECT `users`.`user_id`, `users`.`liked`, `users`.`name`, `users`.`sex`, `users`.`height`, "+
    "`users`.`description`, `users`.`count_likes`, `users`.`birth_date`, `photos`.`way`, `wish`.`wish`, `wish`.`from`, "+
    "`wish`.`to` FROM `users` join `main_photos` on `users`.`user_id` = `main_photos`.`user_id` "+
    "JOIN `photos` on `photos`.`photo_id` = `main_photos`.`photo_id` JOIN `wish` on `users`.`user_id` "+
    "= `wish`.`user_id`"
    db.query(sqlSelect, (err, result) => {
        res.json(result)
    })
})

app.get("/api/logInUser", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const sqlSelect = "SELECT `user_id` FROM `users` WHERE `login` = '"+req.query.login+"' AND `password` = '"+req.query.password+"'";
    db.query(sqlSelect, (err, result) => {
        res.json(result);
    });
})

app.get("/api/cities", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const sqlSelect = "SELECT * FROM `cities`";
    db.query(sqlSelect, (err, result) => {
        res.json(result);
    });
})

app.get("/api/allInterests", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const sqlSelect = "SELECT * FROM `interests`";
    db.query(sqlSelect, (err, result) => {
        res.json(result);
    });
})

app.get("/api/curInterests", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const userId = req.query.user_id;
    const sqlSelect = "SELECT `interests`.`interest_id`, `interests`.`name` FROM `interests` JOIN `users_has_interests` on `interests`.`interest_id` = `users_has_interests`.`interest_id` JOIN `users` ON `users`.`user_id` = `users_has_interests`.`user_id` WHERE `users`.`user_id` = ?";
    db.query(sqlSelect, userId, (err, result) => {
        res.json(result);
    });
})

app.get("/api/likes", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const who_id = req.query.who_id;
    const sqlSelect = "SELECT * FROM `likes` WHERE `who_id` = ?";
    db.query(sqlSelect, who_id, (err, result) => {
        res.json(result);
    });
})

app.get("/api/getDialogs", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    const from_id = req.query.from_id;
    const to_id = req.query.to_id;
    const sqlSelect = "SELECT * FROM `dialogs` WHERE `from_id` = ? AND `to_id` = ? OR `from_id` = ? AND `to_id` = ?  ORDER BY `send_time`";
    db.query(sqlSelect, [from_id, to_id, to_id, from_id], (err, result) => {
        res.json(result);
    });
})

app.post("/api/setUser", (req, res) => {
    const username = req.body.username;
    const gender = req.body.gender;
    const birth_date = req.body.birth_date;
    const city_id = req.body.city_id;
    const height = req.body.height;
    const login = req.body.login;
    const password = req.body.password;
    const sqlInsert = "INSERT INTO `users`(`login`,`password`,`name`, `sex`, `birth_date`, `height`, `city_id`) VALUES (?,?,?,?,?,?,?)";
    db.query(sqlInsert, [login, password,username, gender, birth_date, height, city_id], (err, result) => {
        res.json(result);
    });
})

app.post("/api/setUserWish", (req, res) => {
    const wish = req.body.wish;
    const from = req.body.from;
    const to = req.body.to;
    const userId = req.body.userId;
    const sqlInsert = "INSERT INTO `wish`(`user_id`, `wish`, `from`, `to`) VALUES (?,?,?,?)";
    db.query(sqlInsert, [userId, wish, from, to], (err, result) => {
        res.json(result);
    });
})

app.post("/api/setLike", (req, res) => {
    const who_id = req.body.who_id;
    const whom_id = req.body.whom_id;
    const sqlInsert = "INSERT INTO `likes`(`who_id`, `whom_id`) VALUES (?,?)";
    db.query(sqlInsert, [who_id, whom_id], (err, result) => {
        res.json(result);
    });
})

app.post("/api/setPhoto", (req, res) => {
    const userId = req.body.userId;
    const way = req.body.way;
    const sqlInsert = "INSERT INTO `photos`(`user_id`, `way`) VALUES (?,?)";
    db.query(sqlInsert, [userId, way], (err, result) => {
        res.json(result);
    });
})


app.post("/api/setInterest", (req, res) => {
    const userId = req.body.userId;
    const interestId = req.body.interestId;
    const sqlInsert = "INSERT INTO `users_has_interests` (`user_id`, `interest_id`) VALUES (?,?);";
    db.query(sqlInsert, [userId, interestId], (err, result) => {
        res.json(result);
    });
})

app.post("/api/setMainPhoto", (req, res) => {
    const userId = req.body.userId;
    const photoId = req.body.photoId;
    const sqlInsert = "INSERT INTO `main_photos`(`user_id`, `photo_id`) VALUES (?,?)";
    db.query(sqlInsert, [userId, photoId], (err, result) => {
        res.json(result);
    });
})

app.post("/api/sendMessage", (req, res) => {
    const from_id = req.body.from_id;
    const to_id = req.body.to_id;
    const send_time = req.body.send_time;
    const message = req.body.message;
    const sqlInsert = "INSERT INTO `dialogs`(`from_id`, `to_id`, `send_time`, `message`) VALUES (?,?,?,?)";
    db.query(sqlInsert, [from_id, to_id, send_time, message], (err, result) => {
        res.json(result);
    });
})

app.put("/api/updateDescription", (req, res) => {
    const userId = req.body.user_id;
    const description = req.body.description;
    const sqlUpdate = "UPDATE `users` SET `description` = ? WHERE `user_id` = ?";
    db.query(sqlUpdate, [description, userId], (err, result) => {
        res.json(result);
    });
})

app.put("/api/updateLikesCount", (req, res) => {
    const userId = req.body.user_id;
    const count_likes = req.body.count_likes;
    const sqlUpdate = "UPDATE `users` SET `count_likes` = ? WHERE `user_id` = ?";
    db.query(sqlUpdate, [count_likes, userId], (err, result) => {
        res.json(result);
    });
})

app.put("/api/updateMainPhoto", (req, res) => {
    const photo_id = req.body.photo_id;
    const user_id = req.body.user_id;
    const sqlUpdate = "UPDATE `main_photos` SET `photo_id`= ? WHERE `user_id` = ?";
    db.query(sqlUpdate, [photo_id, user_id], (err, result) => {
        res.json(result);
    });
})

app.delete("/api/deleteInterest", (req, res) => {
    const userId = req.query.userId;
    const interestId = req.query.interestId;
    const sqlDelete = "DELETE FROM `users_has_interests` WHERE `user_id` = ? AND `interest_id` = ?";
    db.query(sqlDelete, [userId, interestId], (err, result) => {
        res.json(result);
    });
})

app.delete("/api/deleteLike", (req, res) => {
    const who_id = req.query.who_id;
    const whom_id = req.query.whom_id;
    const sqlDelete = "DELETE FROM `likes` WHERE `who_id` = ? AND `whom_id` = ?";
    db.query(sqlDelete, [who_id, whom_id], (err, result) => {
        res.json(result);
    });
})


app.listen(3001, () => {
    console.log("running on port 3001");
})