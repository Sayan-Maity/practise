const express = require('express');
const router = express.Router();
const Person = require('../models/person');

// Get all persons :
router.get('/', async (req, res) => {
  try {
    const persons = await Person.find();
    console.log(persons);
    res.json(persons);
  } catch (err) {
    res.send('Error', err);
  }
});

// Get a person :
router.get('/:id', async (req, res) => {
  try {
    const persons = await Person.findById(req.params.id);
    res.json(persons);
  } catch (err) {
    res.send('Error', err);
  }
});

// Post/ Saving persons in DB (General Format):
// router.post('/', async (req, res) => {
    //   const person = await Person({
        //     firstName: req.body.firstName,
        //     lastName: req.body.lastName,
//     contact: req.body.contact,
//     email: req.body.email,
//     location: {
//       city: req.body.location.city,
//       country: req.body.location.country,
//       geolocation: {
    //         latitude: req.body.location.geolocation.latitude,
    //         longitude: req.body.location.geolocation.longitude,
//       },
//     },
//   });
//   try {
//     const addPerson = await person.save();
//     res.json(addPerson);
//   } catch (err) {
    //     res.send('Error', err);
    //   }
    // });
    

// Post/ Saving persons in DB (Good Format):
router.post('/', async (req, res) => {
  const {
    firstName,
    lastName,
    contact,
    email,
    location: {
      city,
      country,
      geolocation: { latitude, longitude },
    },
  } = req.body;

  try {
    const addPerson = await Person({
      firstName,
      lastName,
      contact,
      email,
      location: {
        city,
        country,
        geolocation: { latitude, longitude },
      },
    }).save();

    res.json(addPerson);
  } catch (err) {
    res.send('Error', err);
  }
});


// Update person in DB :
router.patch('/:id', async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      // here you are id in url(thats why params) and not from body
      req.params.id,
      req.body,
      { new: true } // return the updated document after the updation is completed
    );
    res.json(updatedPerson);
  } catch (err) {
    res.send("Couldn't update the following request");
  }
});

// Delete person in DB :
router.delete('/:id', async (req, res) => {
  try {
    const deletePerson = await Person.findByIdAndRemove({ _id: req.params.id });
    if (!deletePerson) {
      return res.status(404).send('Person not found !');
    }
    res.json(deletePerson);
  } catch (err) {
    res.status(500).send("Couldn't delete the person");
  }
});

module.exports = router;
