window.onload = function () {
    if (document.body.id === "index") {
        LLamada2();
    } else if (document.body.id === "departamentos") {
        LLamada1();
    }
};

// Agregar evento de cambio al combo "cmbUbication" solo para LLamada2
var cmbUbication = document.getElementById("cmbUbication");
cmbUbication.addEventListener("change", function () {
    LLamada2();
});

// Agregar evento de cambio al combo "cmbUbication1" solo para LLamada1
var cmbUbication1 = document.getElementById("cmbUbication1");
cmbUbication1.addEventListener("change", function () {
    LLamada1();
});

function LLamada1() {
    var cmbUbication1 = document.getElementById("cmbUbication1");

    var url1 = "";
    if (cmbUbication1 != null) {
        url1 =
            "https://censopoblacion.gt/indicadores/" +
            (cmbUbication1.value == "Mostrar Todos" ? "" : cmbUbication1.value)+"/999";
    } else {
        url1 = "https://censopoblacion.gt/indicadores/1/999";
    }

    fetch(url1)
        .then(response => response.json())
        .then(data1 => {
            console.log(data1);

            const tot_Hombre = document.getElementById('totH');
            const tot_Mujer = document.getElementById('totM');
            const tot_Edad_14 = document.getElementById('tot14');
            const tot_Edad_1564 = document.getElementById('tot1564');
            const tot_Edad_65 = document.getElementById('tot65');
            const tot_Sec_Rur = document.getElementById('totRur');
            const tot_Sec_Urb = document.getElementById('totUrb');

            const tot_Maya = document.getElementById('totMay');
            const tot_Gar = document.getElementById('totGar');
            const tot_Xin = document.getElementById('totXin');
            const tot_ACA = document.getElementById('totACA');
            const tot_Lad = document.getElementById('totLad');
            const tot_Ext = document.getElementById('totExt');

            tot_Hombre.innerText = data1[0].total_sexo_hombre;
            tot_Mujer.innerText = data1[0].total_sexo_mujeres;
            tot_Edad_14.innerText = data1[0].pob_edad_014;
            tot_Edad_1564.innerText = data1[0].pob_edad_1564;
            tot_Edad_65.innerText = data1[0].pob_edad_65;
            tot_Sec_Rur.innerText = data1[0].total_sector_rural;
            tot_Sec_Urb.innerText = data1[0].total_sector_urbano;

            tot_Maya.innerText = data1[0].pob_pueblo_maya;
            tot_Gar.innerText = data1[0].pob_pueblo_garifuna;
            tot_Xin.innerText = data1[0].pob_pueblo_xinca;
            tot_ACA.innerText = data1[0].pob_pueblo_afrodescendiente;
            tot_Lad.innerText = data1[0].pob_pueblo_ladino;
            tot_Ext.innerText = data1[0].pob_pueblo_extranjero;

            // Actualizar la gráfica de pastel de "Población por Sexo"
            actualizarGraficaHombresMujeres(data1);

            // Actualizar la gráfica de pastel de "Población por grandes grupos de edad"
            actualizarGraficaEdades(data1);
        });
}


function LLamada2() {
    var cmbUbication = document.getElementById("cmbUbication");

    var url = "";
    if (cmbUbication != null) {
        url =
            "https://censopoblacion.gt/indicadores/2/" +
            (cmbUbication.value == "Mostrar Todos" ? "" : cmbUbication.value);
    } else {
        url = "https://censopoblacion.gt/indicadores/2/999";
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const tot_Hombre = document.getElementById('totH');
            const tot_Mujer = document.getElementById('totM');
            const tot_Edad_14 = document.getElementById('tot14');
            const tot_Edad_1564 = document.getElementById('tot1564');
            const tot_Edad_65 = document.getElementById('tot65');
            const tot_Sec_Rur = document.getElementById('totRur');
            const tot_Sec_Urb = document.getElementById('totUrb');

            const tot_Maya = document.getElementById('totMay');
            const tot_Gar = document.getElementById('totGar');
            const tot_Xin = document.getElementById('totXin');
            const tot_ACA = document.getElementById('totACA');
            const tot_Lad = document.getElementById('totLad');
            const tot_Ext = document.getElementById('totExt');

            tot_Hombre.innerText = data[0].total_sexo_hombre;
            tot_Mujer.innerText = data[0].total_sexo_mujeres;
            tot_Edad_14.innerText = data[0].pob_edad_014;
            tot_Edad_1564.innerText = data[0].pob_edad_1564;
            tot_Edad_65.innerText = data[0].pob_edad_65;
            tot_Sec_Rur.innerText = data[0].total_sector_rural;
            tot_Sec_Urb.innerText = data[0].total_sector_urbano;

            tot_Maya.innerText = data[0].pob_pueblo_maya;
            tot_Gar.innerText = data[0].pob_pueblo_garifuna;
            tot_Xin.innerText = data[0].pob_pueblo_xinca;
            tot_ACA.innerText = data[0].pob_pueblo_afrodescendiente;
            tot_Lad.innerText = data[0].pob_pueblo_ladino;
            tot_Ext.innerText = data[0].pob_pueblo_extranjero;

            // Actualizar la gráfica de pastel de "Población por Sexo"
            actualizarGraficaHombresMujeres(data);

            // Actualizar la gráfica de pastel de "Población por grandes grupos de edad"
            actualizarGraficaEdades(data);
        });
}


