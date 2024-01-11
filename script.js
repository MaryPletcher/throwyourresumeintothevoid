const dragArea = document.querySelector('.drag-area');
const resume = document.querySelector('.resume');
const resumeElement = document.getElementById('resume');
const container = document.body;


 // Define parameters for the spiral motion
 const originX = container.offsetWidth / 2; // X-coordinate of the void's center
 const originY = container.offsetHeight / 2+65; // Y-coordinate of the void's center

 console.log("originX: ", originX, "originY: ", originY);
 let speed = 0.02; // Speed of the animation
 let angle = 0; // Initial angle


let button = document.querySelector('.button');
let input = document.querySelector('.hidden');
let file;

let MouseX;
let MouseY;

let resumeX = resume.style.left + resume.offsetWidth/2;
let resumeY = resume.style.top + resume.offsetHeight/2;



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
    resume.style.left = MouseX + resume.offsetWidth/2 + "px";
    resume.style.top = MouseY+resume.offsetHeight/2 + "px";
    displayFile();

    //resume.classList.add('animate');
    animate();
    
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


function animate() {
    resumeX = resume.style.left + resume.offsetWidth/2;
    resumeY = resume.style.top + resume.offsetHeight/2;
    let radius = Math.sqrt((Math.abs((parseInt(resumeX) - originX) ** 2)) + (Math.abs((parseInt(resumeY) - originY) ** 2)));
    console.log("radius: ", radius);
    let tanAngle = Math.atan2(
        parseInt(resumeX) - originY,
        parseInt(resumeY) - originX
    )
    function animationFrame() {
        const newX = originX + radius * Math.cos(tanAngle);
        const newY = originY + radius * Math.sin(tanAngle);

        //update position to follow spiral
        resume.style.left = newX - resume.offsetWidth/2 + 'px';
        resume.style.top = newY - resume.offsetHeight/2 + 'px';

        //update scale 
        const scale = radius / 200; // Adjust the scale factor as needed
        resume.style.transform = `scale(${scale})`;

        // Update rotation
        // const rotation = tanAngle; // You might need to adjust the rotation factor
        // resume.style.transform += ` rotate(${rotation}rad)`;



        tanAngle += speed;
        radius = Math.max(radius - Math.log(radius + 1) * speed*2, 0);;
        speed += .0005;
        if (radius > 0 ) {
            requestAnimationFrame(animationFrame);
        }
        else {
            resetAnimation() 
        }
    }

    requestAnimationFrame(animationFrame);
}

function resetAnimation() {
    // Reset animation properties
    resume.style.left = originX; // Set to your initial left value
    resume.style.top = originY; // Set to your initial top value
    resume.style.transform = `scale(100)`; // Reset scale and rotation
    resume.style.transform = `rotate(0rad)`; // Reset scale and rotation

    // Reset animation-related variables
    animationComplete = false;
    speed = 0.02;
    
    // Reset file variables
    file = null;
    resume.innerHTML = ''; // Clear the content of the resume element
}




