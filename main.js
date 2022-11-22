const courseApi = 'http://localhost:3000/courses'

var listCourseBlock = document.querySelector('#list-course')
function start() {
    getCourse(renderCourse)
    handleCreateForm()
}

start()

function getCourse(callback) {
    fetch(courseApi)
    .then(function(response) {
        return response.json()
    })
    .then(callback)
}

function renderCourse(courses) {
    let a = courses.map(function(elm) {
        return `
        <li class="course-item-${elm.id}"><h4>${elm.name}</h4><p>${elm.description}</p><button onclick="deleteCourse(${elm.id})">Xóa</button></li>
        `
    }).join('')
    listCourseBlock.innerHTML = a
}

function createCourse(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }
    fetch(courseApi, options)
        .then(function(response) {
            return response.json()
        })
        .then(callback)
}

function handleCreateForm() {
    var createBtn = document.querySelector('#create')

    createBtn.onclick = function() {
        var name = document.querySelector('input[name="name"]').value
        var description = document.querySelector('input[name="description"]').value

        var dataForm = {
            name: name,
            description: description,
        }
        
        createCourse(dataForm, renderCourse)
    }
}

function deleteCourse(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'},
    }
    fetch(courseApi + '/' + id, options)
        .then(function(response) {
            response.json()
        })
        .then(function() {
            document.querySelector(`.course-item-${id}`).remove
        })
}