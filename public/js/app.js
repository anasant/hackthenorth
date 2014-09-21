jQuery(function($) {
  'use strict';

  var timeout = 3000;

  function setup() {
    $.post('http://apollo.mantasmatelis.com/client/new', null, function(data, status) {
      console.log(data);
      if (status === "success") {
        twilioSetup(data);
      }
    });
  }

  function pingServer(id) {
      $.post('http://apollo.mantasmatelis.com/client/' + id + '/ping', null, function(data, status){
          console.log(status);
      });
  }

  function twilioSetup(data) {
    timerPost(data.id);
    console.log(data.id);
    console.log(data.token);
    Twilio.Device.setup(data.token);
  }

    function timerPost(id) {
        pingServer(id);
        setTimeout(function() {
            timerPost(id)
        }, timeout);
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