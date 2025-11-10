# 🏸 Micro:bit ML Badminton Stroke Counter (Radio & AI)

This project demonstrates a real-time system for counting classified movements using two BBC micro:bits communicating wirelessly via radio.

The system is designed to track four specific badminton strokes/states that were trained using the **micro:bit Create AI** tool.

## ⚙️ System Components & Roles

| Component | Role | Required Code/Setup | 
 | ----- | ----- | ----- | 
| **Transmitter** | **Motion Detector (AI)**: Worn on the racket or hand. It runs the trained Machine Learning model to detect movement and sends a unique radio signal upon classification. | **Trained ML Model** (`.hex` file) + **Transmitter JavaScript** | 
| **Receiver** | **Counter & Display**: Used as a static display unit. It receives the radio signals, increments the specific stroke counter, plays a tone, and allows the user to view/reset the scores. | **Receiver JavaScript** | 

## 1. Transmitter Setup (ML Detection)

The transmitter must be flashed with a `.hex` file that contains the core MakeCode program AND the embedded ML model data.

### 1.1 Radio Signal Mapping

The system uses specific, unique numbers for reliable radio communication between the two devices.

| Movement Class | Radio Number Sent | Tone on Receiver | 
 | ----- | ----- | ----- | 
| **Idle** | `1` | Low C (Note.C) | 
| **Back Hand** | `10` | Mid E (Note.E) | 
| **Swing** | `100` | Mid G (Note.G) | 
| **Smash** | `1000` | High C (Note.C5) | 

### 1.2 Transmitter Code

This code must be combined with your trained model (by importing the ML `.hex` file first) and flashed onto the motion-detecting micro:bit.

```javascript
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

## 2. Receiver Setup (Counter & Display)

The receiver keeps track of all incoming strokes and manages the display menu via the micro:bit buttons.

### 2.1 Receiver Code

```javascript
// Variables to store the counts for each movement
let swingCount = 0
let backhandCount = 0
let smashCount = 0
let idleCount = 0
// Menu variable: 0=Idle, 1=Swing, 2=Backhand, 3=Smash
let menu = 0 

// ---

// Configuration on Start: Sets the radio group
radio.setGroup(1) 
basic.showIcon(IconNames.Yes) // Ready indicator

// ---

// Function to handle incoming radio signals (strokes/numbers)
radio.onReceivedNumber(function (receivedNumber) {
    // Check the received number and update the corresponding counter and sound
    if (receivedNumber == 1) { // Idle
        idleCount++
        music.playTone(Note.C, music.beat(BeatFraction.Half))
        basic.showIcon(IconNames.Pitchfork) 
    } else if (receivedNumber == 10) { // Backhand
        backhandCount++
        music.playTone(Note.E, music.beat(BeatFraction.Half))
        basic.showIcon(IconNames.Happy) 
    } else if (receivedNumber == 100) { // Swing
        swingCount++
        music.playTone(Note.G, music.beat(BeatFraction.Half))
        basic.showIcon(IconNames.House) 
    } else if (receivedNumber == 1000) { // Smash
        smashCount++
        music.playTone(Note.C5, music.beat(BeatFraction.Half))
        basic.showIcon(IconNames.SmallSquare) 
    }
    
    basic.pause(500) // Brief pause to see the icon and hear the sound
    basic.clearScreen() // Clear screen after movement indication
})

// ---

// Button B: Change Menu/Selected Movement
// Cycles through the 4 movement counters (0-3)
input.onButtonPressed(Button.B, function () {
    menu = (menu + 1) % 4 
    
    // Display the currently selected menu item (short label)
    if (menu == 0) {
        basic.showString("IDL")
    } else if (menu == 1) {
        basic.showString("SWG")
    } else if (menu == 2) {
        basic.showString("BHD")
    } else if (menu == 3) {
        basic.showString("SMH")
    }
    basic.pause(500)
    basic.clearScreen()
})

// ---

// Button A: Display Counter for the currently selected Menu item
input.onButtonPressed(Button.A, function () {
    let currentCount = 0
    let label = ""

    // Determine which count and label to show based on the current 'menu' index
    if (menu == 0) {
        currentCount = idleCount
        label = "IDL:"
    } else if (menu == 1) {
        currentCount = swingCount
        label = "SWG:"
    } else if (menu == 2) {
        currentCount = backhandCount
        label = "BHD:"
    } else if (menu == 3) {
        currentCount = smashCount
        label = "SMH:"
    }

    // Display the label and the count
    basic.showString(label) 
    basic.showNumber(currentCount)
    basic.pause(1000)
    basic.clearScreen()
})

// ---

// Reset: Use the Shake Gesture (A+B) to reset all counters
input.onGesture(Gesture.Shake, function () {
    swingCount = 0
    backhandCount = 0
    smashCount = 0
    idleCount = 0
    music.playTone(Note.G3, music.beat(BeatFraction.Double)) // Low tone for reset confirmation
    basic.showIcon(IconNames.No) // Visual confirmation of reset
    basic.pause(500)
    basic.clearScreen()
})

## 3. How to Use the Counter

| Action | Device | Result | 
 | ----- | ----- | ----- | 
| **Perform Stroke** | **Transmitter** | Model detects the movement, sends radio signal (e.g., 100). | 
| **Received Signal** | **Receiver** | Plays distinct tone and briefly flashes the stroke icon. Counter increments by 1. | 
| **Change Menu** | **Receiver Button B** | Cycles the display menu through **IDL** > **SWG** > **BHD** > **SMH**. | 
| **View Count** | **Receiver Button A** | Displays the label and total count for the currently selected stroke (e.g., `SWG: 5`). | 
| **Reset** | **Receiver Shake** (A+B) | Resets all four counters (`idleCount`, `swingCount`, etc.) to zero. |
