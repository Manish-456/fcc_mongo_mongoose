const mongoose = require('mongoose');


require('dotenv').config();

let Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  favoriteFoods: [
    {
      type: String
    }
  ]
});

const Person = mongoose.model("Person", personSchema);


// console.log(user)

const createAndSavePerson = (done) => {
  const anynomousHacker = new Person({
    name: "Anynomous",
    age: 21,
    favoriteFoods: ["Burger", "Pizza"]
  })

  anynomousHacker.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
   Person.create(arrayOfPeople, function(err, people){
     if(err) return console.error(err);
     done(null , people);
   })
};

const findPeopleByName = (personName, done) => {
  Person.find({
    name: personName
  }, function(err, data){
    if(err) return console.error(err);
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({
    favoriteFoods: {
      $in: [food]
    }
  }, function(err, data){
    if(err) return console.error(err)
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data){
    if(err) return console.error(err)
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, data){
    if(err) return console.error(err)
    data.favoriteFoods.push(foodToAdd);
    data.save(function(err, person){
      if(err) return console.error(err);
      done(null, person)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({
    name: personName
  }, {
    $set: {
      age: ageToSet
    }
  },{
    new: true
  }, function(err, data){
    if(err) console.error(err);
    done(null ,data);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId, function(err, data){
    if(err) return console.error(err);
    done(null , data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({
    name: nameToRemove
  }, (err, data) => {
    if(err) console.error(err);
    done(null ,data);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({
    favoriteFoods: {
      $in: [foodToSearch]
    }
  })
  .sort({
    name: "asc"
  })
  .limit(2)
  .select("-age")
  .exec((err, data) => {
    if(err) return console.error(err);
    done(null, data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
