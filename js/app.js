// variables
const projectNameIP = document.querySelector(".project-info_input");
const projectHeading = document.querySelector(".project-info_heading");

// temporary variables
// const tasks = document.querySelector(".project-tasks");
// const downArrow = document.querySelector(".arrow--down");
// const upArrow = document.querySelector(".arrow--up");

// testing a tasks UI functionality
// overflownElement(tasks);

// show down arrow when tasks column is overflown
function overflownElement(element) {
    if (element.scrollHeight > element.clientHeight) {

        element.style.overflowY = "auto";
        // show down arrow if the element is overflown in y direction
        downArrow.classList.remove("hide");
    }
}

// hide down arrow when reached to bottom
function arrowFeature(event) {
    const tasks = event.target;

    if ((tasks.scrollHeight - tasks.offsetHeight) - tasks.scrollTop < 0) {
        console.log("You scrolled to bottom!");
        downArrow.classList.add("hide");
        upArrow.classList.remove("hide");
    }

    else if ((tasks.scrollHeight - tasks.offsetHeight) - tasks.scrollTop > 0) {
        downArrow.classList.remove("hide");
        upArrow.classList.add("hide");
    }
}

// testig
// tasks.addEventListener("scroll", (event) => {
//     arrowFeature(event);
// });

// UI
class UI {
    setProjectName() {

        const projectName = Storage.getProjectName();

        // set the project name
        if (projectName === "") {
            this.editValue(projectNameIP, projectHeading, "projectName");
        } else {
            // hide the input field
            projectNameIP.classList.add("hide");

            // show the project name
            projectHeading.innerText = projectName;
            projectHeading.classList.remove("hide");
        }

        // if project heading is shown
        if (!projectHeading.classList.contains("hide")) {

            // click on the project heading to edit the heading
            projectHeading.addEventListener("click", (event) => {

                /* get the updated project name from local storage.As every time it clicked updates the value in local storage */
                const projectName = Storage.getProjectName();

                // hide the project heading
                projectHeading.classList.add("hide");

                // remove the existing project name form local storage
                Storage.removeItem("projectName");

                // turn on the input field
                projectNameIP.classList.remove("hide");

                // show the existing value in input field
                projectNameIP.value = projectName;

                // edit the name and press "Enter" to set, show heading and save to local storage
                this.editValue(projectNameIP, projectHeading, "projectName");
            });
        }
    }

    editValue(inputField, outputField, storageKey) {

        inputField.addEventListener("keypress", (event) => {

            // must be contain value
            if (event.target.value !== "") {

                // Press "Enter" to set the project name
                if (event.key === "Enter") {
                    const value = event.target.value;

                    // hide the input field
                    inputField.classList.add("hide");

                    // show the project name
                    outputField.innerText = value;
                    outputField.classList.remove("hide");

                    // save value to local storage
                    Storage.saveValue(storageKey, value);
                }
            }
        });
    }

}

// STORAGE
class Storage {
    static getProjectName() {
        return localStorage.getItem("projectName") ? JSON.parse(localStorage.getItem("projectName")) : "";
    }

    static saveValue(storageKey, value) {
        localStorage.setItem(storageKey, JSON.stringify(value));
    }

    static removeItem(key) {
        localStorage.removeItem(key);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI;

    // after a reload
    ui.setProjectName();
});