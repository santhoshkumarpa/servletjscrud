<html>

<body onload="app.FetchAll()">
    <button id="btn1" onclick="loadDoc()">date </button>
    
    <script src="Country.js"></script>
    <form action="javascript:void(0);" method="POST" onsubmit="app.saveorupdate()">
        <label>Country id: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input type="text" name="id" id="id">
        <br><br>
        <label>Country name: </label>
        <input type="text" name="name" id="name">
        <br>
        <!-- <button type="submit" name="submit" id="submit">Add</button> -->
        <br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <button id="btn">Add </button>
    </form>
    <p id="error"></p>
    <hr>
    <br>
    <table>
        <tbody id="countries">
        </tbody>
    </table>
    <p id="sim"></p>
</body>

</html>