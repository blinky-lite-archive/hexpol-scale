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
    resourcePath: "UA/gg-scale-server", // this path will be added to the endpoint resource name
     buildInfo : {
        productName: "gg-scale-server",
        buildNumber: "0001",
        buildDate: new Date(2018,8,14)
    },
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
            browseName: "gg-scale"
        });

        var ggScaleWeight01 = 0.0;
        server.engine.addressSpace.addVariable({
            componentOf: device,
            nodeId: "ns=2;s=weight01",
            browseName: "ggScaleWeight01",
            dataType: "Double",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Double, value: ggScaleWeight01 });
                },
                set: function (variant) {
                    ggScaleWeight01 = parseFloat(variant.value);
                    return opcua.StatusCodes.Good;
                }
            }
        });
        var ggScaleValidData01 = true;
        server.engine.addressSpace.addVariable({
            componentOf: device,
            nodeId: "ns=2;s=validData01",
            browseName: "ggScaleValidData01",
            dataType: "Boolean",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.Boolean, value: ggScaleValidData01 });
                },
                set: function (variant) {
                    ggScaleValidData01 = variant.value;
                    return opcua.StatusCodes.Good;
                }
            }
        });
        var ggScaleTimeStamp01 = '0';
        server.engine.addressSpace.addVariable({
            componentOf: device,
            nodeId: "ns=2;s=timeStamp01",
            browseName: "ggScaleTimeStamp01",
            dataType: "String",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.String, value: ggScaleTimeStamp01 });
                },
                set: function (variant) {
                    ggScaleTimeStamp01 = variant.value;
                    return opcua.StatusCodes.Good;
                }
            }
        });
        var ggScaleUnit01 = 'g';
        server.engine.addressSpace.addVariable({
            componentOf: device,
            nodeId: "ns=2;s=unit01",
            browseName: "ggScaleUnit01",
            dataType: "String",
            value: {
                get: function () {
                    return new opcua.Variant({dataType: opcua.DataType.String, value: ggScaleUnit01 });
                },
                set: function (variant) {
                    ggScaleUnit01 = variant.value;
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
