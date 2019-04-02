

resourceList = []
// will contain food, wood etc objects (not the strings)


resourceConversionList = []


buildingList = []


researchList = []


jobList = []
//-------------------------------------------------------------------------------------------------------
// *** define classes here***

class resource {
    constructor(name) {
        this.name = name,
        this.quantity = 100
        this.increment = 1
        this.passiveGeneration = 1
        this.maxStorage = 1000
        resourceList.push(this)
    }

    gather() {
        this.quantity = Math.round(Math.min(this.quantity + this.increment, this.maxStorage))
        document.getElementById(this.name+"Quantity").innerHTML = this.quantity
        updateButtonEnabledOrDisabled()
    }
    
    gatherPassive() {
        this.quantity = Math.round(Math.max(0,Math.min(this.quantity + this.passiveGeneration, this.maxStorage)))
        document.getElementById(this.name+"Quantity").innerHTML = this.quantity
    }
    
}


class advancedResource extends resource {
    constructor(name) {
        super(name)
    }
}



class convertResources {
    constructor(name, changeFood, changeWood, changeStone, changeLeather) {
        
        this.name = name
        this.changeFood = changeFood,
        this.changeWood = changeWood,
        this.changeStone = changeStone,
        this.changeLeather = changeLeather
        resourceConversionList.push(this)
    }

