import generateCode from './codeMirror.js'
import filters from './filters.js'
// namespaces
const w3_svg = 'http://www.w3.org/2000/svg';
const w3_xlink = 'http://www.w3.org/1999/xlink';
// Toggle content liveSample
document.querySelectorAll('[data-target]').forEach(item=>{
    item.addEventListener('click', ()=>{
        document.querySelectorAll('[data-content]').forEach(cItem=>{
            cItem.classList.remove('active');
        })
        document.querySelectorAll('[data-target]').forEach(item => {
            item.classList.remove('activeTarget');
        })
        const t= document.querySelector(item.dataset.target);
        t.classList.add('active');
        item.classList.add('activeTarget');
    })
})
var selectFilter = document.getElementById('FilterSelect'); // select
var parametersConteiner = document.getElementById('parametersConteiner') // form parameters
let url_txt_content = document.getElementById('url_txt_content'); // image url or text
const eventChangeManually = new Event("change");

var filtersList = {};
var img;

// this function get parameters list
var getParametersList = (parametersConteiner) => {
    filtersList = {};
    for (let i = 1; i < parametersConteiner.getElementsByTagName('input').length; i += 2) {
        let property = parametersConteiner.getElementsByTagName('input')[i].name;
        let value = parametersConteiner.getElementsByTagName('input')[i].value;
        filtersList[property] = value;

    }
    for (let i = 0; i < parametersConteiner.getElementsByTagName('select').length; i++) {
        let property = parametersConteiner.getElementsByTagName('select')[i].name;
        let value = parametersConteiner.getElementsByTagName('select')[i].value;
        filtersList[property] = value;
    }
    return filtersList;

}
//it generate an select tag with the filters list
var generateOptionsFilters = (object) => {

    for (let i = 0; i < object.filters.length; i++) {
        let values = Object.values(object.filters[i]);
        let option = document.createElement('option');
        option.setAttribute('value', values[0]);
        option.textContent = values[0];
        selectFilter.appendChild(option);
    }
    }
generateOptionsFilters(filters);

//it listen select input
selectFilter.addEventListener('change',()=>
    {
    if (selectFilter.value == 'none') {
        noneFiler(selectFilter);
        let visibleInputs = document.querySelectorAll('.visible');
        visibleInputs.forEach((input)=>{
            input.classList.remove('visible')
            input.classList.add('hidden')
        })
    }else{  
        findFilter(selectFilter.value, filters);
        let hiddenInputs = document.querySelectorAll('.hidden');
        hiddenInputs.forEach((input) => {
            input.classList.remove('hidden')
            input.classList.add('visible')
        })
        aplyFilter(selectFilter.value, selectFilter.id,  filtersList);
    }
    })
//it listen changes of parameters of filter
parametersConteiner.addEventListener('change', (e) => {
    getParametersList(parametersConteiner);
    aplyFilter(selectFilter.value, selectFilter.id,  filtersList);
    })
// it listen changes in url image or text / Use a promise for wait image size
url_txt_content.addEventListener('change', () => {
    getUrlorText(url_txt_content).then(imageSize => {
        img= imageSize
        selectFilter.dispatchEvent(eventChangeManually);
        })
    })
//it generate code with filter selected
var aplyFilter = (filterName, selectFilterid, parametersList) => {
    
    // get selected     
    let svgConteiner = document.getElementById(selectFilterid).closest('.svgConteiner');
    //get previous items
    let codeMirrorContent = svgConteiner.getElementsByClassName('CodeMirror');
    let btnAply = svgConteiner.getElementsByClassName('btn');
    // remove previous items
    svgConteiner.removeChild(codeMirrorContent[0]);
    svgConteiner.removeChild(btnAply[0]);
    //get svg in svgConteiner
    let oldSvg = svgConteiner.getElementsByTagName('svg'); 
    
    // crating a new svg
    let svg = document.createElementNS(w3_svg,'svg');
    setAttributesNS(svg, { width:"100%", height:"300", viewBox:`0 0 ${img.width} ${img.height}`});

    let defsSvg= document.createElementNS(w3_svg ,'defs');

    let filterDefs= document.createElementNS(w3_svg ,'filter');
        filterDefs.setAttributeNS(null,'id', `${filterName}Filter`);

    let typeFilter = document.createElementNS(w3_svg ,`${filterName}`);
        setAttributesNS(typeFilter, parametersList );
        
    let imageSvg = document.createElementNS(w3_svg ,'image');
    imageSvg.setAttributeNS(w3_xlink, 'xlink:href', url_txt_content.value);
        imageSvg.setAttributeNS(null,'filter', `url(#${filterName}Filter)`);

    filterDefs.appendChild(typeFilter);
    defsSvg.appendChild(filterDefs);
    svg.appendChild(defsSvg);
    svg.appendChild(imageSvg);

    // <svg>
    //     <defs>
    //         <filter>
    //             <typeFilter></typeFilter>
    //         </filter>
    //     </defs>
    //     <image></image>
    // </svg>

    svgConteiner.replaceChild(svg, oldSvg[0]);
    generateCode(svgConteiner);
    }
var noneFiler = (element)=>{
    var svgConteiner = element.closest('.svgConteiner');
    //get previous items
    let codeMirrorContent = svgConteiner.getElementsByClassName('CodeMirror');
    let btnAply = svgConteiner.getElementsByClassName('btn');
    // remove previous items
    svgConteiner.removeChild(codeMirrorContent[0]);
    svgConteiner.removeChild(btnAply[0]);
    //get svg in svgConteiner
    let oldSvg = svgConteiner.getElementsByTagName('svg');

    // crating a new svg
    let svg = document.createElementNS(w3_svg, 'svg');
    setAttributesNS(svg, { width: "100%", height: "300", viewBox: `0 0 ${img.width} ${img.height}` });

    let imageSvg = document.createElementNS(w3_svg, 'image');
    imageSvg.setAttributeNS(w3_xlink, 'xlink:href', url_txt_content.value);

    svg.appendChild(imageSvg);
    // <svg>
    //     <image></image>
    // </svg>

    svgConteiner.replaceChild(svg, oldSvg[0]);
    generateCode(svgConteiner);
}
//this function set attributes from oldElement to newElement
var relocateAtrributesNS = (oldElement, newElement, type) => 
    {
        let attributes= oldElement.attributes;
        for (const attribute in attributes) {
            if (attributes[attribute].value) {
                (type=='image')?
                    newElement.setAttributeNS(w3_xlink , attributes[attribute].name, attributes[attribute].value):
                        newElement.setAttributeNS(null, attributes[attribute].name, attributes[attribute].value);

            }
        }
    }
//this function set various attributes
var setAttributes = (element, attributes)=> {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    }
//this function set various attributes with namespaces
var setAttributesNS = (element, attributes)=>{
    for (const key in attributes) {
        element.setAttributeNS(null, key, attributes[key]);
    }
    }
//this function generate options for each filter
var generateParameters=(nFilter, obj)=>{
    parametersConteiner.innerHTML='' //clear element
    // generate option of each filter
    let keys = Object.keys(obj.filters[nFilter]); //get properties of each filter
    let values = Object.values(obj.filters[nFilter]);//get values of each property

        for (let i = 1; i < values.length; i++) { //examine each property
            if(typeof (values[i]) =="object"){ //if it's a object
                let select = document.createElement("select");
                    select.setAttribute("name", keys[i]);
                let label = document.createElement("label");
                    label.setAttribute('for', keys[i]);
                    label.textContent = keys[i];
                for (let j = 0; j < values[i].length; j++) {
                    let option = document.createElement("option");
                        option.setAttribute("value", values[i][j]);
                        option.setAttribute("name", keys[i]);
                        option.textContent = values[i][j];
                        select.appendChild(option);
                }
                parametersConteiner.appendChild(label);
                parametersConteiner.appendChild(select);
            }else{ //if is a number
                let column = document.createElement("div"); //column of inputs
                let rangeInput = document.createElement("input"); //input range
                let numberInput = document.createElement("input"); //input number
                let label = document.createElement("label") //label of column
                label.setAttribute('for', `number${keys[i]}`);
                    label.textContent = keys[i];
                setAttributes(rangeInput, { 
                    'type': 'range', 
                    'min': 0,
                    'max': values[i],
                    'value': values[i] / 2,
                    'step': 1, 
                    'id': `R${keys[i]}`, 
                    'name': keys[i],
                    'style': "width: 70%;",
                    'oninput': `number${keys[i]}.value=R${keys[i]}.value` });
                setAttributes(numberInput, {
                    'type': 'number', 
                    'min': 0,
                    'max': values[i],
                    'step': 1,
                    'id':`number${keys[i]}`, 
                    'name':`number${keys[i]}`, 
                    'value': values[i]/2,  
                    'style':"width: 20%;",
                    'oninput': `R${keys[i]}.value=number${keys[i]}.value`})
                
                column.appendChild(numberInput)
                column.appendChild(rangeInput)

                parametersConteiner.appendChild(label)
                parametersConteiner.appendChild(column)
            }
        }
    getParametersList(parametersConteiner);
    }
// this function find filter selected in SelectFilter
var findFilter= (filterName, obj) =>{
    let values = Object.values(obj.filters); //get properties of each filter
    for (let i=0; i<values.length; i++) {
        if (values[i].filter == filterName) {
            generateParameters(i, obj);
        }
    }
    }
var getUrlorText = (url_txt_content)=>{
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = () => resolve({width: img.width, height: img.height})
        img.onerror = reject;
        img.src = url_txt_content.value;
    })
}
getUrlorText(url_txt_content).then(imageSize => {
    img = imageSize
    selectFilter.dispatchEvent(eventChangeManually);
})

