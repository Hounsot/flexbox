import './style.css'

// Set height of Q_Divider elements to match their parent elements
function setDividerHeights() {
  const dividers = document.querySelectorAll('.Q_Divider');
  
  dividers.forEach(divider => {
    const parent = divider.parentElement;
    divider.style.height = '1px';
    if (parent) {
      divider.style.height = `${parent.clientHeight}px`;
    }
  });
}

// Run on initial load
document.addEventListener('DOMContentLoaded', setDividerHeights);

// Also run on window resize to handle responsive changes
window.addEventListener('resize', setDividerHeights);

