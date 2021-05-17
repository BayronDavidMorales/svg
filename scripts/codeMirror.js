var generateCode = (svgConteiner)=>{
    let n = svgConteiner.getElementsByTagName('svg').length; //Recorre todas las etiquetas <svg> dentro del div
    let content = '';
    for (let i = 0; i < n; i++) {
        content += `
                `+ svgConteiner.getElementsByTagName('svg').item(i).outerHTML; //extrae el texto html
    }
    let myCodeMirror= CodeMirror(svgConteiner, {
        value: `                ${content}`,
        mode: {
            name: "htmlmixed",
            tags: {
                    style: [["type", /^text\/(x-)?scss$/, "text/x-scss"],
                    [null, null, "css"]],
                    custom: [[null, null, "customMode"]]
                }
        },
        scrollbarStyle: "overlay"
    });
    
    myCodeMirror.setSize(null, 150);
    myCodeMirror.scrollTo(100, null);

    svgConteiner.insertAdjacentHTML('beforeend', '<p class="btn"> <b>Aply</b><p>');

    return myCodeMirror;
}



export default generateCode;