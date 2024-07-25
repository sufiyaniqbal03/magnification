const magnifier = document.getElementById('magnifier');
const image = document.getElementById('image');

const zoomLevel = 2;
let magnifierSize = 100;

document.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    magnifierSize = 100 + scrollTop * 0.1; // Adjust size based on scroll
    magnifier.style.width = `${magnifierSize}px`;
    magnifier.style.height = `${magnifierSize}px`;
    magnifier.style.backgroundSize = `${image.width * zoomLevel}px ${image.height * zoomLevel}px`;
});

image.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = image.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    if (mouseX < 0 || mouseY < 0 || mouseX > width || mouseY > height) {
        magnifier.style.display = 'none';
        return;
    }

    const bgX = (mouseX / width) * 100;
    const bgY = (mouseY / height) * 100;

    magnifier.style.backgroundImage = `url(${image.src})`;
    magnifier.style.left = `${mouseX - magnifierSize / 2}px`;
    magnifier.style.top = `${mouseY - magnifierSize / 2}px`;
    magnifier.style.backgroundPosition = `${bgX}% ${bgY}%`;
    magnifier.style.backgroundSize = `${width * zoomLevel}px ${height * zoomLevel}px`;
    magnifier.style.display = 'block';
});

image.addEventListener('mouseenter', () => {
    magnifier.style.display = 'block';
});

image.addEventListener('mouseleave', () => {
    magnifier.style.display = 'none';
});
