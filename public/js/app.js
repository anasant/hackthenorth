jQuery(function($) {
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
  }

  Twilio.Device.ready(function(device){
      var $outNumber = $('#outbound-call');

      function outCall(number){
        $outNumber.val('');
      }

      device.incoming(function(connection) {
        if (window.confirm("Incoming Call")) {
            connection.accept();
            console.log('connected');
        }
        connection.reject();
      });

      $outNumber.submit(function(oEvent){
          oEvent.preventDefault();
          outCall($outNumber.val());
      })
  })

  setup();

});