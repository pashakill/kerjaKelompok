import {initIntro} from '../api.js';
import {initFeature} from '../api.js';
import {initLatestProduct} from '../api.js';

(function ($) {

  "use strict";

  // init jarallax parallax
  var initJarallax = function () {
    jarallax(document.querySelectorAll(".jarallax"));
    jarallax(document.querySelectorAll(".jarallax-img"), {
      keepImg: true,
    });
  }

  // input spinner
  var initProductQty = function(){
    $('.product-qty').each(function(){

      var $el_product = $(this);
      var quantity = 0;

      $el_product.find('.quantity-right-plus').click(function(e){
          e.preventDefault();
          var quantity = parseInt($el_product.find('.quantity').val());
          $el_product.find('.quantity').val(quantity + 1);
      });

      $el_product.find('.quantity-left-minus').click(function(e){
          e.preventDefault();
          var quantity = parseInt($el_product.find('.quantity').val());
          if(quantity>0){
            $el_product.find('.quantity').val(quantity - 1);
          }
      });

    });

  }

  // init Chocolat light box
	var initChocolat = function () {
		Chocolat(document.querySelectorAll('.image-link'), {
			imageSize: 'contain',
			loop: true,
		})
	}

  // Animate Texts
  var initTextFx = function () {
    $('.txt-fx').each(function () {
      var newstr = '';
      var count = 0;
      var delay = 0;
      var stagger = 10;
      var words = this.textContent.split(/\s/);
      
      $.each( words, function( key, value ) {
        newstr += '<span class="word">';

        for ( var i = 0, l = value.length; i < l; i++ ) {
          newstr += "<span class='letter' style='transition-delay:"+ ( delay + stagger * count ) +"ms;'>"+ value[ i ] +"</span>";
          count++;
        }
        newstr += '</span>';
        newstr += "<span class='letter' style='transition-delay:"+ delay +"ms;'>&nbsp;</span>";
        count++;
      });

      this.innerHTML = newstr;
    });
  }

  $(document).ready(function () {
    initProductQty();
    initJarallax();
    initChocolat();
    initTextFx();

    $(".user-items .search-item").click(function () {
      $(".search-box").toggleClass('active');
      $(".search-box .search-input").focus();
    });
    $(".close-button").click(function () {
      $(".search-box").toggleClass('active');
    });

    var breakpoint = window.matchMedia('(max-width:61.93rem)');

    if (breakpoint.matches === false) {
      
      var swiper = new Swiper(".main-swiper", {
        slidesPerView: 1,
        spaceBetween: 48,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          900: {
            slidesPerView: 2,
            spaceBetween: 48,
          },
        },
      });

      // homepage 2 slider
      var swiper = new Swiper(".thumb-swiper", {
        direction: 'horizontal',
        slidesPerView: 6,
        spaceBetween: 6,
        breakpoints: {
          900: {
            direction: 'vertical',
            spaceBetween: 6,
          },
        },
      });
      var swiper2 = new Swiper(".large-swiper", {
        spaceBetween: 48,
        effect: 'fade',
        slidesPerView: 1,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        thumbs: {
          swiper: swiper,
        },
      });

    }

    // product single page
    var thumb_slider = new Swiper(".product-thumbnail-slider", {
      slidesPerView: 5,
      spaceBetween: 10,
      // autoplay: true,
      direction: "vertical",
      breakpoints: {
        0: {
          direction: "horizontal"
        },
        992: {
          direction: "vertical"
        },
      },
    });

    // product large
    var large_slider = new Swiper(".product-large-slider", {
      slidesPerView: 1,
      // autoplay: true,
      spaceBetween: 0,
      effect: 'fade',
      thumbs: {
        swiper: thumb_slider,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    

  }); // End of a document

  $(window).load(function(){
    $('.preloader').fadeOut();
  });

})(jQuery);

document.addEventListener("DOMContentLoaded", async function() {
  // Fungsi untuk mengambil data dari API
  const gridContainer = document.getElementById("grid-container");
  const data = await initIntro();

  const modal = new bootstrap.Modal(document.getElementById("modaltoggle")); // Bootstrap modal instance

  if (data.success && Array.isArray(data.intro)) {
    // Loop untuk menambahkan gambar ke dalam grid
    data.intro.slice(0, 4).forEach((item, index) => {
      const imgContainer = document.createElement("div");

      imgContainer.classList.add("grid-item");
      
      // Menambahkan kelas untuk posisi grid-area sesuai dengan index
      if (index === 0) imgContainer.classList.add("a");
      else if (index === 1) imgContainer.classList.add("b");
      else if (index === 2) imgContainer.classList.add("c");
      else if (index === 3) imgContainer.classList.add("d");

      // Create the image element
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.title;
      img.setAttribute("data-bs-target", "#modaltoggle"); // Set modal target
      img.setAttribute("data-bs-toggle", "modal"); // Enable modal toggle

      // Add image to the container and container to the grid
      imgContainer.appendChild(img);
      gridContainer.appendChild(imgContainer);

     // Update modal content on image click
     img.addEventListener("click", () => {
  
      document.getElementById('modal-product-name').textContent = item.productName;
      document.getElementById('modal-product-price').textContent = '$' + item.price;
      document.getElementById('modal-product-image').setAttribute('src', item.image);
      document.getElementById('modal-product-description').textContent = item.productDescription;
      document.getElementById('modal-product-colour').innerHTML = `<strong>Colour Shown:</strong> ${item.colour}`;
      document.getElementById('modal-product-code').innerHTML = `<strong>Style:</strong> ${item.style}`;

      // Show the modal
      $('#modaltoggle').modal('show');
    });
      
      // Append image to container and container to grid
      imgContainer.appendChild(img);
      gridContainer.appendChild(imgContainer);
    });
  } else {
    console.error("Data tidak valid atau tidak ditemukan array intro");
  }
});

document.addEventListener("DOMContentLoaded", async function() {
  // Fungsi untuk mengambil data dari API
  const dataIntros = await initFeature();
  // Ambil elemen tempat produk akan ditampilkan
  const productRow = document.getElementById('product-row');

  if (dataIntros.success && Array.isArray(dataIntros.feature)) {
    // Loop melalui setiap produk dan buat elemen HTML
    dataIntros.feature.forEach(data => {
      const productCard = document.createElement('div');
      productCard.className = 'col mb-4';
      productCard.innerHTML = `
          <div class="product-card position-relative">
              <div class="card-img">
                  <img src="${data.image}" alt="${data.name}" class="product-image img-fluid">
                  <div class="cart-concern position-absolute d-flex justify-content-center">
                      <div class="cart-button d-flex gap-2 justify-content-center align-items-center">
                          <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#modallong">
                              <svg class="shopping-carriage">
                                  <use xlink:href="#shopping-carriage"></use>
                              </svg>
                          </button>
                          <button type="button" class="btn btn-light" data-bs-target="#modaltoggle" data-bs-toggle="modal">
                              <svg class="quick-view">
                                  <use xlink:href="#quick-view"></use>
                              </svg>
                          </button>
                      </div>
                  </div>
              </div>
              <div class="card-detail d-flex justify-content-between align-items-center mt-3">
                  <h3 class="card-title fs-6 fw-normal m-0">
                      <a href="index.html">${data.title}</a>
                  </h3>
                  <span class="card-price fw-bold">$${data.price}</span>
              </div>
          </div>
      `;
      // Tambahkan elemen produk ke dalam row
      productRow.appendChild(productCard);
    });
  } else {
    console.error('Error fetching products:', error);
  }
  
});

document.addEventListener("DOMContentLoaded", async function() {
  // Fungsi untuk mengambil data dari API
  const latestProduct = await initLatestProduct();
  // Ambil elemen tempat produk akan ditampilkan
  const productRow = document.getElementById('latestproducts');

  if (latestProduct.success && Array.isArray(latestProduct.latest)) {
    // Loop melalui setiap produk dan buat elemen HTML
    latestProduct.latest.forEach(data => {
      const productCard = document.createElement('div');
      productCard.className = 'col mb-4';
      productCard.innerHTML = `
          <div class="product-card position-relative">
              <div class="card-img">
                  <img src="${data.image}" alt="${data.name}" class="product-image img-fluid">
                  <div class="cart-concern position-absolute d-flex justify-content-center">
                      <div class="cart-button d-flex gap-2 justify-content-center align-items-center">
                          <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#modallong">
                              <svg class="shopping-carriage">
                                  <use xlink:href="#shopping-carriage"></use>
                              </svg>
                          </button>
                          <button type="button" class="btn btn-light" data-bs-target="#modaltoggle" data-bs-toggle="modal">
                              <svg class="quick-view">
                                  <use xlink:href="#quick-view"></use>
                              </svg>
                          </button>
                      </div>
                  </div>
              </div>
              <div class="card-detail d-flex justify-content-between align-items-center mt-3">
                  <h3 class="card-title fs-6 fw-normal m-0">
                      <a href="index.html">${data.title}</a>
                  </h3>
                  <span class="card-price fw-bold">$${data.price}</span>
              </div>
          </div>
      `;
      // Tambahkan elemen produk ke dalam row
      productRow.appendChild(productCard);
    });
  } else {
    console.error('Error fetching products:', error);
  }
  
});


window.addEventListener('load', () => {
  const loginLink = document.getElementById('loginLink');
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (isLoggedIn === 'true') {
      // If user is logged in, change the "Login" link to "Logout"
      loginLink.textContent = 'Logout';

      // Add a click event listener to handle logout
      loginLink.addEventListener('click', () => {
          // Clear user session data from localStorage
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('userLogin'); // Clear user data from localStorage
          // Redirect to login page or reload the current page
          window.location.reload(); // Optionally, you could redirect the user to the login page here
      });
  } else {
      // If user is not logged in, ensure the "Login" link is present
      loginLink.textContent = 'Login';
      // Optionally, add a login click handler to navigate to the login page
      loginLink.addEventListener('click', () => {
        window.location.href = "../login/login.html";
      });
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const quantityInput = document.getElementById("quantity_001");
  const increaseButton = document.getElementById("increase-qty");
  const decreaseButton = document.getElementById("decrease-qty");

  increaseButton.addEventListener("click", function () {
      let currentValue = parseInt(quantityInput.value);
      quantityInput.value = currentValue + 1;  // Increase by 1
  });

  decreaseButton.addEventListener("click", function () {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
          quantityInput.value = currentValue - 1;  // Decrease by 1
      }
  });
});