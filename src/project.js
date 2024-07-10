export function addProject(){
    const pro=document.getElementById("project");
    pro.addEventListener("click",function(){
        const list=document.getElementById("list");
        const name=document.createElement("div");
        name.type="input";
        name.id="name";
        list.appendChild(name);





    })


}