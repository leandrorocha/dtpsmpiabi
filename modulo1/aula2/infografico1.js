    function toggle_visibility(texto) {
        var mostraTexto = document.getElementById(texto);
        var piramide = document.getElementById("piramide");

        //Verifica se tem a classe hide. Se tiver, remove e adiciona a classe show.
        if(mostraTexto.classList.contains("piramide__txt--hide")){
            mostraTexto.classList.remove("piramide__txt--hide");
            mostraTexto.classList.add("piramide__txt--show");
        } else {
            mostraTexto.classList.remove("piramide__txt--show");
            mostraTexto.classList.add("piramide__txt--hide");
        }

        //Agora verifica se todos os elementos do grupo têm a classe show. Se tiver, a pirâmide precisa estar à esquerda, na posição 0:
        var txtLabel = piramide.querySelectorAll(".txt-label");

        for (let index = 0; index < txtLabel.length; index++) {
            const element = txtLabel[index];
            console.log(element);

            if (element.classList.contains("piramide__txt--hide") && window.innerWidth > 991) {
                console.log("TEM HIDE");

                piramide.style.transform = "translate(200px)";


            } else if (element.classList.contains("piramide__txt--hide")) {
                piramide.style.transform = "translate(120px)";

            }else {
                console.log("TÁ SHOW");

                piramide.style.transform = "translate(0px)";
                
                return;
            }
        }
    }
