import { addjob } from './todo';
import { addProject,projects } from './project';

document.addEventListener("DOMContentLoaded", function() {

const PRO=document.getElementById("project");

    if (PRO) {
        console.log("Project button found");
        PRO.addEventListener("click", function() {
            console.log("Project button clicked");
            if (typeof addProject === 'function') {
                addProject();
            } else {
                console.error("addProject is not a function");
            }
        });
    } else {
        console.error("Project button not found");
    }
});


  