    convertResources() {  // perform the conversion if possible
        if (checkResources(this.changeFood, this.changeWood, this.changeStone, this.changeLeather) == true) {
            convert(this.changeFood, this.changeWood, this.changeStone, this.changeLeather)

            updateResourceDisplays()
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


        this.updateBuildCost()
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
            calculateMaxPopulation()
            document.getElementById(this.name+"Quantity").innerHTML = this.quantity;
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

class job {
    constructor(name) {
        this.name = name
        this.quantity = 0
        this.generation = 1
        jobList.push(this)
    }

    hire() {
        if (unemployed !== 0) {
            unemployed += -1
            this.quantity += 1
            updateJobTotalDisplays()
        }
    }

    fire() {
        if (this.quantity !== 0) {
            unemployed += 1
            this.quantity += -1
            updateJobTotalDisplays()
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
    updateResourceDisplays()
    updateButtonEnabledOrDisabled()
}

function updateResourceDisplays() {
    for (var i=0; i<resourceList.length; ++i) {
        B = resourceList[i]
        document.getElementById(B.name+"Quantity").innerHTML = B.quantity
        document.getElementById(B.name+"Max").innerHTML = B.maxStorage
        document.getElementById(B.name+"PassiveGeneration").innerHTML = B.passiveGeneration
    }
}

function updateBuildingTotalDisplays() {
    for (var i=0; i<buildingList.length; ++i) {
        document.getElementById((buildingList[i]).name+"Quantity").innerHTML = buildingList[i].quantity    
    }
}

function updateJobTotalDisplays() {
    document.getElementById("unemployed").innerHTML = unemployed
    
    for (var i=0; i<jobList.length; ++i) {
        document.getElementById((jobList[i]).name+"Quantity").innerHTML = jobList[i].quantity
    }
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

    for (let i=0; i<resourceConversionList.length; ++i) {

        A = resourceConversionList[i]

        if (checkResources(A.changeFood, A.changeWood, A.changeStone, A.changeLeather) == true) 
        {
            document.getElementById(A.name + "Button").disabled = false
        } 
        else {
            document.getElementById(A.name + "Button").disabled = true
        }

    }
}


function updateGUI() {
    updateResourceDisplays()
    updateBuildingTotalDisplays()
    updateJobTotalDisplays()
    updateButtonEnabledOrDisabled()
}

function calculateMaxPopulation() {
    maxPopulation = house.quantity*5
    document.getElementById("maxPopulation").innerHTML = maxPopulation
}

function recruit() {
    if (food.quantity >= 50 && population < maxPopulation) {
        food.quantity += -50
        unemployed += 1 
        population += 1
        document.getElementById("population").innerHTML = population
        updateGUI()
    }
}

function calculateFoodPassiveGen() {
    var a
    a = (farmer.quantity * farmer.generation) - 3*population
    food.passiveGeneration = a
}


//-------------------------------------------------------------------------------------------------------
var food = new resource("food")
var wood = new resource("wood")
var stone = new resource("stone")

var leather = new advancedResource("leather")


//-------------------------------------------------------------------------------------------------------
// *** add new methods of converting resources here
const makeLeather = new convertResources("makeLeather", -1,-1,-1,1)


//-------------------------------------------------------------------------------------------------------
// ***add new buildings here - (name, changeFood, changeWood, changeStone, changeLeather, costMultiplier)

// house will increase max population
var house = new building("house", -1, -1, -1, -1, 1.2)

// lumbermill will increase effectiveness of woodcutters
var lumbermill = new building("lumbermill", 0, -50,-50, -15, 1.1)

// quarry will increase effectiveness of miners
var quarry = new building("quarry", 0, -60, -30, -10, 1.1)

// woodstores will increase wood max storage 
var woodstores = new building("woodstores", 0, -80, 0, 0, 1.1)




//-------------------------------------------------------------------------------------------------------
// add technologies/research here
var unlockHouse = new research("freeHouses", [house.quantity = 1, house.costMultiplier = 1])

unlockHouse.completeResearch()



//-------------------------------------------------------------------------------------------------------
// add jobs here
var population = 0
var unemployed = 0
var farmer = new job("farmer")
farmer.generation = 4

var woodcutter = new job("woodcutter")

var miner = new job('miner')


//-------------------------------------------------------------------------------------------------------
// more initialisation
function populateBuildings() {
    for (var i=0; i<buildingList.length; ++i) {
        B = buildingList[i]
        console.log(B)
        // create a new table row and add to buildings table
        var table = document.getElementById("buildingsTable")
        var tr = document.createElement("tr")
        tr.id = B.name
        table.appendChild(tr)

        var td1 = document.createElement("td")
        tr.appendChild(td1)
        uppercase = B.name.charAt(0).toUpperCase() + B.name.slice(1)
        var text1 = document.createTextNode(uppercase)
        td1.appendChild(text1)

        // create new cell for button
        var td2 = document.createElement("td")
        tr.appendChild(td2)

        var total = document.createElement("span")
        total.id = B.name + "Quantity"
        text = document.createTextNode("0")
        total.appendChild(text)
        td2.appendChild(total)

        
        
        // create new cell for number of buildings display
        var td3 = document.createElement("td")
        tr.appendChild(td3)
        
        var newbutton = document.createElement("button")
        newbutton.type = "button"
        newbutton.id = B.name + "Button"
        newbutton.setAttribute('onclick', B.name + '.build()')

        uppercase = B.name.charAt(0).toUpperCase() + B.name.slice(1)
        var text = document.createTextNode("Build")
        

        newbutton.appendChild(text)
        td3.appendChild(newbutton)
        
    }
}
populateBuildings()


function populateJobs() {
    for (var i=0; i<jobList.length; ++i) {
        B = jobList[i]
        console.log(B)
        // create a new table row and add to jobs table
        var table = document.getElementById("jobsTable")
        var tr = document.createElement("tr")
        tr.id = B.name
        table.appendChild(tr)

        var td1 = document.createElement("td")
        tr.appendChild(td1)
        uppercase = B.name.charAt(0).toUpperCase() + B.name.slice(1)
        var text1 = document.createTextNode(uppercase)
        td1.appendChild(text1)
        
        // create new cell for button
        var td2 = document.createElement("td")
        tr.appendChild(td2)

        var newbutton = document.createElement("button")
        newbutton.type = "button"
        newbutton.id = B.name + "HireButton"
        newbutton.setAttribute("class", "jobButton")
        newbutton.setAttribute('onclick', B.name + '.hire()')

        var text2 = document.createTextNode("Hire")
        

        newbutton.appendChild(text2)
        td2.appendChild(newbutton)
        
        // create new cell for number of jobs display
        var td3 = document.createElement("td")
        tr.appendChild(td3)
        var total = document.createElement("span")
        total.id = B.name +"Quantity"
        text = document.createTextNode("0")
        total.appendChild(text)
        td3.appendChild(total)

        var td4 = document.createElement("td")
        tr.appendChild(td4)
        
        var newbutton2 = document.createElement("button")
        newbutton2.type = "button"
        newbutton2.id = B.name + "FireButton"
        newbutton2.setAttribute("class", "jobButton")
        newbutton2.setAttribute('onclick', B.name + '.fire()')
        
        var text3 = document.createTextNode("Fire")
    
        newbutton2.appendChild(text3)
        td4.appendChild(newbutton2)
    }
}
populateJobs()

updateGUI()




window.setInterval(function(){

    calculateMaxPopulation()

    calculateFoodPassiveGen()
    




    for (var i=0; i<resourceList.length; ++i) {
        resourceList[i].gatherPassive()
    }
    updateGUI()
}, 1000)