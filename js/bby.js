const data = {
  movies: {
      action: 
      { title: "Inception", 
        details: "A mind-bending thriller by Christopher Nolan.", 
        image: "https://via.placeholder.com/150" 

      },
      
      comedy: 
      { title: "Superbad", 
        details: "A hilarious coming-of-age comedy.", 
        image: "https://via.placeholder.com/150" 
      },      
      
      romance: 
      { title: "Superbad", 
        details: "A hilarious coming-of-age comedy.", 
        image: "https://via.placeholder.com/150" 
      },      
      crime: 
      { title: "Superbad", 
        details: "A hilarious coming-of-age comedy.", 
        image: "https://via.placeholder.com/150" 
      },

      sci_fi: 
      { title: "Superbad", 
        details: "A hilarious coming-of-age comedy.", 
        image: "https://via.placeholder.com/150" 
      },  

      horror: 
      { title: "Superbad", 
        details: "A hilarious coming-of-age comedy.", 
        image: "https://via.placeholder.com/150" 
      },    

      triller: 
      { title: "Superbad", 
        details: "A hilarious coming-of-age comedy.", 
        image: "https://via.placeholder.com/150" 
      },    

      borootoi_udur: 
      { title: "Superbad", 
        details: "A hilarious coming-of-age comedy.", 
        image: "https://via.placeholder.com/150" 
      },      
      tsastai_udur: 
      { title: "Superbad", 
        details: "A hilarious coming-of-age comedy.", 
        image: "https://via.placeholder.com/150" 
      },      
      
      yu_ch_bsn_yhw: 
      { title: "Superbad", 
        details: "A hilarious coming-of-age comedy.", 
        image: "https://via.placeholder.com/150" 
      }
  },
  
  music: {
      pop: { 
        title: "Taylor Swift - 1989", 
        details: "A classic pop album.", 
        image: "https://via.placeholder.com/150" },

      jazz: { 
        title: "Miles Davis - Kind of Blue", 
        details: "A jazz masterpiece.", 
        image: "https://via.placeholder.com/150" },

      rock: { 
        title: "Smells Like Teen Spirit - Nirvana", 
        details: "Energetic, often loud, with distorted guitars and powerful vocals.", 
        image: "https://via.placeholder.com/150" },

      hip_hop: { 
        title: "Miles Davis - Kind of Blue", 
        details: "A jazz masterpiece.", 
        image: "https://via.placeholder.com/150" },

      classical: { 
        title: "Symphony No. 5 -  Ludwig van Beethoven", 
        details: "A jazz masterpiece.", 
        image: "https://via.placeholder.com/150" }
  },

  books: {
      fiction: { 
        title: "1984 by George Orwell", 
        details: "A dystopian classic.", 
        image: "https://via.placeholder.com/150" },
      
      mystery: { 
        title: "Sherlock Holmes", 
        details: "The ultimate mystery series.", 
        image: "https://via.placeholder.com/150" }
  },

  anime: {
      fiction: { title: "1984 by George Orwell", details: "A dystopian classic.", image: "https://via.placeholder.com/150" },
      mystery: { title: "Sherlock Holmes", details: "The ultimate mystery series.", image: "https://via.placeholder.com/150" }
  },  
  series: {
      fiction: { title: "1984 by George Orwell", details: "A dystopian classic.", image: "https://via.placeholder.com/150" },
      mystery: { title: "Sherlock Holmes", details: "The ultimate mystery series.", image: "https://via.placeholder.com/150" }
  },
  coffee_shop: {
    fiction: { title: "1984 by George Orwell", details: "A dystopian classic.", image: "https://via.placeholder.com/150" },
    mystery: { title: "Sherlock Holmes", details: "The ultimate mystery series.", image: "https://via.placeholder.com/150" },
  },  
  date: {
    fiction: { title: "1984 by George Orwell", details: "A dystopian classic.", image: "https://via.placeholder.com/150" },
    mystery: { title: "Sherlock Holmes", details: "The ultimate mystery series.", image: "https://via.placeholder.com/150" }
  }, 
  travel: {
      fiction: { title: "1984 by George Orwell", details: "A dystopian classic.", image: "https://via.placeholder.com/150" },
      mystery: { title: "Sherlock Holmes", details: "The ultimate mystery series.", image: "https://via.placeholder.com/150" }
  }, 
  food: {
      fiction: { title: "1984 by George Orwell", details: "A dystopian classic.", image: "https://via.placeholder.com/150" },
      mystery: { title: "Sherlock Holmes", details: "The ultimate mystery series.", image: "https://via.placeholder.com/150" }
  }
};


function openGenrePopup(category) {
  const genrePopup = document.getElementById("genre-popup");
  const genreOptions = document.getElementById("genre-options");
  const genreTitle = document.getElementById("genre-title");


  genreOptions.innerHTML = "";


  genreTitle.textContent = `Select a Genre for ${category.charAt(0).toUpperCase() + category.slice(1)}`;
  const genres = Object.keys(data[category]);

  genres.forEach((genre) => {
      const button = document.createElement("button");
      button.textContent = genre.charAt(0).toUpperCase() + genre.slice(1);
      button.className = "category-btn";
      button.onclick = () => openResultPopup(category, genre);
      genreOptions.appendChild(button);
  });

  genrePopup.classList.remove("hidden");
}


function closeGenrePopup() {
  const genrePopup = document.getElementById("genre-popup");
  genrePopup.classList.add("hidden");
}


function openResultPopup(category, genre) {
  const resultPopup = document.getElementById("result-popup");
  const resultTitle = document.getElementById("result-title");
  const resultImage = document.getElementById("result-image");
  const resultDetails = document.getElementById("result-details");


  const result = data[category][genre];
  resultTitle.textContent = result.title;
  resultImage.src = result.image;
  resultDetails.textContent = result.details;


  resultPopup.classList.remove("hidden");
  closeGenrePopup();
}

function closeResultPopup() {
  const resultPopup = document.getElementById("result-popup");
  resultPopup.classList.add("hidden");
}
