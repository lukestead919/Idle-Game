

resourceList = []
// will contain food, wood etc (not the strings)

buildingList = []


researchList = []

//-------------------------------------------------------------------------------------------------------
// *** define classes here***

class resource {
    constructor(name) {
        this.name = name,
        this.quantity = 10
        this.increment = 1
        this.passiveGeneration = 1
        this.maxStorage = 100
        resourceList.push(this)
    }

    gather() {
        this.quantity = Math.round(Math.min(this.quantity + this.increment, this.maxStorage))
        document.getElementById(this.name).innerHTML = this.quantity
    }
    
    gatherPassive() {
        this.quantity = Math.round(Math.min(this.quantity + this.increment, this.maxStorage))
        document.getElementById(this.name).innerHTML = this.quantity
    }
}


class advancedResource extends resource {
    constructor(name) {
        super(name)
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
    constructor(name, initialFoodCost, initialWoodCost, initialStoneCost, initialLeatherCost, costMultiplier) {
        this.name = name,
        this.initialFoodCost = initialFoodCost
        this.initialWoodCost = initialWoodCost
        this.initialStoneCost = initialStoneCost
        this.initialLeatherCost = initialLeatherCost
        this.costMultiplier = costMultiplier
        this.quantity = 0
        this.visible = false
        buildingList.push(this)


        this.foodCost = initialLeatherCost
        this.woodCost = initialLeatherCost
        this.stoneCost = initialLeatherCost
        this.leatherCost = initialLeatherCost
    }

    
    updateBuildCost() {
        this.foodCost = this.initialFoodCost * Math.pow(this.costMultiplier,this.quantity)
        this.woodCost = this.initialWoodCost * Math.pow(this.costMultiplier,this.quantity)
        this.stoneCost = this.initialStoneCost * Math.pow(this.costMultiplier,this.quantity)
        this.leatherCost = this.initialLeatherCost * Math.pow(this.costMultiplier,this.quantity)
    }

    build() {
        if (checkResources(this.foodCost, this.woodCost, this.stoneCost, this.leatherCost) == true) {
            convert(this.foodCost, this.woodCost, this.stoneCost, this.leatherCost)
            this.quantity += 1
            this.updateBuildCost()
            document.getElementById(this.name).innerHTML = this.quantity;
        }
    }
}

class dwelling extends building {
    constructor(name, foodCost, woodCost, stoneCost, leatherCost, costMultiplier, increaseMaxPopulation) {
        super(name, foodCost, woodCost, stoneCost, leatherCost, costMultiplier)
        this.increaseMaxPopulation = increaseMaxPopulation
    }
}


class research {
    constructor(researchName, effect) {
        this.researched = false
        this.researchName = researchName
        this.effect = effect
        researchList.push(this)

    }

    completeResearch() {
        if (this.researched == false) {
            this.researched = true
            for (var i=0; i<this.effect.length; ++i) {
                this.effect[i]
            }
        }
    }
    
}


//-------------------------------------------------------------------------------------------------------
// ***define functions here***

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
    updateButtonEnabledOrDisabled()
}

function updateResourceTotalDisplays() {
    for (var i=0; i<resourceList.length; ++i)
    document.getElementById((resourceList[i]).name).innerHTML = resourceList[i].quantity
}

function updateBuildingTotalDisplays() {
    for (var i=0; i<buildingList.length; ++i)
    document.getElementById((buildingList[i]).name).innerHTML = buildingList[i].quantity
}

function updateResearchDisplays() {
    for (var i=0; i<researchList.length; ++i)
    document.getElementById((researchList[i]).name).innerHTML = researchList[i].researched
}

function updateButtonEnabledOrDisabled() {
    for (let i=0; i<buildingList.length; ++i) {

        A = buildingList[i]

        if (checkResources(A.foodCost, A.woodCost, A.stoneCost, A.leatherCost) == true) 
        {
            document.getElementById(A.name + "Button").disabled = false
        } 
        else {
            document.getElementById(A.name + "Button").disabled = true
        }
    }
}


function updateGUI() {
    updateResourceTotalDisplays()
    updateBuildingTotalDisplays()
    updateButtonEnabledOrDisabled()
}


//-------------------------------------------------------------------------------------------------------
var food = new resource("food")
var wood = new resource("wood")
var stone = new resource("stone")


var leather = new advancedResource("leather")

// *** add new methods of converting resources here
const makeLeather = new convertResources(-1,-1,-1,1)


//-------------------------------------------------------------------------------------------------------
// ***add new buildings here - (name, changeFood, changeWood, changeStone, changeLeather, costMultiplier)

// house will increase max population
var house = new building("house", -5, -5, -5, -5, 2)

// lumbermill will increase effectiveness of woodcutters
// var lumbermill = new building("lumbermill", 0, -50,-50, -10, 1.5)

// quarry will increase effectiveness of miners


//-------------------------------------------------------------------------------------------------------
// add technologies/research here
var unlockHouse = new research("freeHouses", [house.quantity = 1, house.costMultiplier = 1])

unlockHouse.completeResearch()


updateGUI()


console.log(resourceList)
console.log(makeLeather[1])
console.log(resourceList[1])


window.setInterval(function(){
    for (var i=0; i<resourceList.length; ++i) {
        resourceList[i].gatherPassive()
    }




    updateGUI()
}, 1000)