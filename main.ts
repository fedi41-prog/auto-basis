radio.onReceivedValue(function (name, value) {
    if (verbunden == 1) {
        if (radio.receivedPacket(RadioPacketProperty.SerialNumber) == sender_serriennummer) {
            if (activ == 1) {
                if (name == "D") {
                    if (value == control.deviceSerialNumber()) {
                        activ = 0
                        basic.showLeds(`
                            # . . . #
                            . # . # .
                            . . # . .
                            . # . # .
                            # . . . #
                            `)
                    }
                } else if (name == "motorL") {
                    if (value == 0) {
                        calliBot2.motorStop(C2Motor.links, C2Stop.Bremsen)
                    } else {
                        if (richtung == 1) {
                            calliBot2.motor(C2Motor.links, C2Dir.vorwaerts, value)
                        } else {
                            calliBot2.motor(C2Motor.links, C2Dir.rueckwaerts, value)
                        }
                    }
                } else if (name == "motorR") {
                    if (value == 0) {
                        calliBot2.motorStop(C2Motor.rechts, C2Stop.Bremsen)
                    } else {
                        if (richtung == 1) {
                            calliBot2.motor(C2Motor.rechts, C2Dir.vorwaerts, value)
                        } else {
                            calliBot2.motor(C2Motor.rechts, C2Dir.rueckwaerts, value)
                        }
                    }
                } else if (name == "SetDir") {
                    richtung = value
                }
            } else if (name == "A") {
                if (value == control.deviceSerialNumber()) {
                    activ = 1
                    basic.showLeds(`
                        . # # # .
                        # . . . #
                        # . . . #
                        # . . . #
                        . # # # .
                        `)
                }
            }
        }
    } else if (name == "BindBots" && value == code) {
        sender_serriennummer = radio.receivedPacket(RadioPacketProperty.SerialNumber)
        verbunden = 1
        radio.sendValue("Accept", sender_serriennummer)
        basic.showLeds(`
            . # # # .
            . . . # .
            . . # . .
            . . . . .
            . . # . .
            `)
    }
})
let code = 0
let richtung = 0
let verbunden = 0
let sender_serriennummer = 0
let activ = 0
radio.setGroup(128)
radio.setTransmitSerialNumber(true)
activ = 0
sender_serriennummer = 0
verbunden = 0
richtung = 1
code = 4512652
