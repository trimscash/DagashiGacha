
function getRand(min, max) {
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
	return dagasiList[a]
}

function editHTML(){
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
	let text = maxPrice + "円で"
	let text2="を引きました!\n"
	result.forEach(e => {
		text2 += (e.name + " " + e.price + "円\n")
	})
	text2 += "合計: " + nowPrice + "円"
	text=encodeURI(text)
	text2=encodeURI(text2)
	let hashtag = encodeURI("駄菓子ガチャ")
	let url = encodeURI("trimscash.github.io/DagashiGacha");
	let encoded = "https://twitter.com/intent/tweet?&text=" + text + "%20%23"+hashtag+"%20" + text2 + "&url="+url;
	$(".tweetButton").attr("href", encoded);
}

function main() {
	fetch("./dagasi.json")
	.then(res => res.json())
	.then(dagasiList =>{
		let inputPrice=$(".priceSet")
		let result = []
		let dagasi
		let nowPrice = 0
		let maxPrice = inputPrice.val()
		let nowMaxPrice
		dagasiList = makeDagasiList(maxPrice, dagasiList)
		while (dagasiList.length != 0) {
			dagasi = choiceOne(dagasiList)
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
