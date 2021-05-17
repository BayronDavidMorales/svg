import generateCode from './codeMirror.js'
// MOSTRAR CODIGO DE EJEMPLO
document.querySelectorAll('.svgConteiner').forEach(svgConteiner => { //Recorre los elementos con clase .svgContainer
    generateCode(svgConteiner);

    // let auxCodeMirrorValue = myCodeMirror.getValue();


    // svgConteiner.lastChild.previousSibling.addEventListener('click', function (e) {
    //     // myCodeMirror.setValue();
    //     console.log(myCodeMirror);
    //     aply(svgConteiner, auxCodeMirrorValue);
    //     return;
    // })
})

const aply = (svgConteiner, auxCodeMirrorValue) => {
    svgConteiner.innerHTML = auxCodeMirrorValue;
}