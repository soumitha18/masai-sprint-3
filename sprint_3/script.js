var job = document.getElementById("jobs")

window.addEventListener("load", function(){

    var go = document.getElementById("go")

    go.addEventListener("click", function(){

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
                    alert("NO any Job in the respective URL!")
                }
                else{
                    job.innerHTML = ""
                    for(i=0; i<res.length; i++){
                        cont = createCard(res[i])
                    }
                }
            } 
        }
    })
})

function createCard(data){

    var cont = document.createElement("div")
    cont.setAttribute("class", "float")

    var image = document.createElement("div")
    var img = document.createElement("img")
    img.setAttribute("src", data.company_logo)
    image.append(img)

    var div = document.createElement("div")
    var name = document.createElement("p")
    name.textContent = "Company Name : " + data.company
    var title = document.createElement("p")
    title.textContent = "Title : " +  data.title
    var com = document.createElement("a")
    com.href = data.company_url
    com.innerText = "Click here for more info"
    div.append(title, name, com)

    cont.append(image, div)

    job.append(cont)

}