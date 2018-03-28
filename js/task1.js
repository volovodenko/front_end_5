function makeBuffer() {
    var currentBuffer = [];

    function bufferOps(value) {
        return !value ? currentBuffer : currentBuffer.push(value);
    }

    bufferOps.clear = function () {
        currentBuffer = [];
    };

    return bufferOps;
}

var buffer = makeBuffer();


function Worker(worker) {
    this.name = worker.name;
    this.surname = worker.surname;
    this.rate = worker.rate;
    this.days = worker.days;

    buffer(worker);
}


Worker.prototype.getSalary = function () {
    return this.rate * this.days;
};

Worker.prototype.getTotalSalary = function () {
    var totalSalary = 0,
        workers = buffer();

    for (var key in workers) {
        totalSalary += workers[key].rate * workers[key].days;
    }

    return totalSalary;

};

var worker1 = new Worker(
    {
        name: "Иван",
        surname: "Иванов",
        rate: 10,
        days: 20
    }
    ),
    worker2 = new Worker(
        {
            name: "Петя",
            surname: "Петров",
            rate: 20,
            days: 30
        }
    ),
    worker3 = new Worker(
        {
            name: "Василий",
            surname: "васильев",
            rate: 30,
            days: 40
        }
    );

console.log(worker1.name);
console.log(worker1.surname);
console.log(worker1.rate);
console.log(worker1.days);
console.log("Worker1 salary = " + worker1.getSalary());
console.log("Worker2 salary = " + worker2.getSalary());
console.log("Worker2 salary = " + worker3.getSalary());
console.log("Total salary = " + Worker.prototype.getTotalSalary());

