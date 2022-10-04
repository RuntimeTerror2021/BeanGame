
import kaboom from "kaboom"
import big from "./big"
import patrol from "./patrol"
import loadAssets from "./assets"

var dm = [0,0,255]
var inter;
var mins = 0;
var secs = 0;
var ohs = 0;

if(localStorage["st2"] == "true"){
	dm = [0,0,40]
}else if (localStorage["st2"] == "false"){
	dm = [0,0,255]
}

kaboom({
    background: dm,
})
loadAssets()


// define some constants
const JUMP_FORCE = 1320
var MOVE_SPEED = 480
const FALL_DEATH = 2400
let toBool = string => string === 'true' ? true : false;
var f = toBool(localStorage["st2"]);
var beans = ["Red Bean", "Orange Bean", "Yellow Bean", "Green Bean", "Cyan Bean", "Blue Bean", "Purple Bean", "Pink Bean", "Ink Bean", "Inverted Bean", "dwayne"]


//vars for inventory
if(localStorage.getItem("equippedBean") == null){
	localStorage.setItem("equippedBean", [false,false,false,false,false,false,false,false,false,false,false])
}

if( !localStorage.equippedBean.split(",")[10]){
	let g = localStorage.equippedBean.split(",")
	g[10] = false
	localStorage.setItem("equippedBean", g)
}


if(localStorage.getItem("eggsFound") == null){
	localStorage.setItem("eggsFound", [false,false,false,false,false,false,false,false,false])
}

//vars for shop
var k = 0;
var ROCKUNLOCK = false

for (let i in localStorage.eggsFound.split(",")) {
	if (localStorage.eggsFound.split(",")[i] == "true") {
		k++
	}
}
if (k == localStorage.eggsFound.split(",").length) {
	ROCKUNLOCK = true
}

let tempp = localStorage.eggsFound.split(",")

tempp[tempp.length-1] = ROCKUNLOCK;

localStorage.setItem("eggsFound", tempp)

if(localStorage.getItem("ownedBeans") == null){
	localStorage.setItem("ownedBeans", [false,false,false,false,false,false,false,false,false,false,ROCKUNLOCK])
}

if( !localStorage.ownedBeans.split(",")[10]){
	let g = localStorage.ownedBeans.split(",")
	g[10] = false
	localStorage.setItem("ownedBeans", g)
}


//vars for settings menu
if(localStorage.getItem("st1") == null){
	localStorage.setItem("st1", false)
}
if(localStorage.getItem("st2") == null){
	localStorage.setItem("st2", false)
}
if(localStorage.getItem("st3") == null){
	localStorage.setItem("st3", false)
}
if(localStorage.getItem("st4") == null){
	localStorage.setItem("st4", "false")
}
if(localStorage.getItem("level") == null){
	localStorage.setItem("level", 0)
}

//global vars
if(localStorage.getItem("losses") == null){
	localStorage.setItem("losses", 0)
}

if(localStorage.getItem("wins") == null){
	localStorage.setItem("wins", 0)
}



if(localStorage.getItem("coins") == null){
	localStorage.setItem("coins", 0)
}

// if(isNaN(localStorage.getItem("coins"))){
// 	localStorage.setItem("coins", 0)
// 	localStorage.setItem("ownedBeans", [false,false,false,false,false,false,false,false,false,false,ROCKUNLOCK])
// }

