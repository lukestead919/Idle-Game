class resource {
    constructor(type) {
        this.type = type,
        this.amount = 0
        this.increment = 1
        this.maxStorage = 100
    }

    gather() {
        this.amount = Math.min(this.amount + this.increment, this.maxStorage)
        document.getElementById(this.type).innerHTML = this.amount
    }
    
}

class advancedResource extends resource {
    constructor(type) {
        super(type)
    }
}

class convertResources {
    constructor(changeFood, changeWood, changeStone, changeLeather) {
        this.changeFood = changeFood,
        this.changeWood = changeWood,
        this.changeStone = changeStone
        this.changeLeather = changeLeather
    }
    convert() {
        // check that there is sufficient resources to convert and enough storage
        if (food.amount+this.changeFood >= 0  &&  food.maxStorage >= food.amount+this.changeFood
            && wood.amount+this.changeWood >= 0  &&  wood.maxStorage >= wood.amount+this.changeWood
            && stone.amount+this.changeStone >= 0  &&  stone.maxStorage >= stone.amount+this.changeStone
            && leather.amount+this.changeLeather >= 0  &&  leather.maxStorage >= leather.amount+this.changeLeather
            ) 
            {
            food.amount += this.changeFood
            wood.amount += this.changeWood
            stone.amount += this.changeStone
            leather.amount += this.changeLeather

            updateAllDisplays()
        }
    }   
}

class resourceResearch {
    constructor(resource, incrementMultiplier, storageMultiplier) {
        this.researched = false,
        this.type = type,
        this.amount = 0
        this.increment = 1
    }

        completeResearch() {
            this.researched = true
        }
    
}


function updateAllDisplays() {
    document.getElementById("food").innerHTML = food.amount
    document.getElementById("wood").innerHTML = wood.amount
    document.getElementById("stone").innerHTML = stone.amount
    document.getElementById("leather").innerHTML = leather.amount
}


var food = new resource("food")
var wood = new resource("wood")
var stone = new resource("stone")
var leather = new advancedResource("leather")
const makeLeather = new convertResources(-1,-1,-1,1)
console.log(leather)