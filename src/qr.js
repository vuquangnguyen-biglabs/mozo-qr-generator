schemeData = document.getElementById('schemeInput');
qrData = document.getElementById('dataInput');
qrImage = document.getElementById('imageInput');
qrColor = document.getElementById('colorInput');
qrType = document.getElementById('typeInput');
resultTable = document.getElementById("resultTable");

const updateQrData = () => {
  for (i = resultTable.rows.length -1; i > 0; i--) {
    resultTable.deleteRow(i);
  }

  var ids = qrData.value.split("\n");
  for(i = 0; i < ids.length; i++) {
    var element = ids[i];
    if (element) {
      var rawData = schemeData.value + element;
      var newRow = resultTable.insertRow(resultTable.rows.length);
      var cell1 = newRow.insertCell(0);
      cell1.innerHTML = element;
      cell1.classList.add("col_id");

      var cell2 = newRow.insertCell(1); 
      cell2.innerHTML = rawData;
      cell2.classList.add("col_raw_data");

      var cellQR = newRow.insertCell(2);
      var thumbDiv = document.createElement("div");
      thumbDiv.classList.add("qrThumbnail");
      thumbDiv.title = rawData;
      thumbDiv.id = "thumb_" + i;
      cellQR.appendChild(thumbDiv);

      // var saveBtn = document.createElement("a");
      // saveBtn.innerHTML = "Lưu";
      // saveBtn.href = "#thumb_" + i;
      // saveBtn.download = element + ".png";
      // saveBtn.addEventListener('click', function (e) {
      //   var thumbId = saveBtn.href.split("#")[1];
      //   var thunbCanvas = document.getElementById(thumbId).firstElementChild;
        
      // });
      // cellQR.appendChild(saveBtn);

      var imageFinal = "./src/mozo_icon.png"
      var imageFile = qrImage.files[0];
      if(imageFile) {
        imageFinal = URL.createObjectURL(imageFile);
      }
      var busQR = new QRCodeStyling({
        width: 1024,
        height: 1024,
        data: rawData,
        image: imageFinal,
        dotsOptions: { 
          color: qrColor.value,
          type: qrType.value
        },
      });
      busQR.append(thumbDiv);

      var cell4 = newRow.insertCell(3); 
      var previewDiv = document.createElement("div");
      previewDiv.classList.add("qrThumbnail");
      cell4.appendChild(previewDiv);
    }
  }
};