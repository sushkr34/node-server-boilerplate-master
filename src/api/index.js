import { version } from "../../package.json";
import { Router } from "express";
import Ajv from 'ajv';
var ajv=new Ajv();
import validateAddedTAsk from '../models/validateAddedTask';
import validateMonthWeek from '../models/validateMonthWeek';

export default ({ config, db }) => {
  let api = Router();

  api.get("/gettask", (req, res) => {
    //find id in company table and return the company

    // "SELECT SUM(points)  from task_list where status = true group by uuid"
    db.query("SELECT *  from task_list where status = true  " , (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
				res.json({"response":response.rows});
      }
    });


  });
  // perhaps expose some API metadata he root
  // api.get("/company/:d", (req, res) {
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

  api.post("/addtask", (req, res,next) => {
    //take company from req and insert into company table
     console.log("body", req.body);
    // const {name,address,phonenumber}=req.body;
    const validate =ajv.compile(validateAddedTAsk);
    const valid = validate(req.body)
    if(!valid){
      return next({Errors :validate.errors});
    }

    

    const {task_name,points,month,week,uuid,task_id}=req.body;
    const uuidv1 = require('uuid/v1');
         const taskId =  uuidv1();
       const createdtime = new Date().getTime();  
       console.log(createdtime, "time stamp")
    db.query(`insert into task_list values('${uuid}','${taskId}','${task_name}',${points},'${month}','${week}','2019', false,true,${createdtime})`, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
				res.json({"response":response.rows});
      }
    });
  });


  api.post("/user_task_list", (req, res) => {
    //take company from req and insert into company table
     console.log("body", req.body);
    // const {name,address,phonenumber}=req.body;
    const {month , week, uuid}=req.body;
    db.query(` select * from task_list where month = '${month}' and week = '${week}' and status = true and uuid= '${uuid}' order by task_completion `, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
				res.json({"status":"successfull","response":response.rows});
      }
    });
  });
  api.post("/admin_view_task_list", (req, res) => {
    //take company from req and insert into company table
    
    //  console.log("body", req.body);
    // const {name,address,phonenumber}=req.body;
    
    const {month , week}=req.body;
    db.query(` select * from task_list where month = '${month}' and week = '${week}' and status = true order by uuid `, (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
				res.json({"response":response.rows});
      }
    });
  });
  api.post("/get_chart_points", (req, res) => {
    //find id in company table and return the company
    // "SELECT SUM(points)  from task_list where status = true group by uuid"
    const {month , week}=req.body;
    db.query(`SELECT uuid,SUM(points)  from task_list where  month = '${month}' and week = '${week}' and status = true group by uuid` , (err, response) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(response.rows);
				res.json({"response":response.rows});
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
    db.query(`UPDATE task_list SET task_completion = NOT task_completion WHERE task_id = '${req.params.task_id}'`, (err, response) => {
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



