const dragArea = document.querySelector('.drag-area');
const resume = document.querySelector('.resume');
const resumeElement = document.getElementById('resume');


let button = document.querySelector('.button');
let input = document.querySelector('.hidden');
let file;

// button.onclick = () => {
//     input.click();
// };


// document.addEventListener('mousemove', (e) => {
//     document.documentElement.style.setProperty('--mouseX', e.clientX + 'px');
//     document.documentElement.style.setProperty('--mouseY', e.clientY + 'px');
//     console.log('MouseX:', e.clientX, 'MouseY:', e.clientY);
// });


//when browse
// input.addEventListener('change', function() {
//     file = this.files[0];
//     displayFile();

// });
//when file is inside the drag area
dragArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    console.log('File is inside the drag area') 
});

//when file leaves drop area
dragArea.addEventListener('dragleave', () => {
    console.log('File left the drag area') 
});

//when file is dropped 
dragArea.addEventListener('drop', (event) => {
    event.preventDefault();

    file = event.dataTransfer.files[0];
    console.log(file);
    displayFile();
    resumeElement.classList.add('animate');
    });
    //console.log('The file is dropped') ;

resumeElement.addEventListener('animationend', () => {
    resumeElement.classList.remove('animate');
    });
function displayFile() {
    let fileType = file.type;
    //console.log(fileType);
    

    let validExtension = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    
    if(validExtension.includes(fileType)) {
        let fileReader = new FileReader();

        fileReader.onload = () => {
            let fileURL = fileReader.result;
            //console.log(fileURL);
            let imgTag = `<img src = "${fileURL}" alt = "">`;
            resume.innerHTML = imgTag;
            
        };
        fileReader.readAsDataURL(file);
        
    } else {
        alert('the void does not accept your offering (try an image, pdf, or word document)');
    }

    
    //console.log('The file is dropped') ;

    
}