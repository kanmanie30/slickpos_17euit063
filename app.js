const NGROK_URL = 'http://94c224dcdf64.ngrok.io';
const SECRECT = "jalapeno";
const PORT=process.env.PORT || 3000;

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');  

const app = express();

app.use(cors());
app.use(bodyParser.json());



app.port('/send_link',(req,res)=>{
    if(req.body.email){
        const sub ='123abc';
        const token = jwt.sign({
            "iss": ="LinkServer",
            "exp" : Math.floor(Date.now()/1000)+(60*5),
            "sub": sub,
            "nonce": Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15)
        },SECRECT)
        console.log(token);
        res.status(200).end();
    }else{
        throw new Error("Invalid email address.");
    }
    
});

app.get('/authenticate',(req,res)=>{
    if(req.query.token){
const token=req.query.token;
try{
    const decoded_token = jwt.verify(token,SECRET);
const user_info={
    email:'t@yeah.com',
    name: 'kanmani',
    occupation:'student',
sub:decooded_token.sub}
    const session_id='456zxy';
    res.cookie('sessionid',session_id);
    res.cookie('sub',user_info.sub);
    
    res.redirect(NGROK_URL+'/Welcome')
}
catch(err){
throw new Error (err.message);

}
    }
    else{
        throw new Error('no token.');
    }
res.status(200).end();
});
app.get('/welcome',(req,res)=>{
    res.status(200).send(
        `<h1>Welcome to our chrome</h1>
        <br>
        <h2>u are now logged in</h2>
        <br>
        <h3>click on the extension icon to begine.</h3>`
    );
})
app.use((req,res,next)=>{
    res.status(404).end();

});
app.use((err,req,res,next)=>{
    res.clearCookie('sub');
    res.clearCookie('sessionid');
    
    res.status(err.status||500).send(err.message||'problem.');
});
const server = app.listen(PORT,function(){
    console.log(`server is up and running on port ${server.address().port}.`);
});
