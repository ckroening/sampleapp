var mongoose = require('mongoose');
var Task = require('./tasks');
var Shift = require('./shifts');
var Volunteer = require('./volunteers');

// creates an Event schema
var EventSchema = new mongoose.Schema ({
  name: {type: String, required: true},
  description: {type: String, required: true},
  startDate: {type: Date, required: true},
  endDate: {type: Date, required: true},
  host: {type: String, required: true}
});

// Deletes Event and all associated Categories and Items
EventSchema.statics.delete = function(id, callback) {
  // Deletes the Event using the Event ID
  this.findById(id, function(err, result) {
    if(err) {
      callback(err);
    } else if(result != undefined){
      result.remove(callback);
    }
  });
  // Deletes all associated Tasks, Shifts, and Volunteers by using Task.delete method.
  Task.find({event_id: id}, function(err, data) {
    if(err) {
      callback(err);
    } else if(data) {
      dataforEach(function(record) {
        console.log(record._id);
        var ID = record._id;
        Task.delete(ID, function(err) {
          if (err) {
            callback(err);
          }
        })
      });
    }
  });
};

module.exports = mongoose.model('Event', EventSchema);