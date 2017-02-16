// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by mongo-explain.js.
import { name as packageName } from "meteor/mongo-explain";

// Write your tests here!
// Here is an example.
Tinytest.add('mongo-explain - example', function (test) {
  test.equal(packageName, "mongo-explain");
});
