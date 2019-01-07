
var userInfomation = [];
function getUserInfomation() {
    var userList = information;
    createDropDown(userList);
    // Dyanmic table creation
    var rows = 5, columns = 5;
    var dropdown = "";
    for (var j = 0; j < rows; j++) {
        dropdown = dropdown + "<tr>"
        for (var k = 0; k < columns; k++) {
            dropdown = dropdown +
             "<td  class='table ' ondrop='drop(event)'  ondragleave='dragLeave(event)'  ondragover='allowDrop(event)' id='" + j + "_" + k + "' ></td>";
        }
        dropdown = dropdown + "</tr>";
    }
    render(dropdown, document.querySelector('.table-of-user'));
}

function createDropDown(userList){
    var table = '';
    for (var i = 0; i < userList.length; i++) {
        var user = userList[i];
        table = table + "<div class='userList' draggable=true  ondragend='dragEnd(event)' ondragstart='drag(event)'  id='" + user.id + "'>" + user.first_name + "</div>";
    }
    render(table, document.querySelector('.panel-one-outer'));
}

function render(template, node) {
    if (!node) return;
    node.innerHTML = template;
}


function drag(event) {
    event.dataTransfer.setData("Text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    let listUser = event.dataTransfer.getData("text");
    event.target.style.border = "";
    if (document.getElementById(listUser)) {
        if (event.target.innerHTML.toString().trim() == "") {
            document.getElementById(listUser).removeAttribute("draggable");
            document.getElementById(listUser).removeAttribute("ondragstart");
            event.target.appendChild(document.getElementById(listUser));
            var deleteUser = document.createElement("span");
            deleteUser.setAttribute("class", "closeSet");
            deleteUser.setAttribute("class", "fa fa-close remove-user");
            deleteUser.addEventListener("click", deleteConfirmation);
            deleteUser.param = { "id": event.target.id, "text": event.target.outerText, "item_id": listUser };
            event.target.appendChild(deleteUser);
            let index = 0;
            information.find(function (item, i) {
                if (item.id.toString().trim() == listUser.toString().trim()) {
                    index = i;
                    userInfomation.push(item);
                    return i;
                }
            });
            information.splice(index, 1);
        }
    }
    resetHover();
}
function allowDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.innerHTML.toString().trim() == "") {
        event.target.style.border = "3px solid #0b80ff";
    }
}

function onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
}
function dragEnd(event) {
    event.target.style.border = "";
    resetHover();
}


function dragLeave(event) {
    event.target.style.border = "";
    resetHover();
}
function resetHover() {
    var list = document.getElementsByClassName("table");
    for (var i = 0; i < list.length; i++) {
        list[i].style.border = "";
    }
}

function deleteConfirmation(event) {

    let userID = event.target.param.id;
    let param_text = event.target.param.text;
    if (document.getElementById(userID)) {
        document.getElementById(userID).innerHTML = "";
        userInfomation.find(function (item, i) {
            if (item.id.toString().trim() == event.target.param.item_id.toString().trim()) {
                index = i;
                item.first_name = param_text.toString().trim();
                information.unshift(item);
                return item;
            }
        });
        createDropDown(information);
    }
}