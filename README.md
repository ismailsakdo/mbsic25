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
