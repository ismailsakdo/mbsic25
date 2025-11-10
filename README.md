🏸 Micro:bit ML Badminton Stroke Counter

This project uses Machine Learning (ML) on one BBC micro:bit (the Transmitter) to classify badminton strokes and sends the results via radio to a second micro:bit (the Receiver), which acts as a score counter and menu display.

⚙️ Project Overview

Component

Role

Code

Transmitter

Motion Detector (ML). Detects 4 movements (Swing, Backhand, Smash, Idle) and sends a unique radio signal for each.

transmitter.js

Receiver

Counter & Display. Receives radio signals, increments the corresponding stroke counter, plays a distinct sound, and displays the current count via an interactive menu.

receiver.js

1. Transmitter Setup (Motion Detector)

This micro:bit must have the trained ML model (from micro:bit Create AI) loaded first. Its job is to detect the motion and send a numeric signal over the radio.

Radio Signal Mapping

Movement Class

Radio Number Sent

Purpose

Idle

1

Resting movement.

Back Hand

10

Backhand stroke count.

Swing

100

Generic swing/forehand count.

Smash

1000

Smash stroke count.

Transmitter Code (transmitter.js)

You must import your .hex file (containing the ML model) into the MakeCode editor before adding this JavaScript code.

// --- Configuration ---
// Set the radio channel group to match the receiver
radio.setGroup(1)
basic.showIcon(IconNames.Happy) // Ready indicator on start

// --- ML Detection Logic ---
// When the model detects the movement, send the corresponding number.

// 1. Idle (Number: 1)
ml.onStart(ml.event.Idle, function () {
    radio.sendNumber(1)
    basic.showString("IDL") // Quick confirmation display
})

// 2. Back Hand (Number: 10)
ml.onStart(ml.event.BackHand, function () {
    radio.sendNumber(10)
    basic.showString("BHD")
})

// 3. Swing (Number: 100)
ml.onStart(ml.event.Swing, function () {
    radio.sendNumber(100)
    basic.showString("SWG")
})

// 4. Smash (Number: 1000)
ml.onStart(ml.event.Smash, function () {
    radio.sendNumber(1000)
    basic.showString("SMH")
})
