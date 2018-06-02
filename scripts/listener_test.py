#!/usr/bin/python

# Import the modules to send commands to the system and access GPIO pins
import RPi.GPIO as gpio
import os

#Set pin numbering to board numbering
gpio.setmode(gpio.BOARD)

#Set up pin 7 as an input
gpio.setup(5, gpio.IN) 

# Set up an interrupt to look for pressed button
gpio.wait_for_edge(5, gpio.FALLING) 

# Shutdown
os.system('shutdown now -h')
