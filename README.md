# Mongo Explainer

Mongo Explainer is a simple Meteor package that runs in development mode to watch all your mongo queries. It strips them down to parts to ensure we only track single queries no matter the ids, etc. We then run an explain on the query and save it all to a mongo collection for you to browse though.

## Why build Mongo Explainer?

Kadira is going away and I needed a quick way to find out which queries are slow and which ones aren't.

## Installing Mongo Explainer

`meteor add joshowens:mongo-explainer`
