const dragArea = document.querySelector('.drag-area');
const resume = document.querySelector('.resume');
const resumeElement = document.getElementById('resume');

const container = document.querySelector('.void');
 // Define parameters for the circular motion
 const originX = container.offsetWidth / 2; // X-coordinate of the circle's center
 const originY = container.offsetHeight / 2; // Y-coordinate of the circle's center
//  const radius = 200; // Radius of the circle
 const speed = 0.02; // Speed of the animation
 let angle = 0; // Initial angle


let button = document.querySelector('.button');
let input = document.querySelector('.hidden');
let file;

let MouseX;
let MouseY;

//when file is inside the drag area
dragArea.addEventListener('dragover', (e) => {
    e.preventDefault();
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
    MouseX = event.clientX;
    MouseY = event.clientY;
    console.log('MouseX:', MouseX, 'MouseY:', MouseY);
    resume.style.left = MouseX + "px";
    resume.style.top = MouseY+ "px";
    displayFile();

    //resume.classList.add('animate');
    const radius = Math.abs(parseInt(resume.style.left) - originX);
    animate(radius);
    
    });
    //console.log('The file is dropped') ;


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


    resumeElement.addEventListener('animationend', () => {
        resumeElement.classList.remove('animate');
        //fileReader = null;
        resumeElement.style.display = 'none';
        });
    
}


function animate(radius) {
    console.log("radius: ", radius);
    // Calculate the position of the moving element at the current angle
    const x = originX + radius * Math.cos(angle);
    const y = originY + radius * Math.sin(angle);
    // Set the position of the moving element
    resume.style.left = x - resume.offsetWidth / 2 + 'px';
    resume.style.top = y - resume.offsetHeight / 2 + 'px';

    // Increment the angle for the next frame
    angle += speed;

    // Request the next animation frame
    requestAnimationFrame(animate);
}
