(function() {
  'use strict';

  function setup() {
    $.post('http://apollo.mantasmatelis.com/client/new', null, function(data, status) {
      console.log(data);
      if (status === "success") {
        twilioSetup(data);
      }
    });
  }

  function twilioSetup(token) {
    Twilio.Device.setup(token);
    Twilio.Device.incoming(function(connection) {
      connection.accept();
      console.log('connected');
    });
  }

  setup();

})();