var LEVELS = [
	[
		"                           $",
		"                           $",
		"                           $",
		"                           $",
		"                           $",
		"            $$         =   $",
		"   %s     ====         !   $",
		"                       !   $",
		"                       !    ",
		"        ^^      = >    !   @",
		"================!======!====",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "+",
	],
	[
		"     $    $    $    $     $",
		"     $    $    $    $     $",
		"                           ",
		"                           ",
		"                           ",
		"                           ",
		"                           ",
		"  ^^>^^^>^^^^>^^^^>^^^>^@",
		"===========================",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"           + =      =      =",
	],
    [
        "        s                   @",
        "                            ",
        "   =                        ",
        "                 =         ",
        "        =              =     ",
        "   =",
        "=  >$$$$$$$$$>$$$$$$$>$$$$$$$$$=",
        "!==============================!",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"+",
    ],
    [
        "",
        "        $",
        "        =              @",
        "    s        =         =",
        "                   $",
        "             =     =",
        "    =",
        "   $    =",
        "   =",
        "      $",
        "$     =",
        "=",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"              +",
    ],
    [
        "",
        "=",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "                 ^",
        "           +    ^@",   
        "",
        "",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		" @",
    ],
    [
		"    =^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ +",
		"",
		"",
		"",
		"",
		"",
		"",
		"								s",
		"",
		"",
		"",
        "=    $     >      $$     >>    $$$$$  >  $     >   $$   $ $=",
        "===========================================================",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "                  $     $        $  $       $             $",
        "                  @     =    =      =   =   =      =      =",
    ],
    [
        "",
        "=",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "$$$$$$$$$+$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",
        "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
        "====================================================",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "          $  $              $        $     $       @",
        "=   =   ========  = === =   =    =   = =   =   =   =",
    ],
    [
        "",
        "=",
        "",
        " ",
        "",
        "                       !!!!!!!!!   %",
        "           ============",
        "          ==!!$!!!@  >  !!!!!!!=====!!",
        "        ==!!!!!!!!====!!+  ",
        "       =!!!$$$!!!====!!  g   !!!!!=",
        "      ==!!!!!!!!!!!!$$$     !!!!!=======",
        "     =!!$$!!!          !!!!!!",
		"     ==!!!===  ====",
		"^^^^^^^^^^^^^@ ^",
		"$",
		"$",
		"$",
		"$",
		"$",
		"$",
		"$",
		"$",
		"$    %",
		"^",
		"!==",
		"f @!!!!!===",
		"f!!=!!!!=======$$$$$$$$$$$$",
		"f!!!!!!!!!!!!!!!!!!============$$$$$",
		"!   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
		"   ===================",
		"",		
    ],
	[
		"",
		"     %s",
		"",
		"",
		"========",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"",
		"                       ====",
		"                      =    ======",
		"",
		"                         ^",
		"                         ^",
		"                         ^@",
		"                         ^^",
		"+ @                    ========",
	],
	// [
	// 	"",
	// 	"",
	// 	"",
	// 	"",
	// 	"",
	// 	"",
	// 	"",
	// 	"",
	// 	"",
	// 	"",
	// 	"",
	// 	"",
	// 	"",
	// 	"",
	// 	"",
	// 	"",
	// 	"",
	// 	"",		
	// ],
]

// define what each symbol means in the level graph
const levelConf = {
	// grid size
	width: 64,
	height: 64,
	// define each object as a list of components
	"=": () => [
		sprite("grass"),
		area(),
		solid(),
		origin("bot"),
	],
	"$": () => [
		sprite("coin"),
		area(),
		pos(0, -9),
		origin("bot"),
		"coin",
	],
	"%": () => [
		sprite("prize"),
		area(),
		solid(),
		origin("bot"),
		"prize",
	],
	"^": () => [
		sprite("spike"),
		area(),
		solid(),
		origin("bot"),
		"danger",
	],
	"#": () => [
		sprite("apple"),
		area(),
		origin("bot"),
		body(),
		"apple",
	],
	">": () => [
		sprite("ghosty"),
		area(),
		origin("bot"),
		body(),
		patrol(),
		"enemy",
	],
	"@": () => [
		sprite("portal"),
		area({ scale: 0.5, }),
		origin("bot"),
		pos(0, -12),
		"portal",
	],
    "!": () => [
        sprite("dirt"),
        area(),
        solid(),
        origin("bot"),
    ],
	"f": () => [
		sprite("spike"),
		area(),
		origin("bot"),
	],
	"g": () => [
		sprite("ghosty"),
		area(),
		origin("bot"),
		patrol(),
		body()
	],
	"s": () => [
		sprite("speed"),
		area(),
		solid(),
		origin("bot"),
		"speed"
	],
	"+": () => [
		sprite("rock"),
		area(),
		solid(),
		origin("bot"),
		"secretdwayne"
	],
}

scene("future", () => {
	add([
		text("In the Future:", {size:40})
	])
	add([ //back button
		text("Back..."),
		color(192, 199, 139),
		fixed(),
		area(),
		pos(1000, 566),
		"bk"
	])
	onClick("bk", () => {
		go("lobby")
	})

	var fts = ["Add mobile support, maybe controller", "Add more powerups", "Add more levels", "Maybe make bean game extension", "Add speedrun time that shows on win/lose screens", "Add more uniquely colored beans", "Add NFT Bean", "Add Easy, Normal, and Hard Modes"]

	for(let i = 0; i<fts.length; i++){
		add([
			text("-" + fts[i], {size:30}),
			pos(30, (50*(i+1)))
		])
	}
	
})

scene("updates", () => {
	add([
		text("What's New:\n\n", {size:40}),
		
	])

	// add([
	// 	text("-Replaced most Rock terrain sprites with dirt in order to reduce lag", {size: 30}),
	// 	pos(0, 100)
	// ])

	var uds = ["Replaced most Rock terrain sprites with dirt in order to reduce lag", "Finding all easter eggs unlocks a new skin", "Easter egg count shows up in Inventory"]
	
	for(let i = 0; i<uds.length; i++){
		add([
			text("-" + uds[i], {size:30}),
			pos(30, (50*(i+1)))
		])
	}
	
	add([ //back button
		text("Back..."),
		color(192, 199, 139),
		fixed(),
		area(),
		pos(1000, 566),
		"bk"
	])
	onClick("bk", () => {
		go("lobby")
	})
})

