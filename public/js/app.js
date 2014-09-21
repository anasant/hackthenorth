jQuery(function ($) {
    'use strict';

    var $endCall = $('#end-call');
    var $startCall = $('#start-call');
    var timeout = 3000;
    var callers = [];
    var connect = null;

    function generateCallers() {
        for (var i = 0; i < 10; i++) {
            callers.push('+' + Math.floor(10000000000 + Math.random() * 90000000000));
        }
    };

    function setup() {
        $.post('http://apollo.mantasmatelis.com/client/new', null, function (data, status) {
            console.log(data);
            if (status === "success") {
                twilioSetup(data);
            }
        });
    }

    function pingServer(id) {
        $.post('http://apollo.mantasmatelis.com/client/' + id + '/ping', null, function (data, status) {
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
        setTimeout(function () {
            timerPost(id)
        }, timeout);
    }

    $startCall.click(function() {
        if (connect == null) return;
        connect.accept();
        callers.push(connect.parameters.From);
        console.log(callers);
        console.log('connected');
        $endCall.click(function () {
            device.disconnectAll();
        });
    });

    Twilio.Device.ready(function (device) {

        var $outNumber = $('#outbound-call');
        function outCall(number) {
            $outNumber.val('');
        }

        device.incoming(function (connection) {


            connect = connection;

            $endCall.click(function () {
                connection.reject();
            })
        });

        $outNumber.submit(function (oEvent) {
            oEvent.preventDefault();
            outCall($outNumber.val());
        })
    })

    generateCallers();
    setup();

});