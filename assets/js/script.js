
if (localStorage.API_Key) {
    document.getElementById("API_Key").value	=	localStorage.API_Key;
}


let btn_get_images	=	document.getElementById('btn_get_images');
let selection_array =	document.querySelectorAll(".get_on_change");

selection_array.forEach(function(elem) {
    elem.addEventListener("change", function() {
        // This function does stuff
		FetchImages();
    });
});
btn_get_images.addEventListener("click", function(e) {
	FetchImages();
	e.preventDefault();
});



function FetchImages(){
	
	let Search_Term 	= encodeURI(document.getElementById("Search_Term").value);
	let Image_Type 		= document.getElementById("Image_Type").value;
	let Orientation 	= document.getElementById("Orientation").value;
	let Page 			= document.getElementById("Page").value;
	let API_Key 		= document.getElementById("API_Key").value;
	let PerPage			= 100;
	
	localStorage.setItem("API_Key", API_Key);
	
	fetch(`https://pixabay.com/api/?q=${Search_Term}&image_type=${Image_Type}&orientation=${Orientation}&page=${Page}&per_page=${PerPage}&key=${API_Key}`)
		.then(response => response.json())
		.then(data => {
			if(data.hits.length>0){
				document.getElementById('photos').innerHTML = "";
				data.hits.forEach(function (image, index) {
					document.getElementById('photos').innerHTML += `<div class="col item"><a href="${image.largeImageURL}"><img class="img-fluid" src="${image.largeImageURL}" /></a></div>`;
				});
				if (document.querySelectorAll('[data-bss-baguettebox]').length > 0) {
					baguetteBox.run('[data-bss-baguettebox]', { animation: 'false',overlayBackgroundColor: 'rgba(255,255,255,1)' });
				}
				imagesLoaded( document.querySelector('.photos'), function( instance ) {
					var msnry = new Masonry( '.photos', {"percentPosition": true });
					msnry.layout();
				});
				UpdatePages(data.totalHits,PerPage,Page);
				document.getElementById("status").innerHTML	=	`found ${data.totalHits} images, you are on page ${Page} `;
			}else{
				document.getElementById("status").innerHTML	=	"found no image";
			}
			
		})
		.catch(error => console.error(error));
	  
}

function UpdatePages(totalHits,per_page,current_page){
	let totalPage = totalHits / per_page;
	var page_selecting	=	document.getElementById('Page');
	page_selecting.innerHTML = "";
	for (var i = 0; i<(totalPage+1); i++){
		page_selecting[i] = new Option(i+1, i+1, i==(current_page-1), i==(current_page-1));	
		
	}

}