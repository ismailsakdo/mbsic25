# 🏸 Micro:bit ML Badminton Stroke Counter (Radio & AI)

This project demonstrates a real-time system for counting classified movements using two BBC micro:bits communicating wirelessly via radio.

The system is designed to track four specific badminton strokes/states that were trained using the **micro:bit Create AI** tool.

## ⚙️ System Components & Roles

| Component | Role | Required Code/Setup | 
| :--- | :--- | :--- | 
| **Transmitter** | **Motion Detector (AI)**: Worn on the racket or hand. It runs the trained Machine Learning model to detect movement and sends a unique radio signal upon classification. | **Trained ML Model** (`.hex` file) + **Transmitter JavaScript** | 
| **Receiver** | **Counter & Display**: Used as a static display unit. It receives the radio signals, increments the specific stroke counter, plays a tone, and allows the user to view/reset the scores. | **Receiver JavaScript** | 

## 1. Transmitter Setup (ML Detection)

The transmitter must be flashed with a `.hex` file that contains the core MakeCode program AND the embedded ML model data.

### 1.1 Radio Signal Mapping

The system uses specific, unique numbers for reliable radio communication between the two devices.

| Movement Class | Radio Number Sent | Tone on Receiver | 
| :--- | :--- | :--- | 
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
