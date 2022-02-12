
//min以上max未満　での乱数
function getRand(min, max) {//maxに3minに0を指定した場合出てくるのは0~2の三つの値です
	return (Math.floor(Math.random() * (max - min))) + min
}

function makeDagasiList(maxPrice, dagasiList) {
	let result = []
	dagasiList.forEach(e => {
		if (e.price <= maxPrice) {
			result.push(e)
		}
	})

	return result
}

function choiceOne(dagasiList) {
	let a = getRand(0, dagasiList.length)
// 	console.log(a)
	return dagasiList[a]
}

function editHTML(){//こんな関数を作っているのはなんか気持ち的にmainにいれるの嫌だったから
		let header = $("#header")
		header.css({"box-shadow":"1px 0 3px #dfb562"})

		let footer = $("#footer")
		footer.show()


		let padding = $(".padding")
		padding.remove()


		let firstbtn = $(".firstbtn")
		firstbtn.remove()
		
		let firstcash = $(".firstcash")
		firstcash.remove()

}

function writeResult(result, nowPrice) {
	let ListElement = $(".results")
	ListElement.empty()
	result.forEach(e => {
		ListElement.append("<div class='result'><div class='name'>" + e.name + "</div><div class='price'>" + e.price + "円</div></div>") //<img src=" + e.image + ">
	})


	let resultInfo = $(".resultInfo")
	resultInfo.empty()
	resultInfo.append("<div class ='priceSum'>合計: " + nowPrice + " 円</div>")
	resultInfo.append("<div class ='length'>商品数: " + result.length + " 個</div>")
}

function tweet(result,nowPrice,maxPrice) {
	let text=maxPrice+"円で駄菓子ガチャを引きました!!\n"
	result.forEach(e=>{
		text+=(e.name+" "+e.price+"円\n")
	})
	text+="合計: "+nowPrice+"円"
	let url = "https://twitter.com/intent/tweet?&text=" + text + "&hashtags=" + "駄菓子100円ガチャ" + "&url=https://trimscash.github.io/DagashiGacha/index.html";
	let encoded = encodeURI(url);
	$(".tweetButton").attr("href", encoded);
}

function main() {
	fetch("./dagasi.json")
	.then(res => res.json())
	.then(dagasiList =>{
		let inputPrice=$(".priceSet")
		// console.log(dagasiList[3])
		let result = []
		let dagasi
		let nowPrice = 0
		let maxPrice = inputPrice.val()
		let nowMaxPrice
		dagasiList = makeDagasiList(maxPrice, dagasiList)
		while (dagasiList.length != 0) {
			dagasi = choiceOne(dagasiList)
// 			console.log(dagasi)
// 			console.log(dagasiList)
			result.push(dagasi)
			nowPrice += dagasi.price
			nowMaxPrice = maxPrice - nowPrice
			dagasiList = makeDagasiList(nowMaxPrice, dagasiList)
		}
		
		tweet(result,nowPrice,maxPrice)
		editHTML()
		writeResult(result, nowPrice)
	})
}
$(document).ready()
