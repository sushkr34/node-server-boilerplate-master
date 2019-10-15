import { version } from "../../package.json";
import { Router } from "express";

export default ({ config, db }) => {
  let api = Router();

  api.get("/gettask", (req, res) => {
    //find id in company table and return the company
    db.query("SELECT * from task_list where status = true", (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
				res.json({"companies":response.rows});
      }
    });


  });
  // perhaps expose some API metadata at the root
  // api.get("/company/:id", (req, res) => {
  //   //find id in company table and return the company
  //   db.query(`SELECT * from company where id=${req.params.id}`, (err, response) => {
  //     if (err) {
  //       console.log(err.stack);
  //     } else {
  //       console.log(response.rows);
	// 			res.json({"companies":response.rows});
  //     }
  //   });
  // });

  api.post("/addtask", (req, res) => {
    //take company from req and insert into company table
     console.log("body", req.body);
    // const {name,address,phonenumber}=req.body;
    const {task_name,points,month,week,user_id,task_id}=req.body;
    db.query(`insert into task_list values('${user_id}','${task_id}','${task_name}',${points},'${month}','${week}','2019', false,true,'10/10/2019, 10:06:30 AM')`, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
				res.json({"status":"successfull","response":response.rows});
      }
    });
  });

  api.post("/user_task_list", (req, res) => {
    //take company from req and insert into company table
     console.log("body", req.body);
    // const {name,address,phonenumber}=req.body;
    const {month , week, user_id}=req.body;
    db.query(` select * from task_list where month = '${month}' and week = '${week}' and status = true and user_id= '${user_id}' `, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
				res.json({"status":"successfull","response":response.rows});
      }
    });
  });

  
  api.put("/delete/:task_id",(req,res)=>{
    console.log (req,"inputtttt")
    console.log(typeof(req.params.task_id))
    
console.log( req.params.task_id)
    db.query(`UPDATE task_list SET status = NOT status WHERE task_id = '${req.params.task_id}'`, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
				res.json({"status":"successfull","response":response.rows});
      }
    });

  })

  api.put("/updatetaskstatus/:task_id",(req,res)=>{
    console.log("body",req.body)
    db.query(`UPDATE task_list SET task_completion = NOT status WHERE task_id = '${req.params.task_id}'`, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
				res.json({"status":"successfull","response":response.rows});
      }
    });



  })
  
  // api.delete("/company/:id", (req, res) => {
  //   console.log("req", req.params);
  //   //take company id from path and find the id and update flag
  //   res.json({ version, status: "live", method: "delete" });
  // });
  return api;
};
