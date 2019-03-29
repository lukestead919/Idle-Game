

resourceList = []
// will contain food, wood etc (not the strings)




// *** define classes here***

class resource {
    constructor(type) {
        this.type = type,
        this.quantity = 100
        this.increment = 1
        this.maxStorage = 100
        resourceList.push(this)
    }

    gather() {
        this.quantity = Math.min(this.quantity + this.increment, this.maxStorage)
        document.getElementById(this.type).innerHTML = this.quantity
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
        this.changeStone = changeStone,
        this.changeLeather = changeLeather
    }

    convertResources() {  // perform the conversion if possible
        if (checkResources(this.changeFood, this.changeWood, this.changeStone, this.changeLeather) == true) {
            convert(this.changeFood, this.changeWood, this.changeStone, this.changeLeather)

            updateResourceTotalDisplays()
        }
    }
}   




class building {
    constructor(type, foodCost, woodCost, stoneCost, leatherCost, multiplier) {
        this.type = type,
        this.foodCost = foodCost
        this.woodCost = woodCost
        this.stoneCost = stoneCost
        this.leatherCost = leatherCost
        this.multiplier = multiplier
        this.quantity = 0
    }

    updateBuildCost() {
        this.foodCost *= this.multiplier
        this.woodCost *= this.multiplier
        this.stoneCost *= this.multiplier
        this.leatherCost *= this.multiplier
    }

    build() {
        if (checkResources(this.foodCost, this.woodCost, this.stoneCost, this.leatherCost) == true) {
            convert(this.foodCost, this.woodCost, this.stoneCost, this.leatherCost);
            this.quantity += 1;
            this.updateBuildCost();
            document.getElementById(this.type).innerHTML = this.quantity;
        }
    }
}

class dwelling extends building {
    constructor(type, foodCost, woodCost, stoneCost, leatherCost, multiplier, increaseMaxPopulation) {
        super(type, foodCost, woodCost, stoneCost, leatherCost, multiplier)
        this.increaseMaxPopulation = increaseMaxPopulation
    }
}


class research {
    constructor(researchName) {
        this.researched = false
        this.researchName = researchName
    }

    completeResearch() {
        if (this.researched == false) {
            this.researched = true
        }
    }
    
}
class unlockBuilding extends research {
    constructor(researchName, building) {
        super(researchName),
        this.building = building
    }
}

function checkResources(changeFood, changeWood, changeStone, changeLeather) {
    // check that there is sufficient resources to convert and enough storage

    changeFood = Math.round(changeFood)
    changeWood = Math.round(changeWood)
    changeStone = Math.round(changeStone)
    changeLeather = Math.round(changeLeather)

    return (   food.quantity+changeFood >= 0  
            && wood.quantity+changeWood >= 0  
            && stone.quantity+changeStone >= 0  
            && leather.quantity+changeLeather >= 0 
            && food.maxStorage >= food.quantity+changeFood
            && wood.maxStorage >= wood.quantity+changeWood
            && stone.maxStorage >= stone.quantity+changeStone
            && leather.maxStorage >= leather.quantity+changeLeather
        ) 
}
// ***define functions here***
function convert(changeFood, changeWood, changeStone, changeLeather) {

    changeFood = Math.round(changeFood)
    changeWood = Math.round(changeWood)
    changeStone = Math.round(changeStone)
    changeLeather = Math.round(changeLeather)

    food.quantity += changeFood
    wood.quantity += changeWood
    stone.quantity += changeStone
    leather.quantity += changeLeather
    updateResourceTotalDisplays()
}

function updateResourceTotalDisplays() {
    for (var i=0; i<resourceList.length; ++i)
    document.getElementById((resourceList[i]).type).innerHTML = resourceList[i].quantity
    
}

var food = new resource("food")
var wood = new resource("wood")
var stone = new resource("stone")


var leather = new advancedResource("leather")


const makeLeather = new convertResources(-1,-1,-1,1)


var house = new building("house", -5, -5, -5, -5, 2)


var unlockHouse = new unlockBuilding()




updateResourceTotalDisplays()


console.log(resourceList)
console.log(makeLeather[1])
console.log(resourceList[1])