
var app = new function () {
    var mode = "";

    var countries = [], result;
    this.updateid;
    this.FetchAll = function () {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                //alert(xhr.responseText);
                result = xhr.responseText;
                // document.write(result);
                countries = JSON.parse(result);
                console.log(countries);

                app.printtable();
                // var object = JSON.parse(this.responseText);
                //    app.FetchAll();

            }
        }
        xhr.open('GET', '/country', true);
        xhr.abort = function () {
            console.log("abort() is called");
        };
        xhr.send(null);
        xhr.abort();



    }
    this.printtable = function () {
        // alert("printtable");
        var object = JSON.parse(result);
        //    app.FetchAll();
        this.el = document.getElementById('countries');
        var data = '';

        data += '<table border=2px>';
        for (var i in object) {
            data += '<tr>';
            data += '<td>' + object[i].id + '</td>';
            data += '<td>' + object[i].name + '</td>';
            data += '<td><button onclick="app.edit(' + object[i].id + ')">Edit</button></td>';
            data += '<td><button onclick="app.delete(' + object[i].id + ')">Delete</button></td>';

            data += '</tr>';
            data += '<br>';
            data += '<br>';
        }
        data += '</table>';
        // alert("data values :" + data);
        this.el.innerHTML = data;
    };

    this.edit = function (id) {
        mode = "edit";
        //  alert("edit");
        document.getElementById('btn').innerHTML = "Update";

        for (var i = 0; i < countries.length; i++) {

            if (countries[i].id == id) {

                //   console.log(countries[i].name);
                // var c='update';

                document.getElementById('id').value = countries[i].id;
                document.getElementById('name').value = countries[i].name;

            }
            else {
                document.getElementById('error').value = "INVALID ID";
            }

        }

    };
    this.saveorupdate = function () {

        var id = document.getElementById('id').value;
        var name = document.getElementById('name').value;
        if (mode == "") {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status == "200") {
                    app.FetchAll();
                }
            }
            xhr.open("POST", "/country" + '?id=' + id + '&name=' + name, true);
            xhr.send(null);
            document.getElementById('id').value = "";
            document.getElementById('name').value = "";
        }

        else {
            if (mode == "edit") {
                var id = document.getElementById('id').value;
                var name = document.getElementById('name').value;
                // var url="/country";
                alert("edit values" + id + " " + name);
                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.readyState == 4 && xhr.status == "200") {
                        app.FetchAll();
                    }
                }
                xhr.open("PUT", "/country" + '?id=' + id + '&name=' + name, true);
                xhr.send(null);

                document.getElementById('id').value = "";
                document.getElementById('name').value = "";
                document.getElementById('btn').innerHTML = "Add";
                mode = "";
            }


        }
    };
    this.delete = function (id) {

        for (var i = 0; i < countries.length; i++) {
            if (countries[i].id == id) {
                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.readyState == 4 && xhr.status == "200") {
                        app.FetchAll();
                    }
                }
                xhr.open("DELETE", "/country" + "?id=" + id, true);
                xhr.send(null);
                document.getElementById('error').innerHTML = "BUILD SUCCESS";
            }
            else {
                document.getElementById('error').value = "INVALID ID";
            }
        }

    }



};
function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("btn1").innerHTML = this.responseText;
        }
    };
    xhttp.open("POST", "/country", true);
    xhttp.send();
}



