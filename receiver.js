/**
 * Variables to store the counts for each movement
 */
/**
 * Menu variable: 0=Idle, 1=Swing, 2=Backhand, 3=Smash
 */
// Function to handle incoming radio signals (strokes/numbers)
radio.onReceivedNumber(function (receivedNumber) {
    // Check the received number and update the corresponding counter
    if (receivedNumber == 1) {
        // Idle
        idleCount += 1
        music.playTone(262, music.beat(BeatFraction.Half))
        // Idle icon
        basic.showIcon(IconNames.Pitchfork)
    } else if (receivedNumber == 10) {
        // Backhand
        backhandCount += 1
        music.playTone(330, music.beat(BeatFraction.Half))
        // Backhand icon
        basic.showIcon(IconNames.Happy)
    } else if (receivedNumber == 100) {
        // Swing
        swingCount += 1
        music.playTone(392, music.beat(BeatFraction.Half))
        // Swing icon
        basic.showIcon(IconNames.House)
    } else if (receivedNumber == 1000) {
        // Smash
        smashCount += 1
        music.playTone(523, music.beat(BeatFraction.Half))
        // Smash icon
        basic.showIcon(IconNames.SmallSquare)
    }
    // Brief pause to see the icon and hear the sound
    basic.pause(500)
    // Clear screen after movement indication
    basic.clearScreen()
})
// ---
// Button A: Display Counter for the currently selected Menu item
input.onButtonPressed(Button.A, function () {
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
// Button B: Change Menu/Selected Movement
input.onButtonPressed(Button.B, function () {
    // Cycles through 0, 1, 2, 3
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
// Button A+B (Gesture.Shake): Reset all counters
input.onGesture(Gesture.Shake, function () {
    swingCount = 0
    backhandCount = 0
    smashCount = 0
    idleCount = 0
    // Long low tone for reset confirmation
    music.playTone(196, music.beat(BeatFraction.Double))
    // Visual confirmation of reset
    basic.showIcon(IconNames.No)
    basic.pause(500)
    basic.clearScreen()
})
let label = ""
let currentCount = 0
let menu = 0
let smashCount = 0
let swingCount = 0
let backhandCount = 0
let idleCount = 0
// ---
// Configuration on Start: Sets the radio group
radio.setGroup(1)
// Ready indicator
basic.showIcon(IconNames.Yes)