scene("lobby", () => {

	destroyAll("tml")
	window.clearInterval(inter); mins=0;secs=0;ohs=0;
	
	const playB = add([
		text("Play Bean Game"),
		origin("center"),
		pos(window.innerWidth/2, 80),
		fixed(),
		area(),
		color(11, 125, 42),
		"startButton"
	])

	const inventory = add([
		text("Owned Beans"),
		pos(window.innerWidth/2, 160),
		origin("center"),
		fixed(),
		area(),
		color(176, 88, 0),
		"invButton"
	])
	
	const settings = add([
		text("Settings"),
		color(97, 117, 103),
		pos(window.innerWidth/2,320),
		origin("center"),
		fixed(),
		area(),
		"stg"
	])

	const shopBtn = add([
		text("Shop"),
		area(),
		fixed(),
		pos(window.innerWidth/2, 560),
		origin("center"),
		color(91, 13, 163),
		"shop"
	])

	const helpBtn = add([
		text("Help"),
		area(),
		fixed(),
		pos(window.innerWidth/2, 640),
		origin("center"),
		"help"
	])

	const infoBtn = add([
		text("About"),
		area(),
		fixed(),
		color(62, 63, 74),
		origin("center"),
		pos(window.innerWidth/2, 480),
		"info"
	])

	const updatesBtn = add([
		text("What's New"),
		area(),
		fixed(),
		color(200,0,0),
		origin("center"),
		pos(window.innerWidth/2, 240),
		"updates"
	])

	const futureBtn = add([
		text("Roadmap"),
		area(),
		fixed(),
		color(0,33,115),
		origin("center"),
		pos(window.innerWidth/2, 400),
		"roadmap"
	])
	

	onClick("roadmap", () => {
		go("future")
	})
		
	onClick("updates", () => {
		go("updates")
	})
	
	onClick("startButton", (sb) => {
		go("game")
	})

	onClick("invButton", () => {
		go("inventory")
	})
	
	onClick("stg", (stg) => {
		go("settings")
	})

	onClick("shop", () => {
		go("market")
	})

	onClick("help", () => {
		go("helpmenu")
	})

	onClick("info", () => {
		go("info")
	})
		
});

scene("inventory", () => {
	destroyAll("tml")
	window.clearInterval(inter); mins=0;secs=0;ohs=0;
	
	add([
		text("Owned Beans", {size: 50}),
		pos(1000, 30),
		fixed()
	])
	add([
		text("Click to equip a bean.", {size: 20}),
		pos(1000, 90),
		fixed()
	])
	add([
		text("To unequip a bean, just click it again;\nsorry for the inconvenience", {size:16}),
		pos(1000,130),
		fixed()
	])

	var fA = [];
	
	for(let i = 0; i < localStorage.eggsFound.split(",").length; i++){
		if(localStorage.eggsFound.split(",")[i] == "true"){
			fA.push(localStorage.eggsFound.split(",")[i])
		}
	}
	
	add([
		text(`Easter Eggs Found: ${fA.length} / ${LEVELS.length}`, {size:16}),
		pos(1000, 180),
		fixed(),
		area(),
		"eeg"
	])

	onClick("eeg", () => {
		addKaboom(center())
	})
	
	add([
		text("Back...", {size: 60}),
		color(192, 199, 139),
		fixed(),
		area(),
		pos(1000, 480),
		"bk"
	]) //back button
	onClick("bk", () => {
		go("lobby")
	})

	let lcob = localStorage["ownedBeans"].split(",")
	let beansToAppend = ["Red Bean", "Orange Bean", "Yellow Bean", "Green Bean", "Cyan Bean", "Blue Bean", "Purple Bean", "Pink Bean", "Ink Bean", "Inverted Bean", "dwayne"]
	let xPositions = [100, 180, 260, 340, 420, 500, 580, 660, 740, 820, 900]
	// let equippedBeanSkins
	let eqbs = localStorage["equippedBean"].split(",")
	
	
	for(let i in lcob){
		if(lcob[i] == "true"){
			add([
				sprite(beansToAppend[i]),
				pos(xPositions[i], 100),
				area(),
				fixed(),
				`${beansToAppend[i]}`
			])
			
			add([
				text("Equipped", {size:20}),
				fixed(),
				pos(xPositions[localStorage["equippedBean"].split(",").indexOf("true")] - 20, 180),
				"eq"
			])
			onClick(`${beansToAppend[i]}`, () => {
				if(localStorage.getItem("equippedBean").indexOf("true") == -1){
					destroyAll("eq")
					let t = localStorage["equippedBean"].split(",")
					t[i] = true
					localStorage.setItem("equippedBean", t)
					add([
						text("Equipped", {size:20}),
						fixed(),
						pos(xPositions[i] - 20, 180),
						"eq"
					])
				} else if (localStorage.getItem("equippedBean").indexOf("true") !== -1 && localStorage["equippedBean"].split(",")[i] == "true"){
					destroyAll("eq")
					let t = localStorage["equippedBean"].split(",")
					t[i] = false
					localStorage.setItem("equippedBean", t)
				}
			})
		}
	}

	
	// add([
	// 	sprite("Red Bean"), 
	// 	pos(100,100),
	// 	area(),
	// 	fixed(),
	// 	"rb"
	// ])
})

