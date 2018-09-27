/*global require,setInterval,console */
var opcua = require("node-opcua");
var dotenv = require('dotenv')
dotenv.config();

var userManager = {
    isValidUser: function (userName, password) {
      if (userName === process.env.OPC_UA_USER && password === process.env.OPC_UA_PASSWORD) {
        console.log('New Connection.');
        return true;
      }
      return false;
    }
};

// Let's create an instance of OPCUAServer
var server = new opcua.OPCUAServer({
    port: 4334, // the port of the listening socket of the server
    resourcePath: "SMC", // this path will be added to the endpoint resource name
    userManager: userManager,
    allowAnonymous: false,
    alternateHostname:'83.251.160.30'
});

function post_initialize() {
    console.log("Initialized.");

    function construct_my_address_space(server) {

        var addressSpace = server.engine.addressSpace;

        // declare a new object
        var device = addressSpace.addObject({
            organizedBy: addressSpace.rootFolder.objects,
            browseName: "Scale1"
        });

        var Scale1Weight = 0.0;
        server.engine.addressSpace.addVariable({
            componentOf: device,
            nodeId: "ns=2;s=Weight",
            browseName: "Weight",
            dataType: "Double",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Double, value: Scale1Weight });
                },
                set: function (variant) {
                    Scale1Weight = parseFloat(variant.value);
                    return opcua.StatusCodes.Good;
                }
            }
        });
        var Scale1DataValid = true;
        server.engine.addressSpace.addVariable({
            componentOf: device,
            nodeId: "ns=2;s=DataValid",
            browseName: "DataValid",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean, value: Scale1DataValid });
                },
                set: function (variant) {
                    Scale1DataValid = variant.value;
                    return opcua.StatusCodes.Good;
                }
            }
        });
        var Scale1ToggleUnit = false;
        server.engine.addressSpace.addVariable({
            componentOf: device,
            nodeId: "ns=2;s=ToggleUnit",
            browseName: "ToggleUnit",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean, value: Scale1ToggleUnit });
                },
                set: function (variant) {
                    Scale1ToggleUnit = variant.value;
                    return opcua.StatusCodes.Good;
                }
            }
        });
        var Scale1ZeroScale = false;
        server.engine.addressSpace.addVariable({
            componentOf: device,
            nodeId: "ns=2;s=ZeroScale",
            browseName: "ZeroScale",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean, value: Scale1ZeroScale });
                },
                set: function (variant) {
                    Scale1ZeroScale = variant.value;
                    return opcua.StatusCodes.Good;
                }
            }
        });
        var Scale1TimeStamp = '0';
        server.engine.addressSpace.addVariable({
            componentOf: device,
            nodeId: "ns=2;s=TimeStamp",
            browseName: "TimeStamp",
            dataType: "String",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.String, value: Scale1TimeStamp });
                },
                set: function (variant) {
                    Scale1TimeStamp = variant.value;
                    return opcua.StatusCodes.Good;
                }
            }
        });
        var Scale1Unit = 'g';
        server.engine.addressSpace.addVariable({
            componentOf: device,
            nodeId: "ns=2;s=Unit",
            browseName: "Unit",
            dataType: "String",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.String, value: Scale1Unit });
                },
                set: function (variant) {
                    Scale1Unit = variant.value;
                    return opcua.StatusCodes.Good;
                }
            }
        });
    }
    construct_my_address_space(server);
    server.start(function() {
        console.log("Server is now listening ... ( press CTRL+C to stop)");
        console.log("port ", server.endpoints[0].port);
        var endpointUrl = server.endpoints[0].endpointDescriptions()[0].endpointUrl;
        console.log(" the primary server endpoint url is ", endpointUrl );
    });
}
server.initialize(post_initialize);
