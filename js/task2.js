function makeBuffer() {
    var currentBuffer = [];

    function bufferOps(value) {
        return !value ? currentBuffer : currentBuffer.push(value);
    }

    bufferOps.clear = function () {
        currentBuffer = [];
    };


    bufferOps.edit = function (name, surname, newRate) {

        for (var i = 0; i < currentBuffer.length; i++) {
            if (currentBuffer[i].name === name && currentBuffer[i].surname === surname) {
                newRate === undefined ? currentBuffer.splice(i, 1) : currentBuffer[i].rate = newRate;
                return true;
            }
        }

        return false;
    };

    bufferOps.get = function (name, surname) {

        for (var i = 0; i < currentBuffer.length; i++) {
            if (currentBuffer[i].name === name && currentBuffer[i].surname === surname) {
                return currentBuffer[i];
            }
        }

        return false;
    };

    return bufferOps;
}

function showBuffer(data) {
    var currentResult = "",
        div = document.getElementById("result"); //вытягиваем наш div

    if (data[0] !== undefined) {
        data.forEach(function (person) {
            currentResult += "<p>" + "<b>name:</b> " + person.name + ";</p>";
            currentResult += "<p><b>surname:</b> " + person.surname + ";</p>";
            currentResult += "<p><b>rate:</b> " + person.rate + ";</p>";
            currentResult += "<p><b>days:</b> " + person.days + "</p><hr>";
        });


    } else {
        currentResult = "Нет данных";
    }

    div.innerHTML = currentResult;

}

///////////////////////////////////////////////////////
//////////////////////////////////////////////////////

//Конструктор работника
function Worker(worker) {
    this.name = worker.name;
    this.surname = worker.surname;
    this.rate = worker.rate;
    this.days = worker.days;
}

//прототип-метод getSalary
Worker.prototype.getSalary = function () {
    return this.rate * this.days;
};

//прототип-метод getTotalSalary
Worker.prototype.getTotalSalary = function () {
    var totalSalary = 0,
        workers = buffer();

    for (var key in workers) {
        totalSalary += workers[key].rate * workers[key].days;
    }

    return totalSalary;

};

//Конструктор Director
function Director(worker) {
    Worker.apply(this, [worker]);
}

//Наследование Director от Worker
Director.prototype = Object.create(Worker.prototype);
Director.prototype.constructor = Director; //сохраняем конструктор Director

//прототип-метод addWorker
Director.prototype.addWorker = function (worker) {
    buffer(worker);
};

//прототип-метод removeWorker
Director.prototype.removeWorker = function (name, surname) {
    buffer.edit(name, surname);
};

//прототип-метод setWorkerRate
Director.prototype.setWorkerRate = function (name, surname, rate) {
    buffer.edit(name, surname, rate);
};

//прототип-метод getWorker
Director.prototype.getWorker = function (name, surname) {
    return buffer.get(name, surname);
};

////////////////////////////////////////////////////
///////////////////////////////////////////////////

var buttonAddDirector = document.getElementById("addDirector"),
    addDirectorData = document.getElementsByClassName("addDirectorData"),
    buttonAddDirectorData = document.getElementById("addDirectorData"),
    directorOperations = document.getElementsByClassName("directorOperations"),
    buttonAddWorker = document.getElementById("addWorker"),
    buttonEditWorkerRate = document.getElementById("editWorkerRate"),
    result = document.getElementsByClassName("result"),
    buttonGetWorker = document.getElementById("getWorker"),
    buttonDelWorker = document.getElementById("delWorker"),
    clear = document.getElementById("clear"),
    buffer = makeBuffer(),
    buttonShowAll = document.getElementById("showAll"),
    buttonExit = document.getElementById("exit"),
    director;


buttonAddDirector.addEventListener("click", function () {
    addDirectorData[0].style.display = "block";
    buttonAddDirector.style.display = "none";
});


buttonAddDirectorData.addEventListener("click", function () {
    var name = document.getElementById("dirName"),
        surname = document.getElementById("dirSurname"),
        rate = document.getElementById("dirRate"),
        days = document.getElementById("dirDays"),
        dir = document.getElementById("dirWelcome");

    director = new Director(
        {
            name: name.value,
            surname: surname.value,
            rate: rate.value,
            days: days.value
        }
    );

    addDirectorData[0].style.display = "none";
    dir.innerHTML = name.value + " " + surname.value;
    directorOperations[0].style.display = "block";

});


buttonAddWorker.addEventListener("click", function () {
    var name = document.getElementById("workerName"),
        surname = document.getElementById("workerSurname"),
        rate = document.getElementById("workerRate"),
        days = document.getElementById("workerDays");

    director.addWorker({
        name: name.value,
        surname: surname.value,
        rate: rate.value,
        days: days.value
    });

});


buttonDelWorker.addEventListener("click", function () {
    var delWorkerName = document.getElementById("delWorkerName"),
        delWorkerSurname = document.getElementById("delWorkerSurname");

    director.removeWorker(delWorkerName.value, delWorkerSurname.value);
});


buttonEditWorkerRate.addEventListener("click", function () {
    var newWorkerRate = document.getElementById("newWorkerRate"),
        workerRateName = document.getElementById("workerRateName"),
        workerRateSurname = document.getElementById("workerRateSurname");

    director.setWorkerRate(workerRateName.value, workerRateSurname.value, newWorkerRate.value);
    clear.style.display = "none";
    showBuffer([director.getWorker(workerRateName.value, workerRateSurname.value)]);

});


clear.addEventListener("click", function () {
    buffer.clear();
    clear.style.display = "none";
    showBuffer(buffer());
});


buttonGetWorker.addEventListener("click", function () {
    var getWorkerName = document.getElementById("getWorkerName"),
        getWorkerSurname = document.getElementById("getWorkerSurname");

    clear.style.display = "none";
    showBuffer([director.getWorker(getWorkerName.value, getWorkerSurname.value)]);
    result[0].style.display = "block";
});


buttonShowAll.addEventListener("click", function () {
    clear.style.display = "block";
    showBuffer(buffer());
    result[0].style.display = "block";
});


buttonExit.addEventListener("click", function () {
    directorOperations[0].style.display = "none";
    result[0].style.display = "none";
    delete director;
    buffer.clear();
    buttonAddDirector.style.display = "block";
});



