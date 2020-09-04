function GTN_Start () {
    Level_Playing = true
    Game_Stages = 0
    Difficulty = 10
    Score_GTN = 0
    Strikes = 0
    basic.showNumber(Difficulty)
}
input.onButtonPressed(Button.A, function () {
    if (Game_Selected == 0 && Level_Playing) {
        if (Game_Stages == 0 && Difficulty != 10) {
            Difficulty += -10
            basic.showNumber(Difficulty)
        }
        if (Game_Stages == 1 && Guess != 1) {
            Guess += -1
            basic.showNumber(Guess)
            while (input.buttonIsPressed(Button.A) && (Game_Stages == 1 && Guess > 10)) {
                Guess += -10
                basic.showNumber(Guess)
            }
        }
    }
    if (Game_Selected == 1 && Level_Playing) {
        Bird.change(LedSpriteProperty.Y, -1)
    }
    if (Game_Selected != 0 && !(Level_Playing)) {
        Game_Selected += -1
        basic.showString("" + (Games[Game_Selected]))
    }
})
function Compare (Guess: number, Answer: number) {
    if (Guess > Answer) {
        basic.showIcon(IconNames.No)
        basic.pause(500)
        basic.showLeds(`
            . . . # #
            . # # . .
            # . . . .
            . # # . .
            . . . # #
            `)
        return false
    } else if (Guess < Answer) {
        basic.showIcon(IconNames.No)
        basic.pause(500)
        basic.showLeds(`
            # # . . .
            . . # # .
            . . . . #
            . . # # .
            # # . . .
            `)
        return false
    } else {
        basic.showIcon(IconNames.Yes)
        return true
    }
}
function Flappy_Bird_Start () {
    led.stopAnimation()
    basic.clearScreen()
    Level_Playing = true
    Speed_Subtract = -1
    Speed = 500
    Score = 0
    GameOver = false
    Random = randint(0, 4)
    Bird = game.createSprite(0, 2)
    Walls()
}
input.onButtonPressed(Button.AB, function () {
    if (Game_Selected == 0 && Level_Playing) {
        if (Game_Stages == 0) {
            Answer = randint(1, Difficulty)
            basic.showNumber(Guess)
        }
        if (Game_Stages == 1) {
            if (Compare(Guess, Answer)) {
                Score_GTN += 1
                Answer = randint(1, Difficulty)
                Score = 1
                basic.showNumber(Guess)
            } else {
                if (Strikes >= 5) {
                    Game_Stages = 2
                    basic.showNumber(Score_GTN)
                    basic.pause(5000)
                    GTN_Start()
                }
                Strikes += 1
            }
        }
        if (Game_Stages == 0 && Level_Playing) {
            Game_Stages += 1
        }
    }
    if (!(Level_Playing)) {
        if (Game_Selected == 0) {
            GTN_Start()
        }
        if (Game_Selected == 1) {
            Flappy_Bird_Start()
        }
    }
})
input.onButtonPressed(Button.B, function () {
    if (Game_Selected == 0 && Level_Playing) {
        if (Game_Stages == 0 && Difficulty != 100) {
            Difficulty += 10
            basic.showNumber(Difficulty)
        }
        if (Game_Stages == 1 && Guess != Difficulty) {
            Guess += 1
            basic.showNumber(Guess)
            while (input.buttonIsPressed(Button.B) && (Game_Stages == 1 && Guess < Difficulty - 10)) {
                Guess += 10
                basic.showNumber(Guess)
            }
        }
    }
    if (Game_Selected == 1 && Level_Playing) {
        Bird.change(LedSpriteProperty.Y, 1)
    }
    if (Game_Selected != Games.length - 1 && !(Level_Playing)) {
        Game_Selected += 1
        basic.showString("" + (Games[Game_Selected]))
    }
})
function Walls () {
    if (Random == 0) {
        Wall4 = game.createSprite(4, 4)
        Wall3 = game.createSprite(4, 3)
        Wall2 = game.createSprite(4, 2)
        Wall1 = game.createSprite(4, 1)
        for (let index = 0; index < 5; index++) {
            basic.pause(Speed)
            Wall1.change(LedSpriteProperty.X, -1)
            Wall2.change(LedSpriteProperty.X, -1)
            Wall3.change(LedSpriteProperty.X, -1)
            Wall4.change(LedSpriteProperty.X, -1)
            if (Bird.isTouching(Wall1) || (Bird.isTouching(Wall2) || (Bird.isTouching(Wall3) || Bird.isTouching(Wall4)))) {
                GameOver = true
            }
        }
        Wall1.delete()
        Wall2.delete()
        Wall3.delete()
        Wall4.delete()
    } else if (Random == 1) {
        Wall4 = game.createSprite(4, 4)
        Wall3 = game.createSprite(4, 3)
        Wall2 = game.createSprite(4, 2)
        Wall = game.createSprite(4, 0)
        for (let index = 0; index < 5; index++) {
            basic.pause(Speed)
            Wall.change(LedSpriteProperty.X, -1)
            Wall2.change(LedSpriteProperty.X, -1)
            Wall3.change(LedSpriteProperty.X, -1)
            Wall4.change(LedSpriteProperty.X, -1)
            if (Bird.isTouching(Wall) || (Bird.isTouching(Wall2) || (Bird.isTouching(Wall3) || Bird.isTouching(Wall4)))) {
                GameOver = true
            }
        }
        Wall.delete()
        Wall2.delete()
        Wall3.delete()
        Wall4.delete()
    } else if (Random == 2) {
        Wall4 = game.createSprite(4, 4)
        Wall3 = game.createSprite(4, 3)
        Wall1 = game.createSprite(4, 1)
        Wall = game.createSprite(4, 0)
        for (let index = 0; index < 5; index++) {
            basic.pause(Speed)
            Wall.change(LedSpriteProperty.X, -1)
            Wall1.change(LedSpriteProperty.X, -1)
            Wall3.change(LedSpriteProperty.X, -1)
            Wall4.change(LedSpriteProperty.X, -1)
            if (Bird.isTouching(Wall) || (Bird.isTouching(Wall1) || (Bird.isTouching(Wall3) || Bird.isTouching(Wall4)))) {
                GameOver = true
            }
        }
        Wall.delete()
        Wall1.delete()
        Wall3.delete()
        Wall4.delete()
    } else if (Random == 3) {
        Wall4 = game.createSprite(4, 4)
        Wall2 = game.createSprite(4, 2)
        Wall1 = game.createSprite(4, 1)
        Wall = game.createSprite(4, 0)
        for (let index = 0; index < 5; index++) {
            basic.pause(Speed)
            Wall.change(LedSpriteProperty.X, -1)
            Wall1.change(LedSpriteProperty.X, -1)
            Wall2.change(LedSpriteProperty.X, -1)
            Wall4.change(LedSpriteProperty.X, -1)
            if (Bird.isTouching(Wall) || (Bird.isTouching(Wall1) || (Bird.isTouching(Wall2) || Bird.isTouching(Wall4)))) {
                GameOver = true
            }
        }
        Wall.delete()
        Wall1.delete()
        Wall2.delete()
        Wall4.delete()
    } else {
        Wall3 = game.createSprite(4, 3)
        Wall2 = game.createSprite(4, 2)
        Wall1 = game.createSprite(4, 1)
        Wall = game.createSprite(4, 0)
        for (let index = 0; index < 5; index++) {
            basic.pause(Speed)
            Wall.change(LedSpriteProperty.X, -1)
            Wall1.change(LedSpriteProperty.X, -1)
            Wall2.change(LedSpriteProperty.X, -1)
            Wall3.change(LedSpriteProperty.X, -1)
            if (Bird.isTouching(Wall) || (Bird.isTouching(Wall1) || (Bird.isTouching(Wall2) || Bird.isTouching(Wall3)))) {
                GameOver = true
            }
        }
        Wall.delete()
        Wall1.delete()
        Wall2.delete()
        Wall3.delete()
    }
}
let Wall: game.LedSprite = null
let Wall1: game.LedSprite = null
let Wall2: game.LedSprite = null
let Wall3: game.LedSprite = null
let Wall4: game.LedSprite = null
let Answer = 0
let Random = 0
let GameOver = false
let Score = 0
let Speed = 0
let Speed_Subtract = 0
let Bird: game.LedSprite = null
let Guess = 0
let Strikes = 0
let Score_GTN = 0
let Difficulty = 0
let Game_Stages = 0
let Games: string[] = []
let Game_Selected = 0
let Level_Playing = false
Level_Playing = false
Game_Selected = 0
Games = ["GTN", "Flappy Bird"]
basic.showString("" + (Games[Game_Selected]))
basic.forever(function () {
    if (Game_Selected == 1 && Level_Playing) {
        if (GameOver == false) {
            Random = randint(0, 4)
            if (Wall.isDeleted()) {
                Score += 1
                Walls()
                Speed += Speed_Subtract
                Speed_Subtract += -0.5
            }
        } else {
            basic.clearScreen()
            Bird.delete()
            basic.showString("Game Over!")
            basic.showString("Score: " + Score)
            basic.pause(5000)
            basic.clearScreen()
            Flappy_Bird_Start()
        }
    }
})
