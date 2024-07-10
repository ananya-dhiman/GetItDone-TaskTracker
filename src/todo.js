import icon1 from './assets/icons8-delete-30.png';
import icon2 from './assets/icons8-edit-64.png';
import icon3 from './assets/icons8-dropdown-50.png';


import { hideAdd } from "./toggleTodocard";

const priorityInput = document.getElementById("priority");
const low = document.getElementById("low");
const medium = document.getElementById("medium");
const high = document.getElementById("high");

low.addEventListener("click", function(){
    priorityInput.value = "low";
    low.style.backgroundColor = "green";
    high.style.backgroundColor = "white";
    medium.style.backgroundColor = "white";
});

medium.addEventListener("click", function(){
    priorityInput.value = "medium";
    medium.style.backgroundColor = "green";
    low.style.backgroundColor = "white";
    high.style.backgroundColor = "white";
});

high.addEventListener("click", function(){
    priorityInput.value = "high";
    high.style.backgroundColor = "green";
    medium.style.backgroundColor = "white";
    low.style.backgroundColor = "white";
});


export function add(){
    
    console.log("working");
    const todoContainer = document.getElementsByClassName('todos')[0];

    
    const titleInput = document.getElementById('titleInput').value;
    const descriptionInput = document.getElementById('descriptionInput').value;
    const priorityInput = document.getElementById("priority");
    const cat = document.getElementById("category").value;
    const dueDateInput= document.getElementById("testdate")?.value || '';
   
    console.log("Inputs:", {titleInput, descriptionInput, cat, priority: priorityInput.value,dueDateInput});

    const priorityColors = {
        high: '#ff6b6b',
        medium: '#feca57',
        low: '#1dd1a1'
    };

    const todoCard = document.createElement('div');
    todoCard.className = 'tocard one'; 
    var check = document.createElement("INPUT");
    check.setAttribute("type", "checkbox");
    check.setAttribute("id", "checkcss");
    
    const icon = document.createElement('div');
    icon.className = 'icon';
    const edit = new Image();
    edit.src = icon2;
    edit.className = "edit";
    const del = new Image();
    del.src = icon1;
    del.className = "del";
    const drop = new Image();
    drop.src = icon3;
    drop.className = "drop";
    
    icon.appendChild(drop);
    icon.appendChild(edit);
    icon.appendChild(del);

    const todoTitle = document.createElement('h3');
    todoTitle.className = 'todo-title';
    todoTitle.innerText = titleInput;

    const todoDescription = document.createElement('p');
    todoDescription.className = 'todo-description';
    if(descriptionInput){
    todoDescription.innerText = "Description-"+descriptionInput;
    }
    const dueDate = document.createElement('div');
    dueDate.className = 'due-date';

    // Format the due date
    if (dueDateInput) {
        const date = new Date(dueDateInput);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });

        // Function to add ordinal suffix to the day
        function getOrdinalSuffix(day) {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1:  return "st";
                case 2:  return "nd";
                case 3:  return "rd";
                default: return "th";
            }
        }

        const formattedDate = `Due ${day}${getOrdinalSuffix(day)} ${month}`;
        dueDate.textContent = formattedDate;
    } 

    

    


    todoCard.style.backgroundColor = priorityColors[priorityInput.value];
    


    const todoContent = document.createElement('div');
    todoContent.className = 'todo-content';
    const todoHeader = document.createElement('div');
    todoHeader.className = 'todo-header';
    
    todoHeader.appendChild(check);
    todoHeader.appendChild(todoTitle);
    todoHeader.appendChild(dueDate);
    todoHeader.appendChild(icon);
    todoContent.appendChild(todoHeader);
   
    todoCard.appendChild(todoContent);

    // Check if the subcategory section already exists
    let subCatSection = document.querySelector(`.sub-category[data-category="${cat}"]`);
    if (!subCatSection) {
        subCatSection = document.createElement('div');
        subCatSection.className = 'sub-category';
        subCatSection.setAttribute('data-category', cat);
        
        
        const subCatTitle = document.createElement('h2');
        subCatTitle.innerText = cat;
        subCatSection.appendChild(subCatTitle);
        
        todoContainer.appendChild(subCatSection);
    }

    subCatSection.appendChild(todoCard);

    // Clear input fields after adding the task
    document.getElementById('titleInput').value = '';
    document.getElementById('descriptionInput').value = '';
    document.getElementById('category').value = 'Work'; 

    low.style.backgroundColor = "white";
    medium.style.backgroundColor = "white";
    high.style.backgroundColor = "white";
    priorityInput.value = ""; //

    hideAdd();

    // Functioning
    //drop
    function toggleDropdown(){

        drop.classList.toggle('show');
        if (drop.classList.contains('show')){
            drop.style.transform = "rotate(180deg)";
            if (!todoContent.contains(todoDescription)) {
                todoContent.appendChild(todoDescription);
            }
            todoCard.classList.remove('one');
            todoCard.classList.add('two');
        } else {
            drop.style.transform = "rotate(0deg)";
            if (todoContent.contains(todoDescription)) {
                todoContent.removeChild(todoDescription);
            }
            todoCard.classList.remove('two');
            todoCard.classList.add('one');
        }
    };    
    drop.addEventListener("click",toggleDropdown);
    //edit
    edit.addEventListener("click",function(){
         edit.classList.toggle('ed');
         if (edit.classList.contains('ed')){
            //add here
            // Create input fields for editing
        if(!drop.classList.contains('show')){
            toggleDropdown();
        }
        drop.style.pointerEvents = 'none'; 
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.value = todoTitle.textContent;
        titleInput.className = 'edit-input';

        const dateInput=document.createElement('input');
        dateInput.type='date';
        dateInput.value=dueDateInput;
        dateInput.className='edit-input';

        const descriptionInput = document.createElement('textarea');
        descriptionInput.value = todoDescription.textContent.replace('Description-', '');  // Remove 'Description-' prefix
        descriptionInput.className = 'edit-input';

        const prioritySelect = document.createElement('select');
        prioritySelect.className = 'edit-input';
        ['low', 'medium', 'high'].forEach(priority => {
            const option = document.createElement('option');
            option.value = priority;
            option.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);
            if (priority === priorityInput.value) option.selected = true;
            prioritySelect.appendChild(option);
        });

        // Replace content with input fields
        todoTitle.replaceWith(titleInput);
        if (todoContent.contains(todoDescription)) {
            todoDescription.replaceWith(descriptionInput);
        } else {
            todoContent.appendChild(descriptionInput);
        }

        
        dueDate.replaceWith(dateInput);
        
        

        // Add save button
        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';
        saveBtn.className = 'save-btn';
        todoContent.appendChild(saveBtn);

        // Save button functionality
        saveBtn.addEventListener('click', function() {
            todoTitle.textContent = titleInput.value;
            todoDescription.textContent = "Description-" + descriptionInput.value;  // Add 'Description-' prefix back
            priorityInput.value = prioritySelect.value;
            
            if(isNaN(dateInput)){
                console.log("No date given");
            }
            else{
            const newDate = new Date(dateInput.value);
            function getOrdinalSuffix(day) {
                if (day > 3 && day < 21) return 'th';
                switch (day % 10) {
                    case 1:  return "st";
                    case 2:  return "nd";
                    case 3:  return "rd";
                    default: return "th";
                }
            }
            const day = newDate.getDate();
            const month = newDate.toLocaleString('default', { month: 'short' });
            const formattedDate = `Due ${day}${getOrdinalSuffix(day)} ${month}`;
            dueDate.textContent = formattedDate;
            dueDate.value = dateInput;
        }

            todoCard.style.backgroundColor = priorityColors[prioritySelect.value];

            titleInput.replaceWith(todoTitle);
            dateInput.replaceWith(dueDate);
            saveBtn.remove();
            
            descriptionInput.remove();

            edit.classList.remove('ed');
            drop.style.pointerEvents = 'auto';

            // If description is not showing, remove it from the DOM
            if (!drop.classList.contains('show')) {
                todoContent.removeChild(todoDescription);
            }
        });
    } else {
        // If not in edit mode, revert any changes
       
        const inputs = todoContent.querySelectorAll('.edit-input');
        inputs.forEach(input => {
            if (input.tagName === 'INPUT') {
                input.replaceWith(todoTitle);
            } else if (input.tagName === 'TEXTAREA') {
                input.replaceWith(todoDescription);
            } 
        });
        todoContent.querySelector('.save-btn')?.remove();

        // If description is not showing, remove it from the DOM
       
    }

        
            

    });

    //delete
    del.addEventListener("click", function(){
        todoCard.remove()
    
    });

    check.addEventListener("change", function() {
    if(check.checked){
        todoCard.style.opacity = "0.5";
        todoTitle.innerHTML = `<s>${todoTitle.textContent}</s>`;
        if(todoDescription){
            todoDescription.innerHTML= `<s>${todoDescription.textContent}<s>`;
        }
    }
    else{
        todoCard.style.opacity = "1";
        todoTitle.innerHTML = todoTitle.textContent;
        todoDescription.innerHTML = todoDescription.textContent;
    }
    
   });
};

