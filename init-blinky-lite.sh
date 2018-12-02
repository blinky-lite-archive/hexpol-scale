#!/bin/bash
sudo su - pi -c "/usr/bin/screen -S opcServer -d -m /home/pi/blinky-lite/run-opc-ua-server.sh"
sudo su - pi -c "/usr/bin/screen -S nodered -d -m /home/pi/blinky-lite/run-blinky-lite-ui.sh"
