const sql = require('../model/connection');

var User = function (user) {
  this.id = user.id;
  this.state = user.state;
  this.district = user.district;
  this.city = user.city;
  this.status = user.status || false
};


//  bulk post
User.create = async (data, res) => {
  console.log(data);

  const value = JSON.stringify(data);

  console.log(value[0].city);


try {
    for (let i = 0; i < data.length; i++) {
      // const element = array[index];
  
      await sql.query(`INSERT INTO cities (state,district,city,status) values('${data[i].state}','${data[i].district}','${data[i].city}','${data[i].status}')`, (err, result) => {
        if (err) {
          console.log(err);
        }
      })
  
    }
    res.send(data)
} catch (err) {
  res.send(err)
}
};

User.get = (from, to) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM cities limit ${from},${to} `;
    sql.query(query, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  })

};

// single post

// User.create = (newuser, result) => {
//   sql.query("INSERT INTO cities SET ?", newuser, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     console.log("create the new user: ", { id: res.insertId, ...newuser });
//     result(null, { id: res.insertId, ...newuser });
//   });
// };

module.exports = User;