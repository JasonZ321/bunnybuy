import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.call("start_scraper", function(error, result){
    if(error){
      console.log("error", error);
    }
    if(result){
      console.log("results");
    }
  });
});
