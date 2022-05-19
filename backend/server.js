const express =  require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const data = require("./data/people.json");
const cors = require('cors')
const bodyParser = require("body-parser");
const Contact = require("./models/contactModel");

dotenv.config();

const app = express();


connectDB();

const PORT = process.env.PORT || 5000

app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use("/images", express.static( __dirname + "/images"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// CRUD Operations Contact Routes

//@path /contact
//@desc adding new contact
//@method post
//@access public
app.route("/contact").post((req, res) => {
	let newContact = new Contact(req.body);

	newContact.save((err, contact) => {
		if (err) {
			res.send(err);
		}
		res.json(contact);
	});
});

//@path /contact
//@desc getting all contacts created
//@method get
//@access public
app.route("/contact").get((req, res) => {
	Contact.find({}, (err, contact) => {
		if (err) {
			res.send(err);
		}
		res.json(contact);
	});
});

//@path /contact/:contactID
//@desc getting contact by ID
//@method get
//@access public
app.route("/contact/:contactID").get((req, res) => {
	Contact.findById(req.params.contactID, (err, contact) => {
		if (err) {
			res.send(err);
		}
		res.json(contact);
	});
});

//@path /contact/:contactID
//@desc updating contact by ID
//@method put
//@access public
app.route("/contact/:contactID").put((req, res) => {
	Contact.findOneAndUpdate(
		{ _id: req.params.contactID },
		req.body,
		{ new: true, useFindAndModify: false },
		(err, contact) => {
			if (err) {
				res.send(err);
			}
			res.json(contact);
		}
	);
});

//@path /contact/:contactID
//@desc deleting contact by ID
//@method delete
//@access public
app.route("/contact/:contactID").delete((req, res) => {
	Contact.deleteOne({ _id: req.params.contactID }, (err, message) => {
		if (err) {
			res.send(err);
		}
		res.json({ message: "contact successfully deleted" });
	});
});


// CRUD Operations Contact Routes End





app.get("/profiles", (req,res) =>{
// res.send(`get request is sending on port ${PORT}`);
res.json(data);
})

app.get("/user/:id", (req,res,next) =>{
    // res.send(`get request is sending on port ${PORT}`);
    console.log(req.params.id);  //string
    let user = Number(req.params.id); //Number /Integer
    console.log(user);
    console.log(data[user]);
    res.send(data[user])
    next()
    },
    (req,res) =>{
        console.log("The second function");
    }
    )



    // app.get("/item", (req,res) =>{
    //     // res.end(); // to end the to display non
    //     res.redirect("https://www.linkedin.com/");   //redirect to next page

    //     })


        app
        .route("/item")
        .get((req, res) => {
            res.send(`get request is sending on port ${PORT}`);
            })
        
        
            .put((req,res) =>{
                res.send(`put request is sending on port ${PORT}`);
                })
        
                .delete((req, res) => {
                    res.send(`delete request is sending on port ${PORT}`);
                    });


// app.post("/item", (req,res) =>{
//     res.send(`post request is sending on port ${PORT}`);
//     })


//     app.put("/newItem", (req,res) =>{
//         res.send(`put request is sending on port ${PORT}`);
//         })

//         app.delete("/newItem", (req,res) =>{
//             res.send(`delete request is sending on port ${PORT}`);
//             })


app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
