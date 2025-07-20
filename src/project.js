import { addjob, td } from "./todo";
import { showAdd,hideAdd } from './toggleTodocard';
import './style.css';
import icon4 from './assets/icons8-add-100.png';

export const projects = {};
export let idc = 1;  // idcounter
export let idk = 0;  // idknower

export function showTodoList(projectId,td) {
    const project = projects[projectId];
    console.log(project);
    console.log('Current project ID:', projectId);
    console.log('Project name:', project.nm);
    console.log('Todo list:', td);

    const todoBox = document.getElementsByClassName("todo")[0];
    todoBox.innerHTML = ''; // Clear existing content

    const todoList = document.createElement("ul");
    todoList.style.listStyle = "none";

    const heading = document.createElement("li");
    heading.textContent = project.nm;
    heading.id = "heading";
    todoList.appendChild(heading);

    // Add todos for this project (assuming td is an object with tdjs with has id key) 
    if (td) {
        for(const job in td){
            console.log(job);
            const cdobj=document.getElementsByClassName(job.cname)[0];
            console.log(cdobj);
            if (job.id==idk && cdobj.classList.contains("hidden")) {
                cdobj.classList.remove="hidden";
            }
            else if(!cdobj.classList.contains("hidden")){
                cdobj.classList.add="hidden";
            }

        
        };


        }
            
            
    

    todoBox.appendChild(todoList);

    const newTodoSquare = document.createElement("div");
    newTodoSquare.id = "newTodoSquare";

    const ad = new Image();
    ad.src = icon4;
    ad.classList.add("a");
    ad.addEventListener("click", function(){
        const form=document.getElementById("addTaskForm");
        const btn=document.createElement("button");
        btn.id="btn";
        btn.textContent="Add Task";
        btn.style.margin="20px";
        form.appendChild(btn);
        showAdd();
        btn.addEventListener("click", function () {
            addjob(projects, idk);
            hideAdd();
            form.removeChild(btn);
        
        });

    });
    newTodoSquare.appendChild(ad);
    newTodoSquare.style.display = "block";
    todoBox.appendChild(newTodoSquare);

    // const ADD=document.getElementById("btn"); 
    // if(ADD){    
    // ADD.addEventListener("click", function(){         
    //     addjob(projects,idk); 
    //     hideAdd();    
    // });   
    // todoBox.appendChild(ADD);
    // }
}

export function addProject() {
    const list = document.getElementById("list");
    if (list) {
        console.log("I am scared");
        const name = document.createElement("input");
        name.type = "text";
        name.id = "name";
        name.placeholder = "Enter Project";
        list.appendChild(name);
        console.log("I am scared");

        const submitButton = document.createElement("button");
        submitButton.id = "submit";
        submitButton.type = "submit";
        submitButton.textContent = "Add";
            list.appendChild(submitButton);

        const clear = document.createElement("button");
        clear.id = "clear";
        clear.textContent = "Clear";
        list.appendChild(clear);

        submitButton.addEventListener("click", function() {
            const projectName = name.value.trim();
            console.log("Submit Project");
                
                idk = idc;
                const project = {
                    id: idk,
                    nm: projectName
                };

                projects[idk] = project;
                 // Update the current project ID

                const newPro = document.createElement("button");
                newPro.textContent = projectName;
                newPro.id = "project_" + idk;
                newPro.addEventListener("click", function() {
                   
                    showTodoList(idk);
                    
                });

                list.appendChild(newPro);
                

                idc++;  // Increment the ID counter
                console.log('Projects:', projects);
                console.log('Current project ID (idk):', idk);
                list.removeChild(name);
                list.removeChild(submitButton);
                list.removeChild(clear);
           
        });

        clear.addEventListener("click", clearInputs);

        function clearInputs() {
            list.removeChild(name);
            list.removeChild(submitButton);
            list.removeChild(clear);
            idc=idc-1;
            
            
        }
    } else {
        console.log("List not found");
    }
}
export const toggleProject{
    //IT will ok 
    
}