scene("settings", () => {
	destroyAll("tml")
	window.clearInterval(inter); mins=0;secs=0;ohs=0;
	

	add([ //back button
		text("Back..."),
		color(192, 199, 139),
		fixed(),
		area(),
		pos(1000, 566),
		"bk"
	])
	onClick("bk", () => {
		go("lobby")
	})


	var s1t;

	if(localStorage["st1"] == "false"){
		s1t = "OFF"
	} //handlers for the global
	if (localStorage["st1"] == "true"){
		s1t = "ON"
	} //auto resp var
	
	add([ //auto respawn button
		text(`Auto Respawn: ${s1t}`),
		pos(window.innerWidth/2, 86),
		origin("center"),
		color(97, 117, 103),
		area(),
		fixed(),
		"s1"
	])

	onClick("s1", (s1) => { 
		destroy(s1)
		if(s1t == "OFF"){
			s1t = "ON"
			add([
				text(`Auto Respawn: ${s1t}`),
				pos(window.innerWidth/2, 86),
				origin("center"),
				color(97, 117, 103),
				area(),
				fixed(),
				"s1"
			])
			f=true
			localStorage.setItem("st1", true)
			
		} else if (s1t == "ON"){
			s1t = "OFF"
			add([
				text(`Auto Respawn: ${s1t}`),
				pos(window.innerWidth/2, 86),
				color(97, 117, 103),
				origin("center"),
				area(),
				fixed(),
				"s1"
			])
			f=false
			localStorage.setItem("st1", false)
			
		}
	}) //handler for auto respawn button

	var s2t = "OFF"

	if(localStorage["st2"] == "false"){
		s2t = "OFF"
	} //handlers for the global
	if (localStorage["st2"] == "true"){
		s2t = "ON"
	} //auto resp var
	
	add([ //auto respawn button
		text(`Dark Mode: ${s2t}`),
		pos(window.innerWidth/2, 166),
		origin("center"),
		color(97, 117, 103),
		area(),
		fixed(),
		"s2"
	])
	add([
		text("Adjusting Dark Mode WILL refresh the game.", {size:25}),
		fixed(),
		pos(window.innerWidth/2, 200),
		origin("center"),
		color(97, 117, 103),
	])

	onClick("s2", (s2) => { 
		destroy(s2)
		if(s2t == "OFF"){
			s2t = "ON"
			add([
				text(`Dark Mode: ${s2t}`),
				pos(window.innerWidth/2, 166),
				origin("center"),
				color(97, 117, 103),
				area(),
				fixed(),
				"s2"
			])
			localStorage.setItem("st2", true)
			location.reload()
			
		} else if (s2t == "ON"){
			s2t = "OFF"
			add([
				text(`Dark Mode: ${s2t}`),
				pos(window.innerWidth/2, 166),
				origin("center"),
				color(97, 117, 103),
				area(),
				fixed(),
				"s2"
			])
			localStorage.setItem("st2", false)
			location.reload()
		}
	}) //handler for darkmode button

	
	var s3t = "OFF"

	if(localStorage["st3"] == "false"){
		s3t = "OFF"
	} //handlers for the global
	if (localStorage["st3"] == "true"){
		s3t = "ON"
	} //timer var
	
	add([ //auto respawn button
		text(`Speedrun Timer: ${s3t}`),
		pos(window.innerWidth/2, 266),
		color(97, 117, 103),
		origin("center"),
		area(),
		fixed(),
		"s3"
	])
	add([
		text("Performance may be affected by turning the Timer on.", {size:25}),
		fixed(),
		pos(window.innerWidth/2, 305),
		origin("center"),
		color(97, 117, 103),
	])

	onClick("s3", (s3) => { 
		destroy(s3)
		if(s3t == "OFF"){
			s3t = "ON"
			add([
				text(`Speedrun Timer: ${s3t}`),
				pos(window.innerWidth/2, 266),
				origin("center"),
				color(97, 117, 103),
				area(),
				fixed(),
				"s3"
			])
			localStorage.setItem("st3", true)
			
		} else if (s3t == "ON"){
			s3t = "OFF"
			add([
				text(`Speedrun Timer: ${s3t}`),
				pos(window.innerWidth/2, 266),
				origin("center"),
				color(97, 117, 103),
				area(),
				fixed(),
				"s3"
			])
			localStorage.setItem("st3", false)
		}
	}) //handler for timer toggle

	var s4t = "OFF"

	if(localStorage["st4"] == "false"){
		s4t = "OFF"
	} //handlers for the global
	if (localStorage["st4"] == "true"){
		s4t = "ON"
	} //checkpoint var
	
	add([ //chckpnt button
		text(`Checkpoints: ${s4t}`),
		pos(window.innerWidth/2, 366), origin("center"),
		color(97, 117, 103),
		area(),
		fixed(),
		"s4"
	])
	add([
		text("Turning checkpoints on will not reset your progress when you die\n\nTurning checkpoints off will reset your saved level", {size:25}),
		fixed(),
		pos(window.innerWidth/2, 425),
		origin("center"),
		color(97, 117, 103),
	])

	onClick("s4", (s4) => { 
		destroy(s4)
		if(s4t == "OFF"){
			s4t = "ON"
			add([
				text(`Checkpoints: ${s4t}`),
				pos(window.innerWidth/2, 366), origin("center"),
				color(97, 117, 103),
				area(),
				fixed(),
				"s4"
			])
			localStorage.setItem("st4", true)
			
		} else if (s4t == "ON"){
			s4t = "OFF"
			add([
				text(`Checkpoints: ${s4t}`),
				pos(window.innerWidth/2, 366), origin("center"),
				color(97, 117, 103),
				area(),
				fixed(),
				"s4"
			])
			localStorage.setItem("st4", false)
			localStorage.setItem("level", 0)
		}
		nakjs()
	}) //handler for checkpoint toggle
	
})