function actualizarGraficaHombresMujeres(data) {
    const graficaHombresMujeres = new Chart(document.getElementById("graficaHombresMujeres"), {
        type: "pie",
        data: {
            labels: ["Hombres", "Mujeres"],
            datasets: [
                {
                    data: [
                        data[0].total_sexo_hombre,
                        data[0].total_sexo_mujeres,
                    ],
                    backgroundColor: [
                        "rgba(163, 221, 203, 0.2)",
                        "rgba(232, 233, 161, 0.2)",
                    ],
                    borderColor: [
                        "rgba(163, 221, 203, 1)",
                        "rgba(232, 233, 161, 1)",
                    ],
                    borderWidth: 1,
                },
            ],
        },
    });

    // Actualizar los datos y estilos de la gráfica de Hombres y Mujeres
    graficaHombresMujeres.data.datasets[0].data = [
        data[0].total_sexo_hombre,
        data[0].total_sexo_mujeres,
    ];
    graficaHombresMujeres.update();
}

function actualizarGraficaEdades(data) {
    const graficaEdades = new Chart(document.getElementById("graficaEdades"), {
        type: "pie",
        data: {
            labels: ["Edad 0-14", "Edad 15-64", "Edad 65 o Mayor"],
            datasets: [
                {
                    data: [
                        data[0].pob_edad_014,
                        data[0].pob_edad_1564,
                        data[0].pob_edad_65,
                    ],
                    backgroundColor: [
                        "rgba(230, 181, 102, 0.2)",
                        "rgba(229, 112, 126, 0.2)",
                        "rgba(231, 160, 115, 0.2)",
                    ],
                    borderColor: [
                        "rgba(230, 181, 102, 1)",
                        "rgba(229, 112, 126, 1)",
                        "rgba(231, 160, 115, 1)",
,
                    ],
                    borderWidth: 1,
                },
            ],
        },
    });

    // Actualizar los datos y estilos de la gráfica de Edades
    graficaEdades.data.datasets[0].data = [
        data[0].pob_edad_014,
        data[0].pob_edad_1564,
        data[0].pob_edad_65,
    ];
    graficaEdades.update();
}






//Grafica
// document.addEventListener("DOMContentLoaded", function () {
//     const graficaPastel = document.getElementById("graficaPas");

//     const etiquetas = ["Ventas", "Donaciones", "Trabajos", "Publicidad"]
//     // Podemos tener varios conjuntos de datos. Comencemos con uno
//     const datosIngresos = {
//         data: [1500, 400, 2000, 7000], // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
//         // Ahora debería haber tantos background colors como datos, es decir, para este ejemplo, 4
//         backgroundColor: [
//             'rgba(163,221,203,0.2)',
//             'rgba(232,233,161,0.2)',
//             'rgba(230,181,102,0.2)',
//             'rgba(229,112,126,0.2)',
//         ],// Color de fondo
//         borderColor: [
//             'rgba(163,221,203,1)',
//             'rgba(232,233,161,1)',
//             'rgba(230,181,102,1)',
//             'rgba(229,112,126,1)',
//         ],// Color del borde
//         borderWidth: 1,// Ancho del borde
//     };

//     new Chart(graficaPastel, {
//         type: 'pie',// Tipo de gráfica. Puede ser dougnhut o pie
//         data: {
//             labels: etiquetas,
//             datasets: [
//                 datosIngresos,
//                 // Aquí más datos...
//             ]
//         },
//     });


// });

