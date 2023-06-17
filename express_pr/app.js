const bodyParser = require('body-parser');
const express = require('express');
const request=require("request")
const https=require("https");
const app = express();


app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));
 
app.get('/', (req, res) => {
  res.sendFile(__dirname+"/signup.html" );
});

app.post("/failure",((req,res)=>{
  res.redirect("/")
}))

app.post('/',((req,res)=>{
  console.log(req.body)
  let email=req.body.email;
  let fname=req.body.firstName;
  let Lname=req.body.lastName
let data={
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:fname,
        LNAME:Lname
      }
    }
  ]
}
let JsonData=JSON.stringify(data);
 const options={
  method:"POST",
  auth:"fibin:54130fcfc724f5b75febf03a39b8c29a-us10"
}
let url='https://us10.api.mailchimp.com/3.0/lists/04a2023cd0'

const request=https.request(url, options, (response=>{ 
  if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html")
  }else{
    res.sendFile(__dirname+"/failure.html")
  }
  response.on("data",(data)=>{
    console.log(JSON.parse(data))
  })
}));
request.write(JsonData);
request.end()

}))

app.listen(process.env.PORT|| 3000, () => {
  console.log(`Server is running on port ${3000}`);
});
//54130fcfc724f5b75febf03a39b8c29a-us10
//04a2023cd0