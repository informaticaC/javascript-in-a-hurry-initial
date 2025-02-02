// Image Gallery
const galleryImages = [
	{
		src: "./assets/gallery/image3.jpg",
		alt: "Thumbnail Image 3"
	},
	{
		src: "./assets/gallery/image1.jpg",
		alt: "Thumbnail Image 1"
	},
	{
		src: "./assets/gallery/image2.jpg",
		alt: "Thumbnail Image 2"
	}
	
];

// Menu Handler
function menuHandler() {
	
	document.querySelector("#open-nav-menu").addEventListener("click", function () {
		document.querySelector("header nav .wrapper").classList.add("nav-open")
	})
	
	document.querySelector("#close-nav-menu").addEventListener("click", function () {
		document.querySelector("header nav .wrapper").classList.remove("nav-open")
	})
}


// Temperature conversion
function celsiusToFahr(temperature) {
	let fahr = (temperature * 9/5) + 32;
	return fahr;
}

// Greeting Section

function greetingHandler(){

	let currentHour  = new Date().getHours();
	let greetingText;
	if (currentHour < 12){
		greetingText = "Good Morning!";
	} else if (currentHour < 19) {
		greetingText = "Good afternoon!"
	} else if (currentHour < 24) {
		greetingText = "Good evening!";
	} else {
		greetingText = "Welcome!"
	}
	
	const weatherCondition = "sunny";
	const userLocation = "New York";
	let temperature = 30;
	let celsiusText = `The weather is ${weatherCondition} in ${userLocation} and it's ${temperature.toFixed(1) }°C outside.`;
	let fahrText = `The weather is ${weatherCondition} in ${userLocation} and it's ${celsiusToFahr(temperature).toFixed(1) }°F outside.`;
	
	document.querySelector("#greeting").innerHTML = (greetingText);
	document.querySelector("#weather").innerHTML= (celsiusText);
	
	document.querySelector(".weather-group").addEventListener("click", function(e){
		//console.log(e.target.id);
		if (e.target.id == "celsius") {
			//console.log("temp in celsius")
			document.querySelector("#weather").innerHTML= (celsiusText);
		} else if (e.target.id == "fahr") {
			//console.log("temp in Far")
			document.querySelector("#weather").innerHTML= (fahrText);
		}
	});
}

// Local time Section

function clockHandler(){
	function setTime() {
		let hours = new Date().getHours().toString().padStart(2,"0");
		let minutes = new Date().getMinutes().toString().padStart(2,"0");
		let seconds = new Date().getSeconds().toString().padStart(2,"0");
		document.getElementsByClassName("time-number")[0].innerHTML = hours;
		document.getElementsByClassName("time-number")[1].innerHTML = minutes;
		document.getElementsByClassName("time-number")[2].innerHTML = seconds;
	}
	
	setInterval(setTime, 1000);
}

// Gallery Section

function galleryHandler(){
	let mainImage = document.querySelector("#gallery > img");
	let thumbnails = document.querySelector("#gallery .thumbnails");
	galleryImages.forEach(function(image, index){
		//console.log(image);
		let thumb = document.createElement("img");
		thumb.src = image.src;
		thumb.alt = image.alt;
		thumb.dataset.arrayIndex = index;
		thumb.dataset.selected = ( index === 0 ? true : false);
		thumb.addEventListener("click", function(e){
			let selectedIndex = e.target.dataset.arrayIndex;
			let selectedImage = galleryImages[selectedIndex];
			mainImage.src = selectedImage.src;
			mainImage.alt = selectedImage.alt;
			thumbnails.querySelectorAll("img").forEach(function(img, indx){
				img.dataset.selected = (indx == selectedIndex? true : false);
			});
		})
		thumbnails.appendChild(thumb);
	})
	mainImage.src = galleryImages[0].src;
	mainImage.alt = galleryImages[0].alt;
}


//Page load

menuHandler();
greetingHandler();
clockHandler();
galleryHandler();