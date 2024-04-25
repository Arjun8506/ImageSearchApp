document.addEventListener("DOMContentLoaded", function () {
    let Acces_Key = "XLTj1FfmOW8UeeBxdBMsxZPlmsA3HtTYCAJTq6QxyiU";
    // target button from html
    let searchInput = document.getElementById("searchInput");
    let searchBtn = document.getElementById("searchBtn");
    let moreBtn = document.querySelector(".loadMore");
    let showData = document.querySelector(".showData");
    // creating a new page for shoiwng more images
    let page = 1;
    const getData = async (searchValue, pageNo) => {
        let fetching = await fetch(`https://api.unsplash.com/search/photos?query=${searchValue}&per_Page=28&page=${pageNo}&client_id=${Acces_Key}`);
        let jsonData = await fetching.json();

        for (let i = 0; i < jsonData.results.length; i++) {
            const newImg = document.createElement("img");
            newImg.src = jsonData.results[i].urls.full;
            showData.appendChild(newImg);

            newImg.addEventListener("click", () => {
                document.querySelector(".showingImage").style.display = "block"
                document.getElementById("showingImageInBig").src = jsonData.results[i].urls.full
                document.getElementById("close").addEventListener("click", () => {
                    document.querySelector(".showingImage").style.display = "none"
                })

                document.getElementById("downloadImage").addEventListener("click", () => {
                    domtoimage.toPng(document.getElementById('donloadImageDiv'))
                        .then(function (dataUrl) {
                            var link = document.createElement('a');
                            link.href = dataUrl;
                            link.download = 'UnasplashAPI.png';
                            link.click();
                        });

                })

            })
        }
        moreBtn.style.display = "block"
    }
    searchBtn.addEventListener("click", function () {
        let searchValue = searchInput.value;
        getData(searchValue, 1);
    });
    moreBtn.addEventListener("click", function () {
        let searchValue = searchInput.value;
        getData(searchValue, page++);
    });
});
