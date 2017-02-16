// Write your package code here!

// Variables exported by this module can be imported by other packages and
// applications. See mongo-explain-tests.js for an example of importing.
// import MongoInternals from 'meteor/mongo';

const Explainer = new Mongo.Collection('mongo-explainer');
const originalFind = MongoInternals.Connection.prototype.find;

MongoInternals.Connection.prototype.find = function(collectionName, selector, mod, options) {
  try {
    let collection = this.rawCollection(collectionName);
    let query, explainSelector = "";
    let cleanedSelector = looper(selector);
    if (options) {
      query = `${collectionName}.find(${JSON.stringify(cleanedSelector)}, ${JSON.stringify(options)})`;
      explainSelector = `${cleanedSelector}, ${options}`;
    } else {
      query = `${collectionName}.find(${JSON.stringify(cleanedSelector)})`;
      explainSelector = cleanedSelector;
    }
    let res = Explainer.upsert({query}, {$setOnInsert: {count: 1}, $inc: {count: 1}});
    if (res.insertedId) {
      let explainPromise = collection.find(explainSelector).explain();
      explainPromise.then((explain) => {
        let plan = explain.queryPlanner.winningPlan;
        let filter = !!plan.filter;
        let response = Explainer.upsert({_id: res.insertedId}, {$set: {stage: plan.stage, inputStage: plan.inputStage, filter}});
      }).catch((error) => {console.log(error);});
    }
  } catch (e) {
    console.log(e);
  }
  let returnVal = originalFind.apply(this, arguments);
  return returnVal;
};

const looper = (selector) => {
  let cleanedSelector = {};
  _.each(selector, (val, key) => {
    if (val === null) {
      cleanedSelector[key] = null;
    } else if (val.constructor === String || val.constructor === Number) {
      let cleanVal = '123';
      cleanedSelector[key] = cleanVal;
    } else if (val.constructor === Array) {
      if (val[0].constructor === String) {
        let cleanVal = '123';
        cleanedSelector[key] = [cleanVal];
      } else {
        let cleanVal = _.map(val, (v) => {
          return looper(v);
        });
        cleanedSelector[key] = cleanVal;
      }
    } else if (val.constructor === Object) {
      let cleanVal = looper(val);
      cleanedSelector[key] = cleanVal;
    }
  });
  return cleanedSelector
}

export const name = 'mongo-explain';