scene("market", () => {
	destroyAll("tml")
	window.clearInterval(inter); mins=0;secs=0;ohs=0;
	
	add([
		text("Click a bean to buy it.", {size: 40}),
		pos(880, 30),
		fixed()
	])

	add([
		text(`Your Coins: ${localStorage.getItem("coins")}`, {size:30}),
		pos(980, 100),
		area(),
		fixed(),
		"cns"
	])
	add([
		sprite("coin"),
		pos(1300, 100),
		area(),
		fixed(),
		scale(0.7)
	])

	add([
		text("Back...", {size: 60}),
		color(192, 199, 139),
		fixed(),
		area(),
		pos(1000, 480),
		"bk"
	]) //back button
	onClick("bk", () => {
		go("lobby")
	})
	
	let xps = [100, 180, 260, 340, 420, 500, 580, 660, 740, 820]
	let pr = [3, 3, 3, 3, 3, 3, 3, 3, 5, 5]
	let prs = [3000, 3000, 3000, 3000, 3000, 3000, 3000, 3000, 5000, 5000]
	
	for(let q = 0; q<beans.length-1;q++){
		add([
			sprite(beans[q]),
			area(),
			fixed(),
			pos(xps[q],100),
			`${beans[q].replace(/\s/g, '').toLowerCase()}`
		])
		add([
			sprite("coin"),
			text(`\n${pr[q]}K`),
			scale(0.5),
			fixed(),
			pos(xps[q] - 10, 160),
			`cn${q}`
		])
		if(localStorage["ownedBeans"].split(",")[q] == "true"){
			destroyAll(`cn${q}`)
			add([
				text("Owned", {size:20}),
				fixed(),
				pos(xps[q] - 10, 160)
			])
		}

		onClick(`${beans[q].replace(/\s/g, '').toLowerCase()}`, () => {
		if(isNaN(localStorage.coins)){
			localStorage.setItem("coins", 0)
		}
		if(parseInt(localStorage.getItem("coins")) <= prs[q] && localStorage["ownedBeans"].split(",")[q] == "false"){
			alert(`Insufficient funds!! You need ${prs[q] - parseInt(localStorage.getItem("coins"))} more coins!`)
		} else if (localStorage["ownedBeans"].split(",")[q] == "false") {
			let temp = localStorage["ownedBeans"].split(",")
			temp[q] = true
			localStorage.setItem("ownedBeans", temp)
			localStorage.setItem("coins", parseInt(localStorage.getItem("coins")) - prs[q])
			destroyAll("cns")
			destroyAll(`cn${q}`)
			add([
				text(`Your Coins: ${localStorage.getItem("coins")}`, {size:30}),
				pos(980, 100),
				area(),
				fixed(),
				"cns"
			])
			add([
				text("Owned", {size:20}),
				fixed(),
				pos(xps[q] - 10, 160)
			])
			alert("Successfully purchased.")
		} else {
			alert("You already own this!")
		}
	})
		
	}
	
	
})

