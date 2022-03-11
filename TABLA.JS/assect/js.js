function guardar() {

    var _nom = document.getElementById("nom").value;
    var _ape = document.getElementById("ape").value;
    var _ced = document.getElementById("ced").value;

    var fila = "<tr><td>" + _nom + "</td><td>" + _ape + "</td><td>" + _ced + "</td></tr>";

    var btn = document.createElement("TR");
    btn.innerHTML = fila;
    document.getElementById("tablita").appendChild(btn);
}

function delete_row(e) {
    e.closest("tr").remove();
}

function myFunction() {
    var firstRow = document.getElementById("tablita").rows[0];
    firstRow.deleteCell(0);
}