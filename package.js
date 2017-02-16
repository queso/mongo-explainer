Package.describe({
  name: 'joshowens:mongo-explainer',
  version: '0.1.2',
  // Brief, one-line summary of the package.
  summary: 'Learn which mongo queries need indexed.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/queso/mongo-explainer',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md',
  debugOnly: true
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.2.3');
  api.use('ecmascript');
  api.use('mongo');
  api.mainModule('mongo-explainer.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('joshowens:mongo-explainer');
  api.mainModule('mongo-explainer-tests.js');
});
