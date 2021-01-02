require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const nodemailer = require('nodemailer');
const xoauth2 = require("simple-oauth2");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

//create a transporter to send emails
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCESS_TOKEN,
        expires: 1484314697598
    }
});

const notificationMessage = {
    success:" ",
    failure: " "
  };

app.get("/", function(req, res) {
    res.render("home");
})

app.get("/join", function(req, res) {
    res.render("join");
})

//handles the form for booking 
app.post("/", function(req, res) {
    
    const name = req.body.name;
    const email = req.body.email;
    const number = req.body.phone;
    const message = req.body.message;
    const date = req.body.date;
    const program_type = req.body.program_type;
    const service = req.body.service;


     //send booking request to  mail. 
     const mailOptions = {
        from: 'From Interflow Site<interflowcrew@gmail.com>',
        to: 'opoku.fred@outlook.com', 
        subject: 'Interflow Booking Request',
        text: "Client name: " + name + "\n\n" + "Email: " + email +"\n\n" + "Phone number: "+ number + "\n\n" + "Program description: " + message +"\n\n" + "Program date: " + date +
        "\n\n" + "Program type: " + program_type + "\n\n" + "Service required: " + service
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            notificationMessage.failure = "Ooops!! Something went wrong. Please try again or contact us via email or on social media";
         res.render("info", {notificationMessage: notificationMessage });
        } else {
             notificationMessage.success = "Thanks for contacting the Interflow Crew. We will attend to your request and get back to you as soon as possible";
          res.render("info", {notificationMessage:  notificationMessage});
          console.log("mail sent");
        }
      });

       //send joining request to  mail.
    const mailOptions1 = {
        from: 'From Interflow Site<interflowcrew@gmail.com>',
        to: 'awua10@gmail.com', 
        subject: 'Interflow booking Request',
        text: "Client name: " + name + "\n\n" + "Email: " + email +"\n\n" + "Phone number: "+ number + "\n\n" + "Program description: " + message +"\n\n" + "Program date: " + date +
        "\n\n" + "Program type: " + program_type + "\n\n" + "Service required: " + service
      };

      transporter.sendMail(mailOptions1, function(error, info){
       
      });

});

//handles joining request
app.post("/join", function(req, res) {

    const name = req.body.name;
    const email = req.body.email;
    const number = req.body.phone;
    const reason = req.body.reason;
    const experience = req.body.experience;
    const rehearsal_times = req.body.rehearsal_times;
    const social_media = req.body.social_media;
   
    //send joining request to  mail.
    const mailOptions = {
        from: 'From Interflow Site<interflowcrew@gmail.com>',
        to: 'opoku.fred@outlook.com', 
        subject: 'Interflow Joining Request',
        text: "Name: " + name + "\n\n" + "Email: " + email +"\n\n" + "Phone number: "+ number + "\n\n" + "Reason for joining: " + reason +"\n\n" + "Experience: " + experience +
        "\n\n" + "Personal Rehearsals: " + rehearsal_times + "\n\n" + "Social media handles: " + social_media
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            notificationMessage.failure = "Ooops!! Something went wrong. Please try again or contact us via email or on social media";
         res.render("info", {notificationMessage: notificationMessage });
        } else {
             notificationMessage.success = "Thanks for expressing interest to join Interflow Crew. We will get back to you as soon as possible";
          res.render("info", {notificationMessage:  notificationMessage});
          console.log("mail sent");
        }
      });

      //send joining request to  mail.
    const mailOptions1 = {
        from: 'From Interflow Site<interflowcrew@gmail.com>',
        to: 'awua10@gmail.com', 
        subject: 'Interflow Joining Request',
        text: "Name: " + name + "\n\n" + "Email: " + email +"\n\n" + "Phone number: "+ number + "\n\n" + "Reason for joining: " + reason +"\n\n" + "Experience: " + experience +
        "\n\n" + "Personal Rehearsals: " + rehearsal_times + "\n\n" + "Social media handles: " + social_media
      };

      transporter.sendMail(mailOptions1, function(error, info){
       
      });
    
})

app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000.");
});