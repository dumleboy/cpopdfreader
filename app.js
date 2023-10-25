function openPDF() {
    var file = document.getElementById('pdfFile').files[0];
    if (file) {
        var fileReader = new FileReader();
        fileReader.onload = function() {
            var pdfData = new Uint8Array(this.result);
            // Используйте PDFJS для отображения PDF
            pdfjsLib.getDocument({data: pdfData}).promise.then(function(pdf) {
                // Получите первые две страницы
                for (var i = 1; i <= 2; i++) {
                    pdf.getPage(i).then(function(page) {
                        var scale = 1.5;
                        var viewport = page.getViewport({scale: scale});
                        var canvas = document.createElement('canvas');
                        var context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        var renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        };
                        var renderTask = page.render(renderContext);
                        renderTask.promise.then(function () {
                            document.getElementById('pdfViewer').appendChild(canvas);
                        });
                    });
                }
            });
        };
        fileReader.readAsArrayBuffer(file);
    }
}
