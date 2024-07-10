import { add } from './todo';
import { showAdd } from './toggleTodocard';
import './style.css';
import icon4 from './assets/icons8-add-100.png';
import { addProject } from './project';


document.addEventListener("DOMContentLoaded", function() {
const todoBox=document.getElementsByClassName("todo")[0];
const ad=new Image();
ad.src=icon4;
ad.classList.add("a");
ad.addEventListener("click",showAdd);
todoBox.appendChild(ad);

const ADD=document.getElementById("done");
ADD.addEventListener("click", function(){
    
    add();
    
});

});

  
