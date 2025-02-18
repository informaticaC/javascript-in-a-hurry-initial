// Open Weather api
const weatherAPIKey = 'f054e09ba76d80b0ea24c122a6a6d982'
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${weatherAPIKey}&units=metric`

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

const products = [
    {
      title: "AstroFiction",
      author: "John Doe",
      price: 49.9,
      image: "./assets/products/img6.png"
    },
    {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./assets/products/img1.png"
    },
    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./assets/products/img2.png"
    },
    {
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./assets/products/img3.png"
    },
    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./assets/products/img5.png"
    },
    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 45,
      image: "./assets/products/img4.png"
    }
  ]

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
function selsiusToFahr(temperature) {
	let fahr = ((temperature  )* 9/5) + 32;
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
	
	let weatherCondition;
	let userLocation ;
	let temperature ;
	let celsiusText;
	let fahrText;

	navigator.geolocation.getCurrentPosition( position => {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
		let url = weatherAPIURL
				.replace("{lon}", longitude)
				.replace("{lat}", latitude);
							
	fetch(url , { method: "GET"})
			.then( response => (response.json()) )
			.then( data => {
				
				weatherCondition = data.weather[0].description;
				userLocation = data.name;
				temperature = data.main.temp;
				
					celsiusText = `The weather is ${weatherCondition} in ${userLocation} and it's ${temperature.toFixed(1) }°C outside.`;
					fahrText = `The weather is ${weatherCondition} in ${userLocation} and it's ${selsiusToFahr(temperature).toFixed(1) }°F outside.`;
					document.querySelector("#greeting").innerHTML =  (greetingText) ;
					document.querySelector("#weather").innerHTML = (celsiusText);
				
				
			})
			.catch (error => {
				console.log(error)
				/* celsiusText = `The weather is ${weatherCondition} in ${userLocation} and it's ${temperature.toFixed(1) }°C outside.`;
				fahrText = `The weather is ${weatherCondition} in ${userLocation} and it's ${selsiusToFahr(temperature).toFixed(1) }°F outside.`; */
				document.querySelector("#greeting").innerHTML =  (greetingText) ;
				document.querySelector("#weather").innerHTML = ("I can't get the weather data now, try later please.");
			})
	}); 
	
	
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

// Product section

function populateProducts(productList){
	let productItem;
	const productContainer = document.querySelector(".products-area");
	productList.forEach((product,index)=>{

		productItem = document.createElement("div") ;
		productItem.classList.add("product-item");
		let productImage = document.createElement("img");
		productImage.src = product.image;
		productImage.alt = product.title;
		let productDetails = document.createElement("div");
		productDetails.classList.add("product-details");
			//productDetails.innerHTML = "aquí van los product details";
			let productTitle = document.createElement("h3");
			productTitle.classList.add("product-title");
			productTitle.innerHTML = product.title;
			productDetails.appendChild(productTitle);
			let productAuthor = document.createElement("p");
			productAuthor.classList.add("product-author");
			productAuthor.innerHTML = product.author;
			productDetails.appendChild(productAuthor);
			let priceTitle = document.createElement("p");
			priceTitle.classList.add("price-title");
			priceTitle.innerHTML = "Price";
			productDetails.appendChild(priceTitle);
			let productPrice = document.createElement("p");
			productPrice.classList.add("product-price");
			productPrice.innerHTML = product.price > 0 ? "$" + product.price.toFixed(2) : "Free";
			productDetails.appendChild(productPrice);
		
						
		productItem.appendChild(productImage);
		productItem.appendChild(productDetails);
		productContainer.appendChild(productItem);
	})
};

function productsHandler(){
	//let productItem;
	
	populateProducts(products);

	let totalProducts = products.length;
	
	let payProducts = products.filter(product => (product.price > 0) );
	
	let freeProducts = products.filter(product => product.price <= 0 || !product.price );

	document.querySelector(".products-filter label[for=all] span.product-amount").textContent = totalProducts;
	document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = payProducts.length;
	document.querySelector(".products-filter label[for=free] span.product-amount").textContent = freeProducts.length;

	let productsFilter = document.querySelector(".products-filter");
	let productsArea = document.querySelector(".products-area")
	productsFilter.addEventListener("click", function(e){
		productsArea.innerHTML = "";
		let filterSelected = e.target.id;
		if (filterSelected === "all") {
			populateProducts(products);
		} else if(filterSelected === "paid"){
			populateProducts(payProducts);
		} else if(filterSelected === "free"){
			populateProducts(freeProducts);
		};
	})
}

// Footer
function footerHandler(){
	let currentYear = new Date().getFullYear();
	document.querySelector("footer").textContent = `© ${currentYear} - All rights reserved`
}


//Page load

menuHandler();
greetingHandler();
clockHandler();
galleryHandler();
productsHandler();
footerHandler();