scene("helpmenu", () => {
	destroyAll("tml")
	window.clearInterval(inter); mins=0;secs=0;ohs=0;
	
	add([
		text("Controls:\nWASD/arrow keys to move; W, Space, and Up Arrow are\nall used to jump.\n\nPress Escape to exit to main menu.\nHidden in this game are some tiny easter eggs,\nlet's see if you can find them all! ;) \n\nClickable text is colored.\n\nUnlock all Easter Eggs in order to recieve a new skin. \n\n", {size: 40}),
	])

	add([
		text("There's a secret level hidden somewhere", {size:9}),
		pos(10,680),
		fixed(),
	])
	
	add([ //back button
		text("Back...", {size: 50}),
		color(192, 199, 139),
		fixed(),
		area(),
		pos(1000, 600),
		"bk"
	])
	onClick("bk", () => {
		go("lobby")
	})
})

scene("info", () => {
	destroyAll("tml")
	window.clearInterval(inter); mins=0;secs=0;ohs=0;

	var d = new Date()
	
	add([
		text(`Made by Aaryan Soni, ${d.getFullYear()}\n\nSkins + Design: Aaryan Soni and Veenit Sheth\n\nBeta Testers: Aiden Mane, Veenit Sheth, Jericho Mejia\n\nHonorable Mentions: Kavya Bhatt, Brayden Mcquillan, Ayyan Ali,\nJulien Ayyad, Sebastian Jakubek, Olive Pollina`, {size:35}),
		fixed()
	])

	add([
		text(',', {size:35}),
		area(),
		fixed(),
		pos(403,0),
		color(250,250,250),
		"scrt"
	])

	onClick("scrt", () => {
		location.href = "https://secretrick.astleylevel.repl.co/"
	})

	
		
	add([ //back button
		text("Back...", {size: 50}),
		color(192, 199, 139),
		fixed(),
		area(),
		pos(1000, 400),
		"bk"
	])

	onClick("bk", () => {
		go("lobby")
	})
	
})

var lvtx;
function nakjs () {
	if(localStorage["st4"] == "true"){
		lvtx = parseInt(localStorage["level"])
	}else {
		lvtx = 0
	}
}

nakjs()

scene("game", ({ levelId, coins } = { levelId: lvtx, coins: 0 }) => {
	destroyAll("tml")
	window.clearInterval(inter);
	nakjs()
		
	localStorage["st4"] == "true" ? localStorage.setItem("level", levelId) : console.log("no")

	
	
	
	if (!localStorage.getItem("coins")){
		localStorage.setItem("coins", 1)
		console.log(localStorage.getItem("coins"))
	} else {
		var c = localStorage.getItem("coins")
		
		localStorage.setItem("coins", parseInt(c) + coins)
		
		console.log(localStorage.getItem("coins"))
	}

	gravity(3200)

	// add level to scene

	var lvlt;

	localStorage["st4"] == "true" ? lvlt = parseInt(localStorage["level"]) : lvlt = levelId
	
	const level = addLevel(LEVELS[lvlt ?? 0], levelConf)


	// define player object

	let y = beans[localStorage["equippedBean"].split(",").indexOf("true")]

	if(localStorage["equippedBean"].split(",").indexOf("true") === -1){
		y = "bean"
	}


	
	const player = add([
		sprite(y),
		pos(0, 0),
		area(),
		scale(1),
		// makes it fall to gravity and jumpable
		body(),
		// the custom component we defined above
		big(),
		origin("bot"),
		
	])


	// action() runs every frame
	player.onUpdate(() => {
		// center camera to player
		camPos(player.pos)
		// check fall death
		if (player.pos.y >= FALL_DEATH) {
			go("lose")
		}

		
	})

	// if player onCollide with any obj with "danger" tag, lose
	player.onCollide("danger", () => {
		go("lose")
		play("hit")
	})


	var shakeIntensity = 1
	
	player.onCollide("secretdwayne", () => {
		shakeIntensity ++

		
		if(shakeIntensity < 4 ){
			play(`snore${shakeIntensity}`)
			shake(shakeIntensity - 1 * 150)
		}else if (shakeIntensity == 4 || shakeIntensity == 0){
			shakeIntensity = 1
			play(`snore${shakeIntensity}`)
			shake(shakeIntensity - 1 * 10)
		}
		
		
		let temp = localStorage["eggsFound"].split(",")
			
		if(temp[levelId] == "false"){
			temp[levelId] = true
			localStorage.setItem("eggsFound", temp)
		} else {
			console.log("already found this easter egg")
		}
		
	})

	player.onCollide("portal", () => {
		play("portal")
		if (levelId + 1 < LEVELS.length) {
			go("game", {
				levelId: levelId + 1,
				coins: coins,
			})
		} else {
			go("win")
		}
	})

	player.onGround((l) => {
		if (l.is("enemy")) {
			player.jump(JUMP_FORCE * 1.5)
			destroy(l)
			addKaboom(player.pos)
			play("powerup")
			coins += Math.floor(Math.random()*21)
		}

	
        
	})

	player.onCollide("enemy", (e, col) => {
		// if it's not from the top, die
		if (!col.isBottom()) {
			go("lose")
			play("hit")
		}
	})

	
	

	let hasApple = false

	let sped = false

	if(MOVE_SPEED == 700){
		sped = true
	} else if (MOVE_SPEED == 480){
		sped = false
	}

	player.onHeadbutt((obj) => {
		if (obj.is("speed")) {
			if(sped == false){
				MOVE_SPEED = 700
				play("speed")
				sped=true
				setTimeout(function () {
					MOVE_SPEED = 480
					sped=false
				}, 5000)
			}
			
		}
	})


	// grow an apple if player's head bumps into an obj with "prize" tag
	player.onHeadbutt((obj) => {
		if (obj.is("prize") && !hasApple) {
			const apple = level.spawn("#", obj.gridPos.sub(0, 1))
			apple.jump()
			hasApple = true
			play("blip")
		}
	})


	// player grows big onCollide with an "apple" obj
	player.onCollide("apple", (a) => {
		destroy(a)
		// as we defined in the big() component
		player.biggify(3)
		hasApple = false
		play("powerup")
	})

	let coinPitch = 0

	onUpdate(() => {
		if (coinPitch > 0) {
			coinPitch = Math.max(0, coinPitch - dt() * 100)
		}

        
	})


	// var allTimeCoinsLabel = add([
	// 	text(`All-time Coins: ${localStorage.getItem("coins")}`, { size:46 }),
	// 	pos(24, 220),
	// 	fixed(),
	// 	"cl"
	// ])
	

	// player.onCollide("coin", (c) => {
	// 	destroy(c)
	// 	play("coin", {
	// 		detune: coinPitch,
	// 	})
	// 	coinPitch += 100
	// 	coins += 1
	// 	coinsLabel.text = `Coins: ${coins}`
	// 	var d = localStorage.getItem("coins")

	// 	destroy("cl")
		
		// var allTimeCoinsLabel = add([
		// 	text(`ATC: ${localStorage.getItem("coins")}`, { size:46 }),
		// 	pos(24, 220),
		// 	fixed(),
		// 	"cl"
		// ])
		
	// 	localStorage.setItem("coins", parseInt(d) + 1)
		
	// })

	if (localStorage["st3"] == "true"){
		var timerLabel = add([
			text(`${mins}:${ohs}${secs}`, {size:50}),
			fixed(),
			pos(24,65),
			"tml"
		])
	
		inter = window.setInterval(() => {
			destroyAll("tml")
			secs ++;
			
			if(secs == 60){
				mins ++
				secs = 0;
			} 
	
			if(secs >= 10){
				ohs = ""
			}
			if(secs < 10){
				ohs = 0
			}
			
			add([
				text(`${mins}:${ohs}${secs}`, {size:50}),
				fixed(),
				pos(24,65),
				"tml"
			])
		}, 1000)
	}
	
	 var allTimeCoinsLabel = add([
		text(`All-time Coins: ${localStorage.getItem("coins")}`, { size:50 }),
		pos(24, 24),
		fixed(),
		"cl"
	])
  
	player.onCollide("coin", (c) => {
		destroy(c)
    	coinPitch += 100
		coins += 1
		var d = localStorage.getItem("coins")
		destroy("cl")
		localStorage.setItem("coins", parseInt(d) + 1)	
		allTimeCoinsLabel.text = `All-time Coins: ${localStorage.getItem("coins")}`
	})


	// const coinsLabel = add([
	// 	text(`Coins: ${coins}`),
	// 	pos(24, 24),
	// 	fixed(),
	// ])

	const winsLabel = add([
		text(`Wins: ${localStorage.getItem("wins")}`, { size:56 }),
		pos(24, 159),
		fixed(),
	])

	const levelLabel = add([
		text(`Level ${levelId+1}`, {size: 56}),
		pos(24, 210),
		fixed()
	])

	const lossesLabel = add([
		text(`Losses: ${localStorage.getItem("losses")}`, { size:56 }),
		pos(24, 104),
		fixed(),
	])

	


	
	
	onKeyDown("up", () => {
		// these 2 functions are provided by body() component
		if (player.isGrounded()) {
			player.jump(JUMP_FORCE)
		}
	})
    onKeyDown("w", () => {
		// these 2 functions are provided by body() component
		if (player.isGrounded()) {
			player.jump(JUMP_FORCE)
		}
	})
    onKeyPress("escape", () => {
        go("reset")
    })
    onKeyDown("space", () => {
		// these 2 functions are provided by body() component
		if (player.isGrounded()) {
			player.jump(JUMP_FORCE)
		}
	})

    var leftPressed = false
    var rightPressed = false
    var aPressed = false
    var dPressed = false



	
	onKeyDown("left", () => {
        if (aPressed){
            return
        } else {
    		player.move(-MOVE_SPEED, 0)
        }
        leftPressed = true
	})
    onKeyDown("a", () => {
        if (leftPressed){
            return
        } else {
    		player.move(-MOVE_SPEED, 0)
        }
        aPressed = true
		
	})

	onKeyDown("right", () => {
        if(dPressed){
            return
        } else {
    		player.move(MOVE_SPEED, 0)
        }
        rightPressed = true
	})
    onKeyDown("d", () => {
		if(rightPressed){
            return
        } else {
            player.move(MOVE_SPEED, 0)
        }
        dPressed = true
	})

	onKeyPress("down", () => {
		player.weight = 3
        downPressed = true
        
	})
    onKeyPress("s", () => {
		player.weight = 3
        sPressed = true
	})

	onKeyRelease("down", () => {
		player.weight = 1
        downPressed = false
	})
    onKeyRelease("s", () => {
		player.weight = 1
        sPressed = false
	})

	onKeyPress("f", () => {
		fullscreen(!fullscreen())
	})

    onKeyRelease("left", () => {
        leftPressed = false
    })

    onKeyRelease("right", () => {
        rightPressed = false
    })

    onKeyRelease("a", () => {
        aPressed = false
    })
    onKeyRelease("d", () => {
        dPressed = false
    })



})

