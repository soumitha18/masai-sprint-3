var job = document.getElementById("jobs")

window.addEventListener("load", function(){

    var go = document.getElementById("go")

    go.addEventListener("click", function(){
        var background = document.getElementById("background")

        var language = document.getElementById("language").value
        var location = document.getElementById("location").value

        if(language == "" || location == ""){

            alert("Please Enter all the Details!")
        }
        else{
            var xhr = new XMLHttpRequest()
            var url = "https://jobs.github.com/positions.json?description="
            xhr.open("GET", url + language + "&location=" + location)
            xhr.send()
            xhr.onload = function(){
                console.log(JSON.parse(this.response))
                var res = JSON.parse(this.response)

                if(res.length == 0){
                    job.innerHTML = ""
                    alert("NO any Job in " + location + "!")
                }
                else{
                    background.style.background = "whitesmoke"
                    job.innerHTML = ""
                    for(i=0; i<res.length; i++){
                        cont = createCard(res[i])
                    }
                }
            } 
        }
    })
})


/*function createPagination(currPage, totalPage) {
    var container = document.createElement('div')
    for (var i = 1; i <= totalPage; i++) {
        var a = document.createElement('a')
        a.innerText = i
        a.href = '?page=' + i
        if (i == currPage) {
            a.className = 'currPage'
        }
        container.appendChild(a)
    }
    return container
}*/

function createCard(data){

    var cont = document.createElement("div")
    cont.setAttribute("class", "float")

    var image = document.createElement("div")
    var img = document.createElement("img")
    if(data.company_logo == null || data.company_logo == ""){
        image.setAttribute("src", "https://www.logologo.com/logos/spinning-letter-s-logo.jpg" )
    }
    else{
        img.setAttribute("src", data.company_logo)
    }
    img.setAttribute("class", "img")
    image.append(img)

    var div = document.createElement("div")
    var name = document.createElement("p")
    name.textContent = "Company Name : " + data.company
    var title = document.createElement("p")
    title.textContent = "Title : " +  data.title
    var loc = document.createElement("p")
    loc.innerHTML = "Location : " + data.location
    var com = document.createElement("a")
    com.href = data.company_url
    com.setAttribute("target", "_blank")
    com.innerText = "Click here for more info"
    div.append(title, name, loc, com)

    cont.append(image, div)

    job.append(cont)

}