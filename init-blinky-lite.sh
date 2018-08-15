#!/bin/bash
sudo su - pi -c "/usr/bin/screen -S opcServer -d -m /home/pi/blinky-lite/run-gg-scale-opc-ua-server.sh"
sudo su - pi -c "/usr/bin/screen -S mqttUI -d -m /home/pi/blinky-lite/run-gg-scale-ui-mqtt.sh"
sudo su - pi -c "/usr/bin/screen -S opcUI -d -m /home/pi/blinky-lite/run-gg-scale-ui-opc-ua.sh"