scene("lose", () => {
	destroyAll("tml")
	window.clearInterval(inter); mins=0;secs=0;ohs=0;; 
	add([
		text("You Lose\n\n"),
		color(255,100,100),
		origin("center"),
		pos(center())
	])
	add([
		text("Press any key to continue", {size: 50}),
		pos(0,100),
		origin("center"),
		pos(center())
	])

	
	onKeyPress(() => {

		if (!localStorage.getItem("losses")){
			localStorage.setItem("losses", 1)
			console.log(localStorage.getItem("losses"))
		} else {
			var l = localStorage.getItem("losses")
			
			localStorage.setItem("losses", parseInt(l) + 1)
			
			console.log(localStorage.getItem("losses"))
		}
		
		// go("lobby");
		if (f==true){
			nakjs()
			go("game")
		}else if (f==false){
			go("lobby");
		}
		MOVE_SPEED = 480
	})
})

scene("win", () => {
	destroyAll("tml")
	window.clearInterval(inter); mins=0;secs=0;ohs=0;
	add([
		text("You Win\n\n"),
		color(100,255,100),
		origin("center"),
		pos(center())
	])
	add([
		text("Press any key to continue", {size: 50}),
		pos(0,100),
		origin("center"),
		pos(center())
	])
	if(localStorage.st3 == true){
		
	}
	onKeyPress(() => {
		if (!localStorage.getItem("wins")){
			localStorage.setItem("wins", 1)
			console.log(localStorage.getItem("wins"))
		} else {
			var w = localStorage.getItem("wins")
			
			localStorage.setItem("wins", parseInt(w) + 1)
			
			console.log(localStorage.getItem("wins"))
		}
		
		// go("lobby");
		if (f==true){
			go("game")
		}else if (f==false){
			go("lobby");
		}
		MOVE_SPEED = 480
		localStorage.level = "0"
		nakjs()
	})
})

scene("reset", () => {
	destroyAll("tml")
	window.clearInterval(inter); mins=0;secs=0;ohs=0;
	add([
		text("Reset Game\n\n"),
		color(100,100,100),
		origin("center"),
		pos(center())
	])
	add([
		text("Press any key to continue", {size: 50}),
		pos(0,100),
		origin("center"),
		pos(center())
	])
	onKeyPress(() => {
		go("lobby")
		MOVE_SPEED = 480
	})
})


go("lobby")